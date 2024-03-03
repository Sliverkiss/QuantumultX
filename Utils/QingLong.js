/*
对接青龙面板
适配 QX、Loon、Surge等平台

QL:{
    host, //青龙服务器地址
    clientId, //青龙应用id
    secret, //青龙应用密钥
    ckName, //用于写入青龙的变量名称
    remark, //用于写入的变量备注
}

const $ = new Env("青龙自动同步");//脚本名称
let QL = $.getjson("SAKURA_QL") || {};

//加载青龙模块
async function loadQingLong() {
    let code = ($.isNode() ? process.env['qinglong_code'] : $.getdata('qinglong_code')) || '';
    if (code && Object.keys(code).length) {
        console.log(`✅${$.name}:缓存中存在QingLong代码,跳过下载`);
        eval(code);
        return new QingLong(QL.host, QL.clientId, QL.secret);
    }
    console.log(`🚀${$.name}:开始下载QingLong代码`);
    return new Promise(async (resolve) => {
        $.getScript('https://cdn.jsdelivr.net/gh/Sliverkiss/QuantumultX@main/Utils/QingLong.js').then((fn) => {
            $.setdata(fn, "qinglong_code");
            eval(fn);
            const ql = new QingLong(QL.host, QL.clientId, QL.secret);
            console.log(`✅QingLong加载成功,请继续`);
            resolve(ql);
        })
    })
};

*/


function QingLong(HOST, Client_ID, Client_Secret) {
    const Request = (t, m = "GET") => {
        return new Promise((resolve, reject) => {
            $.http[m.toLowerCase()](t)
                .then((response) => {
                    var resp = response.body;
                    try {
                        resp = $.toObj(resp) || resp;
                    } catch (e) { }
                    resolve(resp);
                })
                .catch((err) => reject(err));
        });
    };
    return new (class {
        /**
        * 对接青龙API
        * @param {*} HOST http://127.0.0.1:5700
        * @param {*} Client_ID xxx
        * @param {*} Client_Secret xxx
        */
        constructor(HOST, Client_ID, Client_Secret) {
            this.host = HOST;
            this.clientId = Client_ID;
            this.clientSecret = Client_Secret;
            this.token = "";
            this.envs = [];
        }
        //用户登录
        async checkLogin() {
            let tokenObj;
            try {
                tokenObj = $.getjson("yuheng_ql_token") || {};
            } catch (e) {
                console.log(`❌The token is invalid, please re-enter the token`);
                await this.getAuthToken();
                return false;
            }
            if (Object.keys(tokenObj).length > 0) {
                const { token, expiration } = tokenObj;
                const currentTime = new Date().getTime();
                if (currentTime > expiration) {
                    $.log("❌The token has expired");
                    await this.getAuthToken();
                } else {
                    this.token = token;
                    $.log(
                        `✅The token is successfully obtained (${this.token
                        }) from cache and is valid until ${$.time(
                            "yyyy-MM-dd HH:mm:ss",
                            expiration
                        )}`
                    );
                }
            } else {
                await this.getAuthToken();
            }
        }
        // 获取用户密钥
        async getAuthToken() {
            const options = {
                url: `${this.host}/open/auth/token`,
                params: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                },
            };
            try {
                $.log(`传入参数: ${JSON.stringify(options)}`);
                const { code, data, message } = await Request(options);
                if (code === 200) {
                    const { token, token_type, expiration } = data;
                    $.log(
                        `✅The token is successfully obtained: ${token} and is valid until ${$.time(
                            "yyyy-MM-dd HH:mm:ss",
                            expiration * 1e3
                        )}`
                    );
                    this.token = `${token_type} ${token}`;
                    $.setjson({
                        token: this.token,
                        expiration: expiration * 1e3,
                    },
                        "yuheng_ql_token"
                    );
                } else {
                    throw message || "Failed to obtain user token.";
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
        /**
        * 获取所有环境变量详情
        */
        async getEnvs() {
            const options = {
                url: `${this.host}/open/envs`,
                headers: {
                    'Authorization': this.token,
                },
            };
            try {
                const { code, data, message } = await Request(options);
                if (code === 200) {
                    this.envs = data;
                    $.log(`✅Obtaining environment variables succeeded.`);
                } else {
                    throw message || `Failed to obtain the environment variable.`;
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }

        checkEnvByName(name) {
            return this.envs.findIndex((item) => item.name === name);
        }
        checkEnvByRemarks(remarks) {
            return this.envs.findIndex((item) => item.remarks === remarks);
        }
        checkEnvByValue(value, regex) {
            const match = value.match(regex);
            if (match) {
                const index = this.envs.findIndex((item) =>
                    item.value.includes(match[0])
                );
                if (index > -1) {
                    $.log(`🆗${value} Matched: ${match[0]}`);
                    return index;
                } else {
                    $.log(`⭕${value} No Matched`);
                    return -1;
                }
            } else {
                $.log(`⭕${value} No Matched`);
                return -1;
            }
        }
        selectEnvByName(name) {
            return this.envs.filter((item) => item.name === name);
        }
        selectEnvByRemarks(remarks) {
            return this.envs.filter((item) => item.remarks === remarks);
        }
        /**
        * 添加环境变量
        * @param {*} array [{value:'变量值',name:'变量名',remarks:'备注'}]
        */
        async addEnv(array) {
            const options = {
                url: `${this.host}/open/envs`,
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(array),
            };
            try {
                const { code, message } = await Request(options, "post");
                if (code === 200) {
                    $.log(`✅The environment variable was added successfully.`);
                } else {
                    throw message || "Failed to add the environment variable.";
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
        /**
         * 修改环境变量
        * @param {*} obj {value:'变量值',name:'变量名',remarks:'备注',id:0}
        */
        async updateEnv(obj) {
            const options = {
                url: `${this.host}/open/envs`,
                method: "put",
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(obj),
            };
            try {
                const { code, message } = await Request(options, "post");
                if (code === 200) {
                    $.log(`✅The environment variable was updated successfully.`);
                    await this.enableEnv([obj._id]);
                } else {
                    throw message || "Failed to update the environment variable.";
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
        /**
        * 删除环境变量
        * @param {*} ids [0,1,2] -> id数组
        */
        async deleteEnv(ids) {
            const options = {
                url: `${this.host}/open/envs`,
                method: "delete",
                headers: {
                    Authorization: `${this.token}`,
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(ids),
            };
            try {
                const { code, message } = await Request(options, "post");
                if (code === 200) {
                    $.log(`✅The environment variable was deleted successfully.`);
                } else {
                    throw message || "Failed to delete the environment variable.";
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
        /**
         * 启用环境变量
         * @param {*} ids [0,1,2] -> id数组
         */
        async enableEnv(ids) {
            const options = {
                url: `${this.host}open/envs/enable`,
                method: "put",
                headers: {
                    Authorization: `${this.token}`,
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(ids),
            };
            try {
                const { code, message } = await Request(options, "post");
                if (code === 200) {
                    $.log(`✅The environment variable was enabled successfully.`);
                } else {
                    throw message || "Failed to enable the environment variable.";
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
        /**
         * 获取单个环境变量详情
         * @param {*} id
         * @returns 变量id
         */
        async getEnvById(id) {
            const options = {
                url: `${this.host}open/envs/${id}`,
                headers: {
                    Authorization: `${this.token}`,
                },
            };
            try {
                const { code, data, message } = await Request(options);
                if (code === 200) {
                    return data;
                } else {
                    throw message || `Failed to get the environment variable.`;
                }
            } catch (e) {
                throw e
                    ? typeof e === "object"
                        ? JSON.stringify(e)
                        : e
                    : "Network Error.";
            }
        }
    })(HOST, Client_ID, Client_Secret);
}
