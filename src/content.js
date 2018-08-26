var domains = {
    "www.businessinsider.com": 'tp-modal',
    "www.quora.com": '',
    "www.sltrib.com": 'tp-modal',
    "www.nytimes.com": 'clearCookies',
};

setTimeout(checkPopup, 3000);

function checkPopup() {
    var domain = domains[document.location.host];
    if (domain === 'tp-modal' && document.activeElement === document.body) {
        var tpModal = document.getElementsByClassName('tp-modal')[0];
        if (tpModal) {
            document.getElementsByClassName('tp-modal')[0].classList.remove('tp-modal');
            document.getElementsByClassName('tp-backdrop tp-active')[0].classList.remove('tp-active');
            document.body.classList.remove('tp-modal-open');
        }
    } else if (domain === clearCookies) {
        chrome.cookies.getAll({ domain: domain }, function(cookies) {
            console.log(cookies);
            // for (var i = 0; i < cookies.length; i++) {
            //     chrome.cookies.remove({ url: domain + cookies[i].path, name: cookies[i].name});
            // }
        });
    }
}
