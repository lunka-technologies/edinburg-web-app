function gui() {
  var N = "bootstrap",
    O = "begin",
    P = "gwt.codesvr.gui=",
    Q = "gwt.codesvr=",
    R = "gui",
    S = "startup",
    T = "DUMMY",
    U = 0,
    V = 1,
    W = "iframe",
    X = "position:absolute; width:0; height:0; border:none; left: -1000px;",
    Y = " top: -1000px;",
    Z = "CSS1Compat",
    $ = "<!doctype html>",
    _ = "",
    ab = "<html><head></head><body></body></html>",
    bb = "undefined",
    cb = "readystatechange",
    db = 10,
    eb = "script",
    fb = "javascript",
    gb = "Failed to load ",
    hb = "moduleStartup",
    ib = "scriptTagAdded",
    jb = "moduleRequested",
    kb = "meta",
    lb = "name",
    mb = "gui::",
    nb = "::",
    ob = "gwt:property",
    pb = "content",
    qb = "=",
    rb = "gwt:onPropertyErrorFn",
    sb = 'Bad handler "',
    tb = '" for "gwt:onPropertyErrorFn"',
    ub = "gwt:onLoadErrorFn",
    vb = '" for "gwt:onLoadErrorFn"',
    wb = "#",
    xb = "?",
    yb = "/",
    zb = "img",
    Ab = "clear.cache.gif",
    Bb = "baseUrl",
    Cb = "gui.nocache.js",
    Db = "base",
    Eb = "//",
    Fb = "onLoad",
    Gb = "default",
    Hb = "user.agent",
    Ib = "webkit",
    Jb = "safari",
    Kb = "msie",
    Lb = 11,
    Mb = "ie10",
    Nb = 9,
    Ob = "ie9",
    Pb = 8,
    Qb = "ie8",
    Rb = "gecko",
    Sb = "gecko1_8",
    Tb = 2,
    Ub = 3,
    Vb = 4,
    Wb = "selectingPermutation",
    Xb = "gui.devmode.js",
    Yb = "2903C6CC372F68745A92A6B11CD5051A",
    Zb = ":1",
    $b = ":2",
    _b = "foobar",
    ac = ":3",
    bc = ":4",
    cc = ":5",
    dc = ":",
    ec = ".cache.js",
    fc = "loadExternalRefs",
    gc = "end",
    hc = "http:",
    ic = "file:",
    jc = "_gwt_dummy_",
    kc = "__gwtDevModeHook:gui",
    lc = "Ignoring non-whitelisted Dev Mode URL: ",
    mc = ":moduleBase",
    nc = "head";
  var n = window;
  var o = document;
  q(N, O);
  function p() {
    var a = n.location.search;
    return a.indexOf(P) != -1 || a.indexOf(Q) != -1;
  }
  function q(a, b) {
    if (n.__gwtStatsEvent) {
      n.__gwtStatsEvent({
        moduleName: R,
        sessionId: n.__gwtStatsSessionId,
        subSystem: S,
        evtGroup: a,
        millis: new Date().getTime(),
        type: b,
      });
    }
  }
  gui.__sendStats = q;
  gui.__moduleName = R;
  gui.__errFn = null;
  gui.__moduleBase = T;
  gui.__softPermutationId = U;
  gui.__computePropValue = null;
  gui.__getPropMap = null;
  gui.__installRunAsyncCode = function () {};
  gui.__gwtStartLoadingFragment = function () {
    return null;
  };
  gui.__gwt_isKnownPropertyValue = function () {
    return false;
  };
  gui.__gwt_getMetaProperty = function () {
    return null;
  };
  var r = null;
  var s = (n.__gwt_activeModules = n.__gwt_activeModules || {});
  s[R] = { moduleName: R };
  gui.__moduleStartupDone = function (e) {
    var f = s[R].bindings;
    s[R].bindings = function () {
      var a = f ? f() : {};
      var b = e[gui.__softPermutationId];
      for (var c = U; c < b.length; c++) {
        var d = b[c];
        a[d[U]] = d[V];
      }
      return a;
    };
  };
  var t;
  function u() {
    v();
    return t;
  }
  function v() {
    if (t) {
      return;
    }
    var a = o.createElement(W);
    a.id = R;
    a.style.cssText = X + Y;
    a.tabIndex = -1;
    o.body.appendChild(a);
    t = a.contentWindow.document;
    t.open();
    var b = document.compatMode == Z ? $ : _;
    t.write(b + ab);
    t.close();
  }
  function w(f) {
    function g(a) {
      function b() {
        if (typeof o.readyState == bb) {
          return typeof o.body != bb && o.body != null;
        }
        return /loaded|complete/.test(o.readyState);
      }
      var c = b();
      if (c) {
        a();
        return;
      }
      function d() {
        if (!c) {
          if (!b()) {
            return;
          }
          c = true;
          a();
          if (o.removeEventListener) {
            o.removeEventListener(cb, d, false);
          }
          if (e) {
            clearInterval(e);
          }
        }
      }
      if (o.addEventListener) {
        o.addEventListener(cb, d, false);
      }
      var e = setInterval(function () {
        d();
      }, db);
    }
    function h(a) {
      var b = u();
      var c = b.body;
      var d = b.createElement(eb);
      d.language = fb;
      d.src = a;
      if (gui.__errFn) {
        d.onerror = function () {
          gui.__errFn(R, new Error(gb + a));
        };
      }
      c.appendChild(d);
      q(hb, ib);
    }
    q(hb, jb);
    g(function () {
      h(f);
    });
  }
  gui.__startLoadingFragment = function (a) {
    return C(a);
  };
  gui.__installRunAsyncCode = function (a) {
    var b = u();
    var c = b.body;
    var d = b.createElement(eb);
    d.language = fb;
    d.text = a;
    c.appendChild(d);
    c.removeChild(d);
  };
  function A() {
    var c = {};
    var d;
    var e;
    var f = o.getElementsByTagName(kb);
    for (var g = U, h = f.length; g < h; ++g) {
      var i = f[g],
        j = i.getAttribute(lb),
        k;
      if (j) {
        j = j.replace(mb, _);
        if (j.indexOf(nb) >= U) {
          continue;
        }
        if (j == ob) {
          k = i.getAttribute(pb);
          if (k) {
            var l,
              m = k.indexOf(qb);
            if (m >= U) {
              j = k.substring(U, m);
              l = k.substring(m + V);
            } else {
              j = k;
              l = _;
            }
            c[j] = l;
          }
        } else if (j == rb) {
          k = i.getAttribute(pb);
          if (k) {
            try {
              d = eval(k);
            } catch (a) {
              alert(sb + k + tb);
            }
          }
        } else if (j == ub) {
          k = i.getAttribute(pb);
          if (k) {
            try {
              e = eval(k);
            } catch (a) {
              alert(sb + k + vb);
            }
          }
        }
      }
    }
    __gwt_getMetaProperty = function (a) {
      var b = c[a];
      return b == null ? null : b;
    };
    r = d;
    gui.__errFn = e;
  }
  function B() {
    function e(a) {
      var b = a.lastIndexOf(wb);
      if (b == -1) {
        b = a.length;
      }
      var c = a.indexOf(xb);
      if (c == -1) {
        c = a.length;
      }
      var d = a.lastIndexOf(yb, Math.min(c, b));
      return d >= U ? a.substring(U, d + V) : _;
    }
    function f(a) {
      if (a.match(/^\w+:\/\//)) {
      } else {
        var b = o.createElement(zb);
        b.src = a + Ab;
        a = e(b.src);
      }
      return a;
    }
    function g() {
      var a = __gwt_getMetaProperty(Bb);
      if (a != null) {
        return a;
      }
      return _;
    }
    function h() {
      var a = o.getElementsByTagName(eb);
      for (var b = U; b < a.length; ++b) {
        if (a[b].src.indexOf(Cb) != -1) {
          return e(a[b].src);
        }
      }
      return _;
    }
    function i() {
      var a = o.getElementsByTagName(Db);
      if (a.length > U) {
        return a[a.length - V].href;
      }
      return _;
    }
    function j() {
      var a = o.location;
      return a.href == a.protocol + Eb + a.host + a.pathname + a.search + a.hash;
    }
    var k = g();
    if (k == _) {
      k = h();
    }
    if (k == _) {
      k = i();
    }
    if (k == _ && j()) {
      k = e(o.location.href);
    }
    k = f(k);
    return k;
  }
  function C(a) {
    if (a.match(/^\//)) {
      return a;
    }
    if (a.match(/^[a-zA-Z]+:\/\//)) {
      return a;
    }
    return gui.__moduleBase + a;
  }
  function D() {
    var f = [];
    var g = U;
    function h(a, b) {
      var c = f;
      for (var d = U, e = a.length - V; d < e; ++d) {
        c = c[a[d]] || (c[a[d]] = []);
      }
      c[a[e]] = b;
    }
    var i = [];
    var j = [];
    function k(a) {
      var b = j[a](),
        c = i[a];
      if (b in c) {
        return b;
      }
      var d = [];
      for (var e in c) {
        d[c[e]] = e;
      }
      if (r) {
        r(a, d, b);
      }
      throw null;
    }
    j[Fb] = function () {
      if (!n.marvin) {
        n.marvin = {
          onLoadArray: [],
          onLoad: function () {
            if (!n.marvin.onLoadArray) {
              return;
            }
            for (var a = U; a < n.marvin.onLoadArray.length; a++) n.marvin.onLoadArray[a]();
            delete n.marvin.onLoadArray;
          },
          onReady: function (a) {
            n.marvin.onLoadArray ? n.marvin.onLoadArray.push(a) : a();
          },
        };
      }
      return Gb;
    };
    i[Fb] = { default: U, foobar: V };
    j[Hb] = function () {
      var a = navigator.userAgent.toLowerCase();
      var b = o.documentMode;
      if (
        (function () {
          return a.indexOf(Ib) != -1;
        })()
      )
        return Jb;
      if (
        (function () {
          return a.indexOf(Kb) != -1 && b >= db && b < Lb;
        })()
      )
        return Mb;
      if (
        (function () {
          return a.indexOf(Kb) != -1 && b >= Nb && b < Lb;
        })()
      )
        return Ob;
      if (
        (function () {
          return a.indexOf(Kb) != -1 && b >= Pb && b < Lb;
        })()
      )
        return Qb;
      if (
        (function () {
          return a.indexOf(Rb) != -1 || b >= Lb;
        })()
      )
        return Sb;
      return Jb;
    };
    i[Hb] = { gecko1_8: U, ie10: V, ie8: Tb, ie9: Ub, safari: Vb };
    __gwt_isKnownPropertyValue = function (a, b) {
      return b in i[a];
    };
    gui.__getPropMap = function () {
      var a = {};
      for (var b in i) {
        if (i.hasOwnProperty(b)) {
          a[b] = k(b);
        }
      }
      return a;
    };
    gui.__computePropValue = k;
    n.__gwt_activeModules[R].bindings = gui.__getPropMap;
    q(N, Wb);
    if (p()) {
      return C(Xb);
    }
    var l;
    try {
      h([Gb, Sb], Yb);
      h([Gb, Mb], Yb + Zb);
      h([Gb, Jb], Yb + $b);
      h([_b, Sb], Yb + ac);
      h([_b, Mb], Yb + bc);
      h([_b, Jb], Yb + cc);
      l = f[k(Fb)][k(Hb)];
      var m = l.indexOf(dc);
      if (m != -1) {
        g = parseInt(l.substring(m + V), db);
        l = l.substring(U, m);
      }
    } catch (a) {}
    gui.__softPermutationId = g;
    return C(l + ec);
  }
  function F() {
    if (!n.__gwt_stylesLoaded) {
      n.__gwt_stylesLoaded = {};
    }
    q(fc, O);
    q(fc, gc);
  }
  A();
  gui.__moduleBase = B();
  s[R].moduleBase = gui.__moduleBase;
  var G = D();
  if (n) {
    var H = !!(n.location.protocol == hc || n.location.protocol == ic);
    n.__gwt_activeModules[R].canRedirect = H;
    function I() {
      var b = jc;
      try {
        n.sessionStorage.setItem(b, b);
        n.sessionStorage.removeItem(b);
        return true;
      } catch (a) {
        return false;
      }
    }
    if (H && I()) {
      var J = kc;
      var K = n.sessionStorage[J];
      if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(K)) {
        if (K && window.console && console.log) {
          console.log(lc + K);
        }
        K = _;
      }
      if (K && !n[J]) {
        n[J] = true;
        n[J + mc] = B();
        var L = o.createElement(eb);
        L.src = K;
        var M = o.getElementsByTagName(nc)[U];
        M.insertBefore(L, M.firstElementChild || M.children[U]);
        return false;
      }
    }
  }
  F();
  q(N, gc);
  w(G);
  return true;
}
gui.succeeded = gui();
