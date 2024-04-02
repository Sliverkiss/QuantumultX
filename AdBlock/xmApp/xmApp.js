let url = $request.url;
let Body = JSON.parse($response.body);
if (url.match(/icon/)) {
    Body.data = {
        ...Body.data,
        big_promotion_center: {},
        active_center: {}
    }
} else if(url.match(/index/)){
    let filtData=Body.data.filter(e=>e.hasMore);
    Body.data = filtData;
}
$done({ body: JSON.stringify(Body) })
