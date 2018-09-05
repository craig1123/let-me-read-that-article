var on = addEventListener;
var $ = function(q) {
    return document.querySelector(q)
};
var $$ = function(q) {
    return document.querySelectorAll(q)
};
var $body = document.body;
var $inner = $('.inner');
var client = (function() {
    var o = {
        browser: 'other',
        browserVersion: 0,
        os: 'other',
        osVersion: 0,
        canUse: null
    }, ua = navigator.userAgent, a, i;
    a = [['firefox', /Firefox\/([0-9\.]+)/], ['edge', /Edge\/([0-9\.]+)/], ['safari', /Version\/([0-9\.]+).+Safari/], ['chrome', /Chrome\/([0-9\.]+)/], ['ie', /Trident\/.+rv:([0-9]+)/]];
    for (i = 0; i < a.length; i++) {
        if (ua.match(a[i][1])) {
            o.browser = a[i][0];
            o.browserVersion = parseFloat(RegExp.$1);
            break;
        }
    }
    a = [['ios', /([0-9_]+) like Mac OS X/, function(v) {
        return v.replace('_', '.').replace('_', '');
    }
    ], ['ios', /CPU like Mac OS X/, function(v) {
        return 0
    }
    ], ['android', /Android ([0-9\.]+)/, null], ['mac', /Macintosh.+Mac OS X ([0-9_]+)/, function(v) {
        return v.replace('_', '.').replace('_', '');
    }
    ], ['windows', /Windows NT ([0-9\.]+)/, null]];
    for (i = 0; i < a.length; i++) {
        if (ua.match(a[i][1])) {
            o.os = a[i][0];
            o.osVersion = parseFloat(a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1);
            break;
        }
    }
    var _canUse = document.createElement('div');
    o.canUse = function(p) {
        var e = _canUse.style
          , up = p.charAt(0).toUpperCase() + p.slice(1);
        return (p in e || ('Moz' + up)in e || ('Webkit' + up)in e || ('O' + up)in e || ('ms' + up)in e);
    }
    ;
    return o;
}());

var trigger = function(t) {
    if (client.browser == 'ie') {
        var e = document.createEvent('Event');
        e.initEvent(t, false, true);
        dispatchEvent(e);
    } else
        dispatchEvent(new Event(t));
};
on('load', function() {
    setTimeout(function() {
        $body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');
        setTimeout(function() {
            $body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
        }, 1250);
    }, 100);
});

var rule;
var style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
var sheet = style.sheet;

if (client.os == 'android') {
    (function() {
        sheet.insertRule('body::after { }', 0);
        rule = sheet.cssRules[0];
        var f = function() {
            rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
        };
        on('load', f);
        on('orientationchange', f);
        on('touchmove', f);
    }
    )();
} else if (client.os == 'ios') {
    (function() {
        sheet.insertRule('body::after { }', 0);
        rule = sheet.cssRules[0];
        rule.style.cssText = '-webkit-transform: scale(1.0)';
    }
    )();
    (function() {
        sheet.insertRule('body.ios-focus-fix::before { }', 0);
        rule = sheet.cssRules[0];
        rule.style.cssText = 'height: calc(100% + 60px)';
        on('focus', function(event) {
            $body.classList.add('ios-focus-fix');
        }, true);
        on('blur', function(event) {
            $body.classList.remove('ios-focus-fix');
        }, true);
    }
    )();
} else if (client.browser == 'ie') {
    (function() {
        var t, f;
        f = function() {
            var mh, h, s, xx, x, i;
            x = $('#wrapper');
            x.style.height = 'auto';
            if (x.scrollHeight <= innerHeight)
                x.style.height = '100vh';
            xx = $$('.container.full');
            for (i = 0; i < xx.length; i++) {
                x = xx[i];
                s = getComputedStyle(x);
                x.style.minHeight = '';
                x.style.height = '';
                mh = s.minHeight;
                x.style.minHeight = 0;
                x.style.height = '';
                h = s.height;
                if (mh == 0)
                    continue;
                x.style.height = (h > mh ? 'auto' : mh);
            }
        }
        ;
        (f)();
        on('resize', function() {
            clearTimeout(t);
            t = setTimeout(f, 250);
        });
        on('load', f);
    }
    )();
}
if (!client.canUse('object-fit')) {
    var xx = $$('.image[data-position]'), x, c, i, src;
    for (i = 0; i < xx.length; i++) {
        x = xx[i];
        c = x.firstChild;
        if (c.tagName != 'IMG')
            c = c.firstChild;
        if (c.parentNode.classList.contains('deferred')) {
            c.parentNode.classList.remove('deferred');
            src = c.getAttribute('data-src');
            c.removeAttribute('data-src');
        } else
            src = c.getAttribute('src');
        c.style['backgroundImage'] = 'url(\'' + src + '\')';
        c.style['backgroundSize'] = 'cover';
        c.style['backgroundPosition'] = x.dataset.position;
        c.style['backgroundRepeat'] = 'no-repeat';
        c.src = 'data:image/svg+xml;charset=utf8,' + escape('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"></svg>');
    }
}
(function() {
    var items = $$('.deferred'), f;
    if (!('forEach'in NodeList.prototype))
        NodeList.prototype.forEach = Array.prototype.forEach;
    items.forEach(function(p) {
        var i = p.firstChild;
        p.style.backgroundImage = 'url(' + i.src + ')';
        p.style.backgroundSize = '100% 100%';
        p.style.backgroundPosition = 'top left';
        p.style.backgroundRepeat = 'no-repeat';
        i.style.opacity = 0;
        i.style.transition = 'opacity 0.375s ease-in-out';
        i.addEventListener('load', function(event) {
            if (i.dataset.src !== 'done')
                return;
            if (Date.now() - i._startLoad < 375) {
                p.classList.remove('loading');
                p.style.backgroundImage = 'none';
                i.style.transition = '';
                i.style.opacity = 1;
            } else {
                p.classList.remove('loading');
                i.style.opacity = 1;
                setTimeout(function() {
                    p.style.backgroundImage = 'none';
                }, 375);
            }
        });
    });
    f = function() {
        var height = document.documentElement.clientHeight
          , top = (client.os == 'ios' ? document.body.scrollTop : document.documentElement.scrollTop)
          , bottom = top + height;
        items.forEach(function(p) {
            var i = p.firstChild;
            if (i.offsetParent === null)
                return true;
            if (i.dataset.src === 'done')
                return true;
            var x = i.getBoundingClientRect(), imageTop = top + Math.floor(x.top) - height, imageBottom = top + Math.ceil(x.bottom) + height, src;
            if (imageTop <= bottom && imageBottom >= top) {
                src = i.dataset.src;
                i.dataset.src = 'done';
                p.classList.add('loading');
                i._startLoad = Date.now();
                i.src = src;
            }
        });
    };
    on('load', f);
    on('resize', f);
    on('scroll', f);
}
)();
