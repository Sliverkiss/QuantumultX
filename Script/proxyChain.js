/*
[task_local]
event-interaction https://raw.githubusercontent.com/Sliverkiss/QuantumultX/refs/heads/main/Script/proxyChain.js#confName=配置文件名称&groupName=兜底策略名称, tag=代理链, img-url=network.system, enabled=true
*/
(async () => {
    // 获取节点ip
    const { confName, groupName } = getParams();
    if (!(confName && groupName)) throw new Error("<p>❌ 未传入参数confName或proxyGroup</p>");
    console.log(JSON.stringify($environment))
    console.lgo(JSON.stringify(getParams()))
    console.log(confName);
    console.log(groupName);
    let ip = await getIP();
    if (!ip) throw new Error("<p>❌ 查询落地节点ip失败</p>");

    writeConf(confName, groupName);
    writeSnippet(ip);

    $done({ "title": "Proxy Chain", "htmlMessage": `<font color=#CD5C5C><b>节点</b> ➟ ${ip} </font></p>` })
})().catch(e => {
    console.log(e);
    $done({
        "title": "Proxy Clain",
        "htmlMessage": e,
    })
});


// 查询节点ip
async function getIP() {
    try {
        let { body: data } = await $task.fetch({
            "url": "https://my.ippure.com/v1/info",
            "opts": {
                policy: $environment.params
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
    const sourceUrl = new URL(sourcePath);
    const sourceHash = sourceUrl.hash;
    const scriptParams = new URLSearchParams(sourceHash.substring(1));
    return scriptParams;
}

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
    //替换final
    readContent = readContent.replace(
        'final',
        `final,${$environment.params},via-interface=%TUN%\n`
    )

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
