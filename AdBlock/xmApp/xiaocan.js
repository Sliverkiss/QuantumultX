let headers = JSON.parse($request.headers);
if (headers?.methodname?.match(/GetBannerList/)) {
    $done({});
}
$done();
