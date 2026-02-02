/*
[http_backend]
https://raw.githubusercontent.com/Sliverkiss/QuantumultX/refs/heads/main/Script/github_private.js, tag=Github访问私库, path=^/填入github用户名，区分大小写/, enabled=true

*/

const token = $prefs.valueForKey("sliverkiss_github_token");

(async () => {
    // 构造 Raw URL
    const req = {
        url: `https://raw.githubusercontent.com${$request.path}`,
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,
        }
    };

    $task.fetch(req).then((response) => {
        $done({
            status: `HTTP/1.1 200 OK`,
            headers: {
                "Content-Type": response.headers["Content-Type"] || "text/plain"
            },
            body: response?.body
        });
    })

})();
