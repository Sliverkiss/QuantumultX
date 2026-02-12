/*
[task_local]
event-interaction https://raw.githubusercontent.com/Sliverkiss/QuantumultX/refs/heads/main/Script/proxyChain.js#confName=配置文件名称, tag=代理链, img-url=network.system, enabled=true

参数:
- confName: 配置文件名称
- groupName: 策略组名称
- NodeName: 节点名称
*/
(async () => {
    // 获取节点ip
    const { confName, groupName = "direct", NodeName } = getParams();

    if (!confName) throw new Error(`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin>❌ 未传入参数confName或proxyGroup</p>`);

    let ip = await getIP(NodeName);
    if (!ip) throw new Error(`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin>❌ 查询落地节点ip失败</p>`);

    let writeResult = writeConf(confName, groupName);
    if (!writeResult) {
        writeSnippet(ip);
    }

    $done({ "title": "Proxy Chain", "htmlMessage": `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin"><font color=#CD5C5C><b>节点</b> ➟ ${ip} </font></p>` })
})().catch(e => {
    console.log(e);
    $done({
        "title": "Proxy Clain",
        "htmlMessage": e,
    })
});


// 查询节点ip
async function getIP(NodeName) {
    try {
        let { body: data } = await $task.fetch({
            "url": "https://my.ippure.com/v1/info",
            "opts": {
                policy: $environment.params || NodeName
            },
            "timeout": 4000
        })
        const { ip } = JSON.parse(data) ?? {};
        return ip;
    } catch (e) {
        console.log(e);
    }
}

// 读取环境变量
function getParams() {
    const sourcePath = $environment.sourcePath;
    const [, form] = sourcePath.split("#");
    const scriptParams = UrlToJson(form);
    return scriptParams;
}

function UrlToJson(data) { let tempArr = data.split(`&`); let obj = {}; for (let item of tempArr) { let itemInfo = item.split(`=`); let _key = itemInfo[0]; let _value = decodeURIComponent(itemInfo[1]); obj[`${_key}`] = _value }; return obj };

// 写入配置文件
function writeConf(confPath, groupName) {
    let confFullPath = `../Profiles/${confPath}.conf`
    let readUint8Array = $iCloud.readFile(confFullPath);

    if (readUint8Array === undefined) {
        console.log(`❌ 读取[${confPath}]配置文件失败`);
        return true;
    }

    console.log(`✅ 读取[${confPath}]配置文件成功`);
    let textDecoder = new TextDecoder();
    let readContent = textDecoder.decode(readUint8Array);

    // 判断分流文件是否存在
    if (/tag\=Proxy Clain \@filter/.test(readContent)) {
        console.log(`⚠️ 该filter重写已存在,跳过[${confPath}]配置文件`);
    } else {
        readContent = readContent.replace(
            '[filter_remote]',
            `[filter_remote]\nproxy_chain.snippet, tag=Proxy Clain @filter, force-policy=${groupName}, update-interval=172800, opt-parser=true, inserted-resource=true, enabled=true\n`
        )
    }

    // 写入原来配置
    let textEncoder = new TextEncoder();
    let writeUint8Array = textEncoder.encode(readContent);
    if ($iCloud.writeFile(writeUint8Array, confFullPath)) {
        console.log(`✅ 刷新[${confPath}]配置文件成功`);
    } else {
        console.log(`❌ 刷新[${confPath}]配置文件失败`);
        return true;
    }
}

// 写入分流资源
function writeSnippet(ip) {

    let snippetPath = "../Profiles/proxy_chain.snippet";

    let content = `ip-cidr, ${ip}/32`
    console.log(`分流规则:${content}`);

    let textEecoder = new TextEncoder();
    let writeUint8Array = textEecoder.encode(content);
    if ($iCloud.writeFile(writeUint8Array, snippetPath)) {
        console.log(`✅ 写入proxy_chain.snippet文件成功`);
    } else {
        console.log(`❌ proxy_chain.snippet文件失败`);
    }
    return;
}
