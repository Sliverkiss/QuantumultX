/*
http://slightly.qx/kill url script-echo-response switchMode.js

hostname=slightly.qx
*/
// 切换运行模式
$configuration
  .sendMessage({
    action: "set_running_mode",
    content: { running_mode: "all_direct" }
  })
  .then(() => {
    console.log("[INFO] 切换到直连模式");
    return $configuration.sendMessage({
      action: "set_running_mode",
      content: { running_mode: "filter" }
    });
  })
  .then(() => {
    console.log("[INFO] 切换到规则模式");
    $notify("网络变化", "打断请求", "🅰 你已重新连入网络");
  })
  .finally(() => {
    // 构造响应
    const okStatus = "HTTP/1.1 200 OK";
    const okHeaders = { "Connection": "Close" };
    const okResponse = {
        status: okStatus,
        headers: okHeaders,
        body: "good"
    };
$done(okResponse);
    $done();
  });
