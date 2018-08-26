var domains = {
    "www.businessinsider.com": 'tp-modal',
    "www.sltrib.com": 'tp-modal',
    "www.nytimes.com": 'clearCookies',
};
var domainMessage = domains[document.location.host];
if (domainMessage) {
    setTimeout(checkPopup, 3000);
}

function checkPopup() {
    if (domainMessage === 'tp-modal' && document.activeElement === document.body) {
        var tpModal = document.getElementsByClassName('tp-modal')[0];
        if (tpModal) {
            document.getElementsByClassName('tp-modal')[0].classList.remove('tp-modal');
            document.getElementsByClassName('tp-backdrop tp-active')[0].classList.remove('tp-active');
            document.body.classList.remove('tp-modal-open');
        }
    } else if (domainMessage === 'clearCookies') {
        var sendDomain = {
            "www.nytimes.com": ".nytimes.com",
        };
        chrome.runtime.sendMessage({ type: domainMessage, domain: sendDomain[document.location.host] });
    }
}
