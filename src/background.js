console.log('background');

chrome.runtime.onMessage.addListener(function(request) {
    if (request.type == "clearCookies") {
        chrome.cookies.getAll({ domain: request.domain }, function(cookies) {
            for (var i = 0; i < cookies.length; i++) {
                console.log(request.domain + cookies[i].path);
                chrome.cookies.remove({ url: request.domain + cookies[i].path, name: cookies[i].name});
            }
            console.log(cookies);
        });
    }
});
