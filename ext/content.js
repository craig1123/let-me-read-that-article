var domains = {
  "www.businessinsider.com": "tp-modal",
  "www.sltrib.com": "tp-modal",
  "www.nytimes.com": "clearCookies",
  "medium.com": "clearCookies",
  "www.medium.com": "clearCookies",
  "www.cnbc.com": "pico",
  "www.bloomberg.com": "clearLocalStorage",
  "www.sfchronicle.com": "fancyOverlay",
  "heraldcourier.com": "fc-abc",
  "www.orlandosentinel.com": "zephr",
};

var domainMessage = domains[document.location.host];

if (domainMessage) {
  var timesRun = 0;
  var interval = setInterval(function () {
    timesRun += 1;
    if (timesRun === 8) {
      clearInterval(interval);
    } else {
      checkPopup();
    }
  }, 2000);
}

function checkPopup() {
  if (
    domainMessage === "tp-modal" &&
    document.activeElement === document.body
  ) {
    tpModal();
  } else if (domainMessage === "fancyOverlay") {
    fancyOverlay();
  } else if (domainMessage === "fc-abc") {
    fcABC();
  } else if (domainMessage === "clearCookies") {
    clearCookies();
  } else if (domainMessage === "pico") {
    pico();
  } else if (domainMessage === "zephr") {
    zephr();
  } else if (domainMessage === "clearLocalStorage") {
    clearLocalStorage();
  }
}

function tpModal() {
  var tpModalEl = document.getElementsByClassName("tp-modal")[0];
  if (tpModalEl) {
    clearInterval(interval);
    var tpActive = document.getElementsByClassName("tp-backdrop tp-active")[0];
    tpModalEl.parentNode.removeChild(tpModalEl);
    tpActive.parentNode.removeChild(tpActive);
    document.body.classList.remove("tp-modal-open");
    window.scrollTo(0, 0);
  }
}

function fancyOverlay(time) {
  var times = time || 0;
  var fancy = document.getElementsByClassName("fancybox-overlay")[0];
  if (fancy) {
    clearInterval(interval);
    fancy.parentNode.removeChild(fancy);
    document.documentElement.classList.remove("fancybox-margin");
    document.documentElement.classList.remove("fancybox-lock");
    document.documentElement.style.overflow = "auto";
    document.body.style.cssText = "overflow:auto !important";
    window.scrollTo(0, 0);
    if (times < 1) {
      times++;
      var interval = setInterval(function () {
        timesRun += 1;
        if (timesRun === 8) {
          clearInterval(interval);
        } else {
          fancyOverlay(times);
        }
      }, 2000);
    }
  }
}

function fcABC() {
  var fc = document.getElementsByClassName("fc-ab-root")[0];
  if (fc) {
    clearInterval(interval);
    fc.parentNode.removeChild(fc);
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }
}

function pico() {
  var picoContent = document.getElementsByClassName("pico-content")[0];
  if (picoContent) {
    clearInterval(interval);
    var picoOverlay = document.getElementsByClassName("pico-overlay")[0];
    picoOverlay.parentNode.removeChild(picoOverlay);
    picoContent.parentNode.removeChild(picoContent);
    window.scrollTo(0, 0);
  }
}

function zephr() {
  var zephrOverlay = document.getElementById("zephr-overlay");
  if (zephrOverlay) {
    clearInterval(interval);
    zephrOverlay.parentNode.removeChild(zephrOverlay);
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  }
}

function clearCookies() {
  clearInterval(interval);
  var sendDomain = {
    "www.nytimes.com": ".nytimes.com",
    "www.medium.com": ".medium.com",
    "medium.com": ".medium.com",
  };
  chrome.runtime.sendMessage({
    type: domainMessage,
    domain: sendDomain[document.location.host],
  });
}

function clearLocalStorage() {
  clearInterval(interval);
  if (localStorage) {
    localStorage.clear();
  }
}
