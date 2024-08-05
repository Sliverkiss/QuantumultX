let body = JSON.parse($response.body);

body.data.data = body.data.data.filter(e => e.key !== 'index_n');

let indexItem = body.data.data.find(e => e.key === 'index');
if (indexItem) {
    let moduleList = indexItem.value.index.moduleList;
    indexItem.value.index.moduleList = [moduleList[0], moduleList[moduleList.length - 1]];
}

$done(JSON.stringify(body));
