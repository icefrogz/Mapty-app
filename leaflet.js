/* @preserve
 * Leaflet 1.9.2+main.eee1a4a, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2024 Volodymyr Agafonkin, (c) 2010-2011 CloudMade
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(
        ((t =
          'undefined' != typeof globalThis ? globalThis : t || self).leaflet =
          {})
      );
})(this, function (t) {
  'use strict';
  var I = '1.9.2+main.eee1a4ae';
  function h(t, ...e) {
    let i, o, s;
    for (i = 0, o = e.length; i < o; i++)
      for (const n in (s = e[i])) t[n] = s[n];
    return t;
  }
  let R = 0;
  function a(t) {
    return '_leaflet_id' in t || (t._leaflet_id = ++R), t._leaflet_id;
  }
  function j(e, i, o) {
    let s, n;
    function r() {
      (s = !1), n && (t.apply(o, n), (n = !1));
    }
    function t(...t) {
      s ? (n = t) : (e.apply(o, t), setTimeout(r, i), (s = !0));
    }
    return t;
  }
  function D(t, e, i) {
    var o = e[1],
      e = e[0],
      s = o - e;
    return t === o && i ? t : ((((t - e) % s) + s) % s) + e;
  }
  function r() {
    return !1;
  }
  function i(t, e) {
    return !1 === e
      ? t
      : ((e = Math.pow(10, void 0 === e ? 6 : e)), Math.round(t * e) / e);
  }
  function l(t) {
    return t.trim().split(/\s+/);
  }
  function n(t, e) {
    Object.hasOwn(t, 'options') ||
      (t.options = t.options ? Object.create(t.options) : {});
    for (const i in e) Object.hasOwn(e, i) && (t.options[i] = e[i]);
    return t.options;
  }
  function N(t, e, i) {
    var o = [];
    for (const s in t)
      Object.hasOwn(t, s) &&
        o.push(
          encodeURIComponent(i ? s.toUpperCase() : s) +
            '=' +
            encodeURIComponent(t[s])
        );
    return (e && e.includes('?') ? '&' : '?') + o.join('&');
  }
  const W = /\{ *([\w_ -]+) *\}/g;
  function H(t, o) {
    return t.replace(W, (t, e) => {
      let i = o[e];
      if (void 0 === i) throw new Error('No value provided for variable ' + t);
      return (i = 'function' == typeof i ? i(o) : i);
    });
  }
  const F = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    U = window.requestAnimationFrame,
    V = window.cancelAnimationFrame;
  function x(t, e) {
    return U.call(window, t.bind(e));
  }
  function d(t) {
    V.call(window, t);
  }
  var G = {
    __proto__: null,
    cancelAnimFrame: d,
    emptyImageUrl: F,
    extend: h,
    falseFn: r,
    formatNum: i,
    getParamString: N,
    get lastId() {
      return R;
    },
    requestAnimFrame: x,
    setOptions: n,
    splitWords: l,
    stamp: a,
    template: H,
    throttle: j,
    wrapNum: D,
  };
  class q {
    static extend({ statics: t, includes: e, ...i }) {
      var o = class extends this {},
        s = (Object.setPrototypeOf(o, this), this.prototype),
        n = o.prototype;
      return (
        t && h(o, t),
        e && h.apply(null, [n].concat(e)),
        h(n, i),
        n.options &&
          ((n.options = s.options ? Object.create(s.options) : {}),
          h(n.options, i.options)),
        (n._initHooks = []),
        o
      );
    }
    static include(t) {
      var e = this.prototype.options;
      return (
        h(this.prototype, t),
        t.options &&
          ((this.prototype.options = e), this.mergeOptions(t.options)),
        this
      );
    }
    static mergeOptions(t) {
      return h(this.prototype.options, t), this;
    }
    static addInitHook(t, ...e) {
      var i =
        'function' == typeof t
          ? t
          : function () {
              this[t].apply(this, e);
            };
      return (
        (this.prototype._initHooks = this.prototype._initHooks || []),
        this.prototype._initHooks.push(i),
        this
      );
    }
    _initHooksCalled = !1;
    constructor(...t) {
      n(this), this.initialize && this.initialize(...t), this.callInitHooks();
    }
    callInitHooks() {
      if (!this._initHooksCalled) {
        var e = [];
        let t = this;
        for (; null !== (t = Object.getPrototypeOf(t)); ) e.push(t);
        e.reverse();
        for (const i of e) for (const o of i._initHooks ?? []) o.call(this);
        this._initHooksCalled = !0;
      }
    }
  }
  var e = {
      on(i, o, s) {
        if ('object' == typeof i)
          for (const t in i) Object.hasOwn(i, t) && this._on(t, i[t], o);
        else
          for (let t = 0, e = (i = l(i)).length; t < e; t++)
            this._on(i[t], o, s);
        return this;
      },
      off(i, o, s) {
        if (arguments.length)
          if ('object' == typeof i)
            for (const t in i) Object.hasOwn(i, t) && this._off(t, i[t], o);
          else {
            i = l(i);
            var n = 1 === arguments.length;
            for (let t = 0, e = i.length; t < e; t++)
              n ? this._off(i[t]) : this._off(i[t], o, s);
          }
        else delete this._events;
        return this;
      },
      _on(t, e, i, o) {
        'function' != typeof e
          ? console.warn('wrong listener type: ' + typeof e)
          : !1 === this._listens(t, e, i) &&
            ((e = { fn: e, ctx: (i = i === this ? void 0 : i) }),
            o && (e.once = !0),
            (this._events = this._events || {}),
            (this._events[t] = this._events[t] || []),
            this._events[t].push(e));
      },
      _off(t, e, i) {
        let o, s, n;
        if (this._events && (o = this._events[t]))
          if (1 === arguments.length) {
            if (this._firingCount)
              for (s = 0, n = o.length; s < n; s++) o[s].fn = r;
            delete this._events[t];
          } else
            'function' != typeof e
              ? console.warn('wrong listener type: ' + typeof e)
              : !1 !== (e = this._listens(t, e, i)) &&
                ((i = o[e]),
                this._firingCount &&
                  ((i.fn = r), (this._events[t] = o = o.slice())),
                o.splice(e, 1));
      },
      fire(i, t, e) {
        if (this.listens(i, e)) {
          var o = h({}, t, {
            type: i,
            target: this,
            sourceTarget: (t && t.sourceTarget) || this,
          });
          if (this._events) {
            var s = this._events[i];
            if (s) {
              this._firingCount = this._firingCount + 1 || 1;
              for (let t = 0, e = s.length; t < e; t++) {
                var n = s[t],
                  r = n.fn;
                n.once && this.off(i, r, n.ctx), r.call(n.ctx || this, o);
              }
              this._firingCount--;
            }
          }
          e && this._propagateEvent(o);
        }
        return this;
      },
      listens(t, e, i, o) {
        'string' != typeof t && console.warn('"string" type argument expected');
        let s = e;
        'function' != typeof e && ((o = !!e), (i = s = void 0));
        var n = this._events && this._events[t];
        if (n && n.length && !1 !== this._listens(t, s, i)) return !0;
        if (o)
          for (const r in this._eventParents)
            if (this._eventParents[r].listens(t, e, i, o)) return !0;
        return !1;
      },
      _listens(t, i, o) {
        if (this._events) {
          var s = this._events[t] || [];
          if (!i) return !!s.length;
          o === this && (o = void 0);
          for (let t = 0, e = s.length; t < e; t++)
            if (s[t].fn === i && s[t].ctx === o) return t;
        }
        return !1;
      },
      once(i, o, s) {
        if ('object' == typeof i)
          for (const t in i) Object.hasOwn(i, t) && this._on(t, i[t], o, !0);
        else
          for (let t = 0, e = (i = l(i)).length; t < e; t++)
            this._on(i[t], o, s, !0);
        return this;
      },
      addEventParent(t) {
        return (
          (this._eventParents = this._eventParents || {}),
          (this._eventParents[a(t)] = t),
          this
        );
      },
      removeEventParent(t) {
        return this._eventParents && delete this._eventParents[a(t)], this;
      },
      _propagateEvent(t) {
        for (const e in this._eventParents)
          Object.hasOwn(this._eventParents, e) &&
            this._eventParents[e].fire(
              t.type,
              h({ layer: t.target, propagatedFrom: t.target }, t),
              !0
            );
      },
    },
    e =
      ((e.addEventListener = e.on),
      (e.removeEventListener = e.clearAllEventListeners = e.off),
      (e.addOneTimeEventListener = e.once),
      (e.fireEvent = e.fire),
      (e.hasEventListeners = e.listens),
      q.extend(e));
  function c(t, e, i) {
    (this.x = i ? Math.round(t) : t), (this.y = i ? Math.round(e) : e);
  }
  const K =
    Math.trunc ||
    function (t) {
      return 0 < t ? Math.floor(t) : Math.ceil(t);
    };
  function g(t, e, i) {
    return t instanceof c
      ? t
      : Array.isArray(t)
      ? new c(t[0], t[1])
      : null == t
      ? t
      : 'object' == typeof t && 'x' in t && 'y' in t
      ? new c(t.x, t.y)
      : new c(t, e, i);
  }
  function m(t, e) {
    if (t) {
      var i = e ? [t, e] : t;
      for (let t = 0, e = i.length; t < e; t++) this.extend(i[t]);
    }
  }
  function _(t, e) {
    return !t || t instanceof m ? t : new m(t, e);
  }
  function p(t, e) {
    if (t) {
      var i = e ? [t, e] : t;
      for (let t = 0, e = i.length; t < e; t++) this.extend(i[t]);
    }
  }
  function f(t, e) {
    return t instanceof p ? t : new p(t, e);
  }
  function u(t, e, i) {
    if (isNaN(t) || isNaN(e))
      throw new Error(`Invalid LatLng object: (${t}, ${e})`);
    (this.lat = +t), (this.lng = +e), void 0 !== i && (this.alt = +i);
  }
  function w(t, e, i) {
    return t instanceof u
      ? t
      : Array.isArray(t) && 'object' != typeof t[0]
      ? 3 === t.length
        ? new u(t[0], t[1], t[2])
        : 2 === t.length
        ? new u(t[0], t[1])
        : null
      : null == t
      ? t
      : 'object' == typeof t && 'lat' in t
      ? new u(t.lat, 'lng' in t ? t.lng : t.lon, t.alt)
      : void 0 === e
      ? null
      : new u(t, e, i);
  }
  (c.prototype = {
    clone() {
      return new c(this.x, this.y);
    },
    add(t) {
      return this.clone()._add(g(t));
    },
    _add(t) {
      return (this.x += t.x), (this.y += t.y), this;
    },
    subtract(t) {
      return this.clone()._subtract(g(t));
    },
    _subtract(t) {
      return (this.x -= t.x), (this.y -= t.y), this;
    },
    divideBy(t) {
      return this.clone()._divideBy(t);
    },
    _divideBy(t) {
      return (this.x /= t), (this.y /= t), this;
    },
    multiplyBy(t) {
      return this.clone()._multiplyBy(t);
    },
    _multiplyBy(t) {
      return (this.x *= t), (this.y *= t), this;
    },
    scaleBy(t) {
      return new c(this.x * t.x, this.y * t.y);
    },
    unscaleBy(t) {
      return new c(this.x / t.x, this.y / t.y);
    },
    round() {
      return this.clone()._round();
    },
    _round() {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    },
    floor() {
      return this.clone()._floor();
    },
    _floor() {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
    },
    ceil() {
      return this.clone()._ceil();
    },
    _ceil() {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
    },
    trunc() {
      return this.clone()._trunc();
    },
    _trunc() {
      return (this.x = K(this.x)), (this.y = K(this.y)), this;
    },
    distanceTo(t) {
      var e = (t = g(t)).x - this.x,
        t = t.y - this.y;
      return Math.sqrt(e * e + t * t);
    },
    equals(t) {
      return (t = g(t)).x === this.x && t.y === this.y;
    },
    contains(t) {
      return (
        (t = g(t)),
        Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
      );
    },
    toString() {
      return `Point(${i(this.x)}, ${i(this.y)})`;
    },
  }),
    (m.prototype = {
      extend(t) {
        let e, i;
        if (t) {
          if (t instanceof c || 'number' == typeof t[0] || 'x' in t)
            e = i = g(t);
          else if (((t = _(t)), (e = t.min), (i = t.max), !e || !i))
            return this;
          this.min || this.max
            ? ((this.min.x = Math.min(e.x, this.min.x)),
              (this.max.x = Math.max(i.x, this.max.x)),
              (this.min.y = Math.min(e.y, this.min.y)),
              (this.max.y = Math.max(i.y, this.max.y)))
            : ((this.min = e.clone()), (this.max = i.clone()));
        }
        return this;
      },
      getCenter(t) {
        return g(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      getBottomLeft() {
        return g(this.min.x, this.max.y);
      },
      getTopRight() {
        return g(this.max.x, this.min.y);
      },
      getTopLeft() {
        return this.min;
      },
      getBottomRight() {
        return this.max;
      },
      getSize() {
        return this.max.subtract(this.min);
      },
      contains(t) {
        let e, i;
        return (
          (t = ('number' == typeof t[0] || t instanceof c ? g : _)(
            t
          )) instanceof m
            ? ((e = t.min), (i = t.max))
            : (e = i = t),
          e.x >= this.min.x &&
            i.x <= this.max.x &&
            e.y >= this.min.y &&
            i.y <= this.max.y
        );
      },
      intersects(t) {
        t = _(t);
        var e = this.min,
          i = this.max,
          o = t.min,
          t = t.max,
          s = t.x >= e.x && o.x <= i.x,
          t = t.y >= e.y && o.y <= i.y;
        return s && t;
      },
      overlaps(t) {
        t = _(t);
        var e = this.min,
          i = this.max,
          o = t.min,
          t = t.max,
          s = t.x > e.x && o.x < i.x,
          t = t.y > e.y && o.y < i.y;
        return s && t;
      },
      isValid() {
        return !(!this.min || !this.max);
      },
      pad(t) {
        var e = this.min,
          i = this.max,
          o = Math.abs(e.x - i.x) * t,
          t = Math.abs(e.y - i.y) * t;
        return _(g(e.x - o, e.y - t), g(i.x + o, i.y + t));
      },
      equals(t) {
        return (
          !!t &&
          ((t = _(t)), this.min.equals(t.getTopLeft())) &&
          this.max.equals(t.getBottomRight())
        );
      },
    }),
    (p.prototype = {
      extend(t) {
        var e = this._southWest,
          i = this._northEast;
        let o, s;
        if (t instanceof u) (o = t), (s = t);
        else {
          if (!(t instanceof p)) return t ? this.extend(w(t) || f(t)) : this;
          if (((o = t._southWest), (s = t._northEast), !o || !s)) return this;
        }
        return (
          e || i
            ? ((e.lat = Math.min(o.lat, e.lat)),
              (e.lng = Math.min(o.lng, e.lng)),
              (i.lat = Math.max(s.lat, i.lat)),
              (i.lng = Math.max(s.lng, i.lng)))
            : ((this._southWest = new u(o.lat, o.lng)),
              (this._northEast = new u(s.lat, s.lng))),
          this
        );
      },
      pad(t) {
        var e = this._southWest,
          i = this._northEast,
          o = Math.abs(e.lat - i.lat) * t,
          t = Math.abs(e.lng - i.lng) * t;
        return new p(new u(e.lat - o, e.lng - t), new u(i.lat + o, i.lng + t));
      },
      getCenter() {
        return new u(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      getSouthWest() {
        return this._southWest;
      },
      getNorthEast() {
        return this._northEast;
      },
      getNorthWest() {
        return new u(this.getNorth(), this.getWest());
      },
      getSouthEast() {
        return new u(this.getSouth(), this.getEast());
      },
      getWest() {
        return this._southWest.lng;
      },
      getSouth() {
        return this._southWest.lat;
      },
      getEast() {
        return this._northEast.lng;
      },
      getNorth() {
        return this._northEast.lat;
      },
      contains(t) {
        t = ('number' == typeof t[0] || t instanceof u || 'lat' in t ? w : f)(
          t
        );
        var e = this._southWest,
          i = this._northEast;
        let o, s;
        return (
          t instanceof p
            ? ((o = t.getSouthWest()), (s = t.getNorthEast()))
            : (o = s = t),
          o.lat >= e.lat && s.lat <= i.lat && o.lng >= e.lng && s.lng <= i.lng
        );
      },
      intersects(t) {
        t = f(t);
        var e = this._southWest,
          i = this._northEast,
          o = t.getSouthWest(),
          t = t.getNorthEast(),
          s = t.lat >= e.lat && o.lat <= i.lat,
          t = t.lng >= e.lng && o.lng <= i.lng;
        return s && t;
      },
      overlaps(t) {
        t = f(t);
        var e = this._southWest,
          i = this._northEast,
          o = t.getSouthWest(),
          t = t.getNorthEast(),
          s = t.lat > e.lat && o.lat < i.lat,
          t = t.lng > e.lng && o.lng < i.lng;
        return s && t;
      },
      toBBoxString() {
        return [
          this.getWest(),
          this.getSouth(),
          this.getEast(),
          this.getNorth(),
        ].join(',');
      },
      equals(t, e) {
        return (
          !!t &&
          ((t = f(t)), this._southWest.equals(t.getSouthWest(), e)) &&
          this._northEast.equals(t.getNorthEast(), e)
        );
      },
      isValid() {
        return !(!this._southWest || !this._northEast);
      },
    });
  var o = {
    latLngToPoint(t, e) {
      (t = this.projection.project(t)), (e = this.scale(e));
      return this.transformation._transform(t, e);
    },
    pointToLatLng(t, e) {
      (e = this.scale(e)), (t = this.transformation.untransform(t, e));
      return this.projection.unproject(t);
    },
    project(t) {
      return this.projection.project(t);
    },
    unproject(t) {
      return this.projection.unproject(t);
    },
    scale(t) {
      return 256 * Math.pow(2, t);
    },
    zoom(t) {
      return Math.log(t / 256) / Math.LN2;
    },
    getProjectedBounds(t) {
      var e;
      return this.infinite
        ? null
        : ((e = this.projection.bounds),
          (t = this.scale(t)),
          new m(
            this.transformation.transform(e.min, t),
            this.transformation.transform(e.max, t)
          ));
    },
    infinite: !(u.prototype = {
      equals(t, e) {
        return (
          !!t &&
          ((t = w(t)),
          Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <=
            (void 0 === e ? 1e-9 : e))
        );
      },
      toString(t) {
        return `LatLng(${i(this.lat, t)}, ${i(this.lng, t)})`;
      },
      distanceTo(t) {
        return $.distance(this, w(t));
      },
      wrap() {
        return $.wrapLatLng(this);
      },
      toBounds(t) {
        var t = (180 * t) / 40075017,
          e = t / Math.cos((Math.PI / 180) * this.lat);
        return f([this.lat - t, this.lng - e], [this.lat + t, this.lng + e]);
      },
      clone() {
        return new u(this.lat, this.lng, this.alt);
      },
    }),
    wrapLatLng(t) {
      var e = this.wrapLng ? D(t.lng, this.wrapLng, !0) : t.lng;
      return new u(this.wrapLat ? D(t.lat, this.wrapLat, !0) : t.lat, e, t.alt);
    },
    wrapLatLngBounds(t) {
      var e = t.getCenter(),
        i = this.wrapLatLng(e),
        o = e.lat - i.lat,
        e = e.lng - i.lng;
      return 0 == o && 0 == e
        ? t
        : ((i = t.getSouthWest()),
          (t = t.getNorthEast()),
          new p(new u(i.lat - o, i.lng - e), new u(t.lat - o, t.lng - e)));
    },
  };
  const $ = h({}, o, {
      wrapLng: [-180, 180],
      R: 6371e3,
      distance(t, e) {
        var i = Math.PI / 180,
          o = t.lat * i,
          s = e.lat * i,
          n = Math.sin(((e.lat - t.lat) * i) / 2),
          e = Math.sin(((e.lng - t.lng) * i) / 2),
          t = n * n + Math.cos(o) * Math.cos(s) * e * e,
          i = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t));
        return this.R * i;
      },
    }),
    Y = 6378137,
    X = {
      R: Y,
      MAX_LATITUDE: 85.0511287798,
      project(t) {
        var e = Math.PI / 180,
          i = this.MAX_LATITUDE,
          i = Math.max(Math.min(i, t.lat), -i),
          i = Math.sin(i * e);
        return new c(
          this.R * t.lng * e,
          (this.R * Math.log((1 + i) / (1 - i))) / 2
        );
      },
      unproject(t) {
        var e = 180 / Math.PI;
        return new u(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
          (t.x * e) / this.R
        );
      },
      bounds: new m([-(s = Y * Math.PI), -s], [s, s]),
    };
  function J(t, e, i, o) {
    Array.isArray(t)
      ? ((this._a = t[0]), (this._b = t[1]), (this._c = t[2]), (this._d = t[3]))
      : ((this._a = t), (this._b = e), (this._c = i), (this._d = o));
  }
  function Q(t, e, i, o) {
    return new J(t, e, i, o);
  }
  J.prototype = {
    transform(t, e) {
      return this._transform(t.clone(), e);
    },
    _transform(t, e) {
      return (
        (t.x = (e = e || 1) * (this._a * t.x + this._b)),
        (t.y = e * (this._c * t.y + this._d)),
        t
      );
    },
    untransform(t, e) {
      return new c(
        (t.x / (e = e || 1) - this._b) / this._a,
        (t.y / e - this._d) / this._c
      );
    },
  };
  var s = h({}, $, {
      code: 'EPSG:3857',
      projection: X,
      transformation: Q((s = 0.5 / (Math.PI * X.R)), 0.5, -s, 0.5),
    }),
    tt = h({}, s, { code: 'EPSG:900913' }),
    et = nt('chrome'),
    it = !et && nt('safari'),
    y = 'undefined' != typeof orientation || nt('mobile'),
    ot = !!window.PointerEvent,
    st = 'ontouchstart' in window || !!window.TouchEvent;
  function nt(t) {
    return navigator.userAgent.toLowerCase().includes(t);
  }
  var v = {
    chrome: et,
    safari: it,
    mobile: y,
    pointer: ot,
    touch: st || ot,
    touchNative: st,
    retina:
      1 <
      (window.devicePixelRatio ||
        window.screen.deviceXDPI / window.screen.logicalXDPI),
    mac: navigator.platform.startsWith('Mac'),
    linux: navigator.platform.startsWith('Linux'),
  };
  const rt = {
      touchstart: 'pointerdown',
      touchmove: 'pointermove',
      touchend: 'pointerup',
      touchcancel: 'pointercancel',
    },
    at = {
      touchstart: function (t, e) {
        ct(t, e);
      },
      touchmove: ct,
      touchend: ct,
      touchcancel: ct,
    },
    ht = {};
  let lt = !1;
  function dt(t, e, i) {
    return (
      'touchstart' !== e ||
        lt ||
        (document.addEventListener('pointerdown', _t, !0),
        document.addEventListener('pointermove', pt, !0),
        document.addEventListener('pointerup', ut, !0),
        document.addEventListener('pointercancel', ut, !0),
        (lt = !0)),
      at[e]
        ? ((i = at[e].bind(this, i)), t.addEventListener(rt[e], i, !1), i)
        : (console.warn('wrong event specified:', e), r)
    );
  }
  function _t(t) {
    ht[t.pointerId] = t;
  }
  function pt(t) {
    ht[t.pointerId] && (ht[t.pointerId] = t);
  }
  function ut(t) {
    delete ht[t.pointerId];
  }
  function ct(t, e) {
    if ('mouse' !== e.pointerType) {
      e.touches = [];
      for (const i in ht) Object.hasOwn(ht, i) && e.touches.push(ht[i]);
      (e.changedTouches = [e]), t(e);
    }
  }
  const mt = 200;
  function gt(t, e) {
    t.addEventListener('dblclick', e);
    let i = 0,
      o;
    function s(t) {
      var e;
      1 !== t.detail
        ? (o = t.detail)
        : 'mouse' === t.pointerType ||
          (t.sourceCapabilities && !t.sourceCapabilities.firesTouchEvents) ||
          ((e = Ut(t)).some(
            t => t instanceof HTMLLabelElement && t.attributes.for
          ) &&
            !e.some(
              t =>
                t instanceof HTMLInputElement || t instanceof HTMLSelectElement
            )) ||
          ((e = Date.now()) - i <= mt
            ? 2 === ++o &&
              t.target.dispatchEvent(
                (function (t) {
                  let e = {
                      bubbles: t.bubbles,
                      cancelable: t.cancelable,
                      composed: t.composed,
                      detail: 2,
                      view: t.view,
                      screenX: t.screenX,
                      screenY: t.screenY,
                      clientX: t.clientX,
                      clientY: t.clientY,
                      ctrlKey: t.ctrlKey,
                      shiftKey: t.shiftKey,
                      altKey: t.altKey,
                      metaKey: t.metaKey,
                      button: t.button,
                      buttons: t.buttons,
                      relatedTarget: t.relatedTarget,
                      region: t.region,
                    },
                    i;
                  return (i = new (
                    t instanceof PointerEvent
                      ? ((e = {
                          ...e,
                          pointerId: t.pointerId,
                          width: t.width,
                          height: t.height,
                          pressure: t.pressure,
                          tangentialPressure: t.tangentialPressure,
                          tiltX: t.tiltX,
                          tiltY: t.tiltY,
                          twist: t.twist,
                          pointerType: t.pointerType,
                          isPrimary: t.isPrimary,
                        }),
                        PointerEvent)
                      : MouseEvent
                  )('dblclick', e));
                })(t)
              )
            : (o = 1),
          (i = e));
    }
    return t.addEventListener('click', s), { dblclick: e, simDblclick: s };
  }
  function ft(t) {
    return 'string' == typeof t ? document.getElementById(t) : t;
  }
  function b(t, e, i) {
    t = document.createElement(t);
    return (t.className = e || ''), i && i.appendChild(t), t;
  }
  function yt(t) {
    var e = t.parentNode;
    e && e.lastChild !== t && e.appendChild(t);
  }
  function vt(t) {
    var e = t.parentNode;
    e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
  }
  function xt(t, e, i) {
    e = e || new c(0, 0);
    t.style.transform =
      `translate3d(${e.x}px,${e.y}px,0)` + (i ? ` scale(${i})` : '');
  }
  const wt = new WeakMap();
  function L(t, e) {
    wt.set(t, e), xt(t, e);
  }
  function bt(t) {
    return wt.get(t) ?? new c(0, 0);
  }
  const Lt = document.documentElement.style,
    Pt = ['userSelect', 'WebkitUserSelect'].find(t => t in Lt);
  let Tt;
  function zt() {
    var t = Lt[Pt];
    'none' !== t && ((Tt = t), (Lt[Pt] = 'none'));
  }
  function Mt() {
    void 0 !== Tt && ((Lt[Pt] = Tt), (Tt = void 0));
  }
  function Zt() {
    P(window, 'dragstart', M);
  }
  function Ct() {
    z(window, 'dragstart', M);
  }
  let Ot, St;
  function Et(t) {
    for (; -1 === t.tabIndex; ) t = t.parentNode;
    t.style &&
      (kt(),
      (Ot = t),
      (St = t.style.outlineStyle),
      (t.style.outlineStyle = 'none'),
      P(window, 'keydown', kt));
  }
  function kt() {
    Ot &&
      ((Ot.style.outlineStyle = St),
      (Ot = void 0),
      (St = void 0),
      z(window, 'keydown', kt));
  }
  function Bt(t) {
    for (
      ;
      !(
        ((t = t.parentNode).offsetWidth && t.offsetHeight) ||
        t === document.body
      );

    );
    return t;
  }
  function At(t) {
    var e = t.getBoundingClientRect();
    return {
      x: e.width / t.offsetWidth || 1,
      y: e.height / t.offsetHeight || 1,
      boundingClientRect: e,
    };
  }
  et = {
    __proto__: null,
    create: b,
    disableImageDrag: Zt,
    disableTextSelection: zt,
    enableImageDrag: Ct,
    enableTextSelection: Mt,
    get: ft,
    getPosition: bt,
    getScale: At,
    getSizedParentNode: Bt,
    preventOutline: Et,
    restoreOutline: kt,
    setPosition: L,
    setTransform: xt,
    toBack: vt,
    toFront: yt,
  };
  function P(i, o, s, n) {
    if (o && 'object' == typeof o)
      for (var [t, e] of Object.entries(o)) jt(i, t, e, s);
    else for (let t = 0, e = (o = l(o)).length; t < e; t++) jt(i, o[t], s, n);
    return this;
  }
  const T = '_leaflet_events';
  function z(i, o, s, n) {
    if (1 === arguments.length) It(i), delete i[T];
    else if (o && 'object' == typeof o)
      for (var [t, e] of Object.entries(o)) Dt(i, t, e, s);
    else if (((o = l(o)), 2 === arguments.length)) It(i, t => o.includes(t));
    else for (let t = 0, e = o.length; t < e; t++) Dt(i, o[t], s, n);
    return this;
  }
  function It(t, e) {
    for (const o in t[T]) {
      var i;
      Object.hasOwn(t[T], o) &&
        ((i = o.split(/\d/)[0]), (e && !e(i)) || Dt(t, i, null, null, o));
    }
  }
  const Rt = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    wheel: !('onwheel' in window) && 'mousewheel',
  };
  function jt(e, i, o, s) {
    var n = i + a(o) + (s ? '_' + a(s) : '');
    if (!e[T] || !e[T][n]) {
      let t = function (t) {
        return o.call(s || e, t || window.event);
      };
      const r = t;
      !v.touchNative && v.pointer && i.startsWith('touch')
        ? (t = dt(e, i, t))
        : v.touch && 'dblclick' === i
        ? (t = gt(e, t))
        : 'addEventListener' in e
        ? 'touchstart' === i ||
          'touchmove' === i ||
          'wheel' === i ||
          'mousewheel' === i
          ? e.addEventListener(Rt[i] || i, t, { passive: !1 })
          : 'mouseenter' === i || 'mouseleave' === i
          ? ((t = function (t) {
              (t = t || window.event), Kt(e, t) && r(t);
            }),
            e.addEventListener(Rt[i], t, !1))
          : e.addEventListener(i, r, !1)
        : e.attachEvent('on' + i, t),
        (e[T] = e[T] || {}),
        (e[T][n] = t);
    }
  }
  function Dt(t, e, i, o, s) {
    s = s || e + a(i) + (o ? '_' + a(o) : '');
    var n,
      r,
      i = t[T] && t[T][s];
    i &&
      (!v.touchNative && v.pointer && e.startsWith('touch')
        ? ((o = t),
          (n = e),
          (r = i),
          rt[n]
            ? o.removeEventListener(rt[n], r, !1)
            : console.warn('wrong event specified:', n))
        : v.touch && 'dblclick' === e
        ? ((o = i),
          (r = t).removeEventListener('dblclick', o.dblclick),
          r.removeEventListener('click', o.simDblclick))
        : 'removeEventListener' in t
        ? t.removeEventListener(Rt[e] || e, i, !1)
        : t.detachEvent('on' + e, i),
      (t[T][s] = null));
  }
  function Nt(t) {
    return (
      t.stopPropagation
        ? t.stopPropagation()
        : t.originalEvent
        ? (t.originalEvent._stopped = !0)
        : (t.cancelBubble = !0),
      this
    );
  }
  function Wt(t) {
    return jt(t, 'wheel', Nt), this;
  }
  function Ht(t) {
    return (
      P(t, 'mousedown touchstart dblclick contextmenu', Nt),
      (t._leaflet_disable_click = !0),
      this
    );
  }
  function M(t) {
    return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), this;
  }
  function Ft(t) {
    return M(t), Nt(t), this;
  }
  function Ut(t) {
    if (t.composedPath) return t.composedPath();
    var e = [];
    let i = t.target;
    for (; i; ) e.push(i), (i = i.parentNode);
    return e;
  }
  function Vt(t, e) {
    var i, o;
    return e
      ? ((o = (i = At(e)).boundingClientRect),
        new c(
          (t.clientX - o.left) / i.x - e.clientLeft,
          (t.clientY - o.top) / i.y - e.clientTop
        ))
      : new c(t.clientX, t.clientY);
  }
  function Gt() {
    var t = window.devicePixelRatio;
    return v.linux && v.chrome ? t : v.mac ? 3 * t : 0 < t ? 2 * t : 1;
  }
  function qt(t) {
    return t.deltaY && 0 === t.deltaMode
      ? -t.deltaY / Gt()
      : t.deltaY && 1 === t.deltaMode
      ? 20 * -t.deltaY
      : t.deltaY && 2 === t.deltaMode
      ? 60 * -t.deltaY
      : t.deltaX || t.deltaZ
      ? 0
      : t.wheelDelta
      ? (t.wheelDeltaY || t.wheelDelta) / 2
      : t.detail && Math.abs(t.detail) < 32765
      ? 20 * -t.detail
      : t.detail
      ? (t.detail / -32765) * 60
      : 0;
  }
  function Kt(t, e) {
    let i = e.relatedTarget;
    if (!i) return !0;
    try {
      for (; i && i !== t; ) i = i.parentNode;
    } catch (t) {
      return !1;
    }
    return i !== t;
  }
  it = {
    __proto__: null,
    addListener: P,
    disableClickPropagation: Ht,
    disableScrollPropagation: Wt,
    getMousePosition: Vt,
    getPropagationPath: Ut,
    getWheelDelta: qt,
    getWheelPxFactor: Gt,
    isExternalTarget: Kt,
    off: z,
    on: P,
    preventDefault: M,
    removeListener: z,
    stop: Ft,
    stopPropagation: Nt,
  };
  const $t = e.extend({
      run(t, e, i, o) {
        this.stop(),
          (this._el = t),
          (this._inProgress = !0),
          (this._duration = i || 0.25),
          (this._easeOutPower = 1 / Math.max(o || 0.5, 0.2)),
          (this._startPos = bt(t)),
          (this._offset = e.subtract(this._startPos)),
          (this._startTime = +new Date()),
          this.fire('start'),
          this._animate();
      },
      stop() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate() {
        (this._animId = x(this._animate, this)), this._step();
      },
      _step(t) {
        var e = +new Date() - this._startTime,
          i = 1e3 * this._duration;
        e < i
          ? this._runFrame(this._easeOut(e / i), t)
          : (this._runFrame(1), this._complete());
      },
      _runFrame(t, e) {
        t = this._startPos.add(this._offset.multiplyBy(t));
        e && t._round(), L(this._el, t), this.fire('step');
      },
      _complete() {
        d(this._animId), (this._inProgress = !1), this.fire('end');
      },
      _easeOut(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      },
    }),
    Z = e.extend({
      options: {
        crs: s,
        center: void 0,
        zoom: void 0,
        minZoom: void 0,
        maxZoom: void 0,
        layers: [],
        maxBounds: void 0,
        renderer: void 0,
        zoomAnimation: !0,
        zoomAnimationThreshold: 4,
        fadeAnimation: !0,
        markerZoomAnimation: !0,
        transform3DLimit: 8388608,
        zoomSnap: 1,
        zoomDelta: 1,
        trackResize: !0,
      },
      initialize(t, e) {
        (e = n(this, e)),
          (this._handlers = []),
          (this._layers = {}),
          (this._zoomBoundLayers = {}),
          (this._sizeChanged = !0),
          this._initContainer(t),
          this._initLayout(),
          this._initEvents(),
          e.maxBounds && this.setMaxBounds(e.maxBounds),
          void 0 !== e.zoom && (this._zoom = this._limitZoom(e.zoom)),
          e.center &&
            void 0 !== e.zoom &&
            this.setView(w(e.center), e.zoom, { reset: !0 }),
          this.callInitHooks(),
          (this._zoomAnimated = this.options.zoomAnimation),
          this._zoomAnimated &&
            (this._createAnimProxy(),
            P(this._proxy, 'transitionend', this._catchTransitionEnd, this)),
          this._addLayers(this.options.layers);
      },
      setView(t, e, i) {
        if (
          ((e = void 0 === e ? this._zoom : this._limitZoom(e)),
          (t = this._limitCenter(w(t), e, this.options.maxBounds)),
          (i = i || {}),
          this._stop(),
          this._loaded && !i.reset && !0 !== i) &&
          (void 0 !== i.animate &&
            ((i.zoom = h({ animate: i.animate }, i.zoom)),
            (i.pan = h({ animate: i.animate, duration: i.duration }, i.pan))),
          this._zoom !== e
            ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom)
            : this._tryAnimatedPan(t, i.pan))
        )
          return clearTimeout(this._sizeTimer), this;
        return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
      },
      setZoom(t, e) {
        return this._loaded
          ? this.setView(this.getCenter(), t, { zoom: e })
          : ((this._zoom = t), this);
      },
      zoomIn(t, e) {
        return (
          (t = t || this.options.zoomDelta), this.setZoom(this._zoom + t, e)
        );
      },
      zoomOut(t, e) {
        return (
          (t = t || this.options.zoomDelta), this.setZoom(this._zoom - t, e)
        );
      },
      setZoomAround(t, e, i) {
        var o = this.getZoomScale(e),
          s = this.getSize().divideBy(2),
          t = (t instanceof c ? t : this.latLngToContainerPoint(t))
            .subtract(s)
            .multiplyBy(1 - 1 / o),
          o = this.containerPointToLatLng(s.add(t));
        return this.setView(o, e, { zoom: i });
      },
      _getBoundsCenterZoom(t, e) {
        (e = e || {}), (t = t.getBounds ? t.getBounds() : f(t));
        var i = g(e.paddingTopLeft || e.padding || [0, 0]),
          o = g(e.paddingBottomRight || e.padding || [0, 0]),
          s = this.getBoundsZoom(t, !1, i.add(o));
        return (s =
          'number' == typeof e.maxZoom ? Math.min(e.maxZoom, s) : s) ===
          1 / 0
          ? { center: t.getCenter(), zoom: s }
          : ((e = o.subtract(i).divideBy(2)),
            (o = this.project(t.getSouthWest(), s)),
            (i = this.project(t.getNorthEast(), s)),
            {
              center: this.unproject(o.add(i).divideBy(2).add(e), s),
              zoom: s,
            });
      },
      fitBounds(t, e) {
        if ((t = f(t)).isValid())
          return (
            (t = this._getBoundsCenterZoom(t, e)),
            this.setView(t.center, t.zoom, e)
          );
        throw new Error('Bounds are not valid.');
      },
      fitWorld(t) {
        return this.fitBounds(
          [
            [-90, -180],
            [90, 180],
          ],
          t
        );
      },
      panTo(t, e) {
        return this.setView(t, this._zoom, { pan: e });
      },
      panBy(t, e) {
        var i;
        return (
          (e = e || {}),
          (t = g(t).round()).x || t.y
            ? (!0 === e.animate || this.getSize().contains(t)
                ? (this._panAnim ||
                    ((this._panAnim = new $t()),
                    this._panAnim.on(
                      {
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd,
                      },
                      this
                    )),
                  e.noMoveStart || this.fire('movestart'),
                  !1 !== e.animate
                    ? (this._mapPane.classList.add('leaflet-pan-anim'),
                      (i = this._getMapPanePos().subtract(t).round()),
                      this._panAnim.run(
                        this._mapPane,
                        i,
                        e.duration || 0.25,
                        e.easeLinearity
                      ))
                    : (this._rawPanBy(t), this.fire('move').fire('moveend')))
                : this._resetView(
                    this.unproject(this.project(this.getCenter()).add(t)),
                    this.getZoom()
                  ),
              this)
            : this.fire('moveend')
        );
      },
      flyTo(o, s, t) {
        if (!1 === (t = t || {}).animate) return this.setView(o, s, t);
        this._stop();
        const n = this.project(this.getCenter()),
          r = this.project(o),
          e = this.getSize(),
          a = this._zoom,
          h =
            ((o = w(o)),
            (s = void 0 === s ? a : this._limitZoom(s)),
            Math.max(e.x, e.y)),
          i = h * this.getZoomScale(a, s),
          l = r.distanceTo(n) || 1,
          d = 1.42,
          _ = d * d;
        function p(t) {
          var e = t ? -1 : 1,
            t = t ? i : h,
            e = (i * i - h * h + e * _ * _ * l * l) / (2 * t * _ * l),
            t = Math.sqrt(e * e + 1) - e;
          return t < 1e-9 ? -18 : Math.log(t);
        }
        function u(t) {
          return (Math.exp(t) - Math.exp(-t)) / 2;
        }
        function c(t) {
          return (Math.exp(t) + Math.exp(-t)) / 2;
        }
        const m = p(0);
        function g(t) {
          return (h * (c(m) * (u((t = m + d * t)) / c(t)) - u(m))) / _;
        }
        const f = Date.now(),
          y = (p(1) - m) / d,
          v = t.duration ? 1e3 * t.duration : 1e3 * y * 0.8;
        return (
          this._moveStart(!0, t.noMoveStart),
          function t() {
            var e = (Date.now() - f) / v,
              i = (1 - Math.pow(1 - e, 1.5)) * y;
            e <= 1
              ? ((this._flyToFrame = x(t, this)),
                this._move(
                  this.unproject(n.add(r.subtract(n).multiplyBy(g(i) / l)), a),
                  this.getScaleZoom(
                    h / ((e = i), h * (c(m) / c(m + d * e))),
                    a
                  ),
                  { flyTo: !0 }
                ))
              : this._move(o, s)._moveEnd(!0);
          }.call(this),
          this
        );
      },
      flyToBounds(t, e) {
        t = this._getBoundsCenterZoom(t, e);
        return this.flyTo(t.center, t.zoom, e);
      },
      setMaxBounds(t) {
        return (
          (t = f(t)),
          this.listens('moveend', this._panInsideMaxBounds) &&
            this.off('moveend', this._panInsideMaxBounds),
          t.isValid()
            ? ((this.options.maxBounds = t),
              this._loaded && this._panInsideMaxBounds(),
              this.on('moveend', this._panInsideMaxBounds))
            : ((this.options.maxBounds = null), this)
        );
      },
      setMinZoom(t) {
        var e = this.options.minZoom;
        return (
          (this.options.minZoom = t),
          this._loaded &&
          e !== t &&
          (this.fire('zoomlevelschange'), this.getZoom() < this.options.minZoom)
            ? this.setZoom(t)
            : this
        );
      },
      setMaxZoom(t) {
        var e = this.options.maxZoom;
        return (
          (this.options.maxZoom = t),
          this._loaded &&
          e !== t &&
          (this.fire('zoomlevelschange'), this.getZoom() > this.options.maxZoom)
            ? this.setZoom(t)
            : this
        );
      },
      panInsideBounds(t, e) {
        this._enforcingBounds = !0;
        var i = this.getCenter(),
          t = this._limitCenter(i, this._zoom, f(t));
        return (
          i.equals(t) || this.panTo(t, e), (this._enforcingBounds = !1), this
        );
      },
      panInside(t, e) {
        var i = g((e = e || {}).paddingTopLeft || e.padding || [0, 0]),
          o = g(e.paddingBottomRight || e.padding || [0, 0]),
          s = this.project(this.getCenter()),
          t = this.project(t),
          n = this.getPixelBounds(),
          i = _([n.min.add(i), n.max.subtract(o)]),
          n = i.getSize();
        return (
          i.contains(t) ||
            ((this._enforcingBounds = !0),
            (o = t.subtract(i.getCenter())),
            (i = i.extend(t).getSize().subtract(n)),
            (s.x += o.x < 0 ? -i.x : i.x),
            (s.y += o.y < 0 ? -i.y : i.y),
            this.panTo(this.unproject(s), e),
            (this._enforcingBounds = !1)),
          this
        );
      },
      invalidateSize(t) {
        if (!this._loaded) return this;
        t = h({ animate: !1, pan: !0 }, !0 === t ? { animate: !0 } : t);
        var e = this.getSize(),
          i =
            ((this._sizeChanged = !0),
            (this._lastCenter = null),
            this.getSize()),
          o = e.divideBy(2).round(),
          s = i.divideBy(2).round(),
          o = o.subtract(s);
        return o.x || o.y
          ? (t.animate && t.pan
              ? this.panBy(o)
              : (t.pan && this._rawPanBy(o),
                this.fire('move'),
                t.debounceMoveend
                  ? (clearTimeout(this._sizeTimer),
                    (this._sizeTimer = setTimeout(
                      this.fire.bind(this, 'moveend'),
                      200
                    )))
                  : this.fire('moveend')),
            this.fire('resize', { oldSize: e, newSize: i }))
          : this;
      },
      stop() {
        return (
          this.setZoom(this._limitZoom(this._zoom)),
          this.options.zoomSnap || this.fire('viewreset'),
          this._stop()
        );
      },
      locate(t) {
        var e, i;
        return (
          (t = this._locateOptions = h({ timeout: 1e4, watch: !1 }, t)),
          'geolocation' in navigator
            ? ((e = this._handleGeolocationResponse.bind(this)),
              (i = this._handleGeolocationError.bind(this)),
              t.watch
                ? (this._locationWatchId = navigator.geolocation.watchPosition(
                    e,
                    i,
                    t
                  ))
                : navigator.geolocation.getCurrentPosition(e, i, t))
            : this._handleGeolocationError({
                code: 0,
                message: 'Geolocation not supported.',
              }),
          this
        );
      },
      stopLocate() {
        return (
          navigator.geolocation &&
            navigator.geolocation.clearWatch &&
            navigator.geolocation.clearWatch(this._locationWatchId),
          this._locateOptions && (this._locateOptions.setView = !1),
          this
        );
      },
      _handleGeolocationError(t) {
        var e;
        this._container._leaflet_id &&
          ((e = t.code),
          (t =
            t.message ||
            (1 === e
              ? 'permission denied'
              : 2 === e
              ? 'position unavailable'
              : 'timeout')),
          this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire('locationerror', {
            code: e,
            message: `Geolocation error: ${t}.`,
          }));
      },
      _handleGeolocationResponse(t) {
        if (this._container._leaflet_id) {
          var e,
            i = new u(t.coords.latitude, t.coords.longitude),
            o = i.toBounds(2 * t.coords.accuracy),
            s = this._locateOptions,
            n =
              (s.setView &&
                ((e = this.getBoundsZoom(o)),
                this.setView(i, s.maxZoom ? Math.min(e, s.maxZoom) : e)),
              { latlng: i, bounds: o, timestamp: t.timestamp });
          for (const r in t.coords)
            'number' == typeof t.coords[r] && (n[r] = t.coords[r]);
          this.fire('locationfound', n);
        }
      },
      addHandler(t, e) {
        return (
          e &&
            ((e = this[t] = new e(this)),
            this._handlers.push(e),
            this.options[t]) &&
            e.enable(),
          this
        );
      },
      remove() {
        if (
          (this._initEvents(!0),
          this.options.maxBounds &&
            this.off('moveend', this._panInsideMaxBounds),
          this._containerId !== this._container._leaflet_id)
        )
          throw new Error('Map container is being reused by another instance');
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch (t) {
          (this._container._leaflet_id = void 0), (this._containerId = void 0);
        }
        void 0 !== this._locationWatchId && this.stopLocate(),
          this._stop(),
          this._mapPane.remove(),
          this._clearControlPos && this._clearControlPos(),
          this._resizeRequest &&
            (d(this._resizeRequest), (this._resizeRequest = null)),
          this._clearHandlers(),
          this._loaded && this.fire('unload');
        let t;
        for (t in this._layers)
          Object.hasOwn(this._layers, t) && this._layers[t].remove();
        for (t in this._panes)
          Object.hasOwn(this._panes, t) && this._panes[t].remove();
        return (
          (this._layers = []),
          (this._panes = {}),
          delete this._mapPane,
          delete this._renderer,
          this
        );
      },
      createPane(t, e) {
        e = b(
          'div',
          'leaflet-pane' + (t ? ` leaflet-${t.replace('Pane', '')}-pane` : ''),
          e || this._mapPane
        );
        return t && (this._panes[t] = e), e;
      },
      getCenter() {
        return (
          this._checkIfLoaded(),
          this._lastCenter && !this._moved()
            ? this._lastCenter.clone()
            : this.layerPointToLatLng(this._getCenterLayerPoint())
        );
      },
      getZoom() {
        return this._zoom;
      },
      getBounds() {
        var t = this.getPixelBounds();
        return new p(
          this.unproject(t.getBottomLeft()),
          this.unproject(t.getTopRight())
        );
      },
      getMinZoom() {
        return void 0 === this.options.minZoom
          ? this._layersMinZoom || 0
          : this.options.minZoom;
      },
      getMaxZoom() {
        return void 0 === this.options.maxZoom
          ? void 0 === this._layersMaxZoom
            ? 1 / 0
            : this._layersMaxZoom
          : this.options.maxZoom;
      },
      getBoundsZoom(t, e, i) {
        (t = f(t)), (i = g(i || [0, 0]));
        let o = this.getZoom() || 0;
        var s = this.getMinZoom(),
          n = this.getMaxZoom(),
          r = t.getNorthWest(),
          t = t.getSouthEast(),
          i = this.getSize().subtract(i),
          t = _(this.project(t, o), this.project(r, o)).getSize(),
          r = this.options.zoomSnap,
          a = i.x / t.x,
          i = i.y / t.y,
          t = e ? Math.max(a, i) : Math.min(a, i);
        return (
          (o = this.getScaleZoom(t, o)),
          r &&
            ((o = Math.round(o / (r / 100)) * (r / 100)),
            (o = e ? Math.ceil(o / r) * r : Math.floor(o / r) * r)),
          Math.max(s, Math.min(n, o))
        );
      },
      getSize() {
        return (
          (this._size && !this._sizeChanged) ||
            ((this._size = new c(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0
            )),
            (this._sizeChanged = !1)),
          this._size.clone()
        );
      },
      getPixelBounds(t, e) {
        t = this._getTopLeftPoint(t, e);
        return new m(t, t.add(this.getSize()));
      },
      getPixelOrigin() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      getPixelWorldBounds(t) {
        return this.options.crs.getProjectedBounds(
          void 0 === t ? this.getZoom() : t
        );
      },
      getPane(t) {
        return 'string' == typeof t ? this._panes[t] : t;
      },
      getPanes() {
        return this._panes;
      },
      getContainer() {
        return this._container;
      },
      getZoomScale(t, e) {
        var i = this.options.crs;
        return (e = void 0 === e ? this._zoom : e), i.scale(t) / i.scale(e);
      },
      getScaleZoom(t, e) {
        var i = this.options.crs,
          t = ((e = void 0 === e ? this._zoom : e), i.zoom(t * i.scale(e)));
        return isNaN(t) ? 1 / 0 : t;
      },
      project(t, e) {
        return (
          (e = void 0 === e ? this._zoom : e),
          this.options.crs.latLngToPoint(w(t), e)
        );
      },
      unproject(t, e) {
        return (
          (e = void 0 === e ? this._zoom : e),
          this.options.crs.pointToLatLng(g(t), e)
        );
      },
      layerPointToLatLng(t) {
        t = g(t).add(this.getPixelOrigin());
        return this.unproject(t);
      },
      latLngToLayerPoint(t) {
        return this.project(w(t))._round()._subtract(this.getPixelOrigin());
      },
      wrapLatLng(t) {
        return this.options.crs.wrapLatLng(w(t));
      },
      wrapLatLngBounds(t) {
        return this.options.crs.wrapLatLngBounds(f(t));
      },
      distance(t, e) {
        return this.options.crs.distance(w(t), w(e));
      },
      containerPointToLayerPoint(t) {
        return g(t).subtract(this._getMapPanePos());
      },
      layerPointToContainerPoint(t) {
        return g(t).add(this._getMapPanePos());
      },
      containerPointToLatLng(t) {
        t = this.containerPointToLayerPoint(g(t));
        return this.layerPointToLatLng(t);
      },
      latLngToContainerPoint(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(w(t)));
      },
      mouseEventToContainerPoint(t) {
        return Vt(t, this._container);
      },
      mouseEventToLayerPoint(t) {
        return this.containerPointToLayerPoint(
          this.mouseEventToContainerPoint(t)
        );
      },
      mouseEventToLatLng(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      _initContainer(t) {
        t = this._container = ft(t);
        if (!t) throw new Error('Map container not found.');
        if (t._leaflet_id)
          throw new Error('Map container is already initialized.');
        P(t, 'scroll', this._onScroll, this), (this._containerId = a(t));
      },
      _initLayout() {
        var t = this._container,
          e =
            ((this._fadeAnimated = this.options.fadeAnimation),
            ['leaflet-container']),
          e = (v.touch && e.push('leaflet-touch'),
          v.retina && e.push('leaflet-retina'),
          v.safari && e.push('leaflet-safari'),
          this._fadeAnimated && e.push('leaflet-fade-anim'),
          t.classList.add(...e),
          getComputedStyle(t))['position'];
        'absolute' !== e &&
          'relative' !== e &&
          'fixed' !== e &&
          'sticky' !== e &&
          (t.style.position = 'relative'),
          this._initPanes(),
          this._initControlPos && this._initControlPos();
      },
      _initPanes() {
        var t = (this._panes = {});
        (this._paneRenderers = {}),
          (this._mapPane = this.createPane('mapPane', this._container)),
          L(this._mapPane, new c(0, 0)),
          this.createPane('tilePane'),
          this.createPane('overlayPane'),
          this.createPane('shadowPane'),
          this.createPane('markerPane'),
          this.createPane('tooltipPane'),
          this.createPane('popupPane'),
          this.options.markerZoomAnimation ||
            (t.markerPane.classList.add('leaflet-zoom-hide'),
            t.shadowPane.classList.add('leaflet-zoom-hide'));
      },
      _resetView(t, e, i) {
        L(this._mapPane, new c(0, 0));
        var o = !this._loaded,
          s =
            ((this._loaded = !0),
            (e = this._limitZoom(e)),
            this.fire('viewprereset'),
            this._zoom !== e);
        this._moveStart(s, i)._move(t, e)._moveEnd(s),
          this.fire('viewreset'),
          o && this.fire('load');
      },
      _moveStart(t, e) {
        return t && this.fire('zoomstart'), e || this.fire('movestart'), this;
      },
      _move(t, e, i, o) {
        void 0 === e && (e = this._zoom);
        var s = this._zoom !== e;
        return (
          (this._zoom = e),
          (this._lastCenter = t),
          (this._pixelOrigin = this._getNewPixelOrigin(t)),
          o
            ? i && i.pinch && this.fire('zoom', i)
            : ((s || (i && i.pinch)) && this.fire('zoom', i),
              this.fire('move', i)),
          this
        );
      },
      _moveEnd(t) {
        return t && this.fire('zoomend'), this.fire('moveend');
      },
      _stop() {
        return d(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy(t) {
        L(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded() {
        if (!this._loaded) throw new Error('Set map center and zoom first.');
      },
      _initEvents(t) {
        (this._targets = {}),
          (t ? z : P)(
            (this._targets[a(this._container)] = this)._container,
            'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup',
            this._handleDOMEvent,
            this
          ),
          this.options.trackResize &&
            (t
              ? this._resizeObserver.disconnect()
              : (this._resizeObserver ||
                  (this._resizeObserver = new ResizeObserver(
                    this._onResize.bind(this)
                  )),
                this._resizeObserver.observe(this._container))),
          this.options.transform3DLimit &&
            (t ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
      },
      _onResize() {
        d(this._resizeRequest),
          (this._resizeRequest = x(function () {
            this.invalidateSize({ debounceMoveend: !0 });
          }, this));
      },
      _onScroll() {
        (this._container.scrollTop = 0), (this._container.scrollLeft = 0);
      },
      _onMoveEnd() {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >=
          this.options.transform3DLimit &&
          this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets(t, e) {
        let i = [],
          o,
          s = t.target || t.srcElement,
          n = !1;
        for (var r = 'mouseout' === e || 'mouseover' === e; s; ) {
          if (
            (o = this._targets[a(s)]) &&
            ('click' === e || 'preclick' === e) &&
            this._draggableMoved(o)
          ) {
            n = !0;
            break;
          }
          if (o && o.listens(e, !0)) {
            if (r && !Kt(s, t)) break;
            if ((i.push(o), r)) break;
          }
          if (s === this._container) break;
          s = s.parentNode;
        }
        return (i = i.length || n || r || !this.listens(e, !0) ? i : [this]);
      },
      _isClickDisabled(t) {
        for (; t && t !== this._container; ) {
          if (t._leaflet_disable_click || !t.parentNode) return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent(t) {
        var e,
          i = t.target || t.srcElement;
        !this._loaded ||
          i._leaflet_disable_events ||
          ('click' === t.type && this._isClickDisabled(i)) ||
          ('mousedown' === (e = t.type) && Et(i), this._fireDOMEvent(t, e));
      },
      _mouseEvents: [
        'click',
        'dblclick',
        'mouseover',
        'mouseout',
        'contextmenu',
      ],
      _fireDOMEvent(t, e, i) {
        'click' === t.type &&
          (((r = h({}, t)).type = 'preclick'),
          this._fireDOMEvent(r, r.type, i));
        let o = this._findEventTargets(t, e);
        if (i) {
          var s = [];
          for (let t = 0; t < i.length; t++)
            i[t].listens(e, !0) && s.push(i[t]);
          o = s.concat(o);
        }
        if (o.length) {
          'contextmenu' === e && M(t);
          var n,
            r = o[0],
            a = { originalEvent: t };
          'keypress' !== t.type &&
            'keydown' !== t.type &&
            'keyup' !== t.type &&
            ((n = r.getLatLng && (!r._radius || r._radius <= 10)),
            (a.containerPoint = n
              ? this.latLngToContainerPoint(r.getLatLng())
              : this.mouseEventToContainerPoint(t)),
            (a.layerPoint = this.containerPointToLayerPoint(a.containerPoint)),
            (a.latlng = n
              ? r.getLatLng()
              : this.layerPointToLatLng(a.layerPoint)));
          for (let t = 0; t < o.length; t++)
            if (
              (o[t].fire(e, a, !0),
              a.originalEvent._stopped ||
                (!1 === o[t].options.bubblingMouseEvents &&
                  this._mouseEvents.includes(e)))
            )
              return;
        }
      },
      _draggableMoved(t) {
        return (
          ((t = t.dragging && t.dragging.enabled() ? t : this).dragging &&
            t.dragging.moved()) ||
          (this.boxZoom && this.boxZoom.moved())
        );
      },
      _clearHandlers() {
        for (let t = 0, e = this._handlers.length; t < e; t++)
          this._handlers[t].disable();
      },
      whenReady(t, e) {
        return (
          this._loaded
            ? t.call(e || this, { target: this })
            : this.on('load', t, e),
          this
        );
      },
      _getMapPanePos() {
        return bt(this._mapPane) || new c(0, 0);
      },
      _moved() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint(t, e) {
        return (
          t && void 0 !== e
            ? this._getNewPixelOrigin(t, e)
            : this.getPixelOrigin()
        ).subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin(t, e) {
        var i = this.getSize()._divideBy(2);
        return this.project(t, e)
          ._subtract(i)
          ._add(this._getMapPanePos())
          ._round();
      },
      _latLngToNewLayerPoint(t, e, i) {
        i = this._getNewPixelOrigin(i, e);
        return this.project(t, e)._subtract(i);
      },
      _latLngBoundsToNewLayerBounds(t, e, i) {
        i = this._getNewPixelOrigin(i, e);
        return _([
          this.project(t.getSouthWest(), e)._subtract(i),
          this.project(t.getNorthWest(), e)._subtract(i),
          this.project(t.getSouthEast(), e)._subtract(i),
          this.project(t.getNorthEast(), e)._subtract(i),
        ]);
      },
      _getCenterLayerPoint() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      _getCenterOffset(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      _limitCenter(t, e, i) {
        var o, s;
        return !i ||
          ((o = this.project(t, e)),
          (s = this.getSize().divideBy(2)),
          (s = new m(o.subtract(s), o.add(s))),
          (s = this._getBoundsOffset(s, i, e)),
          Math.abs(s.x) <= 1 && Math.abs(s.y) <= 1)
          ? t
          : this.unproject(o.add(s), e);
      },
      _limitOffset(t, e) {
        var i;
        return e
          ? ((i = new m((i = this.getPixelBounds()).min.add(t), i.max.add(t))),
            t.add(this._getBoundsOffset(i, e)))
          : t;
      },
      _getBoundsOffset(t, e, i) {
        (e = _(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i)
        )),
          (i = e.min.subtract(t.min)),
          (e = e.max.subtract(t.max));
        return new c(this._rebound(i.x, -e.x), this._rebound(i.y, -e.y));
      },
      _rebound(t, e) {
        return 0 < t + e
          ? Math.round(t - e) / 2
          : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
      },
      _limitZoom(t) {
        var e = this.getMinZoom(),
          i = this.getMaxZoom(),
          o = this.options.zoomSnap;
        return o && (t = Math.round(t / o) * o), Math.max(e, Math.min(i, t));
      },
      _onPanTransitionStep() {
        this.fire('move');
      },
      _onPanTransitionEnd() {
        this._mapPane.classList.remove('leaflet-pan-anim'),
          this.fire('moveend');
      },
      _tryAnimatedPan(t, e) {
        t = this._getCenterOffset(t)._trunc();
        return !(
          (!0 !== (e && e.animate) && !this.getSize().contains(t)) ||
          (this.panBy(t, e), 0)
        );
      },
      _createAnimProxy() {
        var t = (this._proxy = b('div', 'leaflet-proxy leaflet-zoom-animated'));
        this._panes.mapPane.appendChild(t),
          this.on(
            'zoomanim',
            function (t) {
              var e = this._proxy.style.transform;
              xt(
                this._proxy,
                this.project(t.center, t.zoom),
                this.getZoomScale(t.zoom, 1)
              ),
                e === this._proxy.style.transform &&
                  this._animatingZoom &&
                  this._onZoomTransitionEnd();
            },
            this
          ),
          this.on('load moveend', this._animMoveEnd, this),
          this._on('unload', this._destroyAnimProxy, this);
      },
      _destroyAnimProxy() {
        this._proxy.remove(),
          this.off('load moveend', this._animMoveEnd, this),
          delete this._proxy;
      },
      _animMoveEnd() {
        var t = this.getCenter(),
          e = this.getZoom();
        xt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
      },
      _catchTransitionEnd(t) {
        this._animatingZoom &&
          t.propertyName.includes('transform') &&
          this._onZoomTransitionEnd();
      },
      _nothingToAnimate() {
        return !this._container.getElementsByClassName('leaflet-zoom-animated')
          .length;
      },
      _tryAnimatedZoom(t, e, i) {
        if (!this._animatingZoom) {
          if (
            ((i = i || {}),
            !this._zoomAnimated ||
              !1 === i.animate ||
              this._nothingToAnimate() ||
              Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
          )
            return !1;
          var o = this.getZoomScale(e),
            o = this._getCenterOffset(t)._divideBy(1 - 1 / o);
          if (!0 !== i.animate && !this.getSize().contains(o)) return !1;
          x(function () {
            this._moveStart(!0, i.noMoveStart ?? !1)._animateZoom(t, e, !0);
          }, this);
        }
        return !0;
      },
      _animateZoom(t, e, i, o) {
        this._mapPane &&
          (i &&
            ((this._animatingZoom = !0),
            (this._animateToCenter = t),
            (this._animateToZoom = e),
            this._mapPane.classList.add('leaflet-zoom-anim')),
          this.fire('zoomanim', { center: t, zoom: e, noUpdate: o }),
          this._tempFireZoomEvent ||
            (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          setTimeout(this._onZoomTransitionEnd.bind(this), 250));
      },
      _onZoomTransitionEnd() {
        this._animatingZoom &&
          (this._mapPane && this._mapPane.classList.remove('leaflet-zoom-anim'),
          (this._animatingZoom = !1),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          this._tempFireZoomEvent && this.fire('zoom'),
          delete this._tempFireZoomEvent,
          this.fire('move'),
          this._moveEnd(!0));
      },
    });
  function Yt(t, e) {
    return new Z(t, e);
  }
  const C = q.extend({
    options: { position: 'topright' },
    initialize(t) {
      n(this, t);
    },
    getPosition() {
      return this.options.position;
    },
    setPosition(t) {
      var e = this._map;
      return (
        e && e.removeControl(this),
        (this.options.position = t),
        e && e.addControl(this),
        this
      );
    },
    getContainer() {
      return this._container;
    },
    addTo(t) {
      this.remove(), (this._map = t);
      var e = (this._container = this.onAdd(t)),
        i = this.getPosition(),
        t = t._controlCorners[i];
      return (
        e.classList.add('leaflet-control'),
        i.includes('bottom')
          ? t.insertBefore(e, t.firstChild)
          : t.appendChild(e),
        this._map.on('unload', this.remove, this),
        this
      );
    },
    remove() {
      return (
        this._map &&
          (this._container.remove(),
          this.onRemove && this.onRemove(this._map),
          this._map.off('unload', this.remove, this),
          (this._map = null)),
        this
      );
    },
    _refocusOnMap(t) {
      this._map &&
        t &&
        0 < t.screenX &&
        0 < t.screenY &&
        this._map.getContainer().focus();
    },
  });
  function Xt(t) {
    return new C(t);
  }
  Z.include({
    addControl(t) {
      return t.addTo(this), this;
    },
    removeControl(t) {
      return t.remove(), this;
    },
    _initControlPos() {
      const o = (this._controlCorners = {}),
        s = 'leaflet-',
        n = (this._controlContainer = b(
          'div',
          s + 'control-container',
          this._container
        ));
      function t(t, e) {
        var i = s + t + ' ' + s + e;
        o[t + e] = b('div', i, n);
      }
      t('top', 'left'),
        t('top', 'right'),
        t('bottom', 'left'),
        t('bottom', 'right');
    },
    _clearControlPos() {
      for (const t in this._controlCorners)
        Object.hasOwn(this._controlCorners, t) &&
          this._controlCorners[t].remove();
      this._controlContainer.remove(),
        delete this._controlCorners,
        delete this._controlContainer;
    },
  });
  const Jt = C.extend({
    options: {
      collapsed: !0,
      position: 'topright',
      autoZIndex: !0,
      hideSingleBase: !1,
      sortLayers: !1,
      sortFunction(t, e, i, o) {
        return i < o ? -1 : o < i ? 1 : 0;
      },
    },
    initialize(t, e, i) {
      n(this, i),
        (this._layerControlInputs = []),
        (this._layers = []),
        (this._lastZIndex = 0),
        (this._handlingClick = !1),
        (this._preventClick = !1);
      for (const o in t) Object.hasOwn(t, o) && this._addLayer(t[o], o);
      for (const s in e) Object.hasOwn(e, s) && this._addLayer(e[s], s, !0);
    },
    onAdd(t) {
      this._initLayout(),
        this._update(),
        (this._map = t).on('zoomend', this._checkDisabledLayers, this);
      for (let t = 0; t < this._layers.length; t++)
        this._layers[t].layer.on('add remove', this._onLayerChange, this);
      return (
        this.options.collapsed ||
          t.on('resize', this._expandIfNotCollapsed, this),
        this._container
      );
    },
    addTo(t) {
      return C.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
    },
    onRemove() {
      this._map.off('zoomend', this._checkDisabledLayers, this);
      for (let t = 0; t < this._layers.length; t++)
        this._layers[t].layer.off('add remove', this._onLayerChange, this);
      this._map.off('resize', this._expandIfNotCollapsed, this);
    },
    addBaseLayer(t, e) {
      return this._addLayer(t, e), this._map ? this._update() : this;
    },
    addOverlay(t, e) {
      return this._addLayer(t, e, !0), this._map ? this._update() : this;
    },
    removeLayer(t) {
      t.off('add remove', this._onLayerChange, this);
      t = this._getLayer(a(t));
      return (
        t && this._layers.splice(this._layers.indexOf(t), 1),
        this._map ? this._update() : this
      );
    },
    expand() {
      this._container.classList.add('leaflet-control-layers-expanded'),
        (this._section.style.height = null);
      var t = this._map.getSize().y - (this._container.offsetTop + 50);
      return (
        t < this._section.clientHeight
          ? (this._section.classList.add('leaflet-control-layers-scrollbar'),
            (this._section.style.height = t + 'px'))
          : this._section.classList.remove('leaflet-control-layers-scrollbar'),
        this._checkDisabledLayers(),
        this
      );
    },
    collapse(t) {
      return (
        (t && 'pointerleave' === t.type && 'touch' === t.pointerType) ||
          this._container.classList.remove('leaflet-control-layers-expanded'),
        this
      );
    },
    _initLayout() {
      var t = 'leaflet-control-layers',
        e = (this._container = b('div', t)),
        i = this.options.collapsed,
        o =
          (e.setAttribute('aria-haspopup', !0),
          Ht(e),
          Wt(e),
          (this._section = b('fieldset', t + '-list'))),
        s =
          (i &&
            (this._map.on('click', this.collapse, this),
            P(
              e,
              { pointerenter: this._expandSafely, pointerleave: this.collapse },
              this
            )),
          (this._layersLink = b('a', t + '-toggle', e)));
      (s.href = '#'),
        (s.title = 'Layers'),
        s.setAttribute('role', 'button'),
        P(
          s,
          {
            keydown(t) {
              'Enter' === t.code && this._expandSafely();
            },
            click(t) {
              M(t), this._expandSafely();
            },
          },
          this
        ),
        i || this.expand(),
        (this._baseLayersList = b('div', t + '-base', o)),
        (this._separator = b('div', t + '-separator', o)),
        (this._overlaysList = b('div', t + '-overlays', o)),
        e.appendChild(o);
    },
    _getLayer(e) {
      for (let t = 0; t < this._layers.length; t++)
        if (this._layers[t] && a(this._layers[t].layer) === e)
          return this._layers[t];
    },
    _addLayer(t, e, i) {
      this._map && t.on('add remove', this._onLayerChange, this),
        this._layers.push({ layer: t, name: e, overlay: i }),
        this.options.sortLayers &&
          this._layers.sort((t, e) =>
            this.options.sortFunction(t.layer, e.layer, t.name, e.name)
          ),
        this.options.autoZIndex &&
          t.setZIndex &&
          (this._lastZIndex++, t.setZIndex(this._lastZIndex)),
        this._expandIfNotCollapsed();
    },
    _update() {
      if (this._container) {
        this._baseLayersList.replaceChildren(),
          this._overlaysList.replaceChildren(),
          (this._layerControlInputs = []);
        let t,
          e,
          i,
          o,
          s = 0;
        for (i = 0; i < this._layers.length; i++)
          (o = this._layers[i]),
            this._addItem(o),
            (e = e || o.overlay),
            (t = t || !o.overlay),
            (s += o.overlay ? 0 : 1);
        this.options.hideSingleBase &&
          ((t = t && 1 < s),
          (this._baseLayersList.style.display = t ? '' : 'none')),
          (this._separator.style.display = e && t ? '' : 'none');
      }
      return this;
    },
    _onLayerChange(t) {
      this._handlingClick || this._update();
      var e = this._getLayer(a(t.target)),
        t = e.overlay
          ? 'add' === t.type
            ? 'overlayadd'
            : 'overlayremove'
          : 'add' === t.type
          ? 'baselayerchange'
          : null;
      t && this._map.fire(t, e);
    },
    _createRadioElement(t, e) {
      (t = `<input type="radio" class="leaflet-control-layers-selector" name="${t}"${
        e ? ' checked="checked"' : ''
      }/>`),
        (e = document.createElement('div'));
      return (e.innerHTML = t), e.firstChild;
    },
    _addItem(t) {
      var e = document.createElement('label'),
        i = this._map.hasLayer(t.layer);
      let o;
      t.overlay
        ? (((o = document.createElement('input')).type = 'checkbox'),
          (o.className = 'leaflet-control-layers-selector'),
          (o.defaultChecked = i))
        : (o = this._createRadioElement('leaflet-base-layers_' + a(this), i)),
        this._layerControlInputs.push(o),
        (o.layerId = a(t.layer)),
        P(o, 'click', this._onInputClick, this);
      var i = document.createElement('span'),
        s = ((i.innerHTML = ' ' + t.name), document.createElement('span'));
      return (
        e.appendChild(s),
        s.appendChild(o),
        s.appendChild(i),
        (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e),
        this._checkDisabledLayers(),
        e
      );
    },
    _onInputClick() {
      if (!this._preventClick) {
        var e,
          i,
          o = this._layerControlInputs,
          s = [],
          n = [];
        this._handlingClick = !0;
        for (let t = o.length - 1; 0 <= t; t--)
          (e = o[t]),
            (i = this._getLayer(e.layerId).layer),
            e.checked ? s.push(i) : e.checked || n.push(i);
        for (let t = 0; t < n.length; t++)
          this._map.hasLayer(n[t]) && this._map.removeLayer(n[t]);
        for (let t = 0; t < s.length; t++)
          this._map.hasLayer(s[t]) || this._map.addLayer(s[t]);
        (this._handlingClick = !1), this._refocusOnMap();
      }
    },
    _checkDisabledLayers() {
      var e,
        i,
        o = this._layerControlInputs,
        s = this._map.getZoom();
      for (let t = o.length - 1; 0 <= t; t--)
        (e = o[t]),
          (i = this._getLayer(e.layerId).layer),
          (e.disabled =
            (void 0 !== i.options.minZoom && s < i.options.minZoom) ||
            (void 0 !== i.options.maxZoom && s > i.options.maxZoom));
    },
    _expandIfNotCollapsed() {
      return this._map && !this.options.collapsed && this.expand(), this;
    },
    _expandSafely() {
      const t = this._section;
      (this._preventClick = !0),
        P(t, 'click', M),
        this.expand(),
        setTimeout(() => {
          z(t, 'click', M), (this._preventClick = !1);
        });
    },
  });
  const Qt = C.extend({
    options: {
      position: 'topleft',
      zoomInText: '<span aria-hidden="true">+</span>',
      zoomInTitle: 'Zoom in',
      zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
      zoomOutTitle: 'Zoom out',
    },
    onAdd(t) {
      var e = 'leaflet-control-zoom',
        i = b('div', e + ' leaflet-bar'),
        o = this.options;
      return (
        (this._zoomInButton = this._createButton(
          o.zoomInText,
          o.zoomInTitle,
          e + '-in',
          i,
          this._zoomIn
        )),
        (this._zoomOutButton = this._createButton(
          o.zoomOutText,
          o.zoomOutTitle,
          e + '-out',
          i,
          this._zoomOut
        )),
        this._updateDisabled(),
        t.on('zoomend zoomlevelschange', this._updateDisabled, this),
        i
      );
    },
    onRemove(t) {
      t.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },
    disable() {
      return (this._disabled = !0), this._updateDisabled(), this;
    },
    enable() {
      return (this._disabled = !1), this._updateDisabled(), this;
    },
    _zoomIn(t) {
      !this._disabled &&
        this._map._zoom < this._map.getMaxZoom() &&
        this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _zoomOut(t) {
      !this._disabled &&
        this._map._zoom > this._map.getMinZoom() &&
        this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _createButton(t, e, i, o, s) {
      i = b('a', i, o);
      return (
        (i.innerHTML = t),
        (i.href = '#'),
        (i.title = e),
        i.setAttribute('role', 'button'),
        i.setAttribute('aria-label', e),
        Ht(i),
        P(i, 'click', Ft),
        P(i, 'click', s, this),
        P(i, 'click', this._refocusOnMap, this),
        i
      );
    },
    _updateDisabled() {
      var t = this._map,
        e = 'leaflet-disabled';
      this._zoomInButton.classList.remove(e),
        this._zoomOutButton.classList.remove(e),
        this._zoomInButton.setAttribute('aria-disabled', 'false'),
        this._zoomOutButton.setAttribute('aria-disabled', 'false'),
        (!this._disabled && t._zoom !== t.getMinZoom()) ||
          (this._zoomOutButton.classList.add(e),
          this._zoomOutButton.setAttribute('aria-disabled', 'true')),
        (!this._disabled && t._zoom !== t.getMaxZoom()) ||
          (this._zoomInButton.classList.add(e),
          this._zoomInButton.setAttribute('aria-disabled', 'true'));
    },
  });
  Z.mergeOptions({ zoomControl: !0 }),
    Z.addInitHook(function () {
      this.options.zoomControl &&
        ((this.zoomControl = new Qt()), this.addControl(this.zoomControl));
    });
  const te = C.extend({
    options: {
      position: 'bottomleft',
      maxWidth: 100,
      metric: !0,
      imperial: !0,
    },
    onAdd(t) {
      var e = 'leaflet-control-scale',
        i = b('div', e),
        o = this.options;
      return (
        this._addScales(o, e + '-line', i),
        t.on(o.updateWhenIdle ? 'moveend' : 'move', this._update, this),
        t.whenReady(this._update, this),
        i
      );
    },
    onRemove(t) {
      t.off(
        this.options.updateWhenIdle ? 'moveend' : 'move',
        this._update,
        this
      );
    },
    _addScales(t, e, i) {
      t.metric && (this._mScale = b('div', e, i)),
        t.imperial && (this._iScale = b('div', e, i));
    },
    _update() {
      var t = this._map,
        e = t.getSize().y / 2,
        t = t.distance(
          t.containerPointToLatLng([0, e]),
          t.containerPointToLatLng([this.options.maxWidth, e])
        );
      this._updateScales(t);
    },
    _updateScales(t) {
      this.options.metric && t && this._updateMetric(t),
        this.options.imperial && t && this._updateImperial(t);
    },
    _updateMetric(t) {
      var e = this._getRoundNum(t);
      this._updateScale(
        this._mScale,
        e < 1e3 ? e + ' m' : e / 1e3 + ' km',
        e / t
      );
    },
    _updateImperial(t) {
      var e,
        i,
        t = 3.2808399 * t;
      5280 < t
        ? ((i = this._getRoundNum((e = t / 5280))),
          this._updateScale(this._iScale, i + ' mi', i / e))
        : ((i = this._getRoundNum(t)),
          this._updateScale(this._iScale, i + ' ft', i / t));
    },
    _updateScale(t, e, i) {
      (t.style.width = Math.round(this.options.maxWidth * i) + 'px'),
        (t.innerHTML = e);
    },
    _getRoundNum(t) {
      var e = Math.pow(10, ('' + Math.floor(t)).length - 1),
        t = t / e;
      return e * (10 <= t ? 10 : 5 <= t ? 5 : 3 <= t ? 3 : 2 <= t ? 2 : 1);
    },
  });
  const ee = C.extend({
    options: {
      position: 'bottomright',
      prefix:
        '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>Leaflet</a>',
    },
    initialize(t) {
      n(this, t), (this._attributions = {});
    },
    onAdd(t) {
      ((t.attributionControl = this)._container = b(
        'div',
        'leaflet-control-attribution'
      )),
        Ht(this._container);
      for (const e in t._layers)
        t._layers[e].getAttribution &&
          this.addAttribution(t._layers[e].getAttribution());
      return (
        this._update(),
        t.on('layeradd', this._addAttribution, this),
        this._container
      );
    },
    onRemove(t) {
      t.off('layeradd', this._addAttribution, this);
    },
    _addAttribution(t) {
      t.layer.getAttribution &&
        (this.addAttribution(t.layer.getAttribution()),
        t.layer.once(
          'remove',
          function () {
            this.removeAttribution(t.layer.getAttribution());
          },
          this
        ));
    },
    setPrefix(t) {
      return (this.options.prefix = t), this._update(), this;
    },
    addAttribution(t) {
      return (
        t &&
          (this._attributions[t] || (this._attributions[t] = 0),
          this._attributions[t]++,
          this._update()),
        this
      );
    },
    removeAttribution(t) {
      return (
        t && this._attributions[t] && (this._attributions[t]--, this._update()),
        this
      );
    },
    _update() {
      if (this._map) {
        var t = [];
        for (const i in this._attributions) this._attributions[i] && t.push(i);
        var e = [];
        this.options.prefix && e.push(this.options.prefix),
          t.length && e.push(t.join(', ')),
          (this._container.innerHTML = e.join(
            ' <span aria-hidden="true">|</span> '
          ));
      }
    },
  });
  Z.mergeOptions({ attributionControl: !0 }),
    Z.addInitHook(function () {
      this.options.attributionControl && new ee().addTo(this);
    });
  (C.Layers = Jt),
    (C.Zoom = Qt),
    (C.Scale = te),
    (C.Attribution = ee),
    (Xt.layers = function (t, e, i) {
      return new Jt(t, e, i);
    }),
    (Xt.zoom = function (t) {
      return new Qt(t);
    }),
    (Xt.scale = function (t) {
      return new te(t);
    }),
    (Xt.attribution = function (t) {
      return new ee(t);
    });
  y = q.extend({
    initialize(t) {
      this._map = t;
    },
    enable() {
      return this._enabled || ((this._enabled = !0), this.addHooks()), this;
    },
    disable() {
      return this._enabled && ((this._enabled = !1), this.removeHooks()), this;
    },
    enabled() {
      return !!this._enabled;
    },
  });
  y.addTo = function (t, e) {
    return t.addHandler(e, this), this;
  };
  const ie = v.touch ? 'touchstart mousedown' : 'mousedown',
    oe = e.extend({
      options: { clickTolerance: 3 },
      initialize(t, e, i, o) {
        n(this, o),
          (this._element = t),
          (this._dragStartTarget = e || t),
          (this._preventOutline = i);
      },
      enable() {
        this._enabled ||
          (P(this._dragStartTarget, ie, this._onDown, this),
          (this._enabled = !0));
      },
      disable() {
        this._enabled &&
          (oe._dragging === this && this.finishDrag(!0),
          z(this._dragStartTarget, ie, this._onDown, this),
          (this._enabled = !1),
          (this._moved = !1));
      },
      _onDown(t) {
        var e, i;
        this._enabled &&
          ((this._moved = !1),
          this._element.classList.contains('leaflet-zoom-anim') ||
            (t.touches && 1 !== t.touches.length
              ? oe._dragging === this && this.finishDrag()
              : oe._dragging ||
                t.shiftKey ||
                (0 !== t.button && !t.touches) ||
                ((oe._dragging = this)._preventOutline && Et(this._element),
                Zt(),
                zt(),
                this._moving) ||
                (this.fire('down'),
                (i = t.touches ? t.touches[0] : t),
                (e = Bt(this._element)),
                (this._startPoint = new c(i.clientX, i.clientY)),
                (this._startPos = bt(this._element)),
                (this._parentScale = At(e)),
                (i = 'mousedown' === t.type),
                P(document, i ? 'mousemove' : 'touchmove', this._onMove, this),
                P(
                  document,
                  i ? 'mouseup' : 'touchend touchcancel',
                  this._onUp,
                  this
                ))));
      },
      _onMove(t) {
        var e;
        this._enabled &&
          (t.touches && 1 < t.touches.length
            ? (this._moved = !0)
            : (!(e = new c(
                (e =
                  t.touches && 1 === t.touches.length
                    ? t.touches[0]
                    : t).clientX,
                e.clientY
              )._subtract(this._startPoint)).x &&
                !e.y) ||
              Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance ||
              ((e.x /= this._parentScale.x),
              (e.y /= this._parentScale.y),
              M(t),
              this._moved ||
                (this.fire('dragstart'),
                (this._moved = !0),
                document.body.classList.add('leaflet-dragging'),
                (this._lastTarget = t.target || t.srcElement),
                window.SVGElementInstance &&
                  this._lastTarget instanceof window.SVGElementInstance &&
                  (this._lastTarget = this._lastTarget.correspondingUseElement),
                this._lastTarget.classList.add('leaflet-drag-target')),
              (this._newPos = this._startPos.add(e)),
              (this._moving = !0),
              (this._lastEvent = t),
              this._updatePosition()));
      },
      _updatePosition() {
        var t = { originalEvent: this._lastEvent };
        this.fire('predrag', t),
          L(this._element, this._newPos),
          this.fire('drag', t);
      },
      _onUp() {
        this._enabled && this.finishDrag();
      },
      finishDrag(t) {
        document.body.classList.remove('leaflet-dragging'),
          this._lastTarget &&
            (this._lastTarget.classList.remove('leaflet-drag-target'),
            (this._lastTarget = null)),
          z(document, 'mousemove touchmove', this._onMove, this),
          z(document, 'mouseup touchend touchcancel', this._onUp, this),
          Ct(),
          Mt();
        var e = this._moved && this._moving;
        (this._moving = !1),
          (oe._dragging = !1),
          e &&
            this.fire('dragend', {
              noInertia: t,
              distance: this._newPos.distanceTo(this._startPos),
            });
      },
    });
  function se(t, e, i) {
    let o, s, n, r, a, h, l, d, _;
    var p = [1, 4, 2, 8];
    for (s = 0, l = t.length; s < l; s++) t[s]._code = pe(t[s], e);
    for (r = 0; r < 4; r++) {
      for (d = p[r], o = [], s = 0, l = t.length, n = l - 1; s < l; n = s++)
        (a = t[s]),
          (h = t[n]),
          a._code & d
            ? h._code & d ||
              (((_ = _e(h, a, d, e, i))._code = pe(_, e)), o.push(_))
            : (h._code & d &&
                (((_ = _e(h, a, d, e, i))._code = pe(_, e)), o.push(_)),
              o.push(a));
      t = o;
    }
    return t;
  }
  function ne(t, e) {
    let i, o, s, n, r, a, h, l, d;
    if (!t || 0 === t.length) throw new Error('latlngs not passed');
    O(t) ||
      (console.warn('latlngs are not flat! Only the first ring will be used'),
      (t = t[0]));
    let _ = w([0, 0]);
    var p = f(t),
      u =
        (p.getNorthWest().distanceTo(p.getSouthWest()) *
          p.getNorthEast().distanceTo(p.getNorthWest()) <
          1700 && (_ = re(t)),
        t.length),
      c = [];
    for (i = 0; i < u; i++) {
      var m = w(t[i]);
      c.push(e.project(w([m.lat - _.lat, m.lng - _.lng])));
    }
    for (a = h = l = 0, i = 0, o = u - 1; i < u; o = i++)
      (s = c[i]),
        (n = c[o]),
        (r = s.y * n.x - n.y * s.x),
        (h += (s.x + n.x) * r),
        (l += (s.y + n.y) * r),
        (a += 3 * r);
    d = 0 === a ? c[0] : [h / a, l / a];
    p = e.unproject(g(d));
    return w([p.lat + _.lat, p.lng + _.lng]);
  }
  function re(e) {
    let i = 0,
      o = 0,
      s = 0;
    for (let t = 0; t < e.length; t++) {
      var n = w(e[t]);
      (i += n.lat), (o += n.lng), s++;
    }
    return w([i / s, o / s]);
  }
  ot = { __proto__: null, centroid: re, clipPolygon: se, polygonCenter: ne };
  function ae(e, i) {
    if (i && e.length) {
      i = i * i;
      {
        var o = (e = (function (e, i) {
            var o = [e[0]];
            let s = 0;
            for (let t = 1; t < e.length; t++)
              (function (t, e) {
                var i = e.x - t.x,
                  e = e.y - t.y;
                return i * i + e * e;
              })(e[t], e[s]) > i && (o.push(e[t]), (s = t));
            s < e.length - 1 && o.push(e[e.length - 1]);
            return o;
          })(e, i)),
          s = o.length,
          n = new ('undefined' != typeof Uint8Array ? Uint8Array : Array)(s);
        (n[0] = n[s - 1] = 1),
          (function t(e, i, o, s, n) {
            let r = 0,
              a,
              h,
              l;
            for (h = s + 1; h <= n - 1; h++)
              (l = ue(e[h], e[s], e[n], !0)) > r && ((a = h), (r = l));
            r > o && ((i[a] = 1), t(e, i, o, s, a), t(e, i, o, a, n));
          })(o, n, i, 0, s - 1);
        let t;
        var r = [];
        for (t = 0; t < s; t++) n[t] && r.push(o[t]);
        return r;
      }
    }
    return e.slice();
  }
  function he(t, e, i) {
    return Math.sqrt(ue(t, e, i, !0));
  }
  let le;
  function de(t, e, i, o, s) {
    let n = o ? le : pe(t, i),
      r = pe(e, i),
      a,
      h,
      l;
    for (le = r; ; ) {
      if (!(n | r)) return [t, e];
      if (n & r) return !1;
      (l = pe((h = _e(t, e, (a = n || r), i, s)), i)),
        a === n ? ((t = h), (n = l)) : ((e = h), (r = l));
    }
  }
  function _e(t, e, i, o, s) {
    var n = e.x - t.x,
      e = e.y - t.y,
      r = o.min,
      o = o.max;
    let a, h;
    return (
      8 & i
        ? ((a = t.x + (n * (o.y - t.y)) / e), (h = o.y))
        : 4 & i
        ? ((a = t.x + (n * (r.y - t.y)) / e), (h = r.y))
        : 2 & i
        ? ((a = o.x), (h = t.y + (e * (o.x - t.x)) / n))
        : 1 & i && ((a = r.x), (h = t.y + (e * (r.x - t.x)) / n)),
      new c(a, h, s)
    );
  }
  function pe(t, e) {
    let i = 0;
    return (
      t.x < e.min.x ? (i |= 1) : t.x > e.max.x && (i |= 2),
      t.y < e.min.y ? (i |= 4) : t.y > e.max.y && (i |= 8),
      i
    );
  }
  function ue(t, e, i, o) {
    let s = e.x,
      n = e.y,
      r = i.x - s,
      a = i.y - n,
      h;
    e = r * r + a * a;
    return (
      0 < e &&
        (1 < (h = ((t.x - s) * r + (t.y - n) * a) / e)
          ? ((s = i.x), (n = i.y))
          : 0 < h && ((s += r * h), (n += a * h))),
      (r = t.x - s),
      (a = t.y - n),
      o ? r * r + a * a : new c(s, n)
    );
  }
  function O(t) {
    return (
      !Array.isArray(t[0]) || ('object' != typeof t[0][0] && void 0 !== t[0][0])
    );
  }
  function ce(t, e) {
    let i, o, s, n, r, a, h, l;
    if (!t || 0 === t.length) throw new Error('latlngs not passed');
    O(t) ||
      (console.warn('latlngs are not flat! Only the first ring will be used'),
      (t = t[0]));
    let d = w([0, 0]);
    var _ = f(t),
      p =
        (_.getNorthWest().distanceTo(_.getSouthWest()) *
          _.getNorthEast().distanceTo(_.getNorthWest()) <
          1700 && (d = re(t)),
        t.length),
      u = [];
    for (i = 0; i < p; i++) {
      var c = w(t[i]);
      u.push(e.project(w([c.lat - d.lat, c.lng - d.lng])));
    }
    for (i = 0, o = 0; i < p - 1; i++) o += u[i].distanceTo(u[i + 1]) / 2;
    if (0 === o) l = u[0];
    else
      for (i = 0, n = 0; i < p - 1; i++)
        if (((r = u[i]), (a = u[i + 1]), (s = r.distanceTo(a)), (n += s) > o)) {
          (h = (n - o) / s),
            (l = [a.x - h * (a.x - r.x), a.y - h * (a.y - r.y)]);
          break;
        }
    _ = e.unproject(g(l));
    return w([_.lat + d.lat, _.lng + d.lng]);
  }
  var st = {
      __proto__: null,
      _getBitCode: pe,
      _getEdgeIntersection: _e,
      _sqClosestPointOnSegment: ue,
      clipSegment: de,
      closestPointOnSegment: function (t, e, i) {
        return ue(t, e, i);
      },
      isFlat: O,
      pointToSegmentDistance: he,
      polylineCenter: ce,
      simplify: ae,
    },
    me = {
      project(t) {
        return new c(t.lng, t.lat);
      },
      unproject(t) {
        return new u(t.y, t.x);
      },
      bounds: new m([-180, -90], [180, 90]),
    };
  const ge = {
    R: 6378137,
    R_MINOR: 6356752.314245179,
    bounds: new m(
      [-20037508.34279, -15496570.73972],
      [20037508.34279, 18764656.23138]
    ),
    project(t) {
      var e = Math.PI / 180,
        i = this.R,
        o = this.R_MINOR / i,
        o = Math.sqrt(1 - o * o),
        s = t.lat * e,
        n = o * Math.sin(s),
        n = Math.tan(Math.PI / 4 - s / 2) / Math.pow((1 - n) / (1 + n), o / 2),
        s = -i * Math.log(Math.max(n, 1e-10));
      return new c(t.lng * e * i, s);
    },
    unproject(t) {
      var e = 180 / Math.PI,
        i = this.R,
        o = this.R_MINOR / i,
        s = Math.sqrt(1 - o * o),
        n = Math.exp(-t.y / i);
      let r = Math.PI / 2 - 2 * Math.atan(n);
      for (let t = 0, e = 0.1, i; t < 15 && 1e-7 < Math.abs(e); t++)
        (i = s * Math.sin(r)),
          (i = Math.pow((1 - i) / (1 + i), s / 2)),
          (e = Math.PI / 2 - 2 * Math.atan(n * i) - r),
          (r += e);
      return new u(r * e, (t.x * e) / i);
    },
  };
  var fe = { __proto__: null, LonLat: me, Mercator: ge, SphericalMercator: X },
    S = h({}, $, {
      code: 'EPSG:3395',
      projection: ge,
      transformation: Q((S = 0.5 / (Math.PI * ge.R)), 0.5, -S, 0.5),
    });
  const ye = h({}, $, {
    code: 'EPSG:4326',
    projection: me,
    transformation: Q(1 / 180, 1, -1 / 180, 0.5),
  });
  (me = h({}, o, {
    projection: me,
    transformation: Q(1, 0, -1, 0),
    scale(t) {
      return Math.pow(2, t);
    },
    zoom(t) {
      return Math.log(t) / Math.LN2;
    },
    distance(t, e) {
      var i = e.lng - t.lng,
        e = e.lat - t.lat;
      return Math.sqrt(i * i + e * e);
    },
    infinite: !0,
  })),
    (o.Earth = $),
    (o.EPSG3395 = S),
    (o.EPSG3857 = s),
    (o.EPSG900913 = tt),
    (o.EPSG4326 = ye),
    (o.Simple = me),
    (S = e.extend({
      options: {
        pane: 'overlayPane',
        attribution: null,
        bubblingMouseEvents: !0,
      },
      addTo(t) {
        return t.addLayer(this), this;
      },
      remove() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      removeFrom(t) {
        return t && t.removeLayer(this), this;
      },
      getPane(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget(t) {
        return (this._map._targets[a(t)] = this);
      },
      removeInteractiveTarget(t) {
        return delete this._map._targets[a(t)], this;
      },
      getAttribution() {
        return this.options.attribution;
      },
      _layerAdd(t) {
        const e = t.target;
        if (e.hasLayer(this)) {
          if (
            ((this._map = e),
            (this._zoomAnimated = e._zoomAnimated),
            this.getEvents)
          ) {
            const i = this.getEvents();
            e.on(i, this),
              this.once(
                'remove',
                function () {
                  e.off(i, this);
                },
                this
              );
          }
          this.onAdd(e), this.fire('add'), e.fire('layeradd', { layer: this });
        }
      },
    }));
  Z.include({
    addLayer(t) {
      var e;
      if (t._layerAdd)
        return (
          (e = a(t)),
          this._layers[e] ||
            (((this._layers[e] = t)._mapToAdd = this),
            t.beforeAdd && t.beforeAdd(this),
            this.whenReady(t._layerAdd, t)),
          this
        );
      throw new Error('The provided object is not a Layer.');
    },
    removeLayer(t) {
      var e = a(t);
      return (
        this._layers[e] &&
          (this._loaded && t.onRemove(this),
          delete this._layers[e],
          this._loaded &&
            (this.fire('layerremove', { layer: t }), t.fire('remove')),
          (t._map = t._mapToAdd = null)),
        this
      );
    },
    hasLayer(t) {
      return a(t) in this._layers;
    },
    eachLayer(t, e) {
      for (const i in this._layers)
        Object.hasOwn(this._layers, i) && t.call(e, this._layers[i]);
      return this;
    },
    _addLayers(i) {
      for (
        let t = 0, e = (i = i ? (Array.isArray(i) ? i : [i]) : []).length;
        t < e;
        t++
      )
        this.addLayer(i[t]);
    },
    _addZoomLimit(t) {
      (isNaN(t.options.maxZoom) && isNaN(t.options.minZoom)) ||
        ((this._zoomBoundLayers[a(t)] = t), this._updateZoomLevels());
    },
    _removeZoomLimit(t) {
      t = a(t);
      this._zoomBoundLayers[t] &&
        (delete this._zoomBoundLayers[t], this._updateZoomLevels());
    },
    _updateZoomLevels() {
      let t = 1 / 0,
        e = -1 / 0;
      var i,
        o = this._getZoomSpan();
      for (const s in this._zoomBoundLayers)
        Object.hasOwn(this._zoomBoundLayers, s) &&
          ((i = this._zoomBoundLayers[s].options),
          (t = void 0 === i.minZoom ? t : Math.min(t, i.minZoom)),
          (e = void 0 === i.maxZoom ? e : Math.max(e, i.maxZoom)));
      (this._layersMaxZoom = e === -1 / 0 ? void 0 : e),
        (this._layersMinZoom = t === 1 / 0 ? void 0 : t),
        o !== this._getZoomSpan() && this.fire('zoomlevelschange'),
        void 0 === this.options.maxZoom &&
          this._layersMaxZoom &&
          this.getZoom() > this._layersMaxZoom &&
          this.setZoom(this._layersMaxZoom),
        void 0 === this.options.minZoom &&
          this._layersMinZoom &&
          this.getZoom() < this._layersMinZoom &&
          this.setZoom(this._layersMinZoom);
    },
  });
  const ve = S.extend({
    initialize(t, e) {
      n(this, e), (this._layers = {});
      let i, o;
      if (t) for (i = 0, o = t.length; i < o; i++) this.addLayer(t[i]);
    },
    addLayer(t) {
      var e = this.getLayerId(t);
      return (this._layers[e] = t), this._map && this._map.addLayer(t), this;
    },
    removeLayer(t) {
      t = t in this._layers ? t : this.getLayerId(t);
      return (
        this._map && this._layers[t] && this._map.removeLayer(this._layers[t]),
        delete this._layers[t],
        this
      );
    },
    hasLayer(t) {
      return ('number' == typeof t ? t : this.getLayerId(t)) in this._layers;
    },
    clearLayers() {
      return this.eachLayer(this.removeLayer, this);
    },
    invoke(t, ...e) {
      let i, o;
      for (i in this._layers)
        Object.hasOwn(this._layers, i) &&
          (o = this._layers[i])[t] &&
          o[t].apply(o, e);
      return this;
    },
    onAdd(t) {
      this.eachLayer(t.addLayer, t);
    },
    onRemove(t) {
      this.eachLayer(t.removeLayer, t);
    },
    eachLayer(t, e) {
      for (const i in this._layers)
        Object.hasOwn(this._layers, i) && t.call(e, this._layers[i]);
      return this;
    },
    getLayer(t) {
      return this._layers[t];
    },
    getLayers() {
      var t = [];
      return this.eachLayer(t.push, t), t;
    },
    setZIndex(t) {
      return this.invoke('setZIndex', t);
    },
    getLayerId(t) {
      return a(t);
    },
  });
  function xe(t, e) {
    return new ve(t, e);
  }
  const E = ve.extend({
    addLayer(t) {
      return this.hasLayer(t)
        ? this
        : (t.addEventParent(this),
          ve.prototype.addLayer.call(this, t),
          this.fire('layeradd', { layer: t }));
    },
    removeLayer(t) {
      return this.hasLayer(t)
        ? ((t = t in this._layers ? this._layers[t] : t).removeEventParent(
            this
          ),
          ve.prototype.removeLayer.call(this, t),
          this.fire('layerremove', { layer: t }))
        : this;
    },
    setStyle(t) {
      return this.invoke('setStyle', t);
    },
    bringToFront() {
      return this.invoke('bringToFront');
    },
    bringToBack() {
      return this.invoke('bringToBack');
    },
    getBounds() {
      var t,
        e = new p();
      for (const i in this._layers)
        Object.hasOwn(this._layers, i) &&
          ((t = this._layers[i]),
          e.extend(t.getBounds ? t.getBounds() : t.getLatLng()));
      return e;
    },
  });
  function we(t, e) {
    return new E(t, e);
  }
  const be = q.extend({
    options: { popupAnchor: [0, 0], tooltipAnchor: [0, 0], crossOrigin: !1 },
    initialize(t) {
      n(this, t);
    },
    createIcon(t) {
      return this._createIcon('icon', t);
    },
    createShadow(t) {
      return this._createIcon('shadow', t);
    },
    _createIcon(t, e) {
      var i = this._getIconUrl(t);
      if (i)
        return (
          (i = this._createImg(i, e && 'IMG' === e.tagName ? e : null)),
          this._setIconStyles(i, t),
          (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
            (i.crossOrigin =
              !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
          i
        );
      if ('icon' === t)
        throw new Error('iconUrl not set in Icon options (see the docs).');
      return null;
    },
    _setIconStyles(t, e) {
      var i = this.options;
      let o = i[e + 'Size'];
      var s = g((o = 'number' == typeof o ? [o, o] : o)),
        n = g(
          ('shadow' === e && i.shadowAnchor) ||
            i.iconAnchor ||
            (s && s.divideBy(2, !0))
        );
      (t.className = `leaflet-marker-${e} ` + (i.className || '')),
        n &&
          ((t.style.marginLeft = -n.x + 'px'),
          (t.style.marginTop = -n.y + 'px')),
        s && ((t.style.width = s.x + 'px'), (t.style.height = s.y + 'px'));
    },
    _createImg(t, e) {
      return ((e = e || document.createElement('img')).src = t), e;
    },
    _getIconUrl(t) {
      return (
        (v.retina && this.options[t + 'RetinaUrl']) || this.options[t + 'Url']
      );
    },
  });
  function Le(t) {
    return new be(t);
  }
  const Pe = be.extend({
      options: {
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      },
      _getIconUrl(t) {
        return (
          'string' != typeof Pe.imagePath &&
            (Pe.imagePath = this._detectIconPath()),
          (this.options.imagePath || Pe.imagePath) +
            be.prototype._getIconUrl.call(this, t)
        );
      },
      _stripUrl(t) {
        function e(t, e, i) {
          return (e = e.exec(t)) && e[i];
        }
        return (
          (t = e(t, /^url\((['"])?(.+)\1\)$/, 2)) &&
          e(t, /^(.*)marker-icon\.png$/, 1)
        );
      },
      _detectIconPath() {
        var t = b('div', 'leaflet-default-icon-path', document.body),
          e = this._stripUrl(getComputedStyle(t).backgroundImage);
        return (
          document.body.removeChild(t),
          e ||
            ((t = document.querySelector('link[href$="leaflet.css"]'))
              ? t.href.substring(0, t.href.length - 'leaflet.css'.length - 1)
              : '')
        );
      },
    }),
    Te = y.extend({
      initialize(t) {
        this._marker = t;
      },
      addHooks() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new oe(t, t, !0)),
          this._draggable
            .on(
              {
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this
            )
            .enable(),
          t.classList.add('leaflet-marker-draggable');
      },
      removeHooks() {
        this._draggable
          .off(
            {
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd,
            },
            this
          )
          .disable(),
          this._marker._icon &&
            this._marker._icon.classList.remove('leaflet-marker-draggable');
      },
      moved() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan(t) {
        var e = this._marker,
          i = e._map,
          o = this._marker.options.autoPanSpeed,
          s = this._marker.options.autoPanPadding,
          n = bt(e._icon),
          r = i.getPixelBounds(),
          a = i.getPixelOrigin(),
          a = _(r.min._subtract(a).add(s), r.max._subtract(a).subtract(s));
        a.contains(n) ||
          ((s = g(
            (Math.max(a.max.x, n.x) - a.max.x) / (r.max.x - a.max.x) -
              (Math.min(a.min.x, n.x) - a.min.x) / (r.min.x - a.min.x),
            (Math.max(a.max.y, n.y) - a.max.y) / (r.max.y - a.max.y) -
              (Math.min(a.min.y, n.y) - a.min.y) / (r.min.y - a.min.y)
          ).multiplyBy(o)),
          i.panBy(s, { animate: !1 }),
          this._draggable._newPos._add(s),
          this._draggable._startPos._add(s),
          L(e._icon, this._draggable._newPos),
          this._onDrag(t),
          (this._panRequest = x(this._adjustPan.bind(this, t))));
      },
      _onDragStart() {
        (this._oldLatLng = this._marker.getLatLng()),
          this._marker.closePopup && this._marker.closePopup(),
          this._marker.fire('movestart').fire('dragstart');
      },
      _onPreDrag(t) {
        this._marker.options.autoPan &&
          (d(this._panRequest),
          (this._panRequest = x(this._adjustPan.bind(this, t))));
      },
      _onDrag(t) {
        var e = this._marker,
          i = e._shadow,
          o = bt(e._icon),
          s = e._map.layerPointToLatLng(o);
        i && L(i, o),
          (e._latlng = s),
          (t.latlng = s),
          (t.oldLatLng = this._oldLatLng),
          e.fire('move', t).fire('drag', t);
      },
      _onDragEnd(t) {
        d(this._panRequest),
          delete this._oldLatLng,
          this._marker.fire('moveend').fire('dragend', t);
      },
    }),
    ze = S.extend({
      options: {
        icon: new Pe(),
        interactive: !0,
        keyboard: !0,
        title: '',
        alt: 'Marker',
        zIndexOffset: 0,
        opacity: 1,
        riseOnHover: !1,
        riseOffset: 250,
        pane: 'markerPane',
        shadowPane: 'shadowPane',
        bubblingMouseEvents: !1,
        autoPanOnFocus: !0,
        draggable: !1,
        autoPan: !1,
        autoPanPadding: [50, 50],
        autoPanSpeed: 10,
      },
      initialize(t, e) {
        n(this, e), (this._latlng = w(t));
      },
      onAdd(t) {
        (this._zoomAnimated =
          this._zoomAnimated && t.options.markerZoomAnimation),
          this._zoomAnimated && t.on('zoomanim', this._animateZoom, this),
          this._initIcon(),
          this.update();
      },
      onRemove(t) {
        this.dragging &&
          this.dragging.enabled() &&
          ((this.options.draggable = !0), this.dragging.removeHooks()),
          delete this.dragging,
          this._zoomAnimated && t.off('zoomanim', this._animateZoom, this),
          this._removeIcon(),
          this._removeShadow();
      },
      getEvents() {
        return { zoom: this.update, viewreset: this.update };
      },
      getLatLng() {
        return this._latlng;
      },
      setLatLng(t) {
        var e = this._latlng;
        return (
          (this._latlng = w(t)),
          this.update(),
          this.fire('move', { oldLatLng: e, latlng: this._latlng })
        );
      },
      setZIndexOffset(t) {
        return (this.options.zIndexOffset = t), this.update();
      },
      getIcon() {
        return this.options.icon;
      },
      setIcon(t) {
        return (
          (this.options.icon = t),
          this._map && (this._initIcon(), this.update()),
          this._popup && this.bindPopup(this._popup, this._popup.options),
          this
        );
      },
      getElement() {
        return this._icon;
      },
      update() {
        var t;
        return (
          this._icon &&
            this._map &&
            ((t = this._map.latLngToLayerPoint(this._latlng).round()),
            this._setPos(t)),
          this
        );
      },
      _initIcon() {
        var t = this.options,
          e = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'),
          i = t.icon.createIcon(this._icon);
        let o = !1;
        i !== this._icon &&
          (this._icon && this._removeIcon(),
          (o = !0),
          t.title && (i.title = t.title),
          'IMG' === i.tagName) &&
          (i.alt = t.alt || ''),
          i.classList.add(e),
          t.keyboard && ((i.tabIndex = '0'), i.setAttribute('role', 'button')),
          (this._icon = i),
          t.riseOnHover &&
            this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex,
            }),
          this.options.autoPanOnFocus && P(i, 'focus', this._panOnFocus, this);
        i = t.icon.createShadow(this._shadow);
        let s = !1;
        i !== this._shadow && (this._removeShadow(), (s = !0)),
          i && (i.classList.add(e), (i.alt = '')),
          (this._shadow = i),
          t.opacity < 1 && this._updateOpacity(),
          o && this.getPane().appendChild(this._icon),
          this._initInteraction(),
          i && s && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon() {
        this.options.riseOnHover &&
          this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex,
          }),
          this.options.autoPanOnFocus &&
            z(this._icon, 'focus', this._panOnFocus, this),
          this._icon.remove(),
          this.removeInteractiveTarget(this._icon),
          (this._icon = null);
      },
      _removeShadow() {
        this._shadow && this._shadow.remove(), (this._shadow = null);
      },
      _setPos(t) {
        this._icon && L(this._icon, t),
          this._shadow && L(this._shadow, t),
          (this._zIndex = t.y + this.options.zIndexOffset),
          this._resetZIndex();
      },
      _updateZIndex(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom(t) {
        t = this._map
          ._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
          .round();
        this._setPos(t);
      },
      _initInteraction() {
        if (
          this.options.interactive &&
          (this._icon.classList.add('leaflet-interactive'),
          this.addInteractiveTarget(this._icon),
          Te)
        ) {
          let t = this.options.draggable;
          this.dragging &&
            ((t = this.dragging.enabled()), this.dragging.disable()),
            (this.dragging = new Te(this)),
            t && this.dragging.enable();
        }
      },
      setOpacity(t) {
        return (
          (this.options.opacity = t), this._map && this._updateOpacity(), this
        );
      },
      _updateOpacity() {
        var t = this.options.opacity;
        this._icon && (this._icon.style.opacity = t),
          this._shadow && (this._shadow.style.opacity = t);
      },
      _bringToFront() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex() {
        this._updateZIndex(0);
      },
      _panOnFocus() {
        var t,
          e,
          i = this._map;
        i &&
          ((t = (e = this.options.icon.options).iconSize
            ? g(e.iconSize)
            : g(0, 0)),
          (e = e.iconAnchor ? g(e.iconAnchor) : g(0, 0)),
          i.panInside(this._latlng, {
            paddingTopLeft: e,
            paddingBottomRight: t.subtract(e),
          }));
      },
      _getPopupAnchor() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor() {
        return this.options.icon.options.tooltipAnchor;
      },
    });
  function Me(t, e) {
    return new ze(t, e);
  }
  const Ze = S.extend({
      options: {
        stroke: !0,
        color: '#3388ff',
        weight: 3,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null,
        dashOffset: null,
        fill: !1,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        interactive: !0,
        bubblingMouseEvents: !0,
      },
      beforeAdd(t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd() {
        this._renderer._initPath(this),
          this._reset(),
          this._renderer._addPath(this);
      },
      onRemove() {
        this._renderer._removePath(this);
      },
      redraw() {
        return this._map && this._renderer._updatePath(this), this;
      },
      setStyle(t) {
        return (
          n(this, t),
          this._renderer &&
            (this._renderer._updateStyle(this), this.options.stroke) &&
            t &&
            Object.hasOwn(t, 'weight') &&
            this._updateBounds(),
          this
        );
      },
      bringToFront() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      bringToBack() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement() {
        return this._path;
      },
      _reset() {
        this._project(), this._update();
      },
      _clickTolerance() {
        return (
          (this.options.stroke ? this.options.weight / 2 : 0) +
          (this._renderer.options.tolerance || 0)
        );
      },
    }),
    Ce = Ze.extend({
      options: { fill: !0, radius: 10 },
      initialize(t, e) {
        n(this, e), (this._latlng = w(t)), (this._radius = this.options.radius);
      },
      setLatLng(t) {
        var e = this._latlng;
        return (
          (this._latlng = w(t)),
          this.redraw(),
          this.fire('move', { oldLatLng: e, latlng: this._latlng })
        );
      },
      getLatLng() {
        return this._latlng;
      },
      setRadius(t) {
        return (this.options.radius = this._radius = t), this.redraw();
      },
      getRadius() {
        return this._radius;
      },
      setStyle(t) {
        var e = (t && t.radius) || this._radius;
        return Ze.prototype.setStyle.call(this, t), this.setRadius(e), this;
      },
      _project() {
        (this._point = this._map.latLngToLayerPoint(this._latlng)),
          this._updateBounds();
      },
      _updateBounds() {
        var t = this._radius,
          e = this._radiusY || t,
          i = this._clickTolerance(),
          t = [t + i, e + i];
        this._pxBounds = new m(this._point.subtract(t), this._point.add(t));
      },
      _update() {
        this._map && this._updatePath();
      },
      _updatePath() {
        this._renderer._updateCircle(this);
      },
      _empty() {
        return (
          this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        );
      },
      _containsPoint(t) {
        return (
          t.distanceTo(this._point) <= this._radius + this._clickTolerance()
        );
      },
    });
  function Oe(t, e) {
    return new Ce(t, e);
  }
  const Se = Ce.extend({
    initialize(t, e, i) {
      if (
        (n(this, (e = 'number' == typeof e ? h({}, i, { radius: e }) : e)),
        (this._latlng = w(t)),
        isNaN(this.options.radius))
      )
        throw new Error('Circle radius cannot be NaN');
      this._mRadius = this.options.radius;
    },
    setRadius(t) {
      return (this._mRadius = t), this.redraw();
    },
    getRadius() {
      return this._mRadius;
    },
    getBounds() {
      var t = [this._radius, this._radiusY || this._radius];
      return new p(
        this._map.layerPointToLatLng(this._point.subtract(t)),
        this._map.layerPointToLatLng(this._point.add(t))
      );
    },
    setStyle: Ze.prototype.setStyle,
    _project() {
      var e = this._latlng.lng,
        i = this._latlng.lat,
        o = this._map,
        t = o.options.crs;
      if (t.distance === $.distance) {
        var s = Math.PI / 180,
          n = this._mRadius / $.R / s,
          r = o.project([i + n, e]),
          a = o.project([i - n, e]),
          a = r.add(a).divideBy(2),
          h = o.unproject(a).lat;
        let t =
          Math.acos(
            (Math.cos(n * s) - Math.sin(i * s) * Math.sin(h * s)) /
              (Math.cos(i * s) * Math.cos(h * s))
          ) / s;
        (!isNaN(t) && 0 !== t) || (t = n / Math.cos((Math.PI / 180) * i)),
          (this._point = a.subtract(o.getPixelOrigin())),
          (this._radius = isNaN(t) ? 0 : a.x - o.project([h, e - t]).x),
          (this._radiusY = a.y - r.y);
      } else {
        s = t.unproject(t.project(this._latlng).subtract([this._mRadius, 0]));
        (this._point = o.latLngToLayerPoint(this._latlng)),
          (this._radius = this._point.x - o.latLngToLayerPoint(s).x);
      }
      this._updateBounds();
    },
  });
  function Ee(t, e, i) {
    return new Se(t, e, i);
  }
  const ke = Ze.extend({
    options: { smoothFactor: 1, noClip: !1 },
    initialize(t, e) {
      n(this, e), this._setLatLngs(t);
    },
    getLatLngs() {
      return this._latlngs;
    },
    setLatLngs(t) {
      return this._setLatLngs(t), this.redraw();
    },
    isEmpty() {
      return !this._latlngs.length;
    },
    closestLayerPoint(i) {
      let o = 1 / 0,
        s = null,
        n,
        r;
      var a = ue;
      for (let t = 0, e = this._parts.length; t < e; t++) {
        var h = this._parts[t];
        for (let t = 1, e = h.length; t < e; t++) {
          var l = a(i, (n = h[t - 1]), (r = h[t]), !0);
          l < o && ((o = l), (s = a(i, n, r)));
        }
      }
      return s && (s.distance = Math.sqrt(o)), s;
    },
    getCenter() {
      if (this._map) return ce(this._defaultShape(), this._map.options.crs);
      throw new Error('Must add layer to map before using getCenter()');
    },
    getBounds() {
      return this._bounds;
    },
    addLatLng(t, e) {
      return (
        (e = e || this._defaultShape()),
        (t = w(t)),
        e.push(t),
        this._bounds.extend(t),
        this.redraw()
      );
    },
    _setLatLngs(t) {
      (this._bounds = new p()), (this._latlngs = this._convertLatLngs(t));
    },
    _defaultShape() {
      return O(this._latlngs) ? this._latlngs : this._latlngs[0];
    },
    _convertLatLngs(i) {
      var o = [],
        s = O(i);
      for (let t = 0, e = i.length; t < e; t++)
        s
          ? ((o[t] = w(i[t])), this._bounds.extend(o[t]))
          : (o[t] = this._convertLatLngs(i[t]));
      return o;
    },
    _project() {
      var t = new m();
      (this._rings = []),
        this._projectLatlngs(this._latlngs, this._rings, t),
        this._bounds.isValid() &&
          t.isValid() &&
          ((this._rawPxBounds = t), this._updateBounds());
    },
    _updateBounds() {
      var t = this._clickTolerance(),
        t = new c(t, t);
      this._rawPxBounds &&
        (this._pxBounds = new m([
          this._rawPxBounds.min.subtract(t),
          this._rawPxBounds.max.add(t),
        ]));
    },
    _projectLatlngs(t, e, i) {
      var o = t[0] instanceof u,
        s = t.length;
      let n, r;
      if (o) {
        for (r = [], n = 0; n < s; n++)
          (r[n] = this._map.latLngToLayerPoint(t[n])), i.extend(r[n]);
        e.push(r);
      } else for (n = 0; n < s; n++) this._projectLatlngs(t[n], e, i);
    },
    _clipPoints() {
      var a = this._renderer._bounds;
      if (((this._parts = []), this._pxBounds && this._pxBounds.intersects(a)))
        if (this.options.noClip) this._parts = this._rings;
        else {
          var h = this._parts;
          let t, e, i, o, s, n, r;
          for (t = 0, i = 0, o = this._rings.length; t < o; t++)
            for (r = this._rings[t], e = 0, s = r.length; e < s - 1; e++)
              (n = de(r[e], r[e + 1], a, e, !0)) &&
                ((h[i] = h[i] || []),
                h[i].push(n[0]),
                (n[1] === r[e + 1] && e !== s - 2) || (h[i].push(n[1]), i++));
        }
    },
    _simplifyPoints() {
      var i = this._parts,
        o = this.options.smoothFactor;
      for (let t = 0, e = i.length; t < e; t++) i[t] = ae(i[t], o);
    },
    _update() {
      this._map &&
        (this._clipPoints(), this._simplifyPoints(), this._updatePath());
    },
    _updatePath() {
      this._renderer._updatePoly(this);
    },
    _containsPoint(t, e) {
      let i, o, s, n, r, a;
      var h = this._clickTolerance();
      if (this._pxBounds && this._pxBounds.contains(t))
        for (i = 0, n = this._parts.length; i < n; i++)
          for (
            a = this._parts[i], o = 0, r = a.length, s = r - 1;
            o < r;
            s = o++
          )
            if ((e || 0 !== o) && he(t, a[s], a[o]) <= h) return !0;
      return !1;
    },
  });
  function Be(t, e) {
    return new ke(t, e);
  }
  const Ae = ke.extend({
    options: { fill: !0 },
    isEmpty() {
      return !this._latlngs.length || !this._latlngs[0].length;
    },
    getCenter() {
      if (this._map) return ne(this._defaultShape(), this._map.options.crs);
      throw new Error('Must add layer to map before using getCenter()');
    },
    _convertLatLngs(t) {
      var t = ke.prototype._convertLatLngs.call(this, t),
        e = t.length;
      return 2 <= e && t[0] instanceof u && t[0].equals(t[e - 1]) && t.pop(), t;
    },
    _setLatLngs(t) {
      ke.prototype._setLatLngs.call(this, t),
        O(this._latlngs) && (this._latlngs = [this._latlngs]);
    },
    _defaultShape() {
      return (O(this._latlngs[0]) ? this._latlngs : this._latlngs[0])[0];
    },
    _clipPoints() {
      let o = this._renderer._bounds;
      var t = this.options.weight,
        t = new c(t, t);
      if (
        ((o = new m(o.min.subtract(t), o.max.add(t))),
        (this._parts = []),
        this._pxBounds && this._pxBounds.intersects(o))
      )
        if (this.options.noClip) this._parts = this._rings;
        else
          for (let t = 0, e = this._rings.length, i; t < e; t++)
            (i = se(this._rings[t], o, !0)).length && this._parts.push(i);
    },
    _updatePath() {
      this._renderer._updatePoly(this, !0);
    },
    _containsPoint(t) {
      let e = !1,
        i,
        o,
        s,
        n,
        r,
        a,
        h,
        l;
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
      for (n = 0, h = this._parts.length; n < h; n++)
        for (i = this._parts[n], r = 0, l = i.length, a = l - 1; r < l; a = r++)
          (o = i[r]),
            (s = i[a]),
            o.y > t.y != s.y > t.y &&
              t.x < ((s.x - o.x) * (t.y - o.y)) / (s.y - o.y) + o.x &&
              (e = !e);
      return e || ke.prototype._containsPoint.call(this, t, !0);
    },
  });
  function Ie(t, e) {
    return new Ae(t, e);
  }
  const k = E.extend({
    initialize(t, e) {
      n(this, e), (this._layers = {}), t && this.addData(t);
    },
    addData(t) {
      var e = Array.isArray(t) ? t : t.features;
      let i, o, s;
      if (e) {
        for (i = 0, o = e.length; i < o; i++)
          ((s = e[i]).geometries ||
            s.geometry ||
            s.features ||
            s.coordinates) &&
            this.addData(s);
        return this;
      }
      var n,
        r = this.options;
      return (!r.filter || r.filter(t)) && (n = Re(t, r))
        ? ((n.feature = Ue(t)),
          (n.defaultOptions = n.options),
          this.resetStyle(n),
          r.onEachFeature && r.onEachFeature(t, n),
          this.addLayer(n))
        : this;
    },
    resetStyle(t) {
      return void 0 === t
        ? this.eachLayer(this.resetStyle, this)
        : ((t.options = h({}, t.defaultOptions)),
          this._setLayerStyle(t, this.options.style),
          this);
    },
    setStyle(e) {
      return this.eachLayer(function (t) {
        this._setLayerStyle(t, e);
      }, this);
    },
    _setLayerStyle(t, e) {
      t.setStyle &&
        ('function' == typeof e && (e = e(t.feature)), t.setStyle(e));
    },
  });
  function Re(t, e) {
    var i = 'Feature' === t.type ? t.geometry : t,
      o = i ? i.coordinates : null,
      s = [],
      n = e && e.pointToLayer,
      r = (e && e.coordsToLatLng) || De;
    let a, h, l, d;
    if (!o && !i) return null;
    switch (i.type) {
      case 'Point':
        return je(n, t, (a = r(o)), e);
      case 'MultiPoint':
        for (l = 0, d = o.length; l < d; l++)
          (a = r(o[l])), s.push(je(n, t, a, e));
        return new E(s);
      case 'LineString':
      case 'MultiLineString':
        return (h = Ne(o, 'LineString' === i.type ? 0 : 1, r)), new ke(h, e);
      case 'Polygon':
      case 'MultiPolygon':
        return (h = Ne(o, 'Polygon' === i.type ? 1 : 2, r)), new Ae(h, e);
      case 'GeometryCollection':
        for (l = 0, d = i.geometries.length; l < d; l++) {
          var _ = Re(
            {
              geometry: i.geometries[l],
              type: 'Feature',
              properties: t.properties,
            },
            e
          );
          _ && s.push(_);
        }
        return new E(s);
      case 'FeatureCollection':
        for (l = 0, d = i.features.length; l < d; l++) {
          var p = Re(i.features[l], e);
          p && s.push(p);
        }
        return new E(s);
      default:
        throw new Error('Invalid GeoJSON object.');
    }
  }
  function je(t, e, i, o) {
    return t ? t(e, i) : new ze(i, o && o.markersInheritOptions && o);
  }
  function De(t) {
    return new u(t[1], t[0], t[2]);
  }
  function Ne(o, s, n) {
    var r = [];
    for (let t = 0, e = o.length, i; t < e; t++)
      (i = s ? Ne(o[t], s - 1, n) : (n || De)(o[t])), r.push(i);
    return r;
  }
  function We(t, e) {
    return void 0 !== (t = w(t)).alt
      ? [i(t.lng, e), i(t.lat, e), i(t.alt, e)]
      : [i(t.lng, e), i(t.lat, e)];
  }
  function He(i, o, s, n) {
    var r = [];
    for (let t = 0, e = i.length; t < e; t++)
      r.push(o ? He(i[t], O(i[t]) ? 0 : o - 1, s, n) : We(i[t], n));
    return !o && s && 0 < r.length && r.push(r[0].slice()), r;
  }
  function Fe(t, e) {
    return t.feature ? h({}, t.feature, { geometry: e }) : Ue(e);
  }
  function Ue(t) {
    return 'Feature' === t.type || 'FeatureCollection' === t.type
      ? t
      : { type: 'Feature', properties: {}, geometry: t };
  }
  s = {
    toGeoJSON(t) {
      return Fe(this, { type: 'Point', coordinates: We(this.getLatLng(), t) });
    },
  };
  function Ve(t, e) {
    return new k(t, e);
  }
  ze.include(s),
    Se.include(s),
    Ce.include(s),
    ke.include({
      toGeoJSON(t) {
        var e = !O(this._latlngs);
        return Fe(this, {
          type: `${e ? 'Multi' : ''}LineString`,
          coordinates: He(this._latlngs, e ? 1 : 0, !1, t),
        });
      },
    }),
    Ae.include({
      toGeoJSON(t) {
        var e = !O(this._latlngs),
          i = e && !O(this._latlngs[0]);
        let o = He(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
        return Fe(this, {
          type: `${i ? 'Multi' : ''}Polygon`,
          coordinates: (o = e ? o : [o]),
        });
      },
    }),
    ve.include({
      toMultiPoint(e) {
        const i = [];
        return (
          this.eachLayer(t => {
            i.push(t.toGeoJSON(e).geometry.coordinates);
          }),
          Fe(this, { type: 'MultiPoint', coordinates: i })
        );
      },
      toGeoJSON(e) {
        var t =
          this.feature && this.feature.geometry && this.feature.geometry.type;
        if ('MultiPoint' === t) return this.toMultiPoint(e);
        const i = 'GeometryCollection' === t,
          o = [];
        return (
          this.eachLayer(t => {
            t.toGeoJSON &&
              ((t = t.toGeoJSON(e)),
              i
                ? o.push(t.geometry)
                : 'FeatureCollection' === (t = Ue(t)).type
                ? o.push.apply(o, t.features)
                : o.push(t));
          }),
          i
            ? Fe(this, { geometries: o, type: 'GeometryCollection' })
            : { type: 'FeatureCollection', features: o }
        );
      },
    });
  tt = Ve;
  const Ge = S.extend({
      options: { padding: 0.1, continuous: !1 },
      initialize(t) {
        n(this, t);
      },
      onAdd() {
        this._container ||
          (this._initContainer(),
          this._container.classList.add('leaflet-zoom-animated')),
          this.getPane().appendChild(this._container),
          this._resizeContainer(),
          this._onMoveEnd();
      },
      onRemove() {
        this._destroyContainer();
      },
      getEvents() {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._onMoveEnd,
          zoomend: this._onZoomEnd,
          resize: this._resizeContainer,
        };
        return (
          this._zoomAnimated && (t.zoomanim = this._onAnimZoom),
          this.options.continuous && (t.move = this._onMoveEnd),
          t
        );
      },
      _onAnimZoom(t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform(t, e) {
        var i = this._map.getZoomScale(e, this._zoom),
          o = this._map.getSize().multiplyBy(0.5 + this.options.padding),
          s = this._map.project(this._center, e),
          o = o
            .multiplyBy(-i)
            .add(s)
            .subtract(this._map._getNewPixelOrigin(t, e));
        xt(this._container, o, i);
      },
      _onMoveEnd(t) {
        var e = this.options.padding,
          i = this._map.getSize(),
          o = this._map.containerPointToLayerPoint(i.multiplyBy(-e)).round();
        (this._bounds = new m(o, o.add(i.multiplyBy(1 + 2 * e)).round())),
          (this._center = this._map.getCenter()),
          (this._zoom = this._map.getZoom()),
          this._updateTransform(this._center, this._zoom),
          this._onSettled(t);
      },
      _reset() {
        this._onSettled(),
          this._updateTransform(this._center, this._zoom),
          this._onViewReset();
      },
      _initContainer() {
        this._container = b('div');
      },
      _destroyContainer() {
        z(this._container), this._container.remove(), delete this._container;
      },
      _resizeContainer() {
        var t = this.options.padding,
          t = this._map
            .getSize()
            .multiplyBy(1 + 2 * t)
            .round();
        return (
          (this._container.style.width = t.x + 'px'),
          (this._container.style.height = t.y + 'px'),
          t
        );
      },
      _onZoomEnd: r,
      _onViewReset: r,
      _onSettled: r,
    }),
    qe = S.extend({
      options: {
        opacity: 1,
        alt: '',
        interactive: !1,
        crossOrigin: !1,
        errorOverlayUrl: '',
        zIndex: 1,
        className: '',
        decoding: 'auto',
      },
      initialize(t, e, i) {
        (this._url = t), (this._bounds = f(e)), n(this, i);
      },
      onAdd() {
        this._image ||
          (this._initImage(),
          this.options.opacity < 1 && this._updateOpacity()),
          this.options.interactive &&
            (this._image.classList.add('leaflet-interactive'),
            this.addInteractiveTarget(this._image)),
          this.getPane().appendChild(this._image),
          this._reset();
      },
      onRemove() {
        this._image.remove(),
          this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      setOpacity(t) {
        return (
          (this.options.opacity = t), this._image && this._updateOpacity(), this
        );
      },
      setStyle(t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      bringToFront() {
        return this._map && yt(this._image), this;
      },
      bringToBack() {
        return this._map && vt(this._image), this;
      },
      setUrl(t) {
        return (this._url = t), this._image && (this._image.src = t), this;
      },
      setBounds(t) {
        return (this._bounds = f(t)), this._map && this._reset(), this;
      },
      getEvents() {
        var t = { zoom: this._reset, viewreset: this._reset };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      setZIndex(t) {
        return (this.options.zIndex = t), this._updateZIndex(), this;
      },
      getBounds() {
        return this._bounds;
      },
      getElement() {
        return this._image;
      },
      _initImage() {
        var t = 'IMG' === this._url.tagName,
          e = (this._image = t ? this._url : b('img'));
        e.classList.add('leaflet-image-layer'),
          this._zoomAnimated && e.classList.add('leaflet-zoom-animated'),
          this.options.className &&
            e.classList.add(...l(this.options.className)),
          (e.onselectstart = r),
          (e.onmousemove = r),
          (e.onload = this.fire.bind(this, 'load')),
          (e.onerror = this._overlayOnError.bind(this)),
          (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
            (e.crossOrigin =
              !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
          (e.decoding = this.options.decoding),
          this.options.zIndex && this._updateZIndex(),
          t
            ? (this._url = e.src)
            : ((e.src = this._url), (e.alt = this.options.alt));
      },
      _animateZoom(t) {
        var e = this._map.getZoomScale(t.zoom),
          t = this._map._latLngBoundsToNewLayerBounds(
            this._bounds,
            t.zoom,
            t.center
          ).min;
        xt(this._image, t, e);
      },
      _reset() {
        var t = this._image,
          e = new m(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ),
          i = e.getSize();
        L(t, e.min),
          (t.style.width = i.x + 'px'),
          (t.style.height = i.y + 'px');
      },
      _updateOpacity() {
        this._image.style.opacity = this.options.opacity;
      },
      _updateZIndex() {
        this._image &&
          void 0 !== this.options.zIndex &&
          null !== this.options.zIndex &&
          (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError() {
        this.fire('error');
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && ((this._url = t), (this._image.src = t));
      },
      getCenter() {
        return this._bounds.getCenter();
      },
    });
  function Ke(t, e, i) {
    return new qe(t, e, i);
  }
  const $e = qe.extend({
    options: {
      autoplay: !0,
      loop: !0,
      keepAspectRatio: !0,
      muted: !1,
      playsInline: !0,
    },
    _initImage() {
      var t = 'VIDEO' === this._url.tagName,
        e = (this._image = t ? this._url : b('video'));
      if (
        (e.classList.add('leaflet-image-layer'),
        this._zoomAnimated && e.classList.add('leaflet-zoom-animated'),
        this.options.className && e.classList.add(...l(this.options.className)),
        (e.onselectstart = r),
        (e.onmousemove = r),
        (e.onloadeddata = this.fire.bind(this, 'load')),
        t)
      ) {
        var i = e.getElementsByTagName('source'),
          o = [];
        for (let t = 0; t < i.length; t++) o.push(i[t].src);
        this._url = 0 < i.length ? o : [e.src];
      } else {
        Array.isArray(this._url) || (this._url = [this._url]),
          !this.options.keepAspectRatio &&
            Object.hasOwn(e.style, 'objectFit') &&
            (e.style.objectFit = 'fill'),
          (e.autoplay = !!this.options.autoplay),
          (e.loop = !!this.options.loop),
          (e.muted = !!this.options.muted),
          (e.playsInline = !!this.options.playsInline);
        for (let t = 0; t < this._url.length; t++) {
          var s = b('source');
          (s.src = this._url[t]), e.appendChild(s);
        }
      }
    },
  });
  function Ye(t, e, i) {
    return new $e(t, e, i);
  }
  const Xe = qe.extend({
    _initImage() {
      var t = (this._image = this._url);
      t.classList.add('leaflet-image-layer'),
        this._zoomAnimated && t.classList.add('leaflet-zoom-animated'),
        this.options.className && t.classList.add(...l(this.options.className)),
        (t.onselectstart = r),
        (t.onmousemove = r);
    },
  });
  function Je(t, e, i) {
    return new Xe(t, e, i);
  }
  const B = S.extend({
      options: {
        interactive: !1,
        offset: [0, 0],
        className: '',
        pane: void 0,
        content: '',
      },
      initialize(t, e) {
        t && (t instanceof u || Array.isArray(t))
          ? ((this._latlng = w(t)), n(this, e))
          : (n(this, t), (this._source = e)),
          this.options.content && (this._content = this.options.content);
      },
      openOn(t) {
        return (
          (t = arguments.length ? t : this._source._map).hasLayer(this) ||
            t.addLayer(this),
          this
        );
      },
      close() {
        return this._map && this._map.removeLayer(this), this;
      },
      toggle(t) {
        return (
          this._map
            ? this.close()
            : (arguments.length ? (this._source = t) : (t = this._source),
              this._prepareOpen(),
              this.openOn(t._map)),
          this
        );
      },
      onAdd(t) {
        (this._zoomAnimated = t._zoomAnimated),
          this._container || this._initLayout(),
          t._fadeAnimated && (this._container.style.opacity = 0),
          clearTimeout(this._removeTimeout),
          this.getPane().appendChild(this._container),
          this.update(),
          t._fadeAnimated && (this._container.style.opacity = 1),
          this.bringToFront(),
          this.options.interactive &&
            (this._container.classList.add('leaflet-interactive'),
            this.addInteractiveTarget(this._container));
      },
      onRemove(t) {
        t._fadeAnimated
          ? ((this._container.style.opacity = 0),
            (this._removeTimeout = setTimeout(
              () => this._container.remove(),
              200
            )))
          : this._container.remove(),
          this.options.interactive &&
            (this._container.classList.remove('leaflet-interactive'),
            this.removeInteractiveTarget(this._container));
      },
      getLatLng() {
        return this._latlng;
      },
      setLatLng(t) {
        return (
          (this._latlng = w(t)),
          this._map && (this._updatePosition(), this._adjustPan()),
          this
        );
      },
      getContent() {
        return this._content;
      },
      setContent(t) {
        return (this._content = t), this.update(), this;
      },
      getElement() {
        return this._container;
      },
      update() {
        this._map &&
          ((this._container.style.visibility = 'hidden'),
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          (this._container.style.visibility = ''),
          this._adjustPan());
      },
      getEvents() {
        var t = { zoom: this._updatePosition, viewreset: this._updatePosition };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      isOpen() {
        return !!this._map && this._map.hasLayer(this);
      },
      bringToFront() {
        return this._map && yt(this._container), this;
      },
      bringToBack() {
        return this._map && vt(this._container), this;
      },
      _prepareOpen(t) {
        let e = this._source;
        if (!e._map) return !1;
        if (e instanceof E) {
          e = null;
          var i = this._source._layers;
          for (const o in i)
            if (i[o]._map) {
              e = i[o];
              break;
            }
          if (!e) return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter) t = e.getCenter();
          else if (e.getLatLng) t = e.getLatLng();
          else {
            if (!e.getBounds)
              throw new Error('Unable to get source layer LatLng.');
            t = e.getBounds().getCenter();
          }
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent() {
        if (this._content) {
          var t = this._contentNode,
            e =
              'function' == typeof this._content
                ? this._content(this._source || this)
                : this._content;
          if ('string' == typeof e) t.innerHTML = e;
          else {
            for (; t.hasChildNodes(); ) t.removeChild(t.firstChild);
            t.appendChild(e);
          }
          this.fire('contentupdate');
        }
      },
      _updatePosition() {
        if (this._map) {
          var e = this._map.latLngToLayerPoint(this._latlng),
            i = this._getAnchor();
          let t = g(this.options.offset);
          this._zoomAnimated
            ? L(this._container, e.add(i))
            : (t = t.add(e).add(i));
          (e = this._containerBottom = -t.y),
            (i = this._containerLeft =
              -Math.round(this._containerWidth / 2) + t.x);
          (this._container.style.bottom = e + 'px'),
            (this._container.style.left = i + 'px');
        }
      },
      _getAnchor() {
        return [0, 0];
      },
    }),
    Qe =
      (Z.include({
        _initOverlay(t, e, i, o) {
          let s = e;
          return (
            s instanceof t || (s = new t(o).setContent(e)),
            i && s.setLatLng(i),
            s
          );
        },
      }),
      S.include({
        _initOverlay(t, e, i, o) {
          let s = i;
          return (
            s instanceof t
              ? (n(s, o), (s._source = this))
              : (s = e && !o ? e : new t(o, this)).setContent(i),
            s
          );
        },
      }),
      B.extend({
        options: {
          pane: 'popupPane',
          offset: [0, 7],
          maxWidth: 300,
          minWidth: 50,
          maxHeight: null,
          autoPan: !0,
          autoPanPaddingTopLeft: null,
          autoPanPaddingBottomRight: null,
          autoPanPadding: [5, 5],
          keepInView: !1,
          closeButton: !0,
          closeButtonLabel: 'Close popup',
          autoClose: !0,
          closeOnEscapeKey: !0,
          className: '',
        },
        openOn(t) {
          return (
            !(t = arguments.length ? t : this._source._map).hasLayer(this) &&
              t._popup &&
              t._popup.options.autoClose &&
              t.removeLayer(t._popup),
            (t._popup = this),
            B.prototype.openOn.call(this, t)
          );
        },
        onAdd(t) {
          B.prototype.onAdd.call(this, t),
            t.fire('popupopen', { popup: this }),
            this._source &&
              (this._source.fire('popupopen', { popup: this }, !0),
              this._source instanceof Ze || this._source.on('preclick', Nt));
        },
        onRemove(t) {
          B.prototype.onRemove.call(this, t),
            t.fire('popupclose', { popup: this }),
            this._source &&
              (this._source.fire('popupclose', { popup: this }, !0),
              this._source instanceof Ze || this._source.off('preclick', Nt));
        },
        getEvents() {
          var t = B.prototype.getEvents.call(this);
          return (
            (void 0 !== this.options.closeOnClick
              ? this.options.closeOnClick
              : this._map.options.closePopupOnClick) &&
              (t.preclick = this.close),
            this.options.keepInView && (t.moveend = this._adjustPan),
            t
          );
        },
        _initLayout() {
          var t = 'leaflet-popup',
            e = (this._container = b(
              'div',
              t + ` ${this.options.className || ''} leaflet-zoom-animated`
            )),
            i = (this._wrapper = b('div', t + '-content-wrapper', e));
          (this._contentNode = b('div', t + '-content', i)),
            Ht(e),
            Wt(this._contentNode),
            P(e, 'contextmenu', Nt),
            (this._tipContainer = b('div', t + '-tip-container', e)),
            (this._tip = b('div', t + '-tip', this._tipContainer)),
            this.options.closeButton &&
              ((i = this._closeButton =
                b('a', t + '-close-button', e)).setAttribute('role', 'button'),
              i.setAttribute('aria-label', this.options.closeButtonLabel),
              (i.href = '#close'),
              (i.innerHTML = '<span aria-hidden="true">&#215;</span>'),
              P(
                i,
                'click',
                function (t) {
                  M(t), this.close();
                },
                this
              ));
        },
        _updateLayout() {
          var t = this._contentNode,
            e = t.style,
            i = ((e.width = ''), (e.whiteSpace = 'nowrap'), t.offsetWidth),
            i = Math.min(i, this.options.maxWidth),
            i =
              ((i = Math.max(i, this.options.minWidth)),
              (e.width = i + 1 + 'px'),
              (e.whiteSpace = ''),
              (e.height = ''),
              t.offsetHeight),
            o = this.options.maxHeight,
            s = 'leaflet-popup-scrolled';
          o && o < i
            ? ((e.height = o + 'px'), t.classList.add(s))
            : t.classList.remove(s),
            (this._containerWidth = this._container.offsetWidth);
        },
        _animateZoom(t) {
          var t = this._map._latLngToNewLayerPoint(
              this._latlng,
              t.zoom,
              t.center
            ),
            e = this._getAnchor();
          L(this._container, t.add(e));
        },
        _adjustPan() {
          if (this.options.autoPan)
            if (
              (this._map._panAnim && this._map._panAnim.stop(),
              this._autopanning)
            )
              this._autopanning = !1;
            else {
              var i = this._map,
                o =
                  parseInt(
                    getComputedStyle(this._container).marginBottom,
                    10
                  ) || 0,
                o = this._container.offsetHeight + o,
                s = this._containerWidth,
                n = new c(this._containerLeft, -o - this._containerBottom),
                n =
                  (n._add(bt(this._container)),
                  i.layerPointToContainerPoint(n)),
                r = g(this.options.autoPanPadding),
                a = g(this.options.autoPanPaddingTopLeft || r),
                r = g(this.options.autoPanPaddingBottomRight || r),
                h = i.getSize();
              let t = 0,
                e = 0;
              n.x + s + r.x > h.x && (t = n.x + s - h.x + r.x),
                n.x - t - a.x < 0 && (t = n.x - a.x),
                n.y + o + r.y > h.y && (e = n.y + o - h.y + r.y),
                n.y - e - a.y < 0 && (e = n.y - a.y),
                (t || e) &&
                  (this.options.keepInView && (this._autopanning = !0),
                  i.fire('autopanstart').panBy([t, e]));
            }
        },
        _getAnchor() {
          return g(
            this._source && this._source._getPopupAnchor
              ? this._source._getPopupAnchor()
              : [0, 0]
          );
        },
      }));
  function ti(t, e) {
    return new Qe(t, e);
  }
  Z.mergeOptions({ closePopupOnClick: !0 }),
    Z.include({
      openPopup(t, e, i) {
        return this._initOverlay(Qe, t, e, i).openOn(this), this;
      },
      closePopup(t) {
        return (t = arguments.length ? t : this._popup) && t.close(), this;
      },
    }),
    S.include({
      bindPopup(t, e) {
        return (
          (this._popup = this._initOverlay(Qe, this._popup, t, e)),
          this._popupHandlersAdded ||
            (this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup,
            }),
            (this._popupHandlersAdded = !0)),
          this
        );
      },
      unbindPopup() {
        return (
          this._popup &&
            (this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup,
            }),
            (this._popupHandlersAdded = !1),
            (this._popup = null)),
          this
        );
      },
      openPopup(t) {
        return (
          this._popup &&
            (this instanceof E || (this._popup._source = this),
            this._popup._prepareOpen(t || this._latlng)) &&
            this._popup.openOn(this._map),
          this
        );
      },
      closePopup() {
        return this._popup && this._popup.close(), this;
      },
      togglePopup() {
        return this._popup && this._popup.toggle(this), this;
      },
      isPopupOpen() {
        return !!this._popup && this._popup.isOpen();
      },
      setPopupContent(t) {
        return this._popup && this._popup.setContent(t), this;
      },
      getPopup() {
        return this._popup;
      },
      _openPopup(t) {
        var e;
        this._popup &&
          this._map &&
          (Ft(t),
          (e = t.layer || t.target),
          this._popup._source !== e || e instanceof Ze
            ? ((this._popup._source = e), this.openPopup(t.latlng))
            : this._map.hasLayer(this._popup)
            ? this.closePopup()
            : this.openPopup(t.latlng));
      },
      _movePopup(t) {
        this._popup.setLatLng(t.latlng);
      },
      _onKeyPress(t) {
        'Enter' === t.originalEvent.code && this._openPopup(t);
      },
    });
  const ei = B.extend({
    options: {
      pane: 'tooltipPane',
      offset: [0, 0],
      direction: 'auto',
      permanent: !1,
      sticky: !1,
      opacity: 0.9,
    },
    onAdd(t) {
      B.prototype.onAdd.call(this, t),
        this.setOpacity(this.options.opacity),
        t.fire('tooltipopen', { tooltip: this }),
        this._source &&
          (this.addEventParent(this._source),
          this._source.fire('tooltipopen', { tooltip: this }, !0));
    },
    onRemove(t) {
      B.prototype.onRemove.call(this, t),
        t.fire('tooltipclose', { tooltip: this }),
        this._source &&
          (this.removeEventParent(this._source),
          this._source.fire('tooltipclose', { tooltip: this }, !0));
    },
    getEvents() {
      var t = B.prototype.getEvents.call(this);
      return this.options.permanent || (t.preclick = this.close), t;
    },
    _initLayout() {
      var t =
        `leaflet-tooltip ${this.options.className || ''} leaflet-zoom-` +
        (this._zoomAnimated ? 'animated' : 'hide');
      (this._contentNode = this._container = b('div', t)),
        this._container.setAttribute('role', 'tooltip'),
        this._container.setAttribute('id', 'leaflet-tooltip-' + a(this));
    },
    _updateLayout() {},
    _adjustPan() {},
    _setPosition(t) {
      let e,
        i,
        o = this.options.direction;
      var s = this._map,
        n = this._container,
        r = s.latLngToContainerPoint(s.getCenter()),
        s = s.layerPointToContainerPoint(t),
        a = n.offsetWidth,
        h = n.offsetHeight,
        l = g(this.options.offset),
        d = this._getAnchor();
      (i =
        'top' === o
          ? ((e = a / 2), h)
          : 'bottom' === o
          ? ((e = a / 2), 0)
          : ((e =
              'center' === o
                ? a / 2
                : 'right' === o
                ? 0
                : 'left' === o
                ? a
                : s.x < r.x
                ? ((o = 'right'), 0)
                : ((o = 'left'), a + 2 * (l.x + d.x))),
            h / 2)),
        (t = t.subtract(g(e, i, !0)).add(l).add(d)),
        n.classList.remove(
          'leaflet-tooltip-right',
          'leaflet-tooltip-left',
          'leaflet-tooltip-top',
          'leaflet-tooltip-bottom'
        ),
        n.classList.add('leaflet-tooltip-' + o),
        L(n, t);
    },
    _updatePosition() {
      var t = this._map.latLngToLayerPoint(this._latlng);
      this._setPosition(t);
    },
    setOpacity(t) {
      (this.options.opacity = t),
        this._container && (this._container.style.opacity = t);
    },
    _animateZoom(t) {
      t = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
      this._setPosition(t);
    },
    _getAnchor() {
      return g(
        this._source && this._source._getTooltipAnchor && !this.options.sticky
          ? this._source._getTooltipAnchor()
          : [0, 0]
      );
    },
  });
  function ii(t, e) {
    return new ei(t, e);
  }
  Z.include({
    openTooltip(t, e, i) {
      return this._initOverlay(ei, t, e, i).openOn(this), this;
    },
    closeTooltip(t) {
      return t.close(), this;
    },
  }),
    S.include({
      bindTooltip(t, e) {
        return (
          this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
          (this._tooltip = this._initOverlay(ei, this._tooltip, t, e)),
          this._initTooltipInteractions(),
          this._tooltip.options.permanent &&
            this._map &&
            this._map.hasLayer(this) &&
            this.openTooltip(),
          this
        );
      },
      unbindTooltip() {
        return (
          this._tooltip &&
            (this._initTooltipInteractions(!0),
            this.closeTooltip(),
            (this._tooltip = null)),
          this
        );
      },
      _initTooltipInteractions(t) {
        var e, i;
        (!t && this._tooltipHandlersAdded) ||
          ((e = t ? 'off' : 'on'),
          (i = { remove: this.closeTooltip, move: this._moveTooltip }),
          this._tooltip.options.permanent
            ? (i.add = this._openTooltip)
            : ((i.mouseover = this._openTooltip),
              (i.mouseout = this.closeTooltip),
              (i.click = this._openTooltip),
              this._map
                ? this._addFocusListeners()
                : (i.add = this._addFocusListeners)),
          this._tooltip.options.sticky && (i.mousemove = this._moveTooltip),
          this[e](i),
          (this._tooltipHandlersAdded = !t));
      },
      openTooltip(t) {
        return (
          this._tooltip &&
            (this instanceof E || (this._tooltip._source = this),
            this._tooltip._prepareOpen(t)) &&
            (this._tooltip.openOn(this._map),
            this.getElement
              ? this._setAriaDescribedByOnLayer(this)
              : this.eachLayer &&
                this.eachLayer(this._setAriaDescribedByOnLayer, this)),
          this
        );
      },
      closeTooltip() {
        if (this._tooltip) return this._tooltip.close();
      },
      toggleTooltip() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      isTooltipOpen() {
        return this._tooltip.isOpen();
      },
      setTooltipContent(t) {
        return this._tooltip && this._tooltip.setContent(t), this;
      },
      getTooltip() {
        return this._tooltip;
      },
      _addFocusListeners() {
        this.getElement
          ? this._addFocusListenersOnLayer(this)
          : this.eachLayer &&
            this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer(t) {
        var e = 'function' == typeof t.getElement && t.getElement();
        e &&
          (P(
            e,
            'focus',
            function () {
              (this._tooltip._source = t), this.openTooltip();
            },
            this
          ),
          P(e, 'blur', this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer(t) {
        t = 'function' == typeof t.getElement && t.getElement();
        t && t.setAttribute('aria-describedby', this._tooltip._container.id);
      },
      _openTooltip(t) {
        this._tooltip &&
          this._map &&
          (this._map.dragging && this._map.dragging.moving()
            ? 'add' !== t.type ||
              this._moveEndOpensTooltip ||
              ((this._moveEndOpensTooltip = !0),
              this._map.once('moveend', () => {
                (this._moveEndOpensTooltip = !1), this._openTooltip(t);
              }))
            : ((this._tooltip._source = t.layer || t.target),
              this.openTooltip(
                this._tooltip.options.sticky ? t.latlng : void 0
              )));
      },
      _moveTooltip(t) {
        let e = t.latlng,
          i,
          o;
        this._tooltip.options.sticky &&
          t.originalEvent &&
          ((i = this._map.mouseEventToContainerPoint(t.originalEvent)),
          (o = this._map.containerPointToLayerPoint(i)),
          (e = this._map.layerPointToLatLng(o))),
          this._tooltip.setLatLng(e);
      },
    });
  const oi = be.extend({
    options: {
      iconSize: [12, 12],
      html: !1,
      bgPos: null,
      className: 'leaflet-div-icon',
    },
    createIcon(t) {
      var t = t && 'DIV' === t.tagName ? t : document.createElement('div'),
        e = this.options;
      return (
        e.html instanceof Element
          ? (t.replaceChildren(), t.appendChild(e.html))
          : (t.innerHTML = !1 !== e.html ? e.html : ''),
        e.bgPos &&
          ((e = g(e.bgPos)),
          (t.style.backgroundPosition = `${-e.x}px ${-e.y}px`)),
        this._setIconStyles(t, 'icon'),
        t
      );
    },
    createShadow() {
      return null;
    },
  });
  function si(t) {
    return new oi(t);
  }
  be.Default = Pe;
  const ni = S.extend({
    options: {
      tileSize: 256,
      opacity: 1,
      updateWhenIdle: v.mobile,
      updateWhenZooming: !0,
      updateInterval: 200,
      zIndex: 1,
      bounds: null,
      minZoom: 0,
      maxZoom: void 0,
      maxNativeZoom: void 0,
      minNativeZoom: void 0,
      noWrap: !1,
      pane: 'tilePane',
      className: '',
      keepBuffer: 2,
    },
    initialize(t) {
      n(this, t);
    },
    onAdd() {
      this._initContainer(),
        (this._levels = {}),
        (this._tiles = {}),
        this._resetView();
    },
    beforeAdd(t) {
      t._addZoomLimit(this);
    },
    onRemove(t) {
      this._removeAllTiles(),
        this._container.remove(),
        t._removeZoomLimit(this),
        (this._container = null),
        (this._tileZoom = void 0);
    },
    bringToFront() {
      return (
        this._map && (yt(this._container), this._setAutoZIndex(Math.max)), this
      );
    },
    bringToBack() {
      return (
        this._map && (vt(this._container), this._setAutoZIndex(Math.min)), this
      );
    },
    getContainer() {
      return this._container;
    },
    setOpacity(t) {
      return (this.options.opacity = t), this._updateOpacity(), this;
    },
    setZIndex(t) {
      return (this.options.zIndex = t), this._updateZIndex(), this;
    },
    isLoading() {
      return this._loading;
    },
    redraw() {
      var t;
      return (
        this._map &&
          (this._removeAllTiles(),
          (t = this._clampZoom(this._map.getZoom())) !== this._tileZoom &&
            ((this._tileZoom = t), this._updateLevels()),
          this._update()),
        this
      );
    },
    getEvents() {
      var t = {
        viewprereset: this._invalidateAll,
        viewreset: this._resetView,
        zoom: this._resetView,
        moveend: this._onMoveEnd,
      };
      return (
        this.options.updateWhenIdle ||
          (this._onMove ||
            (this._onMove = j(
              this._onMoveEnd,
              this.options.updateInterval,
              this
            )),
          (t.move = this._onMove)),
        this._zoomAnimated && (t.zoomanim = this._animateZoom),
        t
      );
    },
    createTile() {
      return document.createElement('div');
    },
    getTileSize() {
      var t = this.options.tileSize;
      return t instanceof c ? t : new c(t, t);
    },
    _updateZIndex() {
      this._container &&
        void 0 !== this.options.zIndex &&
        null !== this.options.zIndex &&
        (this._container.style.zIndex = this.options.zIndex);
    },
    _setAutoZIndex(o) {
      var s = this.getPane().children;
      let n = -o(-1 / 0, 1 / 0);
      for (let t = 0, e = s.length, i; t < e; t++)
        (i = s[t].style.zIndex),
          s[t] !== this._container && i && (n = o(n, +i));
      isFinite(n) &&
        ((this.options.zIndex = n + o(-1, 1)), this._updateZIndex());
    },
    _updateOpacity() {
      if (this._map) {
        this._container.style.opacity = this.options.opacity;
        var i,
          o,
          s = +new Date();
        let t = !1,
          e = !1;
        for (const n in this._tiles)
          Object.hasOwn(this._tiles, n) &&
            (i = this._tiles[n]).current &&
            i.loaded &&
            ((o = Math.min(1, (s - i.loaded) / 200)),
            (i.el.style.opacity = o) < 1
              ? (t = !0)
              : (i.active ? (e = !0) : this._onOpaqueTile(i), (i.active = !0)));
        e && !this._noPrune && this._pruneTiles(),
          t &&
            (d(this._fadeFrame),
            (this._fadeFrame = x(this._updateOpacity, this)));
      }
    },
    _onOpaqueTile: r,
    _initContainer() {
      this._container ||
        ((this._container = b(
          'div',
          'leaflet-layer ' + (this.options.className || '')
        )),
        this._updateZIndex(),
        this.options.opacity < 1 && this._updateOpacity(),
        this.getPane().appendChild(this._container));
    },
    _updateLevels() {
      var e = this._tileZoom,
        i = this.options.maxZoom;
      if (void 0 !== e) {
        for (var o in this._levels)
          Object.hasOwn(this._levels, o) &&
            ((o = Number(o)),
            this._levels[o].el.children.length || o === e
              ? ((this._levels[o].el.style.zIndex = i - Math.abs(e - o)),
                this._onUpdateLevel(o))
              : (this._levels[o].el.remove(),
                this._removeTilesAtZoom(o),
                this._onRemoveLevel(o),
                delete this._levels[o]));
        let t = this._levels[e];
        var s = this._map;
        return (
          t ||
            (((t = this._levels[e] = {}).el = b(
              'div',
              'leaflet-tile-container leaflet-zoom-animated',
              this._container
            )),
            (t.el.style.zIndex = i),
            (t.origin = s.project(s.unproject(s.getPixelOrigin()), e).round()),
            (t.zoom = e),
            this._setZoomTransform(t, s.getCenter(), s.getZoom()),
            r(t.el.offsetWidth),
            this._onCreateLevel(t)),
          (this._level = t)
        );
      }
    },
    _onUpdateLevel: r,
    _onRemoveLevel: r,
    _onCreateLevel: r,
    _pruneTiles() {
      if (this._map) {
        let t, e;
        var i,
          o = this._map.getZoom();
        if (o > this.options.maxZoom || o < this.options.minZoom)
          this._removeAllTiles();
        else {
          for (t in this._tiles)
            Object.hasOwn(this._tiles, t) &&
              ((e = this._tiles[t]).retain = e.current);
          for (t in this._tiles)
            Object.hasOwn(this._tiles, t) &&
              (e = this._tiles[t]).current &&
              !e.active &&
              ((i = e.coords),
              this._retainParent(i.x, i.y, i.z, i.z - 5) ||
                this._retainChildren(i.x, i.y, i.z, i.z + 2));
          for (t in this._tiles) this._tiles[t].retain || this._removeTile(t);
        }
      }
    },
    _removeTilesAtZoom(t) {
      for (const e in this._tiles)
        this._tiles[e].coords.z === t && this._removeTile(e);
    },
    _removeAllTiles() {
      for (const t in this._tiles)
        Object.hasOwn(this._tiles, t) && this._removeTile(t);
    },
    _invalidateAll() {
      for (const t in this._levels)
        Object.hasOwn(this._levels, t) &&
          (this._levels[t].el.remove(),
          this._onRemoveLevel(Number(t)),
          delete this._levels[t]);
      this._removeAllTiles(), (this._tileZoom = void 0);
    },
    _retainParent(t, e, i, o) {
      var t = Math.floor(t / 2),
        e = Math.floor(e / 2),
        i = i - 1,
        s = new c(+t, +e),
        s = ((s.z = i), this._tileCoordsToKey(s)),
        s = this._tiles[s];
      return s && s.active
        ? (s.retain = !0)
        : (s && s.loaded && (s.retain = !0),
          o < i && this._retainParent(t, e, i, o));
    },
    _retainChildren(t, i, o, s) {
      for (let e = 2 * t; e < 2 * t + 2; e++)
        for (let t = 2 * i; t < 2 * i + 2; t++) {
          var n = new c(e, t),
            n = ((n.z = o + 1), this._tileCoordsToKey(n)),
            n = this._tiles[n];
          n && n.active
            ? (n.retain = !0)
            : (n && n.loaded && (n.retain = !0),
              o + 1 < s && this._retainChildren(e, t, o + 1, s));
        }
    },
    _resetView(t) {
      t = t && (t.pinch || t.flyTo);
      this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
    },
    _animateZoom(t) {
      this._setView(t.center, t.zoom, !0, t.noUpdate);
    },
    _clampZoom(t) {
      var e = this.options;
      return void 0 !== e.minNativeZoom && t < e.minNativeZoom
        ? e.minNativeZoom
        : void 0 !== e.maxNativeZoom && e.maxNativeZoom < t
        ? e.maxNativeZoom
        : t;
    },
    _setView(t, e, i, o) {
      let s = Math.round(e);
      s =
        (void 0 !== this.options.maxZoom && s > this.options.maxZoom) ||
        (void 0 !== this.options.minZoom && s < this.options.minZoom)
          ? void 0
          : this._clampZoom(s);
      var n = this.options.updateWhenZooming && s !== this._tileZoom;
      (o && !n) ||
        ((this._tileZoom = s),
        this._abortLoading && this._abortLoading(),
        this._updateLevels(),
        this._resetGrid(),
        void 0 !== s && this._update(t),
        i || this._pruneTiles(),
        (this._noPrune = !!i)),
        this._setZoomTransforms(t, e);
    },
    _setZoomTransforms(t, e) {
      for (const i in this._levels)
        Object.hasOwn(this._levels, i) &&
          this._setZoomTransform(this._levels[i], t, e);
    },
    _setZoomTransform(t, e, i) {
      var o = this._map.getZoomScale(i, t.zoom),
        e = t.origin
          .multiplyBy(o)
          .subtract(this._map._getNewPixelOrigin(e, i))
          .round();
      xt(t.el, e, o);
    },
    _resetGrid() {
      var t = this._map,
        e = t.options.crs,
        i = (this._tileSize = this.getTileSize()),
        o = this._tileZoom,
        s = this._map.getPixelWorldBounds(this._tileZoom);
      s && (this._globalTileRange = this._pxBoundsToTileRange(s)),
        (this._wrapX = e.wrapLng &&
          !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], o).x / i.x),
            Math.ceil(t.project([0, e.wrapLng[1]], o).x / i.y),
          ]),
        (this._wrapY = e.wrapLat &&
          !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], o).y / i.x),
            Math.ceil(t.project([e.wrapLat[1], 0], o).y / i.y),
          ]);
    },
    _onMoveEnd() {
      this._map && !this._map._animatingZoom && this._update();
    },
    _getTiledPixelBounds(t) {
      var e = this._map,
        i = e._animatingZoom
          ? Math.max(e._animateToZoom, e.getZoom())
          : e.getZoom(),
        i = e.getZoomScale(i, this._tileZoom),
        t = e.project(t, this._tileZoom).floor(),
        e = e.getSize().divideBy(2 * i);
      return new m(t.subtract(e), t.add(e));
    },
    _update(t) {
      var e = this._map;
      if (e) {
        var i,
          o = this._clampZoom(e.getZoom());
        if ((void 0 === t && (t = e.getCenter()), void 0 !== this._tileZoom)) {
          const a = this._getTiledPixelBounds(t),
            h = this._pxBoundsToTileRange(a),
            l = h.getCenter(),
            d = [],
            _ = this.options.keepBuffer,
            p = new m(
              h.getBottomLeft().subtract([_, -_]),
              h.getTopRight().add([_, -_])
            );
          if (
            !(
              isFinite(h.min.x) &&
              isFinite(h.min.y) &&
              isFinite(h.max.x) &&
              isFinite(h.max.y)
            )
          )
            throw new Error('Attempted to load an infinite number of tiles');
          for (const u in this._tiles)
            !Object.hasOwn(this._tiles, u) ||
              ((i = this._tiles[u].coords).z === this._tileZoom &&
                p.contains(new c(i.x, i.y))) ||
              (this._tiles[u].current = !1);
          if (1 < Math.abs(o - this._tileZoom)) this._setView(t, o);
          else {
            for (let e = h.min.y; e <= h.max.y; e++)
              for (let t = h.min.x; t <= h.max.x; t++) {
                var s,
                  n = new c(t, e);
                (n.z = this._tileZoom),
                  this._isValidTile(n) &&
                    ((s = this._tiles[this._tileCoordsToKey(n)])
                      ? (s.current = !0)
                      : d.push(n));
              }
            if (
              (d.sort((t, e) => t.distanceTo(l) - e.distanceTo(l)),
              0 !== d.length)
            ) {
              this._loading || ((this._loading = !0), this.fire('loading'));
              var r = document.createDocumentFragment();
              for (let t = 0; t < d.length; t++) this._addTile(d[t], r);
              this._level.el.appendChild(r);
            }
          }
        }
      }
    },
    _isValidTile(t) {
      var e = this._map.options.crs;
      if (!e.infinite) {
        var i = this._globalTileRange;
        if (
          (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x)) ||
          (!e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
        )
          return !1;
      }
      return (
        !this.options.bounds ||
        ((e = this._tileCoordsToBounds(t)), f(this.options.bounds).overlaps(e))
      );
    },
    _keyToBounds(t) {
      return this._tileCoordsToBounds(this._keyToTileCoords(t));
    },
    _tileCoordsToNwSe(t) {
      var e = this._map,
        i = this.getTileSize(),
        o = t.scaleBy(i),
        i = o.add(i);
      return [e.unproject(o, t.z), e.unproject(i, t.z)];
    },
    _tileCoordsToBounds(t) {
      t = this._tileCoordsToNwSe(t);
      let e = new p(t[0], t[1]);
      return (e = this.options.noWrap ? e : this._map.wrapLatLngBounds(e));
    },
    _tileCoordsToKey(t) {
      return `${t.x}:${t.y}:` + t.z;
    },
    _keyToTileCoords(t) {
      var t = t.split(':'),
        e = new c(+t[0], +t[1]);
      return (e.z = +t[2]), e;
    },
    _removeTile(t) {
      var e = this._tiles[t];
      e &&
        (e.el.remove(),
        delete this._tiles[t],
        this.fire('tileunload', {
          tile: e.el,
          coords: this._keyToTileCoords(t),
        }));
    },
    _initTile(t) {
      t.classList.add('leaflet-tile');
      var e = this.getTileSize();
      (t.style.width = e.x + 'px'),
        (t.style.height = e.y + 'px'),
        (t.onselectstart = r),
        (t.onmousemove = r);
    },
    _addTile(t, e) {
      var i = this._getTilePos(t),
        o = this._tileCoordsToKey(t),
        s = this.createTile(this._wrapCoords(t), this._tileReady.bind(this, t));
      this._initTile(s),
        this.createTile.length < 2 && x(this._tileReady.bind(this, t, null, s)),
        L(s, i),
        (this._tiles[o] = { el: s, coords: t, current: !0 }),
        e.appendChild(s),
        this.fire('tileloadstart', { tile: s, coords: t });
    },
    _tileReady(t, e, i) {
      e && this.fire('tileerror', { error: e, tile: i, coords: t });
      var o = this._tileCoordsToKey(t);
      (i = this._tiles[o]) &&
        ((i.loaded = +new Date()),
        this._map._fadeAnimated
          ? ((i.el.style.opacity = 0),
            d(this._fadeFrame),
            (this._fadeFrame = x(this._updateOpacity, this)))
          : ((i.active = !0), this._pruneTiles()),
        e ||
          (i.el.classList.add('leaflet-tile-loaded'),
          this.fire('tileload', { tile: i.el, coords: t })),
        this._noTilesToLoad()) &&
        ((this._loading = !1),
        this.fire('load'),
        this._map._fadeAnimated
          ? setTimeout(this._pruneTiles.bind(this), 250)
          : x(this._pruneTiles, this));
    },
    _getTilePos(t) {
      return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
    },
    _wrapCoords(t) {
      var e = new c(
        this._wrapX ? D(t.x, this._wrapX) : t.x,
        this._wrapY ? D(t.y, this._wrapY) : t.y
      );
      return (e.z = t.z), e;
    },
    _pxBoundsToTileRange(t) {
      var e = this.getTileSize();
      return new m(
        t.min.unscaleBy(e).floor(),
        t.max.unscaleBy(e).ceil().subtract([1, 1])
      );
    },
    _noTilesToLoad() {
      for (const t in this._tiles) if (!this._tiles[t].loaded) return !1;
      return !0;
    },
  });
  function ri(t) {
    return new ni(t);
  }
  const ai = ni.extend({
    options: {
      minZoom: 0,
      maxZoom: 18,
      subdomains: 'abc',
      errorTileUrl: '',
      zoomOffset: 0,
      tms: !1,
      zoomReverse: !1,
      detectRetina: !1,
      crossOrigin: !1,
      referrerPolicy: !1,
    },
    initialize(t, e) {
      (this._url = t),
        (e = n(this, e)).detectRetina && v.retina && 0 < e.maxZoom
          ? ((e.tileSize = Math.floor(e.tileSize / 2)),
            e.zoomReverse
              ? (e.zoomOffset--,
                (e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)))
              : (e.zoomOffset++,
                (e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1))),
            (e.minZoom = Math.max(0, e.minZoom)))
          : e.zoomReverse
          ? (e.minZoom = Math.min(e.maxZoom, e.minZoom))
          : (e.maxZoom = Math.max(e.minZoom, e.maxZoom)),
        'string' == typeof e.subdomains &&
          (e.subdomains = e.subdomains.split('')),
        this.on('tileunload', this._onTileRemove);
    },
    setUrl(t, e) {
      return (
        this._url === t && void 0 === e && (e = !0),
        (this._url = t),
        e || this.redraw(),
        this
      );
    },
    createTile(t, e) {
      var i = document.createElement('img');
      return (
        P(i, 'load', this._tileOnLoad.bind(this, e, i)),
        P(i, 'error', this._tileOnError.bind(this, e, i)),
        (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
          (i.crossOrigin =
            !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
        'string' == typeof this.options.referrerPolicy &&
          (i.referrerPolicy = this.options.referrerPolicy),
        (i.alt = ''),
        (i.src = this.getTileUrl(t)),
        i
      );
    },
    getTileUrl(t) {
      var e = {
        r: v.retina ? '@2x' : '',
        s: this._getSubdomain(t),
        x: t.x,
        y: t.y,
        z: this._getZoomForUrl(),
      };
      return (
        this._map &&
          !this._map.options.crs.infinite &&
          ((t = this._globalTileRange.max.y - t.y),
          this.options.tms && (e.y = t),
          (e['-y'] = t)),
        H(this._url, h(e, this.options))
      );
    },
    _tileOnLoad(t, e) {
      t(null, e);
    },
    _tileOnError(t, e, i) {
      var o = this.options.errorTileUrl;
      o && e.getAttribute('src') !== o && (e.src = o), t(i, e);
    },
    _onTileRemove(t) {
      t.tile.onload = null;
    },
    _getZoomForUrl() {
      let t = this._tileZoom;
      var e = this.options.maxZoom,
        i = this.options.zoomReverse,
        o = this.options.zoomOffset;
      return (t = i ? e - t : t) + o;
    },
    _getSubdomain(t) {
      t = Math.abs(t.x + t.y) % this.options.subdomains.length;
      return this.options.subdomains[t];
    },
    _abortLoading() {
      let t, e;
      for (t in this._tiles) {
        var i;
        this._tiles[t].coords.z !== this._tileZoom &&
          (((e = this._tiles[t].el).onload = r),
          (e.onerror = r),
          e.complete ||
            ((e.src = F),
            (i = this._tiles[t].coords),
            e.remove(),
            delete this._tiles[t],
            this.fire('tileabort', { tile: e, coords: i })));
      }
    },
    _removeTile(t) {
      var e = this._tiles[t];
      if (e)
        return (
          e.el.setAttribute('src', F), ni.prototype._removeTile.call(this, t)
        );
    },
    _tileReady(t, e, i) {
      if (this._map && (!i || i.getAttribute('src') !== F))
        return ni.prototype._tileReady.call(this, t, e, i);
    },
  });
  function hi(t, e) {
    return new ai(t, e);
  }
  const li = ai.extend({
    defaultWmsParams: {
      service: 'WMS',
      request: 'GetMap',
      layers: '',
      styles: '',
      format: 'image/jpeg',
      transparent: !1,
      version: '1.1.1',
    },
    options: { crs: null, uppercase: !1 },
    initialize(t, e) {
      this._url = t;
      var i = h({}, this.defaultWmsParams);
      for (const s in e) s in this.options || (i[s] = e[s]);
      var t = (e = n(this, e)).detectRetina && v.retina ? 2 : 1,
        o = this.getTileSize();
      (i.width = o.x * t), (i.height = o.y * t), (this.wmsParams = i);
    },
    onAdd(t) {
      (this._crs = this.options.crs || t.options.crs),
        (this._wmsVersion = parseFloat(this.wmsParams.version));
      var e = 1.3 <= this._wmsVersion ? 'crs' : 'srs';
      (this.wmsParams[e] = this._crs.code), ai.prototype.onAdd.call(this, t);
    },
    getTileUrl(t) {
      var e = this._tileCoordsToNwSe(t),
        i = this._crs,
        i = _(i.project(e[0]), i.project(e[1])),
        e = i.min,
        i = i.max,
        e = (
          1.3 <= this._wmsVersion && this._crs === ye
            ? [e.y, e.x, i.y, i.x]
            : [e.x, e.y, i.x, i.y]
        ).join(','),
        i = ai.prototype.getTileUrl.call(this, t);
      return (
        i +
        N(this.wmsParams, i, this.options.uppercase) +
        (this.options.uppercase ? '&BBOX=' : '&bbox=') +
        e
      );
    },
    setParams(t, e) {
      return h(this.wmsParams, t), e || this.redraw(), this;
    },
  });
  (ai.WMS = li),
    (hi.wms = function (t, e) {
      return new li(t, e);
    });
  const A = Ge.extend({
      initialize(t) {
        n(this, { ...t, continuous: !1 }),
          a(this),
          (this._layers = this._layers || {});
      },
      onAdd(t) {
        Ge.prototype.onAdd.call(this, t),
          this.on('update', this._updatePaths, this);
      },
      onRemove() {
        Ge.prototype.onRemove.call(this),
          this.off('update', this._updatePaths, this);
      },
      _onZoomEnd() {
        for (const t in this._layers)
          Object.hasOwn(this._layers, t) && this._layers[t]._project();
      },
      _updatePaths() {
        for (const t in this._layers)
          Object.hasOwn(this._layers, t) && this._layers[t]._update();
      },
      _onViewReset() {
        for (const t in this._layers)
          Object.hasOwn(this._layers, t) && this._layers[t]._reset();
      },
      _onSettled() {
        this._update();
      },
      _update: r,
    }),
    di = A.extend({
      options: { tolerance: 0 },
      getEvents() {
        var t = A.prototype.getEvents.call(this);
        return (t.viewprereset = this._onViewPreReset), t;
      },
      _onViewPreReset() {
        this._postponeUpdatePaths = !0;
      },
      onAdd(t) {
        A.prototype.onAdd.call(this, t), this._draw();
      },
      _initContainer() {
        var t = (this._container = document.createElement('canvas'));
        P(t, 'mousemove', this._onMouseMove, this),
          P(
            t,
            'click dblclick mousedown mouseup contextmenu',
            this._onClick,
            this
          ),
          P(t, 'mouseout', this._handleMouseOut, this),
          (t._leaflet_disable_events = !0),
          (this._ctx = t.getContext('2d'));
      },
      _destroyContainer() {
        d(this._redrawRequest),
          delete this._ctx,
          A.prototype._destroyContainer.call(this);
      },
      _resizeContainer() {
        var t = A.prototype._resizeContainer.call(this),
          e = (this._ctxScale = window.devicePixelRatio);
        (this._container.width = e * t.x), (this._container.height = e * t.y);
      },
      _updatePaths() {
        if (!this._postponeUpdatePaths) {
          this._redrawBounds = null;
          for (const t in this._layers)
            Object.hasOwn(this._layers, t) && this._layers[t]._update();
          this._redraw();
        }
      },
      _update() {
        var t, e;
        (this._map._animatingZoom && this._bounds) ||
          ((t = this._bounds),
          (e = this._ctxScale),
          this._ctx.setTransform(e, 0, 0, e, -t.min.x * e, -t.min.y * e),
          this.fire('update'));
      },
      _reset() {
        A.prototype._reset.call(this),
          this._postponeUpdatePaths &&
            ((this._postponeUpdatePaths = !1), this._updatePaths());
      },
      _initPath(t) {
        this._updateDashArray(t);
        t = (this._layers[a(t)] = t)._order = {
          layer: t,
          prev: this._drawLast,
          next: null,
        };
        this._drawLast && (this._drawLast.next = t),
          (this._drawLast = t),
          (this._drawFirst = this._drawFirst || this._drawLast);
      },
      _addPath(t) {
        this._requestRedraw(t);
      },
      _removePath(t) {
        var e = t._order,
          i = e.next,
          e = e.prev;
        i ? (i.prev = e) : (this._drawLast = e),
          e ? (e.next = i) : (this._drawFirst = i),
          delete t._order,
          delete this._layers[a(t)],
          this._requestRedraw(t);
      },
      _updatePath(t) {
        this._extendRedrawBounds(t),
          t._project(),
          t._update(),
          this._requestRedraw(t);
      },
      _updateStyle(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray(i) {
        if ('string' == typeof i.options.dashArray) {
          var o = i.options.dashArray.split(/[, ]+/),
            s = [];
          let t, e;
          for (e = 0; e < o.length; e++) {
            if (((t = Number(o[e])), isNaN(t))) return;
            s.push(t);
          }
          i.options._dashArray = s;
        } else i.options._dashArray = i.options.dashArray;
      },
      _requestRedraw(t) {
        this._map &&
          (this._extendRedrawBounds(t),
          (this._redrawRequest = this._redrawRequest || x(this._redraw, this)));
      },
      _extendRedrawBounds(t) {
        var e;
        t._pxBounds &&
          ((e = (t.options.weight || 0) + 1),
          (this._redrawBounds = this._redrawBounds || new m()),
          this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])),
          this._redrawBounds.extend(t._pxBounds.max.add([e, e])));
      },
      _redraw() {
        (this._redrawRequest = null),
          this._redrawBounds &&
            (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
          this._clear(),
          this._draw(),
          (this._redrawBounds = null);
      },
      _clear() {
        var t,
          e = this._redrawBounds;
        e
          ? ((t = e.getSize()), this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y))
          : (this._ctx.save(),
            this._ctx.setTransform(1, 0, 0, 1, 0, 0),
            this._ctx.clearRect(
              0,
              0,
              this._container.width,
              this._container.height
            ),
            this._ctx.restore());
      },
      _draw() {
        var e,
          t,
          i = this._redrawBounds;
        this._ctx.save(),
          i &&
            ((t = i.getSize()),
            this._ctx.beginPath(),
            this._ctx.rect(i.min.x, i.min.y, t.x, t.y),
            this._ctx.clip()),
          (this._drawing = !0);
        for (let t = this._drawFirst; t; t = t.next)
          (e = t.layer),
            (!i || (e._pxBounds && e._pxBounds.intersects(i))) &&
              e._updatePath();
        (this._drawing = !1), this._ctx.restore();
      },
      _updatePoly(s, n) {
        if (this._drawing) {
          let t, e, i, o;
          var r = s._parts,
            a = r.length,
            h = this._ctx;
          if (a) {
            for (h.beginPath(), t = 0; t < a; t++) {
              for (e = 0, i = r[t].length; e < i; e++)
                (o = r[t][e]), h[e ? 'lineTo' : 'moveTo'](o.x, o.y);
              n && h.closePath();
            }
            this._fillStroke(h, s);
          }
        }
      },
      _updateCircle(t) {
        var e, i, o, s;
        this._drawing &&
          !t._empty() &&
          ((e = t._point),
          (i = this._ctx),
          (o = Math.max(Math.round(t._radius), 1)),
          1 != (s = (Math.max(Math.round(t._radiusY), 1) || o) / o) &&
            (i.save(), i.scale(1, s)),
          i.beginPath(),
          i.arc(e.x, e.y / s, o, 0, 2 * Math.PI, !1),
          1 != s && i.restore(),
          this._fillStroke(i, t));
      },
      _fillStroke(t, e) {
        var i = e.options;
        i.fill &&
          ((t.globalAlpha = i.fillOpacity),
          (t.fillStyle = i.fillColor || i.color),
          t.fill(i.fillRule || 'evenodd')),
          i.stroke &&
            0 !== i.weight &&
            (t.setLineDash &&
              t.setLineDash((e.options && e.options._dashArray) || []),
            (t.globalAlpha = i.opacity),
            (t.lineWidth = i.weight),
            (t.strokeStyle = i.color),
            (t.lineCap = i.lineCap),
            (t.lineJoin = i.lineJoin),
            t.stroke());
      },
      _onClick(e) {
        var i = this._map.mouseEventToLayerPoint(e);
        let o, s;
        for (let t = this._drawFirst; t; t = t.next)
          (o = t.layer).options.interactive &&
            o._containsPoint(i) &&
            ((('click' === e.type || 'preclick' === e.type) &&
              this._map._draggableMoved(o)) ||
              (s = o));
        this._fireEvent(!!s && [s], e);
      },
      _onMouseMove(t) {
        var e;
        !this._map ||
          this._map.dragging.moving() ||
          this._map._animatingZoom ||
          ((e = this._map.mouseEventToLayerPoint(t)),
          this._handleMouseHover(t, e));
      },
      _handleMouseOut(t) {
        var e = this._hoveredLayer;
        e &&
          (this._container.classList.remove('leaflet-interactive'),
          this._fireEvent([e], t, 'mouseout'),
          (this._hoveredLayer = null),
          (this._mouseHoverThrottled = !1));
      },
      _handleMouseHover(t, o) {
        if (!this._mouseHoverThrottled) {
          let e, i;
          for (let t = this._drawFirst; t; t = t.next)
            (e = t.layer).options.interactive && e._containsPoint(o) && (i = e);
          i !== this._hoveredLayer &&
            (this._handleMouseOut(t), i) &&
            (this._container.classList.add('leaflet-interactive'),
            this._fireEvent([i], t, 'mouseover'),
            (this._hoveredLayer = i)),
            this._fireEvent(!!this._hoveredLayer && [this._hoveredLayer], t),
            (this._mouseHoverThrottled = !0),
            setTimeout(() => {
              this._mouseHoverThrottled = !1;
            }, 32);
        }
      },
      _fireEvent(t, e, i) {
        this._map._fireDOMEvent(e, i || e.type, t);
      },
      _bringToFront(t) {
        var e,
          i,
          o = t._order;
        o &&
          ((e = o.next), (i = o.prev), e) &&
          ((e.prev = i) ? (i.next = e) : e && (this._drawFirst = e),
          (o.prev = this._drawLast),
          ((this._drawLast.next = o).next = null),
          (this._drawLast = o),
          this._requestRedraw(t));
      },
      _bringToBack(t) {
        var e,
          i,
          o = t._order;
        o &&
          ((e = o.next), (i = o.prev)) &&
          ((i.next = e) ? (e.prev = i) : i && (this._drawLast = i),
          (o.prev = null),
          (o.next = this._drawFirst),
          (this._drawFirst.prev = o),
          (this._drawFirst = o),
          this._requestRedraw(t));
      },
    });
  function _i(t) {
    return new di(t);
  }
  function pi(t, e) {
    let i = '',
      o,
      s,
      n,
      r,
      a,
      h;
    for (o = 0, n = t.length; o < n; o++) {
      for (a = t[o], s = 0, r = a.length; s < r; s++)
        (h = a[s]), (i += (s ? 'L' : 'M') + h.x + ' ' + h.y);
      i += e ? 'z' : '';
    }
    return i || 'M0 0';
  }
  const ui = function (t) {
      return document.createElementNS('http://www.w3.org/2000/svg', t);
    },
    ci = A.extend({
      _initContainer() {
        (this._container = ui('svg')),
          this._container.setAttribute('pointer-events', 'none'),
          (this._rootGroup = ui('g')),
          this._container.appendChild(this._rootGroup);
      },
      _destroyContainer() {
        A.prototype._destroyContainer.call(this),
          delete this._rootGroup,
          delete this._svgSize;
      },
      _resizeContainer() {
        var t = A.prototype._resizeContainer.call(this);
        (this._svgSize && this._svgSize.equals(t)) ||
          ((this._svgSize = t),
          this._container.setAttribute('width', t.x),
          this._container.setAttribute('height', t.y));
      },
      _update() {
        var t, e;
        (this._map._animatingZoom && this._bounds) ||
          ((e = (t = this._bounds).getSize()),
          this._container.setAttribute(
            'viewBox',
            [t.min.x, t.min.y, e.x, e.y].join(' ')
          ),
          this.fire('update'));
      },
      _initPath(t) {
        var e = (t._path = ui('path'));
        t.options.className && e.classList.add(...l(t.options.className)),
          t.options.interactive && e.classList.add('leaflet-interactive'),
          this._updateStyle(t),
          (this._layers[a(t)] = t);
      },
      _addPath(t) {
        this._rootGroup || this._initContainer(),
          this._rootGroup.appendChild(t._path),
          t.addInteractiveTarget(t._path);
      },
      _removePath(t) {
        t._path.remove(),
          t.removeInteractiveTarget(t._path),
          delete this._layers[a(t)];
      },
      _updatePath(t) {
        t._project(), t._update();
      },
      _updateStyle(t) {
        var e = t._path,
          t = t.options;
        e &&
          (t.stroke
            ? (e.setAttribute('stroke', t.color),
              e.setAttribute('stroke-opacity', t.opacity),
              e.setAttribute('stroke-width', t.weight),
              e.setAttribute('stroke-linecap', t.lineCap),
              e.setAttribute('stroke-linejoin', t.lineJoin),
              t.dashArray
                ? e.setAttribute('stroke-dasharray', t.dashArray)
                : e.removeAttribute('stroke-dasharray'),
              t.dashOffset
                ? e.setAttribute('stroke-dashoffset', t.dashOffset)
                : e.removeAttribute('stroke-dashoffset'))
            : e.setAttribute('stroke', 'none'),
          t.fill
            ? (e.setAttribute('fill', t.fillColor || t.color),
              e.setAttribute('fill-opacity', t.fillOpacity),
              e.setAttribute('fill-rule', t.fillRule || 'evenodd'))
            : e.setAttribute('fill', 'none'));
      },
      _updatePoly(t, e) {
        this._setPath(t, pi(t._parts, e));
      },
      _updateCircle(t) {
        var e = t._point,
          i = Math.max(Math.round(t._radius), 1),
          o = `a${i},${Math.max(Math.round(t._radiusY), 1) || i} 0 1,0 `,
          e = t._empty()
            ? 'M0 0'
            : `M${e.x - i},${e.y}${o}${2 * i},0 ${o}${2 * -i},0 `;
        this._setPath(t, e);
      },
      _setPath(t, e) {
        t._path.setAttribute('d', e);
      },
      _bringToFront(t) {
        yt(t._path);
      },
      _bringToBack(t) {
        vt(t._path);
      },
    });
  function mi(t) {
    return new ci(t);
  }
  Z.include({
    getRenderer(t) {
      let e =
        t.options.renderer ||
        this._getPaneRenderer(t.options.pane) ||
        this.options.renderer ||
        this._renderer;
      return (
        (e = e || (this._renderer = this._createRenderer())),
        this.hasLayer(e) || this.addLayer(e),
        e
      );
    },
    _getPaneRenderer(t) {
      if ('overlayPane' === t || void 0 === t) return !1;
      let e = this._paneRenderers[t];
      return (
        void 0 === e &&
          ((e = this._createRenderer({ pane: t })),
          (this._paneRenderers[t] = e)),
        e
      );
    },
    _createRenderer(t) {
      return (this.options.preferCanvas && _i(t)) || mi(t);
    },
  });
  const gi = Ae.extend({
    initialize(t, e) {
      Ae.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
    },
    setBounds(t) {
      return this.setLatLngs(this._boundsToLatLngs(t));
    },
    _boundsToLatLngs(t) {
      return [
        (t = f(t)).getSouthWest(),
        t.getNorthWest(),
        t.getNorthEast(),
        t.getSouthEast(),
      ];
    },
  });
  function fi(t, e) {
    return new gi(t, e);
  }
  (ci.create = ui),
    (ci.pointsToPath = pi),
    (k.geometryToLayer = Re),
    (k.coordsToLatLng = De),
    (k.coordsToLatLngs = Ne),
    (k.latLngToCoords = We),
    (k.latLngsToCoords = He),
    (k.getFeature = Fe),
    (k.asFeature = Ue),
    Z.mergeOptions({ boxZoom: !0 });
  var me = y.extend({
      initialize(t) {
        (this._map = t),
          (this._container = t._container),
          (this._pane = t._panes.overlayPane),
          (this._resetStateTimeout = 0),
          t.on('unload', this._destroy, this);
      },
      addHooks() {
        P(this._container, 'pointerdown', this._onPointerDown, this);
      },
      removeHooks() {
        z(this._container, 'pointerdown', this._onPointerDown, this);
      },
      moved() {
        return this._moved;
      },
      _destroy() {
        this._pane.remove(), delete this._pane;
      },
      _resetState() {
        (this._resetStateTimeout = 0), (this._moved = !1);
      },
      _clearDeferredResetState() {
        0 !== this._resetStateTimeout &&
          (clearTimeout(this._resetStateTimeout),
          (this._resetStateTimeout = 0));
      },
      _onPointerDown(t) {
        if (!t.shiftKey || 0 !== t.button) return !1;
        this._clearDeferredResetState(),
          this._resetState(),
          zt(),
          Zt(),
          (this._startPoint = this._map.mouseEventToContainerPoint(t)),
          P(
            document,
            {
              contextmenu: Ft,
              pointermove: this._onPointerMove,
              pointerup: this._onPointerUp,
              keydown: this._onKeyDown,
            },
            this
          );
      },
      _onPointerMove(t) {
        this._moved ||
          ((this._moved = !0),
          (this._box = b('div', 'leaflet-zoom-box', this._container)),
          this._container.classList.add('leaflet-crosshair'),
          this._map.fire('boxzoomstart')),
          (this._point = this._map.mouseEventToContainerPoint(t));
        var t = new m(this._point, this._startPoint),
          e = t.getSize();
        L(this._box, t.min),
          (this._box.style.width = e.x + 'px'),
          (this._box.style.height = e.y + 'px');
      },
      _finish() {
        this._moved &&
          (this._box.remove(),
          this._container.classList.remove('leaflet-crosshair')),
          Mt(),
          Ct(),
          z(
            document,
            {
              contextmenu: Ft,
              pointermove: this._onPointerMove,
              pointerup: this._onPointerUp,
              keydown: this._onKeyDown,
            },
            this
          );
      },
      _onPointerUp(t) {
        0 === t.button &&
          (this._finish(), this._moved) &&
          (this._clearDeferredResetState(),
          (this._resetStateTimeout = setTimeout(
            this._resetState.bind(this),
            0
          )),
          (t = new p(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          )),
          this._map.fitBounds(t).fire('boxzoomend', { boxZoomBounds: t }));
      },
      _onKeyDown(t) {
        'Escape' === t.code &&
          (this._finish(), this._clearDeferredResetState(), this._resetState());
      },
    }),
    s =
      (Z.addInitHook('addHandler', 'boxZoom', me),
      Z.mergeOptions({ doubleClickZoom: !0 }),
      y.extend({
        addHooks() {
          this._map.on('dblclick', this._onDoubleClick, this);
        },
        removeHooks() {
          this._map.off('dblclick', this._onDoubleClick, this);
        },
        _onDoubleClick(t) {
          var e = this._map,
            i = e.getZoom(),
            o = e.options.zoomDelta,
            i = t.originalEvent.shiftKey ? i - o : i + o;
          'center' === e.options.doubleClickZoom
            ? e.setZoom(i)
            : e.setZoomAround(t.containerPoint, i);
        },
      })),
    yi =
      (Z.addInitHook('addHandler', 'doubleClickZoom', s),
      Z.mergeOptions({
        dragging: !0,
        inertia: !0,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: 0.2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0,
      }),
      y.extend({
        addHooks() {
          var t;
          this._draggable ||
            ((t = this._map),
            (this._draggable = new oe(t._mapPane, t._container)),
            this._draggable.on(
              {
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this
            ),
            this._draggable.on('predrag', this._onPreDragLimit, this),
            t.options.worldCopyJump &&
              (this._draggable.on('predrag', this._onPreDragWrap, this),
              t.on('zoomend', this._onZoomEnd, this),
              t.whenReady(this._onZoomEnd, this))),
            this._map._container.classList.add(
              'leaflet-grab',
              'leaflet-touch-drag'
            ),
            this._draggable.enable(),
            (this._positions = []),
            (this._times = []);
        },
        removeHooks() {
          this._map._container.classList.remove(
            'leaflet-grab',
            'leaflet-touch-drag'
          ),
            this._draggable.disable();
        },
        moved() {
          return this._draggable && this._draggable._moved;
        },
        moving() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart() {
          var t,
            e = this._map;
          e._stop(),
            this._map.options.maxBounds && this._map.options.maxBoundsViscosity
              ? ((t = f(this._map.options.maxBounds)),
                (this._offsetLimit = _(
                  this._map
                    .latLngToContainerPoint(t.getNorthWest())
                    .multiplyBy(-1),
                  this._map
                    .latLngToContainerPoint(t.getSouthEast())
                    .multiplyBy(-1)
                    .add(this._map.getSize())
                )),
                (this._viscosity = Math.min(
                  1,
                  Math.max(0, this._map.options.maxBoundsViscosity)
                )))
              : (this._offsetLimit = null),
            e.fire('movestart').fire('dragstart'),
            e.options.inertia && ((this._positions = []), (this._times = []));
        },
        _onDrag(t) {
          var e, i;
          this._map.options.inertia &&
            ((e = this._lastTime = +new Date()),
            (i = this._lastPos =
              this._draggable._absPos || this._draggable._newPos),
            this._positions.push(i),
            this._times.push(e),
            this._prunePositions(e)),
            this._map.fire('move', t).fire('drag', t);
        },
        _prunePositions(t) {
          for (; 1 < this._positions.length && 50 < t - this._times[0]; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd() {
          var t = this._map.getSize().divideBy(2),
            e = this._map.latLngToLayerPoint([0, 0]);
          (this._initialWorldOffset = e.subtract(t).x),
            (this._worldWidth = this._map.getPixelWorldBounds().getSize().x);
        },
        _viscousLimit(t, e) {
          return t - (t - e) * this._viscosity;
        },
        _onPreDragLimit() {
          var t, e;
          this._viscosity &&
            this._offsetLimit &&
            ((t = this._draggable._newPos.subtract(this._draggable._startPos)),
            (e = this._offsetLimit),
            t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)),
            t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)),
            t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)),
            t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)),
            (this._draggable._newPos = this._draggable._startPos.add(t)));
        },
        _onPreDragWrap() {
          var t = this._worldWidth,
            e = Math.round(t / 2),
            i = this._initialWorldOffset,
            o = this._draggable._newPos.x,
            s = ((o - e + i) % t) + e - i,
            o = ((o + e + i) % t) - e - i,
            t = Math.abs(s + i) < Math.abs(o + i) ? s : o;
          (this._draggable._absPos = this._draggable._newPos.clone()),
            (this._draggable._newPos.x = t);
        },
        _onDragEnd(t) {
          const e = this._map,
            i = e.options,
            o = !i.inertia || t.noInertia || this._times.length < 2;
          if ((e.fire('dragend', t), o)) e.fire('moveend');
          else {
            this._prunePositions(+new Date());
            const s = this._lastPos.subtract(this._positions[0]),
              n = (this._lastTime - this._times[0]) / 1e3,
              r = i.easeLinearity,
              a = s.multiplyBy(r / n),
              h = a.distanceTo([0, 0]),
              l = Math.min(i.inertiaMaxSpeed, h),
              d = a.multiplyBy(l / h),
              _ = l / (i.inertiaDeceleration * r);
            let t = d.multiplyBy(-_ / 2).round();
            t.x || t.y
              ? ((t = e._limitOffset(t, e.options.maxBounds)),
                x(() => {
                  e.panBy(t, {
                    duration: _,
                    easeLinearity: r,
                    noMoveStart: !0,
                    animate: !0,
                  });
                }))
              : e.fire('moveend');
          }
        },
      })),
    vi =
      (Z.addInitHook('addHandler', 'dragging', yi),
      Z.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 }),
      y.extend({
        keyCodes: {
          left: ['ArrowLeft'],
          right: ['ArrowRight'],
          down: ['ArrowDown'],
          up: ['ArrowUp'],
          zoomIn: ['Equal', 'NumpadAdd', 'BracketRight'],
          zoomOut: ['Minus', 'NumpadSubtract', 'Digit6', 'Slash'],
        },
        initialize(t) {
          (this._map = t),
            this._setPanDelta(t.options.keyboardPanDelta),
            this._setZoomDelta(t.options.zoomDelta);
        },
        addHooks() {
          var t = this._map._container;
          t.tabIndex <= 0 && (t.tabIndex = '0'),
            P(
              t,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                pointerdown: this._onPointerDown,
              },
              this
            ),
            this._map.on(
              { focus: this._addHooks, blur: this._removeHooks },
              this
            );
        },
        removeHooks() {
          this._removeHooks(),
            z(
              this._map._container,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                pointerdown: this._onPointerDown,
              },
              this
            ),
            this._map.off(
              { focus: this._addHooks, blur: this._removeHooks },
              this
            );
        },
        _onPointerDown() {
          var t, e, i;
          this._focused ||
            ((i = document.body),
            (t = document.documentElement),
            (e = i.scrollTop || t.scrollTop),
            (i = i.scrollLeft || t.scrollLeft),
            this._map._container.focus(),
            window.scrollTo(i, e));
        },
        _onFocus() {
          (this._focused = !0), this._map.fire('focus');
        },
        _onBlur() {
          (this._focused = !1), this._map.fire('blur');
        },
        _setPanDelta(t) {
          var e = (this._panKeys = {}),
            i = this.keyCodes;
          let o, s;
          for (o = 0, s = i.left.length; o < s; o++) e[i.left[o]] = [-1 * t, 0];
          for (o = 0, s = i.right.length; o < s; o++) e[i.right[o]] = [t, 0];
          for (o = 0, s = i.down.length; o < s; o++) e[i.down[o]] = [0, t];
          for (o = 0, s = i.up.length; o < s; o++) e[i.up[o]] = [0, -1 * t];
        },
        _setZoomDelta(t) {
          var e = (this._zoomKeys = {}),
            i = this.keyCodes;
          let o, s;
          for (o = 0, s = i.zoomIn.length; o < s; o++) e[i.zoomIn[o]] = t;
          for (o = 0, s = i.zoomOut.length; o < s; o++) e[i.zoomOut[o]] = -t;
        },
        _addHooks() {
          P(document, 'keydown', this._onKeyDown, this);
        },
        _removeHooks() {
          z(document, 'keydown', this._onKeyDown, this);
        },
        _onKeyDown(e) {
          if (!(e.altKey || e.ctrlKey || e.metaKey)) {
            var i,
              o = e.code,
              s = this._map;
            let t;
            if (o in this._panKeys)
              (s._panAnim && s._panAnim._inProgress) ||
                ((t = this._panKeys[o]),
                e.shiftKey && (t = g(t).multiplyBy(3)),
                s.options.maxBounds &&
                  (t = s._limitOffset(g(t), s.options.maxBounds)),
                s.options.worldCopyJump
                  ? ((i = s.wrapLatLng(
                      s.unproject(s.project(s.getCenter()).add(t))
                    )),
                    s.panTo(i))
                  : s.panBy(t));
            else if (o in this._zoomKeys)
              s.setZoom(s.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[o]);
            else {
              if (
                'Escape' !== o ||
                !s._popup ||
                !s._popup.options.closeOnEscapeKey
              )
                return;
              s.closePopup();
            }
            Ft(e);
          }
        },
      })),
    xi =
      (Z.addInitHook('addHandler', 'keyboard', vi),
      Z.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60,
      }),
      y.extend({
        addHooks() {
          P(this._map._container, 'wheel', this._onWheelScroll, this),
            (this._delta = 0);
        },
        removeHooks() {
          z(this._map._container, 'wheel', this._onWheelScroll, this);
        },
        _onWheelScroll(t) {
          var e = qt(t),
            i = this._map.options.wheelDebounceTime,
            e =
              ((this._delta += e),
              (this._lastMousePos = this._map.mouseEventToContainerPoint(t)),
              this._startTime || (this._startTime = +new Date()),
              Math.max(i - (+new Date() - this._startTime), 0));
          clearTimeout(this._timer),
            (this._timer = setTimeout(this._performZoom.bind(this), e)),
            Ft(t);
        },
        _performZoom() {
          var t = this._map,
            e = t.getZoom(),
            i = this._map.options.zoomSnap || 0,
            o =
              (t._stop(),
              this._delta / (4 * this._map.options.wheelPxPerZoomLevel)),
            o = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(o))))) / Math.LN2,
            i = i ? Math.ceil(o / i) * i : o,
            o = t._limitZoom(e + (0 < this._delta ? i : -i)) - e;
          (this._delta = 0),
            (this._startTime = null),
            o &&
              ('center' === t.options.scrollWheelZoom
                ? t.setZoom(e + o)
                : t.setZoomAround(this._lastMousePos, e + o));
        },
      }));
  Z.addInitHook('addHandler', 'scrollWheelZoom', xi);
  Z.mergeOptions({
    tapHold: v.touchNative && v.safari && v.mobile,
    tapTolerance: 15,
  });
  var wi = y.extend({
      addHooks() {
        P(this._map._container, 'touchstart', this._onDown, this);
      },
      removeHooks() {
        z(this._map._container, 'touchstart', this._onDown, this);
      },
      _onDown(t) {
        if ((clearTimeout(this._holdTimeout), 1 === t.touches.length)) {
          const e = t.touches[0];
          (this._startPos = this._newPos = new c(e.clientX, e.clientY)),
            (this._holdTimeout = setTimeout(() => {
              this._cancel(),
                this._isTapValid() &&
                  (P(document, 'touchend', M),
                  P(document, 'touchend touchcancel', this._cancelClickPrevent),
                  this._simulateEvent('contextmenu', e));
            }, 600)),
            P(document, 'touchend touchcancel contextmenu', this._cancel, this),
            P(document, 'touchmove', this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        z(document, 'touchend', M), z(document, 'touchend touchcancel', t);
      },
      _cancel() {
        clearTimeout(this._holdTimeout),
          z(document, 'touchend touchcancel contextmenu', this._cancel, this),
          z(document, 'touchmove', this._onMove, this);
      },
      _onMove(t) {
        t = t.touches[0];
        this._newPos = new c(t.clientX, t.clientY);
      },
      _isTapValid() {
        return (
          this._newPos.distanceTo(this._startPos) <=
          this._map.options.tapTolerance
        );
      },
      _simulateEvent(t, e) {
        t = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY,
        });
        (t._simulated = !0), e.target.dispatchEvent(t);
      },
    }),
    bi =
      (Z.addInitHook('addHandler', 'tapHold', wi),
      Z.mergeOptions({ touchZoom: v.touch, bounceAtZoomLimits: !0 }),
      y.extend({
        addHooks() {
          this._map._container.classList.add('leaflet-touch-zoom'),
            P(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        removeHooks() {
          this._map._container.classList.remove('leaflet-touch-zoom'),
            z(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        _onTouchStart(t) {
          var e,
            i,
            o = this._map;
          !t.touches ||
            2 !== t.touches.length ||
            o._animatingZoom ||
            this._zooming ||
            ((e = o.mouseEventToContainerPoint(t.touches[0])),
            (i = o.mouseEventToContainerPoint(t.touches[1])),
            (this._centerPoint = o.getSize()._divideBy(2)),
            (this._startLatLng = o.containerPointToLatLng(this._centerPoint)),
            'center' !== o.options.touchZoom &&
              (this._pinchStartLatLng = o.containerPointToLatLng(
                e.add(i)._divideBy(2)
              )),
            (this._startDist = e.distanceTo(i)),
            (this._startZoom = o.getZoom()),
            (this._moved = !1),
            (this._zooming = !0),
            o._stop(),
            P(document, 'touchmove', this._onTouchMove, this),
            P(document, 'touchend touchcancel', this._onTouchEnd, this),
            M(t));
        },
        _onTouchMove(t) {
          if (t.touches && 2 === t.touches.length && this._zooming) {
            var e = this._map,
              i = e.mouseEventToContainerPoint(t.touches[0]),
              o = e.mouseEventToContainerPoint(t.touches[1]),
              s = i.distanceTo(o) / this._startDist;
            if (
              ((this._zoom = e.getScaleZoom(s, this._startZoom)),
              !e.options.bounceAtZoomLimits &&
                ((this._zoom < e.getMinZoom() && s < 1) ||
                  (this._zoom > e.getMaxZoom() && 1 < s)) &&
                (this._zoom = e._limitZoom(this._zoom)),
              'center' === e.options.touchZoom)
            ) {
              if (((this._center = this._startLatLng), 1 == s)) return;
            } else {
              i = i._add(o)._divideBy(2)._subtract(this._centerPoint);
              if (1 == s && 0 === i.x && 0 === i.y) return;
              this._center = e.unproject(
                e.project(this._pinchStartLatLng, this._zoom).subtract(i),
                this._zoom
              );
            }
            this._moved || (e._moveStart(!0, !1), (this._moved = !0)),
              d(this._animRequest);
            o = e._move.bind(
              e,
              this._center,
              this._zoom,
              { pinch: !0, round: !1 },
              void 0
            );
            (this._animRequest = x(o, this)), M(t);
          }
        },
        _onTouchEnd() {
          this._moved && this._zooming
            ? ((this._zooming = !1),
              d(this._animRequest),
              z(document, 'touchmove', this._onTouchMove, this),
              z(document, 'touchend touchcancel', this._onTouchEnd, this),
              this._map.options.zoomAnimation
                ? this._map._animateZoom(
                    this._center,
                    this._map._limitZoom(this._zoom),
                    !0,
                    this._map.options.zoomSnap
                  )
                : this._map._resetView(
                    this._center,
                    this._map._limitZoom(this._zoom)
                  ))
            : (this._zooming = !1);
        },
      })),
    me =
      (Z.addInitHook('addHandler', 'touchZoom', bi),
      (Z.BoxZoom = me),
      (Z.DoubleClickZoom = s),
      (Z.Drag = yi),
      (Z.Keyboard = vi),
      (Z.ScrollWheelZoom = xi),
      (Z.TapHold = wi),
      (Z.TouchZoom = bi),
      {
        __proto__: null,
        BlanketOverlay: Ge,
        Bounds: m,
        Browser: v,
        CRS: o,
        Canvas: di,
        Circle: Se,
        CircleMarker: Ce,
        Class: q,
        Control: C,
        DivIcon: oi,
        DivOverlay: B,
        DomEvent: it,
        DomUtil: et,
        Draggable: oe,
        Evented: e,
        FeatureGroup: E,
        GeoJSON: k,
        GridLayer: ni,
        Handler: y,
        Icon: be,
        ImageOverlay: qe,
        LatLng: u,
        LatLngBounds: p,
        Layer: S,
        LayerGroup: ve,
        LineUtil: st,
        Map: Z,
        Marker: ze,
        Path: Ze,
        Point: c,
        PolyUtil: ot,
        Polygon: Ae,
        Polyline: ke,
        Popup: Qe,
        PosAnimation: $t,
        Projection: fe,
        Rectangle: gi,
        Renderer: A,
        SVG: ci,
        SVGOverlay: Xe,
        TileLayer: ai,
        Tooltip: ei,
        Transformation: J,
        Util: G,
        VideoOverlay: $e,
        bounds: _,
        canvas: _i,
        circle: Ee,
        circleMarker: Oe,
        control: Xt,
        divIcon: si,
        extend: h,
        featureGroup: we,
        geoJSON: Ve,
        geoJson: tt,
        gridLayer: ri,
        icon: Le,
        imageOverlay: Ke,
        latLng: w,
        latLngBounds: f,
        layerGroup: xe,
        map: Yt,
        marker: Me,
        point: g,
        polygon: Ie,
        polyline: Be,
        popup: ti,
        rectangle: fi,
        setOptions: n,
        stamp: a,
        svg: mi,
        svgOverlay: Je,
        tileLayer: hi,
        tooltip: ii,
        transformation: Q,
        version: I,
        videoOverlay: Ye,
      });
  ((function () {
    if ('undefined' != typeof globalThis) return globalThis;
    if ('undefined' != typeof self) return self;
    if ('undefined' != typeof window) return window;
    if ('undefined' == typeof global)
      throw new Error('Unable to locate global object.');
    return global;
  })().L = me),
    (t.BlanketOverlay = Ge),
    (t.Bounds = m),
    (t.Browser = v),
    (t.CRS = o),
    (t.Canvas = di),
    (t.Circle = Se),
    (t.CircleMarker = Ce),
    (t.Class = q),
    (t.Control = C),
    (t.DivIcon = oi),
    (t.DivOverlay = B),
    (t.DomEvent = it),
    (t.DomUtil = et),
    (t.Draggable = oe),
    (t.Evented = e),
    (t.FeatureGroup = E),
    (t.GeoJSON = k),
    (t.GridLayer = ni),
    (t.Handler = y),
    (t.Icon = be),
    (t.ImageOverlay = qe),
    (t.LatLng = u),
    (t.LatLngBounds = p),
    (t.Layer = S),
    (t.LayerGroup = ve),
    (t.LineUtil = st),
    (t.Map = Z),
    (t.Marker = ze),
    (t.Path = Ze),
    (t.Point = c),
    (t.PolyUtil = ot),
    (t.Polygon = Ae),
    (t.Polyline = ke),
    (t.Popup = Qe),
    (t.PosAnimation = $t),
    (t.Projection = fe),
    (t.Rectangle = gi),
    (t.Renderer = A),
    (t.SVG = ci),
    (t.SVGOverlay = Xe),
    (t.TileLayer = ai),
    (t.Tooltip = ei),
    (t.Transformation = J),
    (t.Util = G),
    (t.VideoOverlay = $e),
    (t.bounds = _),
    (t.canvas = _i),
    (t.circle = Ee),
    (t.circleMarker = Oe),
    (t.control = Xt),
    (t.default = me),
    (t.divIcon = si),
    (t.extend = h),
    (t.featureGroup = we),
    (t.geoJSON = Ve),
    (t.geoJson = tt),
    (t.gridLayer = ri),
    (t.icon = Le),
    (t.imageOverlay = Ke),
    (t.latLng = w),
    (t.latLngBounds = f),
    (t.layerGroup = xe),
    (t.map = Yt),
    (t.marker = Me),
    (t.point = g),
    (t.polygon = Ie),
    (t.polyline = Be),
    (t.popup = ti),
    (t.rectangle = fi),
    (t.setOptions = n),
    (t.stamp = a),
    (t.svg = mi),
    (t.svgOverlay = Je),
    (t.tileLayer = hi),
    (t.tooltip = ii),
    (t.transformation = Q),
    (t.version = I),
    (t.videoOverlay = Ye);
});
//# sourceMappingURL=leaflet.js.map
