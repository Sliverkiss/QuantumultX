/*
时间日志 解锁永久会员 by chxm1024
^http:\/\/liujia95\.xyz\/v1\/user\/get_user url script-response-body https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/Crack/timeLog.js
*/

$done({ body: JSON.stringify({ ...JSON.parse($response.body), body: { ...JSON.parse($response.body).body, vipType: 4 } }) });
