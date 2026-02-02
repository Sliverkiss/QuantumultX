/*
[http_backend]
https://raw.githubusercontent.com/Sliverkiss/QuantumultX/refs/heads/main/Script/github_private.js#token=填入githubToken, tag=Github访问私库, path=^/填入github用户名，区分大小写/, enabled=true

*/

const { token } = getParams();

(async () => {
    // 构造 Raw URL
    const req = {
        url: `https://raw.githubusercontent.com${$request.path}`,
        method: "GET",
        headers: {
            "Authorization": `token ${GH_TOKEN}`,
        }
    };

    $task.fetch(req).then((response) => {
        console.log(response.body)
        console.log($request.path)
        $done({
            status: `HTTP/1.1 200 OK`,
            headers: {
                "Content-Type": response.headers["Content-Type"] || "text/plain"
            },
            body: response?.body
        });
    })

})();


function getParams() {
    const sourceUrl = new URL($environment.sourcePath);
    const sourceHash = sourceUrl.hash;
    const scriptParams = new URLSearchParams(sourceHash.substring(1));
    return scriptParams;
}
