/*
温尼伯站去广告 by Sliverkiss

^https:\/\/vue3-api\.zhixiny\.cn\/v1\/initui\?key=index url script-response-body https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/AdBlock/xmApp/wnbz.js

hostname = vue3-api.zhixiny.cn
*/

let body = JSON.parse($response.body);

body.data.data = body.data.data.filter(e => e.key !== 'index_n');

let indexItem = body.data.data.find(e => e.key === 'index');
if (indexItem) {
    let moduleList = indexItem.value.index.moduleList;
    indexItem.value.index.moduleList = [moduleList[0], moduleList[moduleList.length - 1]];
}

$done(JSON.stringify(body));
