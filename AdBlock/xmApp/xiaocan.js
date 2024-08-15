let headers = JSON.parse($request.headers);
if (headers?.methodname?.match(/GetBannerList/)) {
    $done(JSON.stringify({}));
}
$done({ body: $response.body });
