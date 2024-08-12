function MongoDB(BASE_URL, DATA_SOURCE, DATABASE, COLLECTION, API_KEY) {
    return new (class {
        constructor(BASE_URL, DATA_SOURCE, DATABASE, COLLECTION, API_KEY) {
            this.BASE_URL = BASE_URL;
            this.dataSource = DATA_SOURCE;
            this.database = DATABASE;
            this.collection = COLLECTION;
            this.apiKey = API_KEY;
        }
        //公共接口
        async commonPost(options) {
            const { url: u, headers: h, body: b, method: m = "post" } = options
            const opts = {
                url: `${this.BASE_URL}${u}`,
                headers: {
                    "api-key": this.apiKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...h
                },
                body: $.toStr({
                    dataSource: this.dataSource,
                    database: this.database,
                    collection: this.collection,
                    ...b
                })
            }
            $.info($.toStr(opts.body));
            return new Promise((resolve) => {
                $[m](opts, (err, resp, data) => {
                    let res = $.toObj(data) || data;
                    resolve(res);
                });
            });
        }
        //查找单个文档
        async findOne(document) {
            const opts = {
                url: "/findOne",
                body: { filter: document }
            }
            return await this.commonPost(opts);
        }
        //查找多个文档
        async find(document) {
            const opts = {
                url: "/find",
                body: { filter: document }
            }
            return await this.commonPost(opts);

        }
        //插入单个文档
        async insertOne(document) {
            const opts = {
                url: "/insertOne",
                body: { document: document }
            }
            return await this.commonPost(opts);
        }
        //插入多个文档
        async insertMany(document) {
            const opts = {
                url: "/insertMany",
                body: { documents: document }
            }
            return await this.commonPost(opts);
        }
        //更新单个文档
        async updateOne(filter, document) {
            const opts = {
                url: "/updateOne",
                body: { filter: filter, update: document }
            }
            return await this.commonPost(opts);
        }
        //更新多个文档
        async updateMany(filter, document) {
            const opts = {
                url: "/updateMany",
                body: { filter: filter, update: document }
            }
            return await this.commonPost(opts);
        }
        //删除单个文档
        async deleteOne(filter) {
            const opts = {
                url: "/deleteOne",
                body: { filter: filter }
            }
            return await this.commonPost(opts);
        }
        //删除多个文档
        async deleteMany(filter) {
            const opts = {
                url: "/deleteMany",
                body: { filter: filter }
            }
            return await this.commonPost(opts);
        }
    })(BASE_URL, DATA_SOURCE, DATABASE, COLLECTION, API_KEY);
}
