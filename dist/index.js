import { Children as e, cloneElement as t, createContext as n, createElement as r, forwardRef as i, isValidElement as a, memo as o, useCallback as s, useContext as c, useEffect as l, useId as u, useImperativeHandle as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { createPortal as v } from "react-dom";
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function y(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = y(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function b() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = y(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var x = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, S = (e, t) => ({
	classGroupId: e,
	validator: t
}), C = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), w = "-", T = [], E = "arbitrary..", D = (e) => {
	let t = A(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return k(e);
			let n = e.split(w);
			return O(n, n[0] === "" && n.length > 1 ? 1 : 0, t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? x(i, t) : t : i || T;
			}
			return n[e] || T;
		}
	};
}, O = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = O(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(w) : e.slice(t).join(w), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, k = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? E + r : void 0;
})(), A = (e) => {
	let { theme: t, classGroups: n } = e;
	return j(n, t);
}, j = (e, t) => {
	let n = C();
	for (let r in e) {
		let i = e[r];
		M(i, n, r, t);
	}
	return n;
}, M = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		N(i, t, n, r);
	}
}, N = (e, t, n, r) => {
	if (typeof e == "string") {
		P(e, t, n);
		return;
	}
	if (typeof e == "function") {
		F(e, t, n, r);
		return;
	}
	I(e, t, n, r);
}, P = (e, t, n) => {
	let r = e === "" ? t : L(t, e);
	r.classGroupId = n;
}, F = (e, t, n, r) => {
	if (ee(e)) {
		M(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(S(n, e));
}, I = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		M(o, L(t, a), n, r);
	}
}, L = (e, t) => {
	let n = e, r = t.split(w), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = C(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, ee = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, te = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, ne = "!", R = ":", z = [], re = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ie = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === R) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(ne) ? (c = s.slice(0, -1), l = !0) : s.startsWith(ne) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return re(t, l, c, u);
	};
	if (t) {
		let e = t + R, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : re(z, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, B = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ae = (e) => ({
	cache: te(e.cacheSize),
	parseClassName: ie(e),
	sortModifiers: B(e),
	...D(e)
}), oe = /\s+/, se = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t, o = [], s = e.trim().split(oe), c = "";
	for (let e = s.length - 1; e >= 0; --e) {
		let t = s[e], { isExternal: l, modifiers: u, hasImportantModifier: d, baseClassName: f, maybePostfixModifierPosition: p } = n(t);
		if (l) {
			c = t + (c.length > 0 ? " " + c : c);
			continue;
		}
		let m = !!p, h = r(m ? f.substring(0, p) : f);
		if (!h) {
			if (!m) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			if (h = r(f), !h) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			m = !1;
		}
		let g = u.length === 0 ? "" : u.length === 1 ? u[0] : a(u).join(":"), _ = d ? g + ne : g, v = _ + h;
		if (o.indexOf(v) > -1) continue;
		o.push(v);
		let y = i(h, m);
		for (let e = 0; e < y.length; ++e) {
			let t = y[e];
			o.push(_ + t);
		}
		c = t + (c.length > 0 ? " " + c : c);
	}
	return c;
}, ce = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = le(n)) && (i && (i += " "), i += r);
	return i;
}, le = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = le(e[r])) && (n && (n += " "), n += t);
	return n;
}, ue = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ae(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = se(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(ce(...e));
}, de = [], V = (e) => {
	let t = (t) => t[e] || de;
	return t.isThemeGetter = !0, t;
}, fe = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pe = /^\((?:(\w[\w-]*):)?(.+)\)$/i, me = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, he = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ge = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _e = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ve = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ye = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, H = (e) => me.test(e), U = (e) => !!e && !Number.isNaN(Number(e)), W = (e) => !!e && Number.isInteger(Number(e)), be = (e) => e.endsWith("%") && U(e.slice(0, -1)), G = (e) => he.test(e), xe = () => !0, Se = (e) => ge.test(e) && !_e.test(e), Ce = () => !1, we = (e) => ve.test(e), Te = (e) => ye.test(e), Ee = (e) => !K(e) && !q(e), De = (e) => He(e, Ke, Ce), K = (e) => fe.test(e), Oe = (e) => He(e, qe, Se), ke = (e) => He(e, Je, U), Ae = (e) => He(e, Xe, xe), je = (e) => He(e, Ye, Ce), Me = (e) => He(e, We, Ce), Ne = (e) => He(e, Ge, Te), Pe = (e) => He(e, Ze, we), q = (e) => pe.test(e), Fe = (e) => Ue(e, qe), Ie = (e) => Ue(e, Ye), Le = (e) => Ue(e, We), Re = (e) => Ue(e, Ke), ze = (e) => Ue(e, Ge), Be = (e) => Ue(e, Ze, !0), Ve = (e) => Ue(e, Xe, !0), He = (e, t, n) => {
	let r = fe.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ue = (e, t, n = !1) => {
	let r = pe.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, We = (e) => e === "position" || e === "percentage", Ge = (e) => e === "image" || e === "url", Ke = (e) => e === "length" || e === "size" || e === "bg-size", qe = (e) => e === "length", Je = (e) => e === "number", Ye = (e) => e === "family-name", Xe = (e) => e === "number" || e === "weight", Ze = (e) => e === "shadow", Qe = /* @__PURE__ */ ue(() => {
	let e = V("color"), t = V("font"), n = V("text"), r = V("font-weight"), i = V("tracking"), a = V("leading"), o = V("breakpoint"), s = V("container"), c = V("spacing"), l = V("radius"), u = V("shadow"), d = V("inset-shadow"), f = V("text-shadow"), p = V("drop-shadow"), m = V("blur"), h = V("perspective"), g = V("aspect"), _ = V("ease"), v = V("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		q,
		K
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		q,
		K,
		c
	], T = () => [
		H,
		"full",
		"auto",
		...w()
	], E = () => [
		W,
		"none",
		"subgrid",
		q,
		K
	], D = () => [
		"auto",
		{ span: [
			"full",
			W,
			q,
			K
		] },
		W,
		q,
		K
	], O = () => [
		W,
		"auto",
		q,
		K
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		q,
		K
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		H,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		H,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		H,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		q,
		K
	], L = () => [
		...b(),
		Le,
		Me,
		{ position: [q, K] }
	], ee = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], te = () => [
		"auto",
		"cover",
		"contain",
		Re,
		De,
		{ size: [q, K] }
	], ne = () => [
		be,
		Fe,
		Oe
	], R = () => [
		"",
		"none",
		"full",
		l,
		q,
		K
	], z = () => [
		"",
		U,
		Fe,
		Oe
	], re = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ie = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], B = () => [
		U,
		be,
		Le,
		Me
	], ae = () => [
		"",
		"none",
		m,
		q,
		K
	], oe = () => [
		"none",
		U,
		q,
		K
	], se = () => [
		"none",
		U,
		q,
		K
	], ce = () => [
		U,
		q,
		K
	], le = () => [
		H,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [G],
			breakpoint: [G],
			color: [xe],
			container: [G],
			"drop-shadow": [G],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Ee],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [G],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [G],
			shadow: [G],
			spacing: ["px", U],
			text: [G],
			"text-shadow": [G],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				H,
				K,
				q,
				g
			] }],
			container: ["container"],
			columns: [{ columns: [
				U,
				K,
				q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				W,
				"auto",
				q,
				K
			] }],
			basis: [{ basis: [
				H,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				U,
				H,
				"auto",
				"initial",
				"none",
				K
			] }],
			grow: [{ grow: [
				"",
				U,
				q,
				K
			] }],
			shrink: [{ shrink: [
				"",
				U,
				q,
				K
			] }],
			order: [{ order: [
				W,
				"first",
				"last",
				"none",
				q,
				K
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Fe,
				Oe
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Ve,
				Ae
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				be,
				K
			] }],
			"font-family": [{ font: [
				Ie,
				je,
				t
			] }],
			"font-features": [{ "font-features": [K] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				q,
				K
			] }],
			"line-clamp": [{ "line-clamp": [
				U,
				"none",
				q,
				ke
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				q,
				K
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				q,
				K
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...re(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				U,
				"from-font",
				"auto",
				q,
				Oe
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				U,
				"auto",
				q,
				K
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				q,
				K
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				q,
				K
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: L() }],
			"bg-repeat": [{ bg: ee() }],
			"bg-size": [{ bg: te() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						W,
						q,
						K
					],
					radial: [
						"",
						q,
						K
					],
					conic: [
						W,
						q,
						K
					]
				},
				ze,
				Ne
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: ne() }],
			"gradient-via-pos": [{ via: ne() }],
			"gradient-to-pos": [{ to: ne() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: R() }],
			"rounded-s": [{ "rounded-s": R() }],
			"rounded-e": [{ "rounded-e": R() }],
			"rounded-t": [{ "rounded-t": R() }],
			"rounded-r": [{ "rounded-r": R() }],
			"rounded-b": [{ "rounded-b": R() }],
			"rounded-l": [{ "rounded-l": R() }],
			"rounded-ss": [{ "rounded-ss": R() }],
			"rounded-se": [{ "rounded-se": R() }],
			"rounded-ee": [{ "rounded-ee": R() }],
			"rounded-es": [{ "rounded-es": R() }],
			"rounded-tl": [{ "rounded-tl": R() }],
			"rounded-tr": [{ "rounded-tr": R() }],
			"rounded-br": [{ "rounded-br": R() }],
			"rounded-bl": [{ "rounded-bl": R() }],
			"border-w": [{ border: z() }],
			"border-w-x": [{ "border-x": z() }],
			"border-w-y": [{ "border-y": z() }],
			"border-w-s": [{ "border-s": z() }],
			"border-w-e": [{ "border-e": z() }],
			"border-w-bs": [{ "border-bs": z() }],
			"border-w-be": [{ "border-be": z() }],
			"border-w-t": [{ "border-t": z() }],
			"border-w-r": [{ "border-r": z() }],
			"border-w-b": [{ "border-b": z() }],
			"border-w-l": [{ "border-l": z() }],
			"divide-x": [{ "divide-x": z() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": z() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...re(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...re(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...re(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				U,
				q,
				K
			] }],
			"outline-w": [{ outline: [
				"",
				U,
				Fe,
				Oe
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				Be,
				Pe
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Be,
				Pe
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: z() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [U, Oe] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": z() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Be,
				Pe
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				U,
				q,
				K
			] }],
			"mix-blend": [{ "mix-blend": [
				...ie(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ie() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [U] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": B() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": B() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": B() }],
			"mask-image-t-to-pos": [{ "mask-t-to": B() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": B() }],
			"mask-image-r-to-pos": [{ "mask-r-to": B() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": B() }],
			"mask-image-b-to-pos": [{ "mask-b-to": B() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": B() }],
			"mask-image-l-to-pos": [{ "mask-l-to": B() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": B() }],
			"mask-image-x-to-pos": [{ "mask-x-to": B() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": B() }],
			"mask-image-y-to-pos": [{ "mask-y-to": B() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [q, K] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": B() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": B() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [U] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": B() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": B() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: L() }],
			"mask-repeat": [{ mask: ee() }],
			"mask-size": [{ mask: te() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				q,
				K
			] }],
			filter: [{ filter: [
				"",
				"none",
				q,
				K
			] }],
			blur: [{ blur: ae() }],
			brightness: [{ brightness: [
				U,
				q,
				K
			] }],
			contrast: [{ contrast: [
				U,
				q,
				K
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Be,
				Pe
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				U,
				q,
				K
			] }],
			"hue-rotate": [{ "hue-rotate": [
				U,
				q,
				K
			] }],
			invert: [{ invert: [
				"",
				U,
				q,
				K
			] }],
			saturate: [{ saturate: [
				U,
				q,
				K
			] }],
			sepia: [{ sepia: [
				"",
				U,
				q,
				K
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				q,
				K
			] }],
			"backdrop-blur": [{ "backdrop-blur": ae() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				U,
				q,
				K
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				U,
				q,
				K
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				U,
				q,
				K
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				U,
				q,
				K
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				U,
				q,
				K
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				U,
				q,
				K
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				U,
				q,
				K
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				U,
				q,
				K
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				q,
				K
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				U,
				"initial",
				q,
				K
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				q,
				K
			] }],
			delay: [{ delay: [
				U,
				q,
				K
			] }],
			animate: [{ animate: [
				"none",
				v,
				q,
				K
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				q,
				K
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: oe() }],
			"rotate-x": [{ "rotate-x": oe() }],
			"rotate-y": [{ "rotate-y": oe() }],
			"rotate-z": [{ "rotate-z": oe() }],
			scale: [{ scale: se() }],
			"scale-x": [{ "scale-x": se() }],
			"scale-y": [{ "scale-y": se() }],
			"scale-z": [{ "scale-z": se() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ce() }],
			"skew-x": [{ "skew-x": ce() }],
			"skew-y": [{ "skew-y": ce() }],
			transform: [{ transform: [
				q,
				K,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: le() }],
			"translate-x": [{ "translate-x": le() }],
			"translate-y": [{ "translate-y": le() }],
			"translate-z": [{ "translate-z": le() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				q,
				K
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				q,
				K
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				U,
				Fe,
				Oe,
				ke
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/components/cn.ts
function J(...e) {
	return Qe(b(e));
}
//#endregion
//#region src/components/slot.tsx
var $e = i(function({ children: n, ...r }, i) {
	let o = e.only(n);
	return a(o) ? t(o, {
		...et(r, o.props),
		ref: i
	}) : null;
});
function et(e, t) {
	let n = { ...t };
	for (let r of Object.keys(e)) {
		let i = e[r], a = t[r];
		r === "className" ? n[r] = J(i, a) : r === "style" ? n[r] = {
			...i,
			...a
		} : r.startsWith("on") && typeof i == "function" ? typeof a == "function" ? n[r] = (...e) => {
			a(...e), i(...e);
		} : n[r] = i : r in t || (n[r] = i);
	}
	return n;
}
//#endregion
//#region src/components/tokens.ts
var tt = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32
}, nt = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	full: 9999
}, rt = { min: 44 }, it = {
	primary: {
		50: "#eff6ff",
		100: "#dbeafe",
		200: "#bfdbfe",
		300: "#93c5fd",
		400: "#60a5fa",
		500: "#3b82f6",
		600: "#2563eb",
		700: "#1d4ed8",
		800: "#1e40af",
		900: "#1e3a8a"
	},
	accent: {
		50: "#f5f3ff",
		100: "#ede9fe",
		200: "#ddd6fe",
		300: "#c4b5fd",
		400: "#a78bfa",
		500: "#8b5cf6",
		600: "#7c3aed",
		700: "#6d28d9",
		800: "#5b21b6",
		900: "#4c1d95"
	},
	success: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d"
	},
	warning: {
		50: "#fffbeb",
		100: "#fef3c7",
		200: "#fde68a",
		300: "#fcd34d",
		400: "#fbbf24",
		500: "#f97316",
		600: "#ea580c",
		700: "#c2410c"
	},
	error: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c"
	},
	gray: {
		50: "#f9fafb",
		100: "#f3f4f6",
		200: "#e5e7eb",
		300: "#d1d5db",
		400: "#9ca3af",
		500: "#6b7280",
		600: "#4b5563",
		700: "#374151",
		800: "#1f2937",
		900: "#111827"
	}
}, at = {
	none: "#22c55e",
	mild: "#84cc16",
	moderate: "#eab308",
	severe: "#f97316",
	extreme: "#ef4444"
}, ot = {
	none: "Aucune",
	mild: "Légère",
	moderate: "Modérée",
	severe: "Sévère",
	extreme: "Extrême"
}, st = {
	0: "none",
	1: "mild",
	2: "moderate",
	3: "severe",
	4: "extreme"
};
function ct(e) {
	return at[st[e]];
}
function lt(e) {
	return ot[st[e]];
}
var ut = {
	0: "bg-green-500",
	1: "bg-lime-500",
	2: "bg-yellow-500",
	3: "bg-orange-500",
	4: "bg-red-500"
}, dt = {
	0: "text-green-500",
	1: "text-lime-500",
	2: "text-yellow-500",
	3: "text-orange-500",
	4: "text-red-500"
}, ft = {
	0: "border-green-500",
	1: "border-lime-500",
	2: "border-yellow-500",
	3: "border-orange-500",
	4: "border-red-500"
}, pt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, mt = b, Y = (e, t) => (n) => {
	if (t?.variants == null) return mt(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = pt(t) || pt(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return mt(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, ht = Y("font-medium transition-all duration-200 rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2", {
	variants: {
		variant: {
			primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md focus:ring-primary-500",
			secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 shadow-sm hover:shadow-md focus:ring-gray-500",
			accent: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm hover:shadow-md focus:ring-accent-500",
			outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
			ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
			gradient: "bg-gradient-primary text-white shadow-md hover:shadow-lg focus:ring-primary-500"
		},
		size: {
			sm: "px-3 py-1.5 text-sm h-9",
			md: "px-4 py-2.5 text-sm h-10",
			lg: "px-6 py-3 text-base h-12"
		},
		fullWidth: { true: "w-full" }
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
}), gt = i(function({ children: e, variant: t, size: n, fullWidth: r, loading: i = !1, leftIcon: a, rightIcon: o, className: s, disabled: c, asChild: l = !1, ...u }, d) {
	return /* @__PURE__ */ _(l ? $e : "button", {
		ref: d,
		className: J(ht({
			variant: t,
			size: n,
			fullWidth: r
		}), s),
		disabled: c || i,
		...u,
		children: [
			i && /* @__PURE__ */ _("svg", {
				className: "animate-spin h-5 w-5",
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ g("circle", {
					className: "opacity-25",
					cx: "12",
					cy: "12",
					r: "10",
					stroke: "currentColor",
					strokeWidth: "4"
				}), /* @__PURE__ */ g("path", {
					className: "opacity-75",
					fill: "currentColor",
					d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				})]
			}),
			!i && a && /* @__PURE__ */ g("span", { children: a }),
			/* @__PURE__ */ g("span", { children: e }),
			!i && o && /* @__PURE__ */ g("span", { children: o })
		]
	});
}), _t = Y("", {
	variants: {
		variant: {
			elevated: "bg-white shadow-md border border-gray-100",
			outlined: "bg-white border border-gray-200",
			filled: "bg-gray-50 border border-gray-100",
			ghost: "bg-transparent"
		},
		padding: {
			none: "",
			sm: "p-3",
			md: "p-4",
			lg: "p-6"
		},
		rounded: {
			sm: "rounded",
			md: "rounded-lg",
			lg: "rounded-xl",
			xl: "rounded-2xl"
		},
		clickable: { true: "cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-gray-300 active:scale-[0.99]" }
	},
	defaultVariants: {
		variant: "elevated",
		padding: "md",
		rounded: "lg"
	}
}), vt = i(function({ children: e, variant: t, padding: n, rounded: r, clickable: i, className: a, ...o }, s) {
	return /* @__PURE__ */ g("div", {
		ref: s,
		className: J(_t({
			variant: t,
			padding: n,
			rounded: r,
			clickable: i
		}), a),
		...o,
		children: e
	});
}), yt = i(function({ children: e, action: t, className: n, ...r }, i) {
	return /* @__PURE__ */ _("div", {
		ref: i,
		className: J("flex items-center justify-between mb-3", n),
		...r,
		children: [/* @__PURE__ */ g("div", {
			className: "font-semibold text-gray-900",
			children: e
		}), t && /* @__PURE__ */ g("div", { children: t })]
	});
}), bt = i(function({ children: e, className: t, ...n }, r) {
	return /* @__PURE__ */ g("div", {
		ref: r,
		className: J("text-gray-600", t),
		...n,
		children: e
	});
}), xt = i(function({ children: e, className: t, ...n }, r) {
	return /* @__PURE__ */ g("div", {
		ref: r,
		className: J("mt-4 pt-4 border-t border-gray-100 flex items-center gap-2", t),
		...n,
		children: e
	});
}), St = Y("inline-flex items-center gap-1.5 font-medium rounded-full", {
	variants: {
		variant: {
			default: "bg-gray-100 text-gray-700",
			primary: "bg-primary-100 text-primary-700",
			accent: "bg-accent-100 text-accent-700",
			success: "bg-green-100 text-green-700",
			warning: "bg-orange-100 text-orange-700",
			error: "bg-red-100 text-red-700",
			info: "bg-blue-100 text-blue-700"
		},
		size: {
			sm: "px-2 py-0.5 text-xs",
			md: "px-2.5 py-1 text-xs",
			lg: "px-3 py-1.5 text-sm"
		},
		outline: { true: "bg-transparent border" }
	},
	compoundVariants: [
		{
			variant: "default",
			outline: !0,
			className: "border-gray-300 text-gray-700"
		},
		{
			variant: "primary",
			outline: !0,
			className: "border-primary-300 text-primary-700"
		},
		{
			variant: "accent",
			outline: !0,
			className: "border-accent-300 text-accent-700"
		},
		{
			variant: "success",
			outline: !0,
			className: "border-green-300 text-green-700"
		},
		{
			variant: "warning",
			outline: !0,
			className: "border-orange-300 text-orange-700"
		},
		{
			variant: "error",
			outline: !0,
			className: "border-red-300 text-red-700"
		},
		{
			variant: "info",
			outline: !0,
			className: "border-blue-300 text-blue-700"
		}
	],
	defaultVariants: {
		variant: "default",
		size: "md"
	}
}), Ct = Y("rounded-full", {
	variants: {
		variant: {
			default: "bg-gray-500",
			primary: "bg-primary-500",
			accent: "bg-accent-500",
			success: "bg-green-500",
			warning: "bg-orange-500",
			error: "bg-red-500",
			info: "bg-blue-500"
		},
		size: {
			sm: "w-1.5 h-1.5",
			md: "w-2 h-2",
			lg: "w-2.5 h-2.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
}), wt = i(function({ children: e, variant: t, size: n, outline: r, dot: i = !1, className: a, ...o }, s) {
	return /* @__PURE__ */ _("span", {
		ref: s,
		className: J(St({
			variant: t,
			size: n,
			outline: r
		}), a),
		...o,
		children: [i && /* @__PURE__ */ g("span", {
			className: Ct({
				variant: t,
				size: n
			}),
			"aria-hidden": "true"
		}), e]
	});
}), Tt = Y("inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", {
	variants: {
		variant: {
			default: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-400",
			primary: "bg-primary-100 text-primary-700 hover:bg-primary-200 active:bg-primary-300 focus:ring-primary-400",
			accent: "bg-accent-100 text-accent-700 hover:bg-accent-200 active:bg-accent-300 focus:ring-accent-400",
			ghost: "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400",
			outline: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-400"
		},
		size: {
			sm: "w-9 h-9 min-w-[36px] min-h-[36px] [&>svg]:w-4 [&>svg]:h-4",
			md: "w-11 h-11 min-w-[44px] min-h-[44px] [&>svg]:w-5 [&>svg]:h-5",
			lg: "w-14 h-14 min-w-[56px] min-h-[56px] [&>svg]:w-6 [&>svg]:h-6"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
}), Et = i(function({ icon: e, label: t, variant: n, size: r, loading: i = !1, disabled: a, className: o, ...s }, c) {
	return /* @__PURE__ */ _("button", {
		ref: c,
		type: "button",
		"aria-label": t,
		disabled: a || i,
		className: J(Tt({
			variant: n,
			size: r
		}), o),
		...s,
		children: [i ? /* @__PURE__ */ _("svg", {
			className: "animate-spin",
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ g("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4"
			}), /* @__PURE__ */ g("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			})]
		}) : e, /* @__PURE__ */ g("span", {
			className: "sr-only",
			children: t
		})]
	});
}), Dt = Y("bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed", {
	variants: {
		size: {
			sm: "px-3 py-1.5 text-sm h-9",
			md: "px-4 py-2.5 text-sm h-10",
			lg: "px-4 py-3 text-base h-12"
		},
		hasError: {
			true: "border-red-500 focus:ring-red-500 focus:border-red-500",
			false: "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
		},
		fullWidth: { true: "w-full" }
	},
	defaultVariants: {
		size: "md",
		hasError: !1,
		fullWidth: !0
	}
}), Ot = i(function({ label: e, error: t, helpText: n, size: r, leftIcon: i, rightIcon: a, fullWidth: o, className: s, id: c, required: l, disabled: d, ...f }, p) {
	let m = u(), h = c || m, v = !!t;
	return /* @__PURE__ */ _("div", {
		className: J(o !== !1 && "w-full"),
		children: [
			e && /* @__PURE__ */ _("label", {
				htmlFor: h,
				className: "block text-sm font-medium text-gray-700 mb-1.5",
				children: [e, l && /* @__PURE__ */ g("span", {
					className: "text-red-500 ml-0.5",
					children: "*"
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "relative",
				children: [
					i && /* @__PURE__ */ g("div", {
						className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400",
						children: i
					}),
					/* @__PURE__ */ g("input", {
						ref: p,
						id: h,
						required: l,
						disabled: d,
						"aria-invalid": v || void 0,
						"aria-describedby": v ? `${h}-error` : n ? `${h}-help` : void 0,
						className: J(Dt({
							size: r,
							hasError: v,
							fullWidth: o
						}), i && "pl-10", (a || v) && "pr-10", s),
						...f
					}),
					(a || v) && /* @__PURE__ */ g("div", {
						className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
						children: v ? /* @__PURE__ */ g("svg", {
							className: "w-5 h-5 text-red-500",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							"aria-hidden": "true",
							children: /* @__PURE__ */ g("path", {
								fillRule: "evenodd",
								d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
								clipRule: "evenodd"
							})
						}) : /* @__PURE__ */ g("span", {
							className: "text-gray-400",
							children: a
						})
					})
				]
			}),
			v && /* @__PURE__ */ g("p", {
				id: `${h}-error`,
				className: "mt-1.5 text-sm text-red-600",
				role: "alert",
				children: t
			}),
			n && !v && /* @__PURE__ */ g("p", {
				id: `${h}-help`,
				className: "mt-1.5 text-xs text-gray-500",
				children: n
			})
		]
	});
}), kt = Y("bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed resize-y min-h-[100px] px-4 py-2.5 text-sm", {
	variants: {
		hasError: {
			true: "border-red-500 focus:ring-red-500 focus:border-red-500",
			false: "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
		},
		fullWidth: { true: "w-full" }
	},
	defaultVariants: {
		hasError: !1,
		fullWidth: !0
	}
}), At = i(function({ label: e, error: t, helpText: n, showCount: r = !1, maxLength: i, fullWidth: a, className: o, id: s, required: c, disabled: l, value: d, rows: f = 4, ...p }, m) {
	let h = u(), v = s || h, y = !!t, b = typeof d == "string" ? d.length : 0;
	return /* @__PURE__ */ _("div", {
		className: J(a !== !1 && "w-full"),
		children: [
			e && /* @__PURE__ */ _("label", {
				htmlFor: v,
				className: "block text-sm font-medium text-gray-700 mb-1.5",
				children: [e, c && /* @__PURE__ */ g("span", {
					className: "text-red-500 ml-0.5",
					children: "*"
				})]
			}),
			/* @__PURE__ */ g("textarea", {
				ref: m,
				id: v,
				required: c,
				disabled: l,
				value: d,
				rows: f,
				maxLength: i,
				"aria-invalid": y || void 0,
				"aria-describedby": y ? `${v}-error` : n ? `${v}-help` : void 0,
				className: J(kt({
					hasError: y,
					fullWidth: a
				}), o),
				...p
			}),
			/* @__PURE__ */ _("div", {
				className: "flex justify-between items-start mt-1.5",
				children: [/* @__PURE__ */ _("div", {
					className: "flex-1",
					children: [y && /* @__PURE__ */ g("p", {
						id: `${v}-error`,
						className: "text-sm text-red-600",
						role: "alert",
						children: t
					}), n && !y && /* @__PURE__ */ g("p", {
						id: `${v}-help`,
						className: "text-xs text-gray-500",
						children: n
					})]
				}), r && /* @__PURE__ */ _("span", {
					className: J("text-xs ml-2", i && b >= i ? "text-red-500" : "text-gray-400"),
					children: [b, i && `/${i}`]
				})]
			})
		]
	});
}), jt = Y("bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none cursor-pointer pr-10", {
	variants: {
		size: {
			sm: "px-3 py-1.5 text-sm h-9",
			md: "px-4 py-2.5 text-sm h-10",
			lg: "px-4 py-3 text-base h-12"
		},
		hasError: {
			true: "border-red-500 focus:ring-red-500 focus:border-red-500",
			false: "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
		},
		hasValue: {
			true: "text-gray-900",
			false: "text-gray-400"
		},
		fullWidth: { true: "w-full" }
	},
	defaultVariants: {
		size: "md",
		hasError: !1,
		hasValue: !1,
		fullWidth: !0
	}
}), Mt = i(function({ label: e, options: t, placeholder: n, error: r, helpText: i, size: a, fullWidth: o, className: s, id: c, required: l, disabled: d, value: f, ...p }, m) {
	let h = u(), v = c || h, y = !!r, b = f !== "" && f !== void 0;
	return /* @__PURE__ */ _("div", {
		className: J(o !== !1 && "w-full"),
		children: [
			e && /* @__PURE__ */ _("label", {
				htmlFor: v,
				className: "block text-sm font-medium text-gray-700 mb-1.5",
				children: [e, l && /* @__PURE__ */ g("span", {
					className: "text-red-500 ml-0.5",
					children: "*"
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "relative",
				children: [/* @__PURE__ */ _("select", {
					ref: m,
					id: v,
					required: l,
					disabled: d,
					value: f,
					"aria-invalid": y || void 0,
					"aria-describedby": y ? `${v}-error` : i ? `${v}-help` : void 0,
					className: J(jt({
						size: a,
						hasError: y,
						hasValue: b,
						fullWidth: o
					}), s),
					...p,
					children: [n && /* @__PURE__ */ g("option", {
						value: "",
						disabled: !0,
						children: n
					}), t.map((e) => /* @__PURE__ */ g("option", {
						value: e.value,
						disabled: e.disabled,
						children: e.label
					}, e.value))]
				}), /* @__PURE__ */ g("div", {
					className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
					children: /* @__PURE__ */ g("svg", {
						className: J("w-5 h-5", y ? "text-red-500" : "text-gray-400"),
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						"aria-hidden": "true",
						children: /* @__PURE__ */ g("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 2,
							d: "M19 9l-7 7-7-7"
						})
					})
				})]
			}),
			y && /* @__PURE__ */ g("p", {
				id: `${v}-error`,
				className: "mt-1.5 text-sm text-red-600",
				role: "alert",
				children: r
			}),
			i && !y && /* @__PURE__ */ g("p", {
				id: `${v}-help`,
				className: "mt-1.5 text-xs text-gray-500",
				children: i
			})
		]
	});
}), Nt = Y("relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", {
	variants: {
		size: {
			sm: "w-8 h-5 p-0.5",
			md: "w-11 h-6 p-0.5",
			lg: "w-14 h-7 p-0.5"
		},
		checked: {
			true: "bg-primary-600",
			false: "bg-gray-200"
		}
	},
	defaultVariants: {
		size: "md",
		checked: !1
	}
}), Pt = Y("pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out", {
	variants: { size: {
		sm: "w-3.5 h-3.5",
		md: "w-5 h-5",
		lg: "w-6 h-6"
	} },
	defaultVariants: { size: "md" }
}), Ft = {
	sm: "translate-x-3.5",
	md: "translate-x-5",
	lg: "translate-x-7"
}, It = i(function({ checked: e, onChange: t, label: n, description: r, size: i = "md", disabled: a = !1, className: o, id: s }, c) {
	let l = u(), d = s || l;
	return /* @__PURE__ */ _("div", {
		className: J("flex items-start gap-3", o),
		children: [/* @__PURE__ */ g("button", {
			ref: c,
			id: d,
			type: "button",
			role: "switch",
			"aria-checked": e,
			"aria-labelledby": n ? `${d}-label` : void 0,
			"aria-describedby": r ? `${d}-desc` : void 0,
			disabled: a,
			onClick: () => !a && t(!e),
			className: Nt({
				size: i,
				checked: e
			}),
			children: /* @__PURE__ */ g("span", { className: J(Pt({ size: i }), e ? Ft[i] : "translate-x-0") })
		}), (n || r) && /* @__PURE__ */ _("div", {
			className: "flex-1 min-w-0",
			children: [n && /* @__PURE__ */ g("label", {
				id: `${d}-label`,
				htmlFor: d,
				className: J("block text-sm font-medium cursor-pointer", a ? "text-gray-400" : "text-gray-900"),
				children: n
			}), r && /* @__PURE__ */ g("p", {
				id: `${d}-desc`,
				className: J("text-xs mt-0.5", a ? "text-gray-300" : "text-gray-500"),
				children: r
			})]
		})]
	});
}), Lt = Y("inline-flex bg-gray-100 rounded-lg", {
	variants: {
		size: {
			sm: "p-0.5 gap-0.5",
			md: "p-1 gap-1",
			lg: "p-1.5 gap-1"
		},
		fullWidth: { true: "w-full" }
	},
	defaultVariants: { size: "md" }
}), Rt = Y("flex-1 inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1", {
	variants: {
		size: {
			sm: "px-3 py-1 text-xs min-h-[32px] [&>svg]:w-3.5 [&>svg]:h-3.5",
			md: "px-4 py-2 text-sm min-h-[40px] [&>svg]:w-4 [&>svg]:h-4",
			lg: "px-5 py-2.5 text-base min-h-[48px] [&>svg]:w-5 [&>svg]:h-5"
		},
		selected: {
			true: "bg-white text-gray-900 shadow-sm",
			false: "bg-transparent text-gray-600 hover:text-gray-900"
		},
		isDisabled: {
			true: "opacity-50 cursor-not-allowed",
			false: "cursor-pointer"
		}
	},
	defaultVariants: {
		size: "md",
		selected: !1,
		isDisabled: !1
	}
});
function zt({ value: e, onChange: t, options: n, size: r, fullWidth: i, className: a, "aria-label": o }) {
	let c = u(), l = s((r, i) => {
		let a = n.filter((e) => !e.disabled), o = a.findIndex((t) => t.value === e), s = null;
		r.key === "ArrowRight" || r.key === "ArrowDown" ? (r.preventDefault(), s = (o + 1) % a.length) : r.key === "ArrowLeft" || r.key === "ArrowUp" ? (r.preventDefault(), s = (o - 1 + a.length) % a.length) : r.key === "Home" ? (r.preventDefault(), s = 0) : r.key === "End" && (r.preventDefault(), s = a.length - 1), s !== null && t(a[s].value);
	}, [
		n,
		e,
		t
	]);
	return /* @__PURE__ */ g("div", {
		role: "radiogroup",
		"aria-label": o,
		className: J(Lt({
			size: r,
			fullWidth: i
		}), a),
		children: n.map((n, i) => {
			let a = n.value === e, o = !!n.disabled;
			return /* @__PURE__ */ _("button", {
				type: "button",
				role: "radio",
				"aria-checked": a,
				"aria-disabled": o,
				id: `${c}-${n.value}`,
				tabIndex: a ? 0 : -1,
				disabled: o,
				onClick: () => !o && t(n.value),
				onKeyDown: (e) => l(e, i),
				className: Rt({
					size: r,
					selected: a,
					isDisabled: o
				}),
				children: [n.icon, /* @__PURE__ */ g("span", { children: n.label })]
			}, n.value);
		})
	});
}
//#endregion
//#region node_modules/.pnpm/lucide-react@1.7.0_react@19.2.4/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
var Bt = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Vt = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ht = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Ut = (e) => {
	let t = Ht(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Wt = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Gt = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Kt = n({}), qt = () => c(Kt), Jt = i(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = qt() ?? {}, h = i ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return r("svg", {
		ref: l,
		...Wt,
		width: t ?? u ?? Wt.width,
		height: t ?? u ?? Wt.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: Bt("lucide", m, a),
		...!o && !Gt(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]]);
}), X = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(Jt, {
		ref: a,
		iconNode: t,
		className: Bt(`lucide-${Vt(Ut(e))}`, `lucide-${e}`, n),
		...i
	}));
	return n.displayName = Ut(e), n;
}, Yt = X("angry", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M16 16s-1.5-2-4-2-4 2-4 2",
		key: "epbg0q"
	}],
	["path", {
		d: "M7.5 8 10 9",
		key: "olxxln"
	}],
	["path", {
		d: "m14 9 2.5-1",
		key: "1j6cij"
	}],
	["path", {
		d: "M9 10h.01",
		key: "qbtxuw"
	}],
	["path", {
		d: "M15 10h.01",
		key: "1qmjsl"
	}]
]), Xt = X("armchair", [
	["path", {
		d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",
		key: "irtipd"
	}],
	["path", {
		d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
		key: "1qyhux"
	}],
	["path", {
		d: "M5 18v2",
		key: "ppbyun"
	}],
	["path", {
		d: "M19 18v2",
		key: "gy7782"
	}]
]), Zt = X("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), Qt = X("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), $t = X("battery-full", [
	["path", {
		d: "M10 10v4",
		key: "1mb2ec"
	}],
	["path", {
		d: "M14 10v4",
		key: "1nt88p"
	}],
	["path", {
		d: "M22 14v-4",
		key: "14q9d5"
	}],
	["path", {
		d: "M6 10v4",
		key: "1n77qd"
	}],
	["rect", {
		x: "2",
		y: "6",
		width: "16",
		height: "12",
		rx: "2",
		key: "13zb55"
	}]
]), en = X("battery-low", [
	["path", {
		d: "M22 14v-4",
		key: "14q9d5"
	}],
	["path", {
		d: "M6 14v-4",
		key: "14a6bd"
	}],
	["rect", {
		x: "2",
		y: "6",
		width: "16",
		height: "12",
		rx: "2",
		key: "13zb55"
	}]
]), tn = X("battery-medium", [
	["path", {
		d: "M10 14v-4",
		key: "suye4c"
	}],
	["path", {
		d: "M22 14v-4",
		key: "14q9d5"
	}],
	["path", {
		d: "M6 14v-4",
		key: "14a6bd"
	}],
	["rect", {
		x: "2",
		y: "6",
		width: "16",
		height: "12",
		rx: "2",
		key: "13zb55"
	}]
]), nn = X("battery-warning", [
	["path", {
		d: "M10 17h.01",
		key: "nbq80n"
	}],
	["path", {
		d: "M10 7v6",
		key: "nne03l"
	}],
	["path", {
		d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2",
		key: "1m83kb"
	}],
	["path", {
		d: "M22 14v-4",
		key: "14q9d5"
	}],
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
		key: "h8lgfh"
	}]
]), rn = X("battery", [["path", {
	d: "M 22 14 L 22 10",
	key: "nqc4tb"
}], ["rect", {
	x: "2",
	y: "6",
	width: "16",
	height: "12",
	rx: "2",
	key: "13zb55"
}]]), an = X("bed-single", [
	["path", {
		d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8",
		key: "1wm6mi"
	}],
	["path", {
		d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4",
		key: "4k93s5"
	}],
	["path", {
		d: "M3 18h18",
		key: "1h113x"
	}]
]), on = X("bed", [
	["path", {
		d: "M2 4v16",
		key: "vw9hq8"
	}],
	["path", {
		d: "M2 8h18a2 2 0 0 1 2 2v10",
		key: "1dgv2r"
	}],
	["path", {
		d: "M2 17h20",
		key: "18nfp3"
	}],
	["path", {
		d: "M6 8v9",
		key: "1yriud"
	}]
]), sn = X("bone", [["path", {
	d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
	key: "w610uw"
}]]), cn = X("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]), ln = X("box", [
	["path", {
		d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
		key: "hh9hay"
	}],
	["path", {
		d: "m3.3 7 8.7 5 8.7-5",
		key: "g66t2b"
	}],
	["path", {
		d: "M12 22V12",
		key: "d0xqtd"
	}]
]), un = X("building-2", [
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}],
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M14 21v-3a2 2 0 0 0-4 0v3",
		key: "1rgiei"
	}],
	["path", {
		d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
		key: "secmi2"
	}],
	["path", {
		d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
		key: "16ra0t"
	}]
]), dn = X("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]), fn = X("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), pn = X("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), mn = X("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), hn = X("circle-check-big", [["path", {
	d: "M21.801 10A10 10 0 1 1 17 3.335",
	key: "yps3ct"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]), gn = X("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), _n = X("clipboard-list", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "M12 11h4",
		key: "1jrz19"
	}],
	["path", {
		d: "M12 16h4",
		key: "n85exb"
	}],
	["path", {
		d: "M8 11h.01",
		key: "1dfujw"
	}],
	["path", {
		d: "M8 16h.01",
		key: "18s6g9"
	}]
]), vn = X("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]), yn = X("coffee", [
	["path", {
		d: "M10 2v2",
		key: "7u0qdc"
	}],
	["path", {
		d: "M14 2v2",
		key: "6buw04"
	}],
	["path", {
		d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
		key: "pwadti"
	}],
	["path", {
		d: "M6 2v2",
		key: "colzsn"
	}]
]), bn = X("construction", [
	["rect", {
		x: "2",
		y: "6",
		width: "20",
		height: "8",
		rx: "1",
		key: "1estib"
	}],
	["path", {
		d: "M17 14v7",
		key: "7m2elx"
	}],
	["path", {
		d: "M7 14v7",
		key: "1cm7wv"
	}],
	["path", {
		d: "M17 3v3",
		key: "1v4jwn"
	}],
	["path", {
		d: "M7 3v3",
		key: "7o6guu"
	}],
	["path", {
		d: "M10 14 2.3 6.3",
		key: "1023jk"
	}],
	["path", {
		d: "m14 6 7.7 7.7",
		key: "1s8pl2"
	}],
	["path", {
		d: "m8 6 8 8",
		key: "hl96qh"
	}]
]), xn = X("cylinder", [["ellipse", {
	cx: "12",
	cy: "5",
	rx: "9",
	ry: "3",
	key: "msslwz"
}], ["path", {
	d: "M3 5v14a9 3 0 0 0 18 0V5",
	key: "aqi0yr"
}]]), Sn = X("dog", [
	["path", {
		d: "M11.25 16.25h1.5L12 17z",
		key: "w7jh35"
	}],
	["path", {
		d: "M16 14v.5",
		key: "1lajdz"
	}],
	["path", {
		d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
		key: "u7s9ue"
	}],
	["path", {
		d: "M8 14v.5",
		key: "1nzgdb"
	}],
	["path", {
		d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
		key: "v8hric"
	}]
]), Cn = X("dumbbell", [
	["path", {
		d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
		key: "9m4mmf"
	}],
	["path", {
		d: "m2.5 21.5 1.4-1.4",
		key: "17g3f0"
	}],
	["path", {
		d: "m20.1 3.9 1.4-1.4",
		key: "1qn309"
	}],
	["path", {
		d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
		key: "1t2c92"
	}],
	["path", {
		d: "m9.6 14.4 4.8-4.8",
		key: "6umqxw"
	}]
]), wn = X("file-question-mark", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}],
	["path", {
		d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
		key: "mhlwft"
	}]
]), Tn = X("flame", [["path", {
	d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
	key: "1slcih"
}]]), En = X("footprints", [
	["path", {
		d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
		key: "1dudjm"
	}],
	["path", {
		d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
		key: "l2t8xc"
	}],
	["path", {
		d: "M16 17h4",
		key: "1dejxt"
	}],
	["path", {
		d: "M4 13h4",
		key: "1bwh8b"
	}]
]), Dn = X("frown", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M16 16s-1.5-2-4-2-4 2-4 2",
		key: "epbg0q"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]), On = X("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]), kn = X("grip", [
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "19",
		cy: "5",
		r: "1",
		key: "w8mnmm"
	}],
	["circle", {
		cx: "5",
		cy: "5",
		r: "1",
		key: "lttvr7"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}],
	["circle", {
		cx: "19",
		cy: "19",
		r: "1",
		key: "shf9b7"
	}],
	["circle", {
		cx: "5",
		cy: "19",
		r: "1",
		key: "bfqh0e"
	}]
]), An = X("hand", [
	["path", {
		d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
		key: "1fvzgz"
	}],
	["path", {
		d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
		key: "1kc0my"
	}],
	["path", {
		d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
		key: "10h0bg"
	}],
	["path", {
		d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
		key: "1s1gnw"
	}]
]), jn = X("heart-pulse", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}], ["path", {
	d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
	key: "auskq0"
}]]), Mn = X("heart", [["path", {
	d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	key: "mvr1a0"
}]]), Nn = X("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]), Pn = X("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), Fn = X("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]), In = X("meh", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "15",
		y2: "15",
		key: "1xb1d9"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]), Ln = X("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), Rn = X("party-popper", [
	["path", {
		d: "M5.8 11.3 2 22l10.7-3.79",
		key: "gwxi1d"
	}],
	["path", {
		d: "M4 3h.01",
		key: "1vcuye"
	}],
	["path", {
		d: "M22 8h.01",
		key: "1mrtc2"
	}],
	["path", {
		d: "M15 2h.01",
		key: "1cjtqr"
	}],
	["path", {
		d: "M22 20h.01",
		key: "1mrys2"
	}],
	["path", {
		d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
		key: "hbicv8"
	}],
	["path", {
		d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",
		key: "1i94pl"
	}],
	["path", {
		d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",
		key: "1cofks"
	}],
	["path", {
		d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
		key: "4kbmks"
	}]
]), zn = X("pause", [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "kaeet6"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "1wsw3u"
}]]), Bn = X("person-standing", [
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["path", {
		d: "m9 20 3-6 3 6",
		key: "se2kox"
	}],
	["path", {
		d: "m6 8 6 2 6-2",
		key: "4o3us4"
	}],
	["path", {
		d: "M12 10v4",
		key: "1kjpxc"
	}]
]), Vn = X("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), Hn = X("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), Un = X("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), Wn = X("ribbon", [
	["path", {
		d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22",
		key: "1rnhq3"
	}],
	["path", {
		d: "m12 18 2.57-3.5",
		key: "116vt7"
	}],
	["path", {
		d: "M6.243 9.016a7 7 0 0 1 11.507-.009",
		key: "10dq0b"
	}],
	["path", {
		d: "M9.35 14.53 12 11.22",
		key: "tdsyp2"
	}],
	["path", {
		d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
		key: "nmifey"
	}]
]), Gn = X("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), Kn = X("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]), qn = X("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), Jn = X("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Yn = X("shield", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}]]), Xn = X("skull", [
	["path", {
		d: "m12.5 17-.5-1-.5 1h1z",
		key: "3me087"
	}],
	["path", {
		d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
		key: "1o5pge"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}]
]), Zn = X("smile", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M8 14s1.5 2 4 2 4-2 4-2",
		key: "1y1vjs"
	}],
	["line", {
		x1: "9",
		x2: "9.01",
		y1: "9",
		y2: "9",
		key: "yxxnd0"
	}],
	["line", {
		x1: "15",
		x2: "15.01",
		y1: "9",
		y2: "9",
		key: "1p4y9e"
	}]
]), Qn = X("sofa", [
	["path", {
		d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3",
		key: "1dgpiv"
	}],
	["path", {
		d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
		key: "xacw8m"
	}],
	["path", {
		d: "M4 18v2",
		key: "jwo5n2"
	}],
	["path", {
		d: "M20 18v2",
		key: "1ar1qi"
	}],
	["path", {
		d: "M12 4v9",
		key: "oqhhn3"
	}]
]), $n = X("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), er = X("square", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}]]), tr = X("target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]), nr = X("thumbs-up", [["path", {
	d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
	key: "emmmcr"
}], ["path", {
	d: "M7 10v12",
	key: "1qc93n"
}]]), rr = X("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]), ir = X("trending-down", [["path", {
	d: "M16 17h6v-6",
	key: "t6n2it"
}], ["path", {
	d: "m22 17-8.5-8.5-5 5L2 7",
	key: "x473p"
}]]), ar = X("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]), or = X("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), sr = X("trophy", [
	["path", {
		d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
		key: "1n3hpd"
	}],
	["path", {
		d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
		key: "rfe1zi"
	}],
	["path", {
		d: "M18 9h1.5a1 1 0 0 0 0-5H18",
		key: "7xy6bh"
	}],
	["path", {
		d: "M4 22h16",
		key: "57wxv0"
	}],
	["path", {
		d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
		key: "1mhfuq"
	}],
	["path", {
		d: "M6 9H4.5a1 1 0 0 1 0-5H6",
		key: "tex48p"
	}]
]), cr = X("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]), lr = X("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), ur = X("weight", [["circle", {
	cx: "12",
	cy: "5",
	r: "3",
	key: "rqqgnr"
}], ["path", {
	d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
	key: "56o5sh"
}]]), dr = X("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), fr = X("zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]), pr = Y("inline-flex items-center justify-center font-medium rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1", {
	variants: {
		variant: {
			primary: "",
			accent: "",
			success: "",
			warning: "",
			error: ""
		},
		size: {
			sm: "px-2 py-0.5 text-xs gap-1 min-h-[28px] [&>svg]:w-3 [&>svg]:h-3",
			md: "px-3 py-1 text-sm gap-1.5 min-h-[36px] [&>svg]:w-4 [&>svg]:h-4",
			lg: "px-4 py-1.5 text-base gap-2 min-h-[44px] [&>svg]:w-5 [&>svg]:h-5"
		},
		selected: {
			true: "",
			false: "bg-white text-gray-600 border-gray-300"
		},
		isDisabled: {
			true: "opacity-50 cursor-not-allowed",
			false: "cursor-pointer active:scale-95"
		}
	},
	compoundVariants: [
		{
			variant: "primary",
			selected: !0,
			className: "bg-primary-100 text-primary-700 border-primary-300"
		},
		{
			variant: "primary",
			selected: !1,
			className: "hover:bg-primary-50"
		},
		{
			variant: "accent",
			selected: !0,
			className: "bg-accent-100 text-accent-700 border-accent-300"
		},
		{
			variant: "accent",
			selected: !1,
			className: "hover:bg-accent-50"
		},
		{
			variant: "success",
			selected: !0,
			className: "bg-green-100 text-green-700 border-green-300"
		},
		{
			variant: "success",
			selected: !1,
			className: "hover:bg-green-50"
		},
		{
			variant: "warning",
			selected: !0,
			className: "bg-orange-100 text-orange-700 border-orange-300"
		},
		{
			variant: "warning",
			selected: !1,
			className: "hover:bg-orange-50"
		},
		{
			variant: "error",
			selected: !0,
			className: "bg-red-100 text-red-700 border-red-300"
		},
		{
			variant: "error",
			selected: !1,
			className: "hover:bg-red-50"
		}
	],
	defaultVariants: {
		variant: "primary",
		size: "md",
		selected: !1,
		isDisabled: !1
	}
}), mr = {
	sm: "w-4 h-4 -mr-0.5",
	md: "w-5 h-5 -mr-1",
	lg: "w-6 h-6 -mr-1"
}, hr = i(function({ children: e, selected: t = !1, onSelect: n, onRemove: r, variant: i, size: a = "md", disabled: o = !1, icon: s, className: c }, l) {
	return /* @__PURE__ */ _("button", {
		ref: l,
		type: "button",
		role: "checkbox",
		"aria-checked": t,
		disabled: o,
		onClick: () => !o && n?.(),
		className: J(pr({
			variant: i,
			size: a,
			selected: t,
			isDisabled: o
		}), c),
		children: [
			s && /* @__PURE__ */ g("span", {
				className: "shrink-0",
				children: s
			}),
			/* @__PURE__ */ g("span", { children: e }),
			r && /* @__PURE__ */ g("button", {
				type: "button",
				"aria-label": "Supprimer",
				onClick: (e) => {
					e.stopPropagation(), o || r();
				},
				disabled: o,
				className: J("shrink-0 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center justify-center", mr[a]),
				children: /* @__PURE__ */ g(dr, { className: "w-3 h-3" })
			})
		]
	});
});
function gr({ options: e, value: t, onChange: n, multiple: r = !0, variant: i, size: a, className: o }) {
	let s = (e) => {
		r ? t.includes(e) ? n(t.filter((t) => t !== e)) : n([...t, e]) : n(t.includes(e) ? [] : [e]);
	};
	return /* @__PURE__ */ g("div", {
		role: "group",
		className: J("flex flex-wrap gap-2", o),
		children: e.map((e) => /* @__PURE__ */ g(hr, {
			selected: t.includes(e.value),
			onSelect: () => s(e.value),
			variant: i,
			size: a,
			icon: e.icon,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components/slider.tsx
function _r({ value: e, onChange: t, min: n = 0, max: r = 100, step: i = 1, showValue: a = !1, label: o, disabled: c = !1, className: d, trackColor: f = "bg-primary-500", thumbColor: h = "bg-primary-600", showMarks: v = !1, minLabel: y, maxLabel: b }) {
	let x = u(), S = p(null), [C, w] = m(!1), T = (e - n) / (r - n) * 100, E = Math.floor((r - n) / i), D = s((a) => {
		if (!S.current || c) return;
		let o = S.current.getBoundingClientRect(), s = a - o.left, l = n + Math.max(0, Math.min(1, s / o.width)) * (r - n), u = Math.round(l / i) * i, d = Math.max(n, Math.min(r, u));
		d !== e && t(d);
	}, [
		n,
		r,
		i,
		e,
		t,
		c
	]), O = s((e) => {
		c || (w(!0), D(e.clientX));
	}, [c, D]), k = s((e) => {
		c || (w(!0), D(e.touches[0].clientX));
	}, [c, D]);
	l(() => {
		if (!C) return;
		let e = (e) => D(e.clientX), t = (e) => D(e.touches[0].clientX), n = () => w(!1);
		return document.addEventListener("mousemove", e), document.addEventListener("mouseup", n), document.addEventListener("touchmove", t), document.addEventListener("touchend", n), () => {
			document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", n), document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n);
		};
	}, [C, D]);
	let A = s((a) => {
		if (c) return;
		let o = e;
		switch (a.key) {
			case "ArrowRight":
			case "ArrowUp":
				o = Math.min(r, e + i);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				o = Math.max(n, e - i);
				break;
			case "Home":
				o = n;
				break;
			case "End":
				o = r;
				break;
			default: return;
		}
		a.preventDefault(), t(o);
	}, [
		e,
		n,
		r,
		i,
		c,
		t
	]);
	return /* @__PURE__ */ _("div", {
		className: J("w-full", d),
		children: [
			o && /* @__PURE__ */ g("label", {
				htmlFor: x,
				className: "block text-sm font-medium text-gray-700 mb-2",
				children: o
			}),
			(y || b) && /* @__PURE__ */ _("div", {
				className: "flex justify-between text-xs text-gray-500 mb-1",
				children: [/* @__PURE__ */ g("span", { children: y }), /* @__PURE__ */ g("span", { children: b })]
			}),
			/* @__PURE__ */ _("div", {
				ref: S,
				className: J("relative h-6 flex items-center", c ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
				onMouseDown: O,
				onTouchStart: k,
				children: [
					/* @__PURE__ */ g("div", { className: "absolute w-full h-2 bg-gray-200 rounded-full" }),
					/* @__PURE__ */ g("div", {
						className: J("absolute h-2 rounded-full transition-all", f),
						style: { width: `${T}%` }
					}),
					v && E <= 20 && /* @__PURE__ */ g("div", {
						className: "absolute w-full",
						children: Array.from({ length: E + 1 }).map((t, r) => {
							let a = r / E * 100;
							return /* @__PURE__ */ g("div", {
								className: J("absolute w-1 h-1 rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2", n + r * i <= e ? f : "bg-gray-300"),
								style: { left: `${a}%` }
							}, r);
						})
					}),
					/* @__PURE__ */ g("div", {
						role: "slider",
						id: x,
						tabIndex: c ? -1 : 0,
						"aria-valuemin": n,
						"aria-valuemax": r,
						"aria-valuenow": e,
						"aria-label": o,
						"aria-disabled": c,
						onKeyDown: A,
						className: J("absolute w-6 h-6 rounded-full shadow-md -translate-x-1/2 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2", h, C && "scale-110", !c && "hover:scale-105"),
						style: { left: `${T}%` },
						children: a && /* @__PURE__ */ _("div", {
							className: J("absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded transition-opacity whitespace-nowrap", C ? "opacity-100" : "opacity-0"),
							children: [e, /* @__PURE__ */ g("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" })]
						})
					})
				]
			}),
			a && !C && /* @__PURE__ */ g("div", {
				className: "text-center mt-1 text-sm font-medium text-gray-700",
				children: e
			})
		]
	});
}
//#endregion
//#region src/components/alert.tsx
var vr = Y("border rounded-lg p-4", {
	variants: { variant: {
		info: "bg-blue-50 border-blue-200",
		success: "bg-green-50 border-green-200",
		warning: "bg-amber-50 border-amber-200",
		error: "bg-red-50 border-red-200"
	} },
	defaultVariants: { variant: "info" }
}), yr = Y("", { variants: { variant: {
	info: "text-blue-500",
	success: "text-green-500",
	warning: "text-amber-500",
	error: "text-red-500"
} } }), br = Y("text-sm font-medium", { variants: { variant: {
	info: "text-blue-800",
	success: "text-green-800",
	warning: "text-amber-800",
	error: "text-red-800"
} } }), xr = Y("text-sm", { variants: { variant: {
	info: "text-blue-700",
	success: "text-green-700",
	warning: "text-amber-700",
	error: "text-red-700"
} } }), Sr = Y("ml-3 -mr-1.5 -mt-1.5 shrink-0 rounded-lg p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors", { variants: { variant: {
	info: "text-blue-500 hover:bg-blue-100",
	success: "text-green-500 hover:bg-green-100",
	warning: "text-amber-500 hover:bg-amber-100",
	error: "text-red-500 hover:bg-red-100"
} } }), Cr = {
	info: /* @__PURE__ */ g("svg", {
		className: "w-5 h-5",
		fill: "currentColor",
		viewBox: "0 0 20 20",
		children: /* @__PURE__ */ g("path", {
			fillRule: "evenodd",
			d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
			clipRule: "evenodd"
		})
	}),
	success: /* @__PURE__ */ g("svg", {
		className: "w-5 h-5",
		fill: "currentColor",
		viewBox: "0 0 20 20",
		children: /* @__PURE__ */ g("path", {
			fillRule: "evenodd",
			d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
			clipRule: "evenodd"
		})
	}),
	warning: /* @__PURE__ */ g("svg", {
		className: "w-5 h-5",
		fill: "currentColor",
		viewBox: "0 0 20 20",
		children: /* @__PURE__ */ g("path", {
			fillRule: "evenodd",
			d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
			clipRule: "evenodd"
		})
	}),
	error: /* @__PURE__ */ g("svg", {
		className: "w-5 h-5",
		fill: "currentColor",
		viewBox: "0 0 20 20",
		children: /* @__PURE__ */ g("path", {
			fillRule: "evenodd",
			d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
			clipRule: "evenodd"
		})
	})
}, wr = i(function({ variant: e = "info", title: t, children: n, dismissible: r = !1, onDismiss: i, icon: a, className: o }, s) {
	return /* @__PURE__ */ g("div", {
		ref: s,
		role: "alert",
		className: J(vr({ variant: e }), o),
		children: /* @__PURE__ */ _("div", {
			className: "flex",
			children: [
				/* @__PURE__ */ g("div", {
					className: J("shrink-0", yr({ variant: e })),
					children: a || Cr[e]
				}),
				/* @__PURE__ */ _("div", {
					className: "ml-3 flex-1",
					children: [t && /* @__PURE__ */ g("h3", {
						className: br({ variant: e }),
						children: t
					}), /* @__PURE__ */ g("div", {
						className: J(xr({ variant: e }), t && "mt-1"),
						children: n
					})]
				}),
				r && i && /* @__PURE__ */ g("button", {
					type: "button",
					onClick: i,
					className: Sr({ variant: e }),
					"aria-label": "Fermer",
					children: /* @__PURE__ */ g("svg", {
						className: "w-5 h-5",
						fill: "currentColor",
						viewBox: "0 0 20 20",
						children: /* @__PURE__ */ g("path", {
							fillRule: "evenodd",
							d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
							clipRule: "evenodd"
						})
					})
				})
			]
		})
	});
}), Tr = Y("w-full bg-gray-200 rounded-full overflow-hidden", {
	variants: { size: {
		sm: "h-1.5",
		md: "h-2.5",
		lg: "h-4"
	} },
	defaultVariants: { size: "md" }
}), Er = Y("h-full rounded-full transition-all duration-300 ease-out", {
	variants: {
		variant: {
			default: "bg-primary-500",
			gradient: "bg-gradient-to-r from-cyan-500 to-green-500",
			success: "bg-green-500",
			warning: "bg-amber-500",
			error: "bg-red-500"
		},
		animated: { true: "animate-pulse" }
	},
	defaultVariants: { variant: "default" }
}), Dr = i(function({ value: e, max: t = 100, label: n, showValue: r = !1, valueFormat: i, variant: a, size: o, animated: s, className: c }, l) {
	let u = Math.min(100, Math.max(0, e / t * 100)), d = i ? i(e, t) : `${Math.round(u)}%`;
	return /* @__PURE__ */ _("div", {
		ref: l,
		className: c,
		children: [(n || r) && /* @__PURE__ */ _("div", {
			className: "flex justify-between items-center mb-1.5",
			children: [n && /* @__PURE__ */ g("span", {
				className: "text-sm font-medium text-gray-700",
				children: n
			}), r && /* @__PURE__ */ g("span", {
				className: "text-sm text-gray-500",
				children: d
			})]
		}), /* @__PURE__ */ g("div", {
			className: Tr({ size: o }),
			role: "progressbar",
			"aria-valuenow": e,
			"aria-valuemin": 0,
			"aria-valuemax": t,
			"aria-label": n,
			children: /* @__PURE__ */ g("div", {
				className: Er({
					variant: a,
					animated: s
				}),
				style: { width: `${u}%` }
			})
		})]
	});
}), Or = Y("rounded-full flex items-center justify-center font-medium transition-colors duration-200", {
	variants: {
		size: {
			sm: "w-6 h-6 text-xs",
			md: "w-8 h-8 text-sm"
		},
		state: {
			completed: "bg-primary-600 text-white",
			current: "bg-primary-600 text-white ring-4 ring-primary-100",
			upcoming: "bg-gray-200 text-gray-500"
		}
	},
	defaultVariants: {
		size: "md",
		state: "upcoming"
	}
}), kr = Y("flex-1 mx-2 transition-colors duration-200", {
	variants: {
		size: {
			sm: "h-0.5",
			md: "h-1"
		},
		completed: {
			true: "bg-primary-600",
			false: "bg-gray-200"
		}
	},
	defaultVariants: {
		size: "md",
		completed: !1
	}
});
function Ar({ currentStep: e, totalSteps: t, labels: n, size: r = "md", className: i }) {
	return /* @__PURE__ */ _("div", {
		className: i,
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-center justify-between",
			children: Array.from({ length: t }, (n, i) => {
				let a = i + 1, o = a < e, s = a === e, c = a === t, l = o ? "completed" : s ? "current" : "upcoming";
				return /* @__PURE__ */ _("div", {
					className: J("flex items-center", !c && "flex-1"),
					children: [/* @__PURE__ */ g("div", {
						className: Or({
							size: r,
							state: l
						}),
						children: o ? /* @__PURE__ */ g("svg", {
							className: "w-4 h-4",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							children: /* @__PURE__ */ g("path", {
								fillRule: "evenodd",
								d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
								clipRule: "evenodd"
							})
						}) : a
					}), !c && /* @__PURE__ */ g("div", { className: kr({
						size: r,
						completed: o
					}) })]
				}, a);
			})
		}), n && n.length > 0 && /* @__PURE__ */ g("div", {
			className: "flex justify-between mt-2",
			children: n.map((n, r) => /* @__PURE__ */ g("span", {
				className: J("text-xs text-center", r + 1 <= e ? "text-primary-600 font-medium" : "text-gray-500"),
				style: { width: `${100 / t}%` },
				children: n
			}, r))
		})]
	});
}
//#endregion
//#region src/components/avatar.tsx
var jr = Y("inline-flex items-center justify-center font-medium text-white overflow-hidden", {
	variants: {
		size: {
			xs: "w-6 h-6 text-xs",
			sm: "w-8 h-8 text-sm",
			md: "w-10 h-10 text-sm",
			lg: "w-12 h-12 text-base",
			xl: "w-16 h-16 text-lg"
		},
		shape: {
			circle: "rounded-full",
			square: "rounded-lg"
		}
	},
	defaultVariants: {
		size: "md",
		shape: "circle"
	}
});
function Mr(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 1 ? t[0].substring(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
function Nr(e) {
	let t = [
		"bg-blue-500",
		"bg-green-500",
		"bg-purple-500",
		"bg-orange-500",
		"bg-pink-500",
		"bg-teal-500",
		"bg-indigo-500",
		"bg-cyan-500"
	], n = 0;
	for (let t = 0; t < e.length; t++) n = e.charCodeAt(t) + ((n << 5) - n);
	return t[Math.abs(n) % t.length];
}
var Pr = i(function({ src: e, name: t = "", size: n, shape: r, className: i, ...a }, o) {
	let s = f(() => t ? Mr(t) : "?", [t]), c = f(() => t ? Nr(t) : "bg-gray-400", [t]);
	return e ? /* @__PURE__ */ g("div", {
		ref: o,
		className: J(jr({
			size: n,
			shape: r
		}), "bg-gray-200", i),
		children: /* @__PURE__ */ g("img", {
			src: e,
			alt: t || "Avatar",
			className: "w-full h-full object-cover",
			...a
		})
	}) : /* @__PURE__ */ g("div", {
		ref: o,
		className: J(jr({
			size: n,
			shape: r
		}), c, i),
		"aria-label": t || "Avatar",
		children: s
	});
});
function Fr({ children: e, max: t = 4, size: n = "md", className: r }) {
	let i = Array.isArray(e) ? e : [e], a = i.slice(0, t), o = i.length - t;
	return /* @__PURE__ */ _("div", {
		className: J("flex -space-x-2", r),
		children: [a.map((e, t) => /* @__PURE__ */ g("div", {
			className: "relative ring-2 ring-white rounded-full",
			style: { zIndex: a.length - t },
			children: e
		}, t)), o > 0 && /* @__PURE__ */ _("div", {
			className: J("relative ring-2 ring-white rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-600 font-medium", jr({ size: n })),
			style: { zIndex: 0 },
			children: ["+", o]
		})]
	});
}
//#endregion
//#region src/components/bottom-sheet.tsx
var Ir = {
	auto: "max-h-[90vh]",
	half: "h-[50vh]",
	full: "h-[95vh]"
}, Lr = i(function({ open: e, onClose: t, children: n, title: r, description: i, showHandle: a = !0, draggable: o = !0, closeOnOverlayClick: c = !0, height: u = "auto", className: f }, h) {
	let y = p(null), [b, x] = m(!1), [S, C] = m(0), w = p(0), [T, E] = m(!1), [D, O] = m(!1);
	d(h, () => ({ close: t })), l(() => {
		if (e) O(!0), requestAnimationFrame(() => {
			requestAnimationFrame(() => E(!0));
		});
		else {
			E(!1);
			let e = setTimeout(() => O(!1), 300);
			return () => clearTimeout(e);
		}
	}, [e]), l(() => {
		if (e) {
			let e = document.body.style.overflow;
			return document.body.style.overflow = "hidden", () => {
				document.body.style.overflow = e;
			};
		}
	}, [e]), l(() => {
		if (!e) return;
		let n = (e) => {
			e.key === "Escape" && t();
		};
		return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
	}, [e, t]);
	let k = s((e) => {
		o && (x(!0), w.current = e);
	}, [o]), A = s((e) => {
		if (!b) return;
		let t = e - w.current;
		C(Math.max(0, t));
	}, [b]), j = s(() => {
		b && (x(!1), S > 100 && t(), C(0));
	}, [
		b,
		S,
		t
	]), M = s((e) => k(e.clientY), [k]), N = s((e) => k(e.touches[0].clientY), [k]);
	l(() => {
		if (!b) return;
		let e = (e) => A(e.clientY), t = (e) => A(e.touches[0].clientY), n = () => j();
		return document.addEventListener("mousemove", e), document.addEventListener("mouseup", n), document.addEventListener("touchmove", t), document.addEventListener("touchend", n), () => {
			document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", n), document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n);
		};
	}, [
		b,
		A,
		j
	]);
	let P = s(() => {
		c && t();
	}, [c, t]), F = u in Ir ? Ir[u] : u;
	return D ? v(/* @__PURE__ */ _("div", {
		className: "fixed inset-0 z-50",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": r ? "bottom-sheet-title" : void 0,
		"aria-describedby": i ? "bottom-sheet-description" : void 0,
		children: [/* @__PURE__ */ g("div", {
			className: J("absolute inset-0 bg-black/50 transition-opacity duration-300", T ? "opacity-100" : "opacity-0"),
			onClick: P,
			"aria-hidden": "true"
		}), /* @__PURE__ */ _("div", {
			ref: y,
			className: J("absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl flex flex-col transition-transform duration-300 ease-out", F, T ? "translate-y-0" : "translate-y-full", f),
			style: { transform: T ? `translateY(${S}px)` : "translateY(100%)" },
			children: [
				a && /* @__PURE__ */ g("div", {
					className: "flex justify-center py-3 cursor-grab active:cursor-grabbing",
					onMouseDown: M,
					onTouchStart: N,
					children: /* @__PURE__ */ g("div", { className: "w-10 h-1 bg-gray-300 rounded-full" })
				}),
				(r || i) && /* @__PURE__ */ _("div", {
					className: "px-4 pb-3 border-b border-gray-100",
					children: [/* @__PURE__ */ _("div", {
						className: "flex items-center justify-between",
						children: [r && /* @__PURE__ */ g("h2", {
							id: "bottom-sheet-title",
							className: "text-lg font-semibold text-gray-900",
							children: r
						}), /* @__PURE__ */ g("button", {
							type: "button",
							onClick: t,
							className: "p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors",
							"aria-label": "Fermer",
							children: /* @__PURE__ */ g(dr, { className: "w-5 h-5 text-gray-500" })
						})]
					}), i && /* @__PURE__ */ g("p", {
						id: "bottom-sheet-description",
						className: "text-sm text-gray-500 mt-1",
						children: i
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "flex-1 overflow-y-auto px-4 py-4",
					children: n
				})
			]
		})]
	}), document.body) : null;
});
function Rr({ children: e, className: t }) {
	return /* @__PURE__ */ g("div", {
		className: J("flex gap-3 p-4 border-t border-gray-100 bg-white", t),
		children: e
	});
}
//#endregion
//#region src/components/confirm-dialog.tsx
var zr = Y("flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed", {
	variants: { variant: {
		danger: "bg-red-600 hover:bg-red-700 text-white",
		warning: "bg-amber-600 hover:bg-amber-700 text-white",
		info: "bg-primary-500 hover:bg-primary-600 text-white"
	} },
	defaultVariants: { variant: "info" }
}), Br = Y("w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center", {
	variants: { variant: {
		danger: "bg-red-100",
		warning: "bg-amber-100",
		info: "bg-blue-100"
	} },
	defaultVariants: { variant: "info" }
}), Vr = {
	danger: /* @__PURE__ */ g("svg", {
		className: "w-6 h-6 text-red-600",
		fill: "none",
		stroke: "currentColor",
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ g("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		})
	}),
	warning: /* @__PURE__ */ g("svg", {
		className: "w-6 h-6 text-amber-600",
		fill: "none",
		stroke: "currentColor",
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ g("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		})
	}),
	info: /* @__PURE__ */ g("svg", {
		className: "w-6 h-6 text-blue-600",
		fill: "none",
		stroke: "currentColor",
		viewBox: "0 0 24 24",
		children: /* @__PURE__ */ g("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		})
	})
}, Hr = i(function({ isOpen: e, onClose: t, onConfirm: n, title: r, description: i, confirmLabel: a = "Confirmer", cancelLabel: o = "Annuler", variant: c = "info", loading: u = !1, icon: d, loadingText: f = "Chargement...", className: m }, h) {
	let v = p(null);
	l(() => {
		e ? v.current = document.activeElement : v.current && v.current.focus();
	}, [e]);
	let y = s((n) => {
		n.key === "Escape" && e && !u && t();
	}, [
		e,
		u,
		t
	]);
	return l(() => (document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y)), [y]), l(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
		document.body.style.overflow = "";
	}), [e]), e ? /* @__PURE__ */ _("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "confirm-dialog-title",
		"aria-describedby": i ? "confirm-dialog-description" : void 0,
		children: [/* @__PURE__ */ g("div", {
			className: "absolute inset-0 bg-black/50 transition-opacity",
			onClick: u ? void 0 : t,
			"aria-hidden": "true"
		}), /* @__PURE__ */ g("div", {
			ref: h,
			className: J("relative bg-white rounded-xl shadow-xl max-w-sm w-full mx-auto transform transition-all animate-in fade-in zoom-in-95 duration-200", m),
			children: /* @__PURE__ */ _("div", {
				className: "p-6",
				children: [
					/* @__PURE__ */ g("div", {
						className: Br({ variant: c }),
						children: d || Vr[c]
					}),
					/* @__PURE__ */ g("h2", {
						id: "confirm-dialog-title",
						className: "text-lg font-semibold text-gray-900 text-center mb-2",
						children: r
					}),
					i && /* @__PURE__ */ g("p", {
						id: "confirm-dialog-description",
						className: "text-sm text-gray-600 text-center mb-6",
						children: i
					}),
					/* @__PURE__ */ _("div", {
						className: "flex flex-col-reverse sm:flex-row gap-3",
						children: [/* @__PURE__ */ g("button", {
							type: "button",
							onClick: t,
							disabled: u,
							className: "flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
							children: o
						}), /* @__PURE__ */ g("button", {
							type: "button",
							onClick: n,
							disabled: u,
							className: zr({ variant: c }),
							children: u ? /* @__PURE__ */ _("span", {
								className: "flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ _("svg", {
									className: "animate-spin h-4 w-4",
									fill: "none",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ g("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4"
									}), /* @__PURE__ */ g("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), f]
							}) : a
						})]
					})
				]
			})
		})]
	}) : null;
}), Ur = Y("inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-colors", {
	variants: { variant: {
		primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-medium",
		secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700"
	} },
	defaultVariants: { variant: "primary" }
}), Wr = {
	questionnaires: /* @__PURE__ */ _("svg", {
		className: "w-20 h-20 sm:w-24 sm:h-24",
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ g("rect", {
				x: "25",
				y: "15",
				width: "70",
				height: "90",
				rx: "6",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "30",
				y: "20",
				width: "60",
				height: "80",
				rx: "4",
				fill: "#F9FAFB"
			}),
			/* @__PURE__ */ g("path", {
				d: "M50 85h20",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M40 75h40",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "60",
				cy: "50",
				r: "18",
				fill: "#E0F2FE",
				stroke: "#0EA5E9",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M55 45c0-2.8 2.2-5 5-5s5 2.2 5 5c0 2-1.2 3.6-3 4.5V52a2 2 0 01-4 0v-3.5c0-.8.5-1.6 1.2-1.8.9-.4 1.8-1.3 1.8-2.7 0-1.7-1.3-3-3-3s-3 1.3-3 3",
				stroke: "#0EA5E9",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "60",
				cy: "58",
				r: "1.5",
				fill: "#0EA5E9"
			})
		]
	}),
	"questionnaires-completed": /* @__PURE__ */ _("svg", {
		className: "w-20 h-20 sm:w-24 sm:h-24",
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ g("rect", {
				x: "25",
				y: "15",
				width: "70",
				height: "90",
				rx: "6",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "30",
				y: "20",
				width: "60",
				height: "80",
				rx: "4",
				fill: "#F9FAFB"
			}),
			/* @__PURE__ */ g("path", {
				d: "M40 45h20",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M40 55h30",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M40 65h25",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M40 75h35",
				stroke: "#D1D5DB",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "85",
				cy: "80",
				r: "20",
				fill: "#D1FAE5",
				stroke: "#10B981",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M76 80l6 6 12-12",
				stroke: "#10B981",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	}),
	exercises: /* @__PURE__ */ _("svg", {
		className: "w-20 h-20 sm:w-24 sm:h-24",
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ g("circle", {
				cx: "60",
				cy: "30",
				r: "12",
				fill: "#FDE68A",
				stroke: "#F59E0B",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 45v25",
				stroke: "#F59E0B",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 50l-15 15",
				stroke: "#F59E0B",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 50l15 15",
				stroke: "#F59E0B",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 70l-12 25",
				stroke: "#F59E0B",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 70l12 25",
				stroke: "#F59E0B",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("rect", {
				x: "82",
				y: "55",
				width: "25",
				height: "8",
				rx: "2",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "80",
				y: "52",
				width: "6",
				height: "14",
				rx: "2",
				fill: "#9CA3AF"
			}),
			/* @__PURE__ */ g("rect", {
				x: "103",
				y: "52",
				width: "6",
				height: "14",
				rx: "2",
				fill: "#9CA3AF"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "25",
				cy: "90",
				r: "15",
				fill: "#DBEAFE",
				stroke: "#3B82F6",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M25 83v10",
				stroke: "#3B82F6",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "25",
				cy: "96",
				r: "1.5",
				fill: "#3B82F6"
			})
		]
	}),
	"exercises-history": /* @__PURE__ */ _("svg", {
		className: "w-20 h-20 sm:w-24 sm:h-24",
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ g("rect", {
				x: "20",
				y: "25",
				width: "80",
				height: "75",
				rx: "6",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "20",
				y: "25",
				width: "80",
				height: "20",
				rx: "6",
				fill: "#8B5CF6"
			}),
			/* @__PURE__ */ g("rect", {
				x: "25",
				y: "50",
				width: "70",
				height: "45",
				rx: "3",
				fill: "#F9FAFB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "30",
				y: "55",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#DDD6FE"
			}),
			/* @__PURE__ */ g("rect", {
				x: "47",
				y: "55",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#DDD6FE"
			}),
			/* @__PURE__ */ g("rect", {
				x: "64",
				y: "55",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#DDD6FE"
			}),
			/* @__PURE__ */ g("rect", {
				x: "81",
				y: "55",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#DDD6FE"
			}),
			/* @__PURE__ */ g("rect", {
				x: "30",
				y: "72",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "47",
				y: "72",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "64",
				y: "72",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("rect", {
				x: "81",
				y: "72",
				width: "12",
				height: "12",
				rx: "2",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "95",
				cy: "95",
				r: "18",
				fill: "#F3E8FF",
				stroke: "#8B5CF6",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M95 85v10l6 4",
				stroke: "#8B5CF6",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	}),
	generic: /* @__PURE__ */ _("svg", {
		className: "w-20 h-20 sm:w-24 sm:h-24",
		viewBox: "0 0 120 120",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ g("path", {
				d: "M60 25L20 45v35l40 20 40-20V45L60 25z",
				fill: "#E5E7EB"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 25L20 45l40 20 40-20L60 25z",
				fill: "#F9FAFB"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 65v35M20 45l40 20M100 45L60 65",
				stroke: "#D1D5DB",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "60",
				cy: "85",
				r: "8",
				fill: "#DBEAFE",
				stroke: "#3B82F6",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ g("path", {
				d: "M60 82v3M60 88h.01",
				stroke: "#3B82F6",
				strokeWidth: "2",
				strokeLinecap: "round"
			})
		]
	})
};
function Gr({ variant: e = "generic", title: t, description: n, action: r, className: i, icon: a }) {
	return /* @__PURE__ */ _("div", {
		className: J("flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4", i),
		role: "status",
		"aria-label": t,
		children: [
			/* @__PURE__ */ g("div", {
				className: "mb-4 sm:mb-6 opacity-80",
				"aria-hidden": "true",
				children: a || Wr[e]
			}),
			/* @__PURE__ */ g("h3", {
				className: "text-base sm:text-lg font-semibold text-gray-900 mb-2",
				children: t
			}),
			n && /* @__PURE__ */ g("p", {
				className: "text-sm text-gray-600 max-w-sm mb-4 sm:mb-6",
				children: n
			}),
			r && /* @__PURE__ */ g("button", {
				onClick: r.onClick,
				className: Ur({ variant: r.variant ?? "primary" }),
				children: r.label
			})
		]
	});
}
//#endregion
//#region src/components/loading-spinner.tsx
var Kr = Y("animate-spin rounded-full border-t-transparent", {
	variants: {
		size: {
			sm: "h-5 w-5 border-2",
			md: "h-8 w-8 border-4",
			lg: "h-12 w-12 border-4"
		},
		color: {
			primary: "border-primary-500",
			gray: "border-gray-500",
			white: "border-white",
			accent: "border-accent-500"
		}
	},
	defaultVariants: {
		size: "md",
		color: "primary"
	}
}), qr = Y("text-gray-500", {
	variants: { size: {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base"
	} },
	defaultVariants: { size: "md" }
}), Jr = i(function({ size: e, color: t, message: n, fullScreen: r = !1, className: i, ...a }, o) {
	let s = /* @__PURE__ */ _("div", {
		ref: r ? void 0 : o,
		className: J("flex flex-col items-center gap-3", !r && i),
		role: "status",
		"aria-live": "polite",
		...r ? {} : a,
		children: [
			/* @__PURE__ */ g("div", {
				className: Kr({
					size: e,
					color: t
				}),
				"aria-hidden": "true"
			}),
			n && /* @__PURE__ */ g("p", {
				className: qr({ size: e }),
				children: n
			}),
			/* @__PURE__ */ g("span", {
				className: "sr-only",
				children: n || "Chargement en cours..."
			})
		]
	});
	return r ? /* @__PURE__ */ g("div", {
		ref: o,
		className: J("min-h-screen bg-gray-50 flex items-center justify-center pb-16", i),
		...a,
		children: s
	}) : s;
}), Yr = Y("fixed top-0 left-0 right-0 text-white px-4 py-2 z-50 flex items-center justify-center gap-2 animate-slide-down", {
	variants: { status: {
		offline: "bg-orange-500",
		reconnected: "bg-emerald-500"
	} },
	defaultVariants: { status: "offline" }
}), Xr = i(function({ isOffline: e, wasOffline: t = !1, onReconnectedDismiss: n, reconnectedDuration: r = 3e3, offlineText: i = "Vous êtes hors ligne", reconnectedText: a = "Connexion rétablie", className: o, ...s }, c) {
	let [u, d] = m(!1);
	return l(() => {
		if (t && !e) {
			d(!0);
			let e = setTimeout(() => {
				d(!1), n?.();
			}, r);
			return () => clearTimeout(e);
		}
	}, [
		t,
		e,
		n,
		r
	]), e ? /* @__PURE__ */ _("div", {
		ref: c,
		className: J(Yr({ status: "offline" }), o),
		role: "alert",
		"aria-live": "assertive",
		...s,
		children: [/* @__PURE__ */ g("svg", {
			className: "w-5 h-5 flex-shrink-0",
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: /* @__PURE__ */ g("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2,
				d: "M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
			})
		}), /* @__PURE__ */ g("span", {
			className: "text-sm font-medium",
			children: i
		})]
	}) : u ? /* @__PURE__ */ _("div", {
		ref: c,
		className: J(Yr({ status: "reconnected" }), o),
		role: "status",
		"aria-live": "polite",
		...s,
		children: [/* @__PURE__ */ g("svg", {
			className: "w-5 h-5 flex-shrink-0",
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: /* @__PURE__ */ g("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 2,
				d: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
			})
		}), /* @__PURE__ */ g("span", {
			className: "text-sm font-medium",
			children: a
		})]
	}) : null;
}), Zr = Y("w-full px-4 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed", {
	variants: { state: {
		idle: "border-gray-300 focus:ring-primary-500 focus:border-primary-500",
		valid: "border-green-500 focus:ring-green-500 focus:border-green-500 pr-10",
		error: "border-red-500 focus:ring-red-500 focus:border-red-500 pr-10"
	} },
	defaultVariants: { state: "idle" }
}), Qr = i(function({ id: e, label: t, type: n = "text", state: r = "idle", error: i, required: a = !1, helpText: o, className: s, adornment: c, ...l }, u) {
	let d = r === "error" && i, f = r === "valid";
	return /* @__PURE__ */ _("div", {
		className: s,
		children: [
			/* @__PURE__ */ _("label", {
				htmlFor: e,
				className: "block text-sm font-medium text-gray-700 mb-1.5",
				children: [t, a && /* @__PURE__ */ g("span", {
					className: "text-red-600 ml-0.5",
					children: "*"
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ g("input", {
						ref: u,
						id: e,
						type: n,
						required: a,
						"aria-invalid": d ? "true" : void 0,
						"aria-describedby": d ? `${e}-error` : o ? `${e}-help` : void 0,
						className: Zr({ state: r }),
						...l
					}),
					(f || d) && /* @__PURE__ */ _("div", {
						className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
						children: [f && /* @__PURE__ */ g("svg", {
							className: "w-5 h-5 text-green-500",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							"aria-hidden": "true",
							children: /* @__PURE__ */ g("path", {
								fillRule: "evenodd",
								d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
								clipRule: "evenodd"
							})
						}), d && /* @__PURE__ */ g("svg", {
							className: "w-5 h-5 text-red-500",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							"aria-hidden": "true",
							children: /* @__PURE__ */ g("path", {
								fillRule: "evenodd",
								d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
								clipRule: "evenodd"
							})
						})]
					}),
					c
				]
			}),
			d && /* @__PURE__ */ _("p", {
				id: `${e}-error`,
				className: "mt-1.5 text-sm text-red-600 flex items-center gap-1",
				role: "alert",
				children: [/* @__PURE__ */ g("svg", {
					className: "w-4 h-4 shrink-0",
					fill: "currentColor",
					viewBox: "0 0 20 20",
					"aria-hidden": "true",
					children: /* @__PURE__ */ g("path", {
						fillRule: "evenodd",
						d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
						clipRule: "evenodd"
					})
				}), i]
			}),
			o && !d && /* @__PURE__ */ g("p", {
				id: `${e}-help`,
				className: "mt-1.5 text-xs text-gray-500",
				children: o
			})
		]
	});
}), $r = i(function({ targetId: e = "main-content", children: t = "Aller au contenu principal", className: n, ...r }, i) {
	return /* @__PURE__ */ g("a", {
		ref: i,
		href: `#${e}`,
		className: J("sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-primary-600 focus:font-medium focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-primary-500 focus:outline-none", n),
		...r,
		children: t
	});
}), ei = {
	info: {
		container: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
		icon: "bg-blue-100 text-blue-600",
		title: "text-blue-900",
		message: "text-blue-700",
		button: "bg-blue-500 hover:bg-blue-600 text-white",
		dismiss: "text-blue-400 hover:text-blue-600 hover:bg-blue-100"
	},
	success: {
		container: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
		icon: "bg-emerald-100 text-emerald-600",
		title: "text-emerald-900",
		message: "text-emerald-700",
		button: "bg-emerald-500 hover:bg-emerald-600 text-white",
		dismiss: "text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100"
	},
	warning: {
		container: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
		icon: "bg-amber-100 text-amber-600",
		title: "text-amber-900",
		message: "text-amber-700",
		button: "bg-amber-500 hover:bg-amber-600 text-white",
		dismiss: "text-amber-400 hover:text-amber-600 hover:bg-amber-100"
	},
	celebration: {
		container: "bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-purple-200",
		icon: "bg-purple-100 text-purple-600",
		title: "text-purple-900",
		message: "text-purple-700",
		button: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
		dismiss: "text-purple-400 hover:text-purple-600 hover:bg-purple-100"
	}
}, ti = {
	first_opening: /* @__PURE__ */ g($n, { className: "w-5 h-5" }),
	returning: /* @__PURE__ */ g(tr, { className: "w-5 h-5" }),
	streak_milestone: /* @__PURE__ */ g(sr, { className: "w-5 h-5" }),
	quota_reminder: /* @__PURE__ */ g(vn, { className: "w-5 h-5" }),
	almost_done: /* @__PURE__ */ g(tr, { className: "w-5 h-5" }),
	comeback: /* @__PURE__ */ g($n, { className: "w-5 h-5" }),
	evening_reminder: /* @__PURE__ */ g(vn, { className: "w-5 h-5" }),
	congratulations: /* @__PURE__ */ g(Rn, { className: "w-5 h-5" })
};
function ni({ message: e, onDismiss: t, onAction: n, className: r }) {
	let [i, a] = m(!0), [o, s] = m(!0), c = ei[e.variant], u = ti[e.type];
	l(() => {
		let e = setTimeout(() => s(!1), 300);
		return () => clearTimeout(e);
	}, []);
	let d = () => {
		a(!1), setTimeout(() => t(), 200);
	}, f = () => {
		n?.(), d();
	};
	return i ? /* @__PURE__ */ _("div", {
		className: J("relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out", c.container, o ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0", r),
		role: "alert",
		"aria-live": "polite",
		children: [e.variant === "celebration" && /* @__PURE__ */ _("div", {
			className: "absolute inset-0 overflow-hidden pointer-events-none",
			children: [/* @__PURE__ */ g("div", { className: "absolute -top-4 -right-4 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl" }), /* @__PURE__ */ g("div", { className: "absolute -bottom-4 -left-4 w-20 h-20 bg-pink-200/30 rounded-full blur-2xl" })]
		}), /* @__PURE__ */ g("div", {
			className: "relative p-4",
			children: /* @__PURE__ */ _("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ g("div", {
					className: J("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", c.icon),
					children: u
				}), /* @__PURE__ */ _("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ _("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
							className: J("font-semibold text-sm", c.title),
							children: e.title
						}), /* @__PURE__ */ g("p", {
							className: J("text-sm mt-0.5", c.message),
							children: e.message
						})] }), /* @__PURE__ */ g("button", {
							onClick: d,
							className: J("flex-shrink-0 p-1 rounded-lg transition-colors", c.dismiss),
							"aria-label": "Fermer",
							children: /* @__PURE__ */ g(dr, { className: "w-4 h-4" })
						})]
					}), e.actionLabel && n && /* @__PURE__ */ _("button", {
						onClick: f,
						className: J("mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors", c.button),
						children: [e.actionLabel, /* @__PURE__ */ g(pn, { className: "w-4 h-4" })]
					})]
				})]
			})
		})]
	}) : null;
}
//#endregion
//#region src/components/supervision/supervision-pending-banner.tsx
function ri({ alertReason: e, alertDate: t, onDismiss: n, className: r }) {
	return /* @__PURE__ */ _("div", {
		className: J("rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg overflow-hidden", r),
		children: [/* @__PURE__ */ _("div", {
			className: "bg-amber-100 px-4 py-3 flex items-center gap-3",
			children: [/* @__PURE__ */ g("div", {
				className: "p-2 bg-amber-200 rounded-full",
				children: /* @__PURE__ */ g(vn, { className: "w-5 h-5 text-amber-700" })
			}), /* @__PURE__ */ g("h3", {
				className: "font-semibold text-amber-900",
				children: "Reeducation en cours de supervision"
			})]
		}), /* @__PURE__ */ _("div", {
			className: "p-4 space-y-4",
			children: [
				/* @__PURE__ */ _("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ g(or, { className: "w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" }), /* @__PURE__ */ _("div", {
						className: "text-sm text-amber-800",
						children: [
							/* @__PURE__ */ _("p", {
								className: "mb-2",
								children: [
									"Votre derniere seance a declenche une ",
									/* @__PURE__ */ g("strong", { children: "supervision par un kinesitherapeute" }),
									" pour assurer la securite de votre reeducation."
								]
							}),
							e && /* @__PURE__ */ _("p", {
								className: "text-amber-700 text-xs mb-2",
								children: ["Raison : ", e]
							}),
							t && /* @__PURE__ */ _("p", {
								className: "text-amber-600 text-xs",
								children: ["Depuis le ", new Date(t).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "bg-white/60 rounded-lg p-3 border border-amber-100",
					children: /* @__PURE__ */ _("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ g(cr, { className: "w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" }), /* @__PURE__ */ _("div", {
							className: "text-sm text-gray-700",
							children: [/* @__PURE__ */ g("p", {
								className: "font-medium text-gray-900 mb-1",
								children: "Votre prochaine seance attend l'expertise d'un professionnel"
							}), /* @__PURE__ */ g("p", {
								className: "text-gray-600",
								children: "Un kinesitherapeute va examiner votre dossier et valider ou adapter votre programme pour une continuite de la reeducation en toute securite."
							})]
						})]
					})
				}),
				/* @__PURE__ */ g("p", {
					className: "text-xs text-amber-600 text-center",
					children: "Vous serez notifie des que votre reeducation pourra reprendre."
				}),
				n && /* @__PURE__ */ g("button", {
					onClick: n,
					className: "w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-lg transition-colors text-sm",
					children: "J'ai compris"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/supervision/supervision-approved-banner.tsx
function ii({ practitionerNotes: e, onStartSession: t, onDismiss: n, className: r }) {
	return /* @__PURE__ */ _("div", {
		className: J("rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg overflow-hidden", r),
		children: [/* @__PURE__ */ _("div", {
			className: "bg-green-100 px-4 py-3 flex items-center gap-3",
			children: [/* @__PURE__ */ g("div", {
				className: "p-2 bg-green-200 rounded-full animate-pulse",
				children: /* @__PURE__ */ g($n, { className: "w-5 h-5 text-green-700" })
			}), /* @__PURE__ */ g("h3", {
				className: "font-semibold text-green-900",
				children: "Vous pouvez reprendre votre reeducation !"
			})]
		}), /* @__PURE__ */ _("div", {
			className: "p-4 space-y-4",
			children: [
				/* @__PURE__ */ _("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ g(hn, { className: "w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" }), /* @__PURE__ */ _("div", {
						className: "text-sm text-green-800",
						children: [/* @__PURE__ */ _("p", {
							className: "mb-2",
							children: [
								"Un kinesitherapeute a examine votre dossier et ",
								/* @__PURE__ */ g("strong", { children: "valide votre prochaine seance" }),
								"."
							]
						}), /* @__PURE__ */ g("p", {
							className: "text-green-700",
							children: "Votre programme a peut-etre ete adapte pour mieux correspondre a vos capacites actuelles."
						})]
					})]
				}),
				e && /* @__PURE__ */ _("div", {
					className: "bg-white/60 rounded-lg p-3 border border-green-100",
					children: [/* @__PURE__ */ g("p", {
						className: "text-xs font-medium text-green-700 mb-1",
						children: "Message du kinesitherapeute :"
					}), /* @__PURE__ */ _("p", {
						className: "text-sm text-gray-700 italic",
						children: [
							"“",
							e,
							"”"
						]
					})]
				}),
				/* @__PURE__ */ _("div", {
					className: "flex gap-3",
					children: [n && /* @__PURE__ */ g("button", {
						onClick: n,
						className: "flex-1 py-2.5 px-4 bg-white border border-green-200 text-green-700 font-medium rounded-lg transition-colors text-sm hover:bg-green-50",
						children: "Plus tard"
					}), t && /* @__PURE__ */ _("button", {
						onClick: t,
						className: "flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ g(Vn, { className: "w-4 h-4" }), "Commencer la seance"]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/patient/delete-account-modal.tsx
var ai = "SUPPRIMER";
function oi({ isOpen: e, onClose: t, onConfirm: n, userEmail: r, className: i }) {
	let [a, o] = m(""), [s, c] = m(!1), [l, u] = m(null), d = a === ai;
	return e ? /* @__PURE__ */ g("div", {
		className: J("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn", i),
		children: /* @__PURE__ */ _("div", {
			className: "bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn",
			children: [
				/* @__PURE__ */ g("div", {
					className: "bg-gradient-to-r from-red-500 to-red-600 px-6 py-4",
					children: /* @__PURE__ */ _("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ g("div", {
							className: "flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/20 rounded-full",
							children: /* @__PURE__ */ g("svg", {
								className: "w-6 h-6 text-white",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24",
								children: /* @__PURE__ */ g("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								})
							})
						}), /* @__PURE__ */ g("div", {
							className: "flex-1",
							children: /* @__PURE__ */ g("h2", {
								className: "text-xl font-bold text-white",
								children: "Supprimer definitivement mon compte"
							})
						})]
					})
				}),
				/* @__PURE__ */ _("div", {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ g("div", {
							className: "bg-red-50 border-2 border-red-200 rounded-lg p-4",
							children: /* @__PURE__ */ _("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ g("svg", {
									className: "w-6 h-6 text-red-600 flex-shrink-0 mt-0.5",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
										clipRule: "evenodd"
									})
								}), /* @__PURE__ */ _("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ g("h3", {
										className: "text-sm font-bold text-red-900 mb-1",
										children: "Action irreversible !"
									}), /* @__PURE__ */ _("p", {
										className: "text-sm text-red-800",
										children: [
											"Cette action supprimera ",
											/* @__PURE__ */ g("strong", { children: "definitivement et immediatement" }),
											" toutes vos donnees."
										]
									})]
								})]
							})
						}),
						/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h4", {
							className: "text-sm font-semibold text-gray-900 mb-2",
							children: "Donnees qui seront supprimees :"
						}), /* @__PURE__ */ g("ul", {
							className: "space-y-2 text-sm text-gray-700",
							children: [
								{
									label: "Profil patient",
									detail: "Toutes vos informations personnelles (nom, date de naissance, etc.)"
								},
								{
									label: "Historique de questionnaires",
									detail: "Toutes vos reponses et evaluations"
								},
								{
									label: "Compte utilisateur",
									detail: `Votre compte email ${r}`
								},
								{
									label: "Programmes d'exercices",
									detail: "Toutes vos seances et recommandations"
								}
							].map((e) => /* @__PURE__ */ _("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ g("svg", {
									className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
										clipRule: "evenodd"
									})
								}), /* @__PURE__ */ _("span", { children: [
									/* @__PURE__ */ g("strong", { children: e.label }),
									" : ",
									e.detail
								] })]
							}, e.label))
						})] }),
						/* @__PURE__ */ g("div", {
							className: "bg-blue-50 border border-blue-200 rounded-lg p-3",
							children: /* @__PURE__ */ _("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ g("svg", {
									className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
										clipRule: "evenodd"
									})
								}), /* @__PURE__ */ _("p", {
									className: "text-xs text-blue-800",
									children: [/* @__PURE__ */ g("strong", { children: "Droit a l'effacement (RGPD Article 17)" }), " : Conformement a la reglementation, vos donnees seront definitivement supprimees de nos serveurs. Cette action ne peut pas etre annulee."]
								})]
							})
						}),
						/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ _("label", {
							htmlFor: "confirmText",
							className: "block text-sm font-medium text-gray-900 mb-2",
							children: ["Pour confirmer, tapez ", /* @__PURE__ */ g("span", {
								className: "font-mono bg-gray-100 px-2 py-0.5 rounded text-red-600",
								children: ai
							})]
						}), /* @__PURE__ */ g("input", {
							id: "confirmText",
							type: "text",
							value: a,
							onChange: (e) => o(e.target.value.toUpperCase()),
							placeholder: "Tapez SUPPRIMER",
							disabled: s,
							className: "w-full px-4 py-2.5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
							autoComplete: "off"
						})] }),
						l && /* @__PURE__ */ g("div", {
							className: "bg-red-50 border border-red-200 rounded-lg p-3",
							children: /* @__PURE__ */ g("p", {
								className: "text-sm text-red-800",
								children: l
							})
						})
					]
				}),
				/* @__PURE__ */ _("div", {
					className: "bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3",
					children: [/* @__PURE__ */ g("button", {
						onClick: () => {
							s || (o(""), u(null), t());
						},
						disabled: s,
						className: "flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed",
						children: "Annuler"
					}), /* @__PURE__ */ g("button", {
						onClick: async () => {
							if (d) try {
								c(!0), u(null), await n();
							} catch (e) {
								u(e instanceof Error ? e.message : "Erreur lors de la suppression"), c(!1);
							}
						},
						disabled: !d || s,
						className: "flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
						children: s ? /* @__PURE__ */ _("span", {
							className: "flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ _("svg", {
								className: "animate-spin h-5 w-5",
								fill: "none",
								viewBox: "0 0 24 24",
								children: [/* @__PURE__ */ g("circle", {
									className: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									strokeWidth: "4"
								}), /* @__PURE__ */ g("path", {
									className: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								})]
							}), "Suppression en cours..."]
						}) : "Supprimer definitivement"
					})]
				})
			]
		})
	}) : null;
}
//#endregion
//#region src/components/patient/sports-practiced-input.tsx
var si = /* @__PURE__ */ "Course a pied.Marche.Randonnee.Natation.Cyclisme.VTT.Football.Basketball.Volleyball.Handball.Rugby.Tennis.Badminton.Padel.Squash.Tennis de table.Musculation.Fitness.CrossFit.Pilates.Yoga.Boxe.Judo.Karate.MMA.Golf.Equitation.Escalade.Ski.Danse.Gymnastique".split(".");
function ci({ value: e, onChange: t, disabled: n = !1, label: r = "Sports pratiques", className: i }) {
	let [a, o] = m(""), [s, c] = m(!1), u = p(null), d = p(null), f = e ? e.split(",").map((e) => e.trim()).filter(Boolean) : [], h = si.filter((e) => !f.some((t) => t.toLowerCase() === e.toLowerCase()) && e.toLowerCase().includes(a.toLowerCase()));
	l(() => {
		let e = (e) => {
			d.current && !d.current.contains(e.target) && c(!1);
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, []);
	let v = (e) => {
		let n = e.trim();
		n && (f.some((e) => e.toLowerCase() === n.toLowerCase()) || (t([...f, n].join(", ")), o(""), c(!1), u.current?.focus()));
	}, y = (e) => {
		t(f.filter((t) => t !== e).join(", "));
	};
	return /* @__PURE__ */ _("div", {
		ref: d,
		className: J("relative", i),
		children: [
			r && /* @__PURE__ */ g("label", {
				className: "block text-sm font-medium text-gray-700 mb-1.5",
				children: r
			}),
			/* @__PURE__ */ g("div", {
				className: J("min-h-[42px] px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-text focus-within:border-gray-300", n && "bg-gray-50 cursor-not-allowed opacity-60"),
				onClick: () => !n && u.current?.focus(),
				children: /* @__PURE__ */ _("div", {
					className: "flex flex-wrap gap-2 items-center min-h-[26px]",
					children: [f.map((e) => /* @__PURE__ */ _("span", {
						className: "inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200",
						children: [e, !n && /* @__PURE__ */ g("button", {
							type: "button",
							onClick: (t) => {
								t.stopPropagation(), y(e);
							},
							className: "p-0.5 hover:bg-primary-200 rounded-full transition-colors",
							"aria-label": `Supprimer ${e}`,
							children: /* @__PURE__ */ g(dr, { className: "w-3.5 h-3.5" })
						})]
					}, e)), !n && /* @__PURE__ */ _("div", {
						className: "flex-1 min-w-[120px] flex items-center gap-1.5",
						children: [/* @__PURE__ */ g(qn, { className: "w-4 h-4 text-gray-400 shrink-0" }), /* @__PURE__ */ g("input", {
							ref: u,
							type: "text",
							value: a,
							onChange: (e) => {
								o(e.target.value), c(!0);
							},
							onFocus: () => c(!0),
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), a.trim() && v(a)) : e.key === "Backspace" && !a && f.length > 0 && y(f[f.length - 1]);
							},
							placeholder: f.length === 0 ? "Rechercher un sport..." : "Ajouter...",
							className: "flex-1 text-sm bg-transparent placeholder:text-gray-400",
							style: {
								outline: "none",
								boxShadow: "none",
								border: "none"
							},
							disabled: n
						})]
					})]
				})
			}),
			s && !n && /* @__PURE__ */ _("div", {
				className: "absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
				children: [a.trim() && !h.some((e) => e.toLowerCase() === a.toLowerCase()) && /* @__PURE__ */ _("button", {
					type: "button",
					onClick: () => v(a),
					className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100",
					children: [/* @__PURE__ */ g(Hn, { className: "w-4 h-4 text-primary-600" }), /* @__PURE__ */ _("span", { children: ["Ajouter ", /* @__PURE__ */ _("span", {
						className: "font-medium text-primary-600",
						children: [
							"“",
							a,
							"”"
						]
					})] })]
				}), h.length > 0 ? /* @__PURE__ */ _("div", {
					className: "py-1",
					children: [h.slice(0, 10).map((e) => /* @__PURE__ */ g("button", {
						type: "button",
						onClick: () => v(e),
						className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50",
						children: e
					}, e)), h.length > 10 && /* @__PURE__ */ _("p", {
						className: "px-3 py-2 text-xs text-gray-400",
						children: [
							"+",
							h.length - 10,
							" autres..."
						]
					})]
				}) : a ? /* @__PURE__ */ g("p", {
					className: "px-3 py-2 text-sm text-gray-500",
					children: "Aucune suggestion. Appuyez sur Entree pour ajouter."
				}) : null]
			}),
			/* @__PURE__ */ g("p", {
				className: "text-xs text-gray-500 mt-1.5",
				children: f.length === 0 ? "Cliquez pour selectionner vos sports" : `${f.length} sport${f.length > 1 ? "s" : ""} selectionne${f.length > 1 ? "s" : ""}`
			})
		]
	});
}
//#endregion
//#region src/components/patient/patient-profile-view.tsx
var li = {
	male: "Homme",
	female: "Femme",
	other: "Autre"
}, ui = {
	sedentary: "Sedentaire",
	light: "Leger (1-2x/semaine)",
	moderate: "Modere (3-4x/semaine)",
	intense: "Intense (5-6x/semaine)",
	very_intense: "Tres intense (quotidien)"
};
function Z({ label: e, value: t }) {
	return /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("label", {
		className: "block text-sm font-medium text-gray-700 mb-1.5",
		children: e
	}), /* @__PURE__ */ g("div", {
		className: "px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900",
		children: t
	})] });
}
function di({ data: e, className: t, showTitle: n = !0, loading: r = !1, error: i = null }) {
	let { email: a, firstName: o, lastName: s, birthDate: c, gender: l, profession: u, weight: d, height: f, sportLevel: p, sportsPracticed: m } = e, h = d?.toString() || "", v = f?.toString() || "";
	return r ? /* @__PURE__ */ g("div", {
		className: "flex items-center justify-center py-12",
		children: /* @__PURE__ */ _("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ g("div", { className: "animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full" }), /* @__PURE__ */ g("p", {
				className: "text-gray-500 text-sm",
				children: "Chargement du profil..."
			})]
		})
	}) : i ? /* @__PURE__ */ g("div", {
		className: "bg-red-50 border border-red-200 rounded-lg p-4",
		children: /* @__PURE__ */ g("p", {
			className: "text-sm text-red-700",
			children: i
		})
	}) : /* @__PURE__ */ _("div", {
		className: J(t),
		children: [
			/* @__PURE__ */ _("div", {
				className: "mb-6",
				children: [n && /* @__PURE__ */ g("h3", {
					className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-4",
					children: "Compte"
				}), /* @__PURE__ */ g("div", {
					className: "space-y-4",
					children: a && /* @__PURE__ */ g(Z, {
						label: "Email",
						value: a
					})
				})]
			}),
			(o || s || c || l || u) && /* @__PURE__ */ _("div", {
				className: "mb-6 border-t border-gray-200 pt-6",
				children: [n && /* @__PURE__ */ g("h3", {
					className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-4",
					children: "Identite"
				}), /* @__PURE__ */ _("div", {
					className: "space-y-4",
					children: [
						(o || s) && /* @__PURE__ */ _("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [o && /* @__PURE__ */ g(Z, {
								label: "Prenom",
								value: o
							}), s && /* @__PURE__ */ g(Z, {
								label: "Nom",
								value: s
							})]
						}),
						(c || l) && /* @__PURE__ */ _("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [c && /* @__PURE__ */ g(Z, {
								label: "Date de naissance",
								value: new Date(c).toLocaleDateString("fr-FR")
							}), l && /* @__PURE__ */ g(Z, {
								label: "Genre",
								value: li[l]
							})]
						}),
						u && /* @__PURE__ */ g(Z, {
							label: "Profession",
							value: u
						})
					]
				})]
			}),
			(h || v) && /* @__PURE__ */ _("div", {
				className: "mb-6 border-t border-gray-200 pt-6",
				children: [n && /* @__PURE__ */ g("h3", {
					className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-4",
					children: "Morphologie"
				}), /* @__PURE__ */ g("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ _("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [h && /* @__PURE__ */ g(Z, {
							label: "Poids",
							value: `${h} kg`
						}), v && /* @__PURE__ */ g(Z, {
							label: "Taille",
							value: `${v} cm`
						})]
					})
				})]
			}),
			(p || m) && /* @__PURE__ */ _("div", {
				className: "mb-6 border-t border-gray-200 pt-6",
				children: [n && /* @__PURE__ */ g("h3", {
					className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-4",
					children: "Activite physique"
				}), /* @__PURE__ */ _("div", {
					className: "space-y-4",
					children: [p && /* @__PURE__ */ g(Z, {
						label: "Niveau d'activite physique",
						value: ui[p]
					}), m && /* @__PURE__ */ g(Z, {
						label: "Sports pratiques",
						value: m
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/bodymap/body-paths.ts
var fi = {
	width: 200,
	height: 440,
	viewBox: "0 0 200 440"
}, pi = {
	head: {
		type: "ellipse",
		cx: 100,
		cy: 42,
		rx: 28,
		ry: 32
	},
	neck: {
		type: "rect",
		x: 90,
		y: 70,
		width: 20,
		height: 18,
		rx: 4
	},
	torso: {
		type: "path",
		d: "\n      M 60 88\n      Q 60 85 70 85\n      L 130 85\n      Q 140 85 140 88\n      L 145 180\n      Q 148 220 140 260\n      L 130 265\n      Q 100 270 70 265\n      L 60 260\n      Q 52 220 55 180\n      Z\n    "
	},
	leftArm: {
		type: "path",
		d: "\n      M 60 90\n      Q 45 95 35 120\n      L 25 160\n      Q 20 180 22 195\n      L 30 195\n      Q 35 180 38 165\n      L 48 125\n      Q 55 105 60 100\n      Z\n    "
	},
	rightArm: {
		type: "path",
		d: "\n      M 140 90\n      Q 155 95 165 120\n      L 175 160\n      Q 180 180 178 195\n      L 170 195\n      Q 165 180 162 165\n      L 152 125\n      Q 145 105 140 100\n      Z\n    "
	},
	leftHand: {
		type: "ellipse",
		cx: 26,
		cy: 205,
		rx: 8,
		ry: 12
	},
	rightHand: {
		type: "ellipse",
		cx: 174,
		cy: 205,
		rx: 8,
		ry: 12
	},
	leftLeg: {
		type: "path",
		d: "\n      M 70 265\n      Q 65 270 62 290\n      L 58 350\n      Q 55 380 58 410\n      L 68 410\n      Q 72 380 74 350\n      L 78 295\n      Q 82 275 85 268\n      L 70 265\n      Z\n    "
	},
	rightLeg: {
		type: "path",
		d: "\n      M 130 265\n      Q 135 270 138 290\n      L 142 350\n      Q 145 380 142 410\n      L 132 410\n      Q 128 380 126 350\n      L 122 295\n      Q 118 275 115 268\n      L 130 265\n      Z\n    "
	},
	leftFoot: {
		type: "ellipse",
		cx: 63,
		cy: 422,
		rx: 12,
		ry: 8
	},
	rightFoot: {
		type: "ellipse",
		cx: 137,
		cy: 422,
		rx: 12,
		ry: 8
	}
}, Q = {
	centerLine: "M100,90 L100,250",
	clavicles: "M65,92 Q100,100 135,92",
	leftPec: "M68,110 Q82,130 100,118",
	rightPec: "M132,110 Q118,130 100,118",
	abs: "\n    M92,145 L108,145\n    M92,165 L108,165\n    M92,185 L108,185\n    M92,205 L108,205\n  ",
	navel: "M100,225 a3,3 0 1,0 0.1,0",
	leftKnee: "M60,355 Q63,365 66,355",
	rightKnee: "M134,355 Q137,365 140,355"
}, $ = {
	spine: "M100,90 L100,255",
	leftScapula: "M68,105 Q78,125 68,145 Q85,135 100,120",
	rightScapula: "M132,105 Q122,125 132,145 Q115,135 100,120",
	trapezius: "M65,92 Q100,105 135,92",
	leftGluteal: "M75,268 Q85,290 100,280",
	rightGluteal: "M125,268 Q115,290 100,280",
	leftCalf: "M60,365 Q62,385 62,405",
	rightCalf: "M140,365 Q138,385 138,405"
}, mi = "#e5e7eb", hi = "#9ca3af", gi = o(function({ view: e, showDetails: t = !0, className: n }) {
	let { head: r, neck: i, torso: a, leftArm: o, rightArm: s, leftHand: c, rightHand: l, leftLeg: u, rightLeg: d, leftFoot: f, rightFoot: p } = pi;
	return /* @__PURE__ */ _("svg", {
		viewBox: fi.viewBox,
		className: J("w-full h-full", n),
		"aria-hidden": "true",
		role: "img",
		preserveAspectRatio: "xMidYMid meet",
		children: [
			/* @__PURE__ */ _("title", { children: ["Silhouette du corps humain - vue de ", e === "front" ? "face" : "dos"] }),
			/* @__PURE__ */ _("g", {
				fill: mi,
				stroke: hi,
				strokeWidth: "1.5",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ g("ellipse", {
						cx: r.cx,
						cy: r.cy,
						rx: r.rx,
						ry: r.ry
					}),
					/* @__PURE__ */ g("rect", {
						x: i.x,
						y: i.y,
						width: i.width,
						height: i.height,
						rx: i.rx
					}),
					/* @__PURE__ */ g("path", { d: a.d }),
					/* @__PURE__ */ g("path", { d: o.d }),
					/* @__PURE__ */ g("path", { d: s.d }),
					/* @__PURE__ */ g("ellipse", {
						cx: c.cx,
						cy: c.cy,
						rx: c.rx,
						ry: c.ry
					}),
					/* @__PURE__ */ g("ellipse", {
						cx: l.cx,
						cy: l.cy,
						rx: l.rx,
						ry: l.ry
					}),
					/* @__PURE__ */ g("path", { d: u.d }),
					/* @__PURE__ */ g("path", { d: d.d }),
					/* @__PURE__ */ g("ellipse", {
						cx: f.cx,
						cy: f.cy,
						rx: f.rx,
						ry: f.ry
					}),
					/* @__PURE__ */ g("ellipse", {
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry
					})
				]
			}),
			t && /* @__PURE__ */ g("g", {
				stroke: "#c4c8cd",
				strokeWidth: "0.75",
				fill: "none",
				opacity: "0.6",
				children: e === "front" ? /* @__PURE__ */ _(h, { children: [
					/* @__PURE__ */ g("path", { d: Q.centerLine }),
					/* @__PURE__ */ g("path", { d: Q.clavicles }),
					/* @__PURE__ */ g("path", { d: Q.leftPec }),
					/* @__PURE__ */ g("path", { d: Q.rightPec }),
					/* @__PURE__ */ g("path", { d: Q.abs }),
					/* @__PURE__ */ g("path", { d: Q.navel }),
					/* @__PURE__ */ g("path", { d: Q.leftKnee }),
					/* @__PURE__ */ g("path", { d: Q.rightKnee })
				] }) : /* @__PURE__ */ _(h, { children: [
					/* @__PURE__ */ g("path", {
						d: $.spine,
						strokeWidth: "1"
					}),
					/* @__PURE__ */ g("path", { d: $.leftScapula }),
					/* @__PURE__ */ g("path", { d: $.rightScapula }),
					/* @__PURE__ */ g("path", { d: $.trapezius }),
					/* @__PURE__ */ g("path", { d: $.leftGluteal }),
					/* @__PURE__ */ g("path", { d: $.rightGluteal }),
					/* @__PURE__ */ g("path", { d: $.leftCalf }),
					/* @__PURE__ */ g("path", { d: $.rightCalf })
				] })
			})
		]
	});
}), _i = o(function({ zone: e, intensity: t, onClick: n, onLongPress: r, disabled: i = !1, showLabel: a = !1 }) {
	let [o, c] = m(!1), [l, u] = m(!1), d = p(null), f = e.position.x / 100 * fi.width, h = e.position.y / 100 * fi.height, v = e.hitArea.width / 100 * fi.width / 2, y = e.hitArea.height / 100 * fi.height / 2, b = t !== null && t > 0, x = s(() => {
		i || n(e.id);
	}, [
		i,
		n,
		e.id
	]), S = s(() => {
		u(!0), r && !i && (d.current = setTimeout(() => {
			r(e.id);
		}, 500));
	}, [
		r,
		i,
		e.id
	]), C = s(() => {
		u(!1), d.current &&= (clearTimeout(d.current), null);
	}, []), w = () => b ? ct(t) : l ? "#3b82f6" : o ? "#60a5fa" : "transparent", T = () => b ? .6 : l ? .3 : o ? .15 : 0, E = () => b ? ct(t) : l ? "#2563eb" : o ? "#3b82f6" : "#94a3b8", D = () => b ? 1 : l || o ? .8 : .3, O = () => b ? 2 : l ? 1.5 : o ? 1 : .5;
	return /* @__PURE__ */ _("g", {
		role: "button",
		"aria-label": e.label,
		"aria-pressed": b,
		"aria-disabled": i,
		tabIndex: i ? -1 : 0,
		onClick: x,
		onPointerDown: S,
		onPointerUp: C,
		onPointerLeave: () => {
			C(), c(!1);
		},
		onPointerEnter: () => c(!0),
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), x());
		},
		className: J("outline-none", i ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
		style: { touchAction: "manipulation" },
		children: [
			/* @__PURE__ */ g("ellipse", {
				cx: f,
				cy: h,
				rx: v,
				ry: y,
				fill: w(),
				fillOpacity: T(),
				stroke: E(),
				strokeWidth: O(),
				strokeOpacity: D(),
				strokeDasharray: b || o || l ? "none" : "2,2",
				className: "transition-all duration-150"
			}),
			b && /* @__PURE__ */ g("circle", {
				cx: f,
				cy: h,
				r: Math.min(v, y) * .4,
				fill: ct(t),
				stroke: "white",
				strokeWidth: "1.5",
				className: "transition-all duration-150"
			}),
			a && /* @__PURE__ */ g("text", {
				x: f,
				y: h + y + 10,
				textAnchor: "middle",
				fontSize: "7",
				fill: "#6b7280",
				className: "pointer-events-none select-none",
				children: e.shortLabel
			})
		]
	});
}), vi = Y("flex flex-col", {
	variants: { size: {
		sm: "",
		md: "",
		lg: ""
	} },
	defaultVariants: { size: "md" }
}), yi = Y("rounded-full font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", {
	variants: { size: {
		sm: "w-8 h-8 text-xs",
		md: "w-11 h-11 text-sm",
		lg: "w-14 h-14 text-base"
	} },
	defaultVariants: { size: "md" }
}), bi = Y("", {
	variants: { size: {
		sm: "gap-1",
		md: "gap-2",
		lg: "gap-3"
	} },
	defaultVariants: { size: "md" }
}), xi = Y("", {
	variants: { size: {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base"
	} },
	defaultVariants: { size: "md" }
}), Si = [
	0,
	1,
	2,
	3,
	4
], Ci = o(function({ value: e, onChange: t, zoneLabel: n, orientation: r = "horizontal", size: i = "md", className: a }) {
	let o = r === "vertical";
	return /* @__PURE__ */ _("div", {
		className: J(vi({ size: i }), a),
		children: [
			n && /* @__PURE__ */ g("div", {
				className: J("font-medium text-gray-900 mb-3", xi({ size: i })),
				children: n
			}),
			/* @__PURE__ */ g("div", {
				role: "radiogroup",
				"aria-label": "Intensité de la douleur",
				className: J("flex", o ? "flex-col" : "flex-row", bi({ size: i })),
				children: Si.map((n) => {
					let r = e === n, a = ct(n), o = lt(n);
					return /* @__PURE__ */ g("button", {
						type: "button",
						role: "radio",
						"aria-checked": r,
						"aria-label": `${o} (niveau ${n})`,
						onClick: () => t(n),
						className: J(yi({ size: i }), r ? "ring-2 ring-offset-2 scale-110 shadow-md" : "hover:scale-105 opacity-70 hover:opacity-100"),
						style: {
							backgroundColor: a,
							color: n >= 2 ? "white" : "#1f2937",
							"--tw-ring-color": a
						},
						children: n
					}, n);
				})
			}),
			/* @__PURE__ */ _("div", {
				className: "mt-3 text-center",
				children: [/* @__PURE__ */ g("span", {
					className: J("font-semibold", xi({ size: i })),
					style: { color: ct(e) },
					children: lt(e)
				}), /* @__PURE__ */ _("span", {
					className: J("text-gray-500 ml-2", xi({ size: i })),
					children: [
						"(niveau ",
						e,
						"/4)"
					]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "mt-3 h-2 rounded-full overflow-hidden flex",
				children: Object.values(at).map((t, n) => /* @__PURE__ */ g("div", {
					className: "flex-1 transition-opacity duration-200",
					style: {
						backgroundColor: t,
						opacity: n <= e ? 1 : .3
					}
				}, n))
			})
		]
	});
}), wi = o(function({ value: e, onChange: t, className: n }) {
	return /* @__PURE__ */ g("div", {
		role: "radiogroup",
		"aria-label": "Intensité de la douleur",
		className: J("inline-flex gap-1", n),
		children: Si.map((n) => {
			let r = e === n, i = ct(n);
			return /* @__PURE__ */ g("button", {
				type: "button",
				role: "radio",
				"aria-checked": r,
				"aria-label": `${lt(n)} (niveau ${n})`,
				onClick: () => t(n),
				className: J("w-6 h-6 rounded-full text-xs font-medium", "flex items-center justify-center", "transition-all duration-150", "focus:outline-none focus:ring-1 focus:ring-offset-1", r ? "ring-1 ring-offset-1 scale-110" : "opacity-60 hover:opacity-100"),
				style: {
					backgroundColor: i,
					color: n >= 2 ? "white" : "#1f2937"
				},
				children: n
			}, n);
		})
	});
}), Ti = {
	head: {
		id: "head",
		label: "Tête",
		shortLabel: "Tête",
		category: "head_neck",
		visibleOn: ["front", "back"],
		position: {
			x: 50,
			y: 10
		},
		hitArea: {
			width: 16,
			height: 10
		}
	},
	neck_front: {
		id: "neck_front",
		label: "Cou (avant)",
		shortLabel: "Cou",
		category: "head_neck",
		visibleOn: ["front"],
		position: {
			x: 50,
			y: 18
		},
		hitArea: {
			width: 7,
			height: 3
		}
	},
	neck_back: {
		id: "neck_back",
		label: "Nuque",
		shortLabel: "Nuque",
		category: "head_neck",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 18
		},
		hitArea: {
			width: 7,
			height: 3
		}
	},
	shoulder_left: {
		id: "shoulder_left",
		label: "Épaule gauche",
		shortLabel: "Ép. G",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 27,
			y: 21
		},
		hitArea: {
			width: 10,
			height: 5
		}
	},
	shoulder_right: {
		id: "shoulder_right",
		label: "Épaule droite",
		shortLabel: "Ép. D",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 73,
			y: 21
		},
		hitArea: {
			width: 10,
			height: 5
		}
	},
	upper_arm_left_front: {
		id: "upper_arm_left_front",
		label: "Bras gauche (avant)",
		shortLabel: "Bras G",
		category: "upper_limb",
		visibleOn: ["front"],
		position: {
			x: 20,
			y: 28
		},
		hitArea: {
			width: 7,
			height: 8
		}
	},
	upper_arm_left_back: {
		id: "upper_arm_left_back",
		label: "Bras gauche (arrière)",
		shortLabel: "Bras G",
		category: "upper_limb",
		visibleOn: ["back"],
		position: {
			x: 20,
			y: 28
		},
		hitArea: {
			width: 7,
			height: 8
		}
	},
	upper_arm_right_front: {
		id: "upper_arm_right_front",
		label: "Bras droit (avant)",
		shortLabel: "Bras D",
		category: "upper_limb",
		visibleOn: ["front"],
		position: {
			x: 80,
			y: 28
		},
		hitArea: {
			width: 7,
			height: 8
		}
	},
	upper_arm_right_back: {
		id: "upper_arm_right_back",
		label: "Bras droit (arrière)",
		shortLabel: "Bras D",
		category: "upper_limb",
		visibleOn: ["back"],
		position: {
			x: 80,
			y: 28
		},
		hitArea: {
			width: 7,
			height: 8
		}
	},
	elbow_left: {
		id: "elbow_left",
		label: "Coude gauche",
		shortLabel: "Coude G",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 15,
			y: 37
		},
		hitArea: {
			width: 5,
			height: 4
		}
	},
	elbow_right: {
		id: "elbow_right",
		label: "Coude droit",
		shortLabel: "Coude D",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 85,
			y: 37
		},
		hitArea: {
			width: 5,
			height: 4
		}
	},
	forearm_left_front: {
		id: "forearm_left_front",
		label: "Avant-bras gauche (avant)",
		shortLabel: "Av-bras G",
		category: "upper_limb",
		visibleOn: ["front"],
		position: {
			x: 14,
			y: 42
		},
		hitArea: {
			width: 5,
			height: 5
		}
	},
	forearm_left_back: {
		id: "forearm_left_back",
		label: "Avant-bras gauche (arrière)",
		shortLabel: "Av-bras G",
		category: "upper_limb",
		visibleOn: ["back"],
		position: {
			x: 14,
			y: 42
		},
		hitArea: {
			width: 5,
			height: 5
		}
	},
	forearm_right_front: {
		id: "forearm_right_front",
		label: "Avant-bras droit (avant)",
		shortLabel: "Av-bras D",
		category: "upper_limb",
		visibleOn: ["front"],
		position: {
			x: 86,
			y: 42
		},
		hitArea: {
			width: 5,
			height: 5
		}
	},
	forearm_right_back: {
		id: "forearm_right_back",
		label: "Avant-bras droit (arrière)",
		shortLabel: "Av-bras D",
		category: "upper_limb",
		visibleOn: ["back"],
		position: {
			x: 86,
			y: 42
		},
		hitArea: {
			width: 5,
			height: 5
		}
	},
	wrist_left: {
		id: "wrist_left",
		label: "Poignet gauche",
		shortLabel: "Poig. G",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 13,
			y: 44
		},
		hitArea: {
			width: 4,
			height: 2
		}
	},
	wrist_right: {
		id: "wrist_right",
		label: "Poignet droit",
		shortLabel: "Poig. D",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 87,
			y: 44
		},
		hitArea: {
			width: 4,
			height: 2
		}
	},
	hand_left: {
		id: "hand_left",
		label: "Main gauche",
		shortLabel: "Main G",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 13,
			y: 47
		},
		hitArea: {
			width: 5,
			height: 4
		}
	},
	hand_right: {
		id: "hand_right",
		label: "Main droite",
		shortLabel: "Main D",
		category: "upper_limb",
		visibleOn: ["front", "back"],
		position: {
			x: 87,
			y: 47
		},
		hitArea: {
			width: 5,
			height: 4
		}
	},
	chest_left: {
		id: "chest_left",
		label: "Poitrine gauche",
		shortLabel: "Poit. G",
		category: "trunk",
		visibleOn: ["front"],
		position: {
			x: 38,
			y: 26
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	chest_right: {
		id: "chest_right",
		label: "Poitrine droite",
		shortLabel: "Poit. D",
		category: "trunk",
		visibleOn: ["front"],
		position: {
			x: 62,
			y: 26
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	abdomen_upper: {
		id: "abdomen_upper",
		label: "Abdomen supérieur",
		shortLabel: "Abd. sup",
		category: "trunk",
		visibleOn: ["front"],
		position: {
			x: 50,
			y: 38
		},
		hitArea: {
			width: 20,
			height: 8
		}
	},
	abdomen_lower: {
		id: "abdomen_lower",
		label: "Abdomen inférieur",
		shortLabel: "Abd. inf",
		category: "trunk",
		visibleOn: ["front"],
		position: {
			x: 50,
			y: 50
		},
		hitArea: {
			width: 20,
			height: 8
		}
	},
	upper_back_left: {
		id: "upper_back_left",
		label: "Haut du dos gauche",
		shortLabel: "Dos sup G",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 38,
			y: 26
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	upper_back_right: {
		id: "upper_back_right",
		label: "Haut du dos droit",
		shortLabel: "Dos sup D",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 62,
			y: 26
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	mid_back_left: {
		id: "mid_back_left",
		label: "Milieu du dos gauche",
		shortLabel: "Dos mid G",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 38,
			y: 38
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	mid_back_right: {
		id: "mid_back_right",
		label: "Milieu du dos droit",
		shortLabel: "Dos mid D",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 62,
			y: 38
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	lower_back_left: {
		id: "lower_back_left",
		label: "Bas du dos gauche",
		shortLabel: "Dos inf G",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 38,
			y: 50
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	lower_back_right: {
		id: "lower_back_right",
		label: "Bas du dos droit",
		shortLabel: "Dos inf D",
		category: "trunk",
		visibleOn: ["back"],
		position: {
			x: 62,
			y: 50
		},
		hitArea: {
			width: 12,
			height: 8
		}
	},
	cervical: {
		id: "cervical",
		label: "Cervicales (C1-C7)",
		shortLabel: "Cervical",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 18
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	thoracic_upper: {
		id: "thoracic_upper",
		label: "Thoraciques hautes (T1-T4)",
		shortLabel: "Thor. sup",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 24
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	thoracic_mid: {
		id: "thoracic_mid",
		label: "Thoraciques moyennes (T5-T8)",
		shortLabel: "Thor. mid",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 32
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	thoracic_lower: {
		id: "thoracic_lower",
		label: "Thoraciques basses (T9-T12)",
		shortLabel: "Thor. inf",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 40
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	lumbar_upper: {
		id: "lumbar_upper",
		label: "Lombaires hautes (L1-L3)",
		shortLabel: "Lomb. sup",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 48
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	lumbar_lower: {
		id: "lumbar_lower",
		label: "Lombaires basses (L4-L5)",
		shortLabel: "Lomb. inf",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 55
		},
		hitArea: {
			width: 4,
			height: 4
		}
	},
	sacrum: {
		id: "sacrum",
		label: "Sacrum",
		shortLabel: "Sacrum",
		category: "spine",
		visibleOn: ["back"],
		position: {
			x: 50,
			y: 61
		},
		hitArea: {
			width: 6,
			height: 4
		}
	},
	hip_left_front: {
		id: "hip_left_front",
		label: "Hanche gauche (avant)",
		shortLabel: "Hanche G",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 38,
			y: 58
		},
		hitArea: {
			width: 12,
			height: 6
		}
	},
	hip_right_front: {
		id: "hip_right_front",
		label: "Hanche droite (avant)",
		shortLabel: "Hanche D",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 62,
			y: 58
		},
		hitArea: {
			width: 12,
			height: 6
		}
	},
	gluteal_left: {
		id: "gluteal_left",
		label: "Fessier gauche",
		shortLabel: "Fessier G",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 38,
			y: 61
		},
		hitArea: {
			width: 12,
			height: 6
		}
	},
	gluteal_right: {
		id: "gluteal_right",
		label: "Fessier droit",
		shortLabel: "Fessier D",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 62,
			y: 61
		},
		hitArea: {
			width: 12,
			height: 6
		}
	},
	thigh_left_front: {
		id: "thigh_left_front",
		label: "Cuisse gauche (avant)",
		shortLabel: "Cuisse G",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 35,
			y: 70
		},
		hitArea: {
			width: 10,
			height: 12
		}
	},
	thigh_left_back: {
		id: "thigh_left_back",
		label: "Cuisse gauche (arrière)",
		shortLabel: "Cuisse G",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 35,
			y: 72
		},
		hitArea: {
			width: 10,
			height: 12
		}
	},
	thigh_left_inner: {
		id: "thigh_left_inner",
		label: "Cuisse gauche (intérieur)",
		shortLabel: "Cuisse G int",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 42,
			y: 72
		},
		hitArea: {
			width: 5,
			height: 10
		}
	},
	thigh_left_outer: {
		id: "thigh_left_outer",
		label: "Cuisse gauche (extérieur)",
		shortLabel: "Cuisse G ext",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 28,
			y: 72
		},
		hitArea: {
			width: 5,
			height: 10
		}
	},
	thigh_right_front: {
		id: "thigh_right_front",
		label: "Cuisse droite (avant)",
		shortLabel: "Cuisse D",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 65,
			y: 70
		},
		hitArea: {
			width: 10,
			height: 12
		}
	},
	thigh_right_back: {
		id: "thigh_right_back",
		label: "Cuisse droite (arrière)",
		shortLabel: "Cuisse D",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 65,
			y: 72
		},
		hitArea: {
			width: 10,
			height: 12
		}
	},
	thigh_right_inner: {
		id: "thigh_right_inner",
		label: "Cuisse droite (intérieur)",
		shortLabel: "Cuisse D int",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 58,
			y: 72
		},
		hitArea: {
			width: 5,
			height: 10
		}
	},
	thigh_right_outer: {
		id: "thigh_right_outer",
		label: "Cuisse droite (extérieur)",
		shortLabel: "Cuisse D ext",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 72,
			y: 72
		},
		hitArea: {
			width: 5,
			height: 10
		}
	},
	knee_left_front: {
		id: "knee_left_front",
		label: "Genou gauche (avant)",
		shortLabel: "Genou G",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 33,
			y: 80
		},
		hitArea: {
			width: 7,
			height: 5
		}
	},
	knee_left_back: {
		id: "knee_left_back",
		label: "Genou gauche (arrière)",
		shortLabel: "Genou G",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 33,
			y: 81
		},
		hitArea: {
			width: 7,
			height: 5
		}
	},
	knee_right_front: {
		id: "knee_right_front",
		label: "Genou droit (avant)",
		shortLabel: "Genou D",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 67,
			y: 80
		},
		hitArea: {
			width: 7,
			height: 5
		}
	},
	knee_right_back: {
		id: "knee_right_back",
		label: "Genou droit (arrière)",
		shortLabel: "Genou D",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 67,
			y: 81
		},
		hitArea: {
			width: 7,
			height: 5
		}
	},
	shin_left: {
		id: "shin_left",
		label: "Tibia gauche",
		shortLabel: "Tibia G",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 32,
			y: 88
		},
		hitArea: {
			width: 6,
			height: 8
		}
	},
	shin_right: {
		id: "shin_right",
		label: "Tibia droit",
		shortLabel: "Tibia D",
		category: "lower_limb",
		visibleOn: ["front"],
		position: {
			x: 68,
			y: 88
		},
		hitArea: {
			width: 6,
			height: 8
		}
	},
	calf_left: {
		id: "calf_left",
		label: "Mollet gauche",
		shortLabel: "Mollet G",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 32,
			y: 88
		},
		hitArea: {
			width: 6,
			height: 8
		}
	},
	calf_right: {
		id: "calf_right",
		label: "Mollet droit",
		shortLabel: "Mollet D",
		category: "lower_limb",
		visibleOn: ["back"],
		position: {
			x: 68,
			y: 88
		},
		hitArea: {
			width: 6,
			height: 8
		}
	},
	ankle_left: {
		id: "ankle_left",
		label: "Cheville gauche",
		shortLabel: "Chev. G",
		category: "foot",
		visibleOn: ["front", "back"],
		position: {
			x: 32,
			y: 94
		},
		hitArea: {
			width: 5,
			height: 3
		}
	},
	ankle_right: {
		id: "ankle_right",
		label: "Cheville droite",
		shortLabel: "Chev. D",
		category: "foot",
		visibleOn: ["front", "back"],
		position: {
			x: 68,
			y: 94
		},
		hitArea: {
			width: 5,
			height: 3
		}
	},
	foot_left_top: {
		id: "foot_left_top",
		label: "Pied gauche (dessus)",
		shortLabel: "Pied G",
		category: "foot",
		visibleOn: ["front"],
		position: {
			x: 32,
			y: 96
		},
		hitArea: {
			width: 7,
			height: 3
		}
	},
	foot_left_sole: {
		id: "foot_left_sole",
		label: "Pied gauche (plante)",
		shortLabel: "Plante G",
		category: "foot",
		visibleOn: ["back"],
		position: {
			x: 32,
			y: 96
		},
		hitArea: {
			width: 7,
			height: 3
		}
	},
	foot_right_top: {
		id: "foot_right_top",
		label: "Pied droit (dessus)",
		shortLabel: "Pied D",
		category: "foot",
		visibleOn: ["front"],
		position: {
			x: 68,
			y: 96
		},
		hitArea: {
			width: 7,
			height: 3
		}
	},
	foot_right_sole: {
		id: "foot_right_sole",
		label: "Pied droit (plante)",
		shortLabel: "Plante D",
		category: "foot",
		visibleOn: ["back"],
		position: {
			x: 68,
			y: 96
		},
		hitArea: {
			width: 7,
			height: 3
		}
	}
};
function Ei(e) {
	return Object.values(Ti).filter((t) => t.visibleOn.includes(e));
}
function Di(e) {
	return Object.values(Ti).filter((t) => t.category === e);
}
var Oi = {
	head_neck: "Tête et cou",
	upper_limb: "Membres supérieurs",
	trunk: "Tronc",
	spine: "Colonne vertébrale",
	lower_limb: "Membres inférieurs",
	foot: "Pieds"
};
//#endregion
//#region src/components/bodymap/zone-detail-sheet.tsx
function ki({ open: e, onClose: t, zone: n, point: r, onIntensityChange: i, onNotesChange: a, onRemove: o }) {
	let [c, u] = m(r?.notes ?? "");
	l(() => {
		u(r?.notes ?? "");
	}, [r?.notes]);
	let d = s((e) => {
		u(e);
		let t = setTimeout(() => {
			a(e);
		}, 300);
		return () => clearTimeout(t);
	}, [a]), f = s(() => {
		o(), t();
	}, [o, t]), p = s(() => {
		c !== r?.notes && a(c), t();
	}, [
		c,
		r?.notes,
		a,
		t
	]);
	return /* @__PURE__ */ _(Lr, {
		open: e,
		onClose: t,
		title: n.label,
		description: Oi[n.category],
		height: "auto",
		children: [/* @__PURE__ */ _("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
					className: "text-sm font-medium text-gray-700 mb-3",
					children: "Intensité de la douleur"
				}), /* @__PURE__ */ g(Ci, {
					value: r?.intensity ?? 1,
					onChange: i,
					size: "md"
				})] }),
				/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("label", {
					htmlFor: "zone-notes",
					className: "block text-sm font-medium text-gray-700 mb-2",
					children: "Notes (optionnel)"
				}), /* @__PURE__ */ g("textarea", {
					id: "zone-notes",
					value: c,
					onChange: (e) => d(e.target.value),
					placeholder: "Décrivez la douleur (type, moment d'apparition, facteurs aggravants...)",
					rows: 3,
					className: J("w-full px-3 py-2 border border-gray-300 rounded-lg text-sm", "focus:ring-2 focus:ring-primary-500 focus:border-primary-500", "placeholder:text-gray-400 resize-none")
				})] }),
				/* @__PURE__ */ _("div", {
					className: "bg-gray-50 rounded-lg p-3",
					children: [/* @__PURE__ */ g("h4", {
						className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-2",
						children: "Informations"
					}), /* @__PURE__ */ _("ul", {
						className: "text-sm text-gray-600 space-y-1",
						children: [/* @__PURE__ */ _("li", { children: [
							/* @__PURE__ */ g("span", {
								className: "text-gray-500",
								children: "Catégorie :"
							}),
							" ",
							Oi[n.category]
						] }), /* @__PURE__ */ _("li", { children: [
							/* @__PURE__ */ g("span", {
								className: "text-gray-500",
								children: "Vue :"
							}),
							" ",
							n.visibleOn.includes("front") && n.visibleOn.includes("back") ? "Face et dos" : n.visibleOn.includes("front") ? "Face uniquement" : "Dos uniquement"
						] })]
					})]
				})
			]
		}), /* @__PURE__ */ _(Rr, { children: [r && r.intensity > 0 && /* @__PURE__ */ g(gt, {
			variant: "outline",
			onClick: f,
			leftIcon: /* @__PURE__ */ g(rr, { className: "w-4 h-4" }),
			className: "text-red-600 border-red-300 hover:bg-red-50",
			children: "Supprimer"
		}), /* @__PURE__ */ g(gt, {
			variant: "primary",
			onClick: p,
			fullWidth: !0,
			children: "Enregistrer"
		})] })]
	});
}
//#endregion
//#region src/components/bodymap/anatomical-body-map.tsx
var Ai = Y("mx-auto", {
	variants: { size: {
		sm: "max-w-[280px]",
		md: "max-w-[340px]",
		lg: "max-w-[400px]"
	} },
	defaultVariants: { size: "md" }
}), ji = Y("relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden", {
	variants: { size: {
		sm: "h-[350px]",
		md: "h-[420px]",
		lg: "h-[500px]"
	} },
	defaultVariants: { size: "md" }
});
function Mi({ value: e, onChange: t, mode: n = "multiple", showLabels: r = !1, initialView: i = "front", disabledZones: a = [], size: o = "md", className: c }) {
	let [l, u] = m(i), [d, p] = m(null), [h, v] = m(!1), [y, b] = m(!1), x = f(() => Ei(l), [l]), S = f(() => {
		let t = {};
		return e.forEach((e) => {
			e.side === l && (t[e.zone] = e.intensity);
		}), t;
	}, [e, l]), C = s((e) => S[e] ?? null, [S]), w = s((e) => {
		p(e), v(!0);
	}, []), T = s((e) => {
		p(e), b(!0);
	}, []), E = s((r, i) => {
		let a = n === "single" ? [] : [...e];
		a = a.filter((e) => !(e.zone === r && e.side === l)), i > 0 && a.push({
			zone: r,
			intensity: i,
			side: l
		}), t(a), v(!1);
	}, [
		n,
		e,
		l,
		t
	]), D = s((n, r) => {
		t(e.map((e) => e.zone === n && e.side === l ? {
			...e,
			notes: r
		} : e));
	}, [
		e,
		l,
		t
	]), O = s((n) => {
		t(e.filter((e) => !(e.zone === n && e.side === l))), b(!1);
	}, [
		e,
		l,
		t
	]), k = f(() => d ? e.find((e) => e.zone === d && e.side === l) ?? null : null, [
		d,
		e,
		l
	]);
	return /* @__PURE__ */ _("div", {
		className: J(Ai({ size: o }), c),
		children: [
			/* @__PURE__ */ g("div", {
				className: "mb-4",
				children: /* @__PURE__ */ g(zt, {
					value: l,
					onChange: u,
					options: [{
						value: "front",
						label: "Face"
					}, {
						value: "back",
						label: "Dos"
					}],
					fullWidth: !0,
					"aria-label": "Vue du corps"
				})
			}),
			/* @__PURE__ */ _("div", {
				className: ji({ size: o }),
				children: [/* @__PURE__ */ _("svg", {
					viewBox: fi.viewBox,
					className: "w-full h-full",
					role: "img",
					"aria-label": `Corps humain vue de ${l === "front" ? "face" : "dos"}`,
					children: [/* @__PURE__ */ g("g", {
						className: "pointer-events-none",
						children: /* @__PURE__ */ g(gi, { view: l })
					}), x.map((e) => /* @__PURE__ */ g(_i, {
						zone: e,
						intensity: C(e.id),
						onClick: w,
						onLongPress: T,
						disabled: a.includes(e.id),
						showLabel: r
					}, e.id))]
				}), /* @__PURE__ */ g("div", {
					className: "absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200",
					children: /* @__PURE__ */ _("span", {
						className: "text-sm font-medium text-gray-700",
						children: [
							e.filter((e) => e.side === l).length,
							" zone",
							e.filter((e) => e.side === l).length === 1 ? "" : "s"
						]
					})
				})]
			}),
			h && d && /* @__PURE__ */ _("div", {
				className: "mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm",
				children: [/* @__PURE__ */ _("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ g("span", {
						className: "font-medium text-gray-900",
						children: Ti[d].label
					}), /* @__PURE__ */ g("button", {
						type: "button",
						onClick: () => {
							v(!1), p(null);
						},
						className: "text-gray-400 hover:text-gray-600",
						"aria-label": "Fermer",
						children: /* @__PURE__ */ g("svg", {
							className: "w-5 h-5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ g("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M6 18L18 6M6 6l12 12"
							})
						})
					})]
				}), /* @__PURE__ */ g(Ci, {
					value: k?.intensity ?? 1,
					onChange: (e) => E(d, e),
					size: "md"
				})]
			}),
			d && /* @__PURE__ */ g(ki, {
				open: y,
				onClose: () => {
					b(!1), p(null);
				},
				zone: Ti[d],
				point: k,
				onIntensityChange: (e) => E(d, e),
				onNotesChange: (e) => D(d, e),
				onRemove: () => O(d)
			})
		]
	});
}
//#endregion
//#region src/components/questionnaire/questionnaire-progress.tsx
var Ni = Y("bg-white", {
	variants: { variant: {
		compact: "",
		full: ""
	} },
	defaultVariants: { variant: "full" }
});
function Pi({ currentModule: e, totalModules: t, moduleName: n, currentQuestion: r, totalQuestionsInModule: i, totalAnswered: a = 0, totalQuestions: o = 0, variant: s = "full", className: c, onClose: l }) {
	let u = Math.round(o > 0 ? a / o * 100 : e / t * 100), d = s === "compact";
	return /* @__PURE__ */ g("div", {
		className: J(Ni({ variant: s }), c),
		children: d ? /* @__PURE__ */ _("div", {
			className: "max-w-4xl mx-auto px-4 py-2",
			children: [/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between text-xs text-gray-500 mb-1.5",
				children: [/* @__PURE__ */ _("span", { children: [
					"Module ",
					e,
					"/",
					t
				] }), /* @__PURE__ */ _("span", { children: [u, "%"] })]
			}), /* @__PURE__ */ g("div", {
				className: "w-full h-1.5 bg-gray-200 rounded-full overflow-hidden",
				children: /* @__PURE__ */ g("div", {
					className: "h-full bg-primary-500 rounded-full transition-all duration-500 ease-out",
					style: { width: `${u}%` }
				})
			})]
		}) : /* @__PURE__ */ _("div", {
			className: "max-w-4xl mx-auto px-4 py-3 border-b border-gray-100",
			children: [
				/* @__PURE__ */ _("div", {
					className: "flex items-center justify-between mb-2",
					children: [/* @__PURE__ */ _("div", {
						className: "flex items-center gap-2",
						children: [
							l && /* @__PURE__ */ g("button", {
								onClick: l,
								className: "p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 transition-colors",
								"aria-label": "Quitter le questionnaire",
								children: /* @__PURE__ */ g("svg", {
									className: "w-5 h-5 text-gray-500",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ g("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M6 18L18 6M6 6l12 12"
									})
								})
							}),
							/* @__PURE__ */ g("div", {
								className: "flex items-center gap-1",
								children: Array.from({ length: t }, (t, n) => /* @__PURE__ */ g("div", { className: J("w-2 h-2 rounded-full transition-colors", n < e ? "bg-primary-500" : "bg-gray-200") }, n))
							}),
							/* @__PURE__ */ _("span", {
								className: "text-xs text-gray-500",
								children: [
									"Module ",
									e,
									"/",
									t
								]
							})
						]
					}), /* @__PURE__ */ _("span", {
						className: "text-sm font-medium text-primary-600",
						children: [u, "%"]
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2",
					children: /* @__PURE__ */ g("div", {
						className: "h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out",
						style: { width: `${u}%` },
						role: "progressbar",
						"aria-valuenow": u,
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-label": `Progression: ${u}%`
					})
				}),
				/* @__PURE__ */ _("div", {
					className: "flex items-center justify-between",
					children: [n && /* @__PURE__ */ _("div", {
						className: "flex items-center gap-1.5 text-sm text-gray-700",
						children: [/* @__PURE__ */ g("svg", {
							className: "w-4 h-4 text-gray-400",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ g("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							})
						}), /* @__PURE__ */ g("span", {
							className: "font-medium truncate max-w-[200px]",
							children: n
						})]
					}), r !== void 0 && i !== void 0 && /* @__PURE__ */ _("span", {
						className: "text-xs text-gray-500 shrink-0",
						children: [
							"Question ",
							r,
							"/",
							i
						]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/questionnaire/individual-scores-display.tsx
function Fi(e) {
	switch (e) {
		case "green": return {
			bg: "bg-green-50",
			text: "text-green-700",
			border: "border-green-200",
			bar: "bg-green-500"
		};
		case "yellow": return {
			bg: "bg-yellow-50",
			text: "text-yellow-700",
			border: "border-yellow-200",
			bar: "bg-yellow-500"
		};
		case "orange": return {
			bg: "bg-orange-50",
			text: "text-orange-700",
			border: "border-orange-200",
			bar: "bg-orange-500"
		};
		case "red": return {
			bg: "bg-red-50",
			text: "text-red-700",
			border: "border-red-200",
			bar: "bg-red-500"
		};
		case "blue": return {
			bg: "bg-blue-50",
			text: "text-blue-700",
			border: "border-blue-200",
			bar: "bg-blue-500"
		};
		default: return {
			bg: "bg-gray-50",
			text: "text-gray-700",
			border: "border-gray-200",
			bar: "bg-gray-500"
		};
	}
}
function Ii(e) {
	return e ? typeof e == "string" ? e : e.fr || e.en || "" : "";
}
function Li({ scoreResult: e, showDetails: t }) {
	let n = e.scoreDefinition, r = Fi(e.interpretation?.color), i = n?.minValue ?? 0, a = n?.maxValue ?? 100, o = a - i, s = o > 0 ? (e.value - i) / o * 100 : 0, c = Math.max(0, Math.min(100, s)), l = n?.higherIsBetter ?? !0;
	return /* @__PURE__ */ _("div", {
		className: J("rounded-xl border p-4", r.border, r.bg),
		children: [
			/* @__PURE__ */ g("div", {
				className: "text-sm font-medium text-gray-600 mb-2",
				children: Ii(n?.name) || n?.key || "Score"
			}),
			/* @__PURE__ */ _("div", {
				className: "flex items-baseline justify-between mb-3",
				children: [/* @__PURE__ */ _("div", {
					className: "flex items-baseline gap-1",
					children: [/* @__PURE__ */ g("span", {
						className: J("text-3xl font-bold", r.text),
						children: e.value
					}), /* @__PURE__ */ _("span", {
						className: "text-sm text-gray-500",
						children: ["/ ", a]
					})]
				}), !l && /* @__PURE__ */ g("span", {
					className: "text-xs text-gray-400 italic",
					children: "(bas = meilleur)"
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "relative h-2 bg-gray-200 rounded-full overflow-hidden mb-3",
				children: /* @__PURE__ */ g("div", {
					className: J("absolute inset-y-0 left-0 transition-all duration-500 rounded-full", r.bar),
					style: { width: `${c}%` }
				})
			}),
			e.interpretation && /* @__PURE__ */ g("div", {
				className: J("inline-flex items-center px-3 py-1.5 rounded-lg border", r.bg, r.border),
				children: /* @__PURE__ */ g("span", {
					className: J("text-sm font-semibold", r.text),
					children: Ii(e.interpretation.label)
				})
			}),
			t && n?.description && /* @__PURE__ */ g("p", {
				className: "mt-3 text-sm text-gray-600",
				children: Ii(n.description)
			})
		]
	});
}
function Ri({ scores: e, title: t, showDetails: n = !1 }) {
	if (!e || e.length === 0) return null;
	let r = [...e].sort((e, t) => (e.scoreDefinition?.displayOrder ?? 0) - (t.scoreDefinition?.displayOrder ?? 0));
	return /* @__PURE__ */ _("div", {
		className: "space-y-4",
		children: [
			t && /* @__PURE__ */ _("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ g("div", { className: "w-1 h-6 bg-cyan-500 rounded-full" }), /* @__PURE__ */ g("h3", {
					className: "text-lg font-bold text-gray-900",
					children: t
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: r.map((e) => /* @__PURE__ */ g(Li, {
					scoreResult: e,
					showDetails: n
				}, e.id))
			}),
			/* @__PURE__ */ g("p", {
				className: "text-xs text-gray-400 text-center",
				children: "Ces scores sont calculés selon les barèmes officiels du questionnaire."
			})
		]
	});
}
//#endregion
//#region src/components/questionnaire/score-display.tsx
function zi(e) {
	switch (e) {
		case "green": return {
			bg: "bg-green-50",
			text: "text-green-700",
			border: "border-green-200"
		};
		case "yellow": return {
			bg: "bg-yellow-50",
			text: "text-yellow-700",
			border: "border-yellow-200"
		};
		case "orange": return {
			bg: "bg-orange-50",
			text: "text-orange-700",
			border: "border-orange-200"
		};
		case "red": return {
			bg: "bg-red-50",
			text: "text-red-700",
			border: "border-red-200"
		};
		case "blue": return {
			bg: "bg-blue-50",
			text: "text-blue-700",
			border: "border-blue-200"
		};
		default: return {
			bg: "bg-gray-50",
			text: "text-gray-700",
			border: "border-gray-200"
		};
	}
}
function Bi({ score: e, isMain: t }) {
	let n = zi(e.color);
	return /* @__PURE__ */ _("div", {
		className: J("rounded-xl border", n.border, n.bg, t ? "p-6" : "p-4"),
		children: [
			/* @__PURE__ */ g("div", {
				className: J("text-sm font-medium", t ? "text-gray-600 mb-2" : "text-gray-500 mb-1"),
				children: e.label
			}),
			/* @__PURE__ */ _("div", {
				className: "flex items-baseline gap-2",
				children: [/* @__PURE__ */ g("span", {
					className: J("font-bold", t ? "text-4xl" : "text-2xl", n.text),
					children: e.rawValue
				}), e.normalizedValue !== void 0 && /* @__PURE__ */ _("span", {
					className: "text-sm text-gray-500",
					children: [
						"(",
						e.normalizedValue.toFixed(0),
						"%)"
					]
				})]
			}),
			e.interpretation && /* @__PURE__ */ g("div", {
				className: J("mt-2 px-3 py-1.5 rounded-lg border inline-block", n.bg, n.border),
				children: /* @__PURE__ */ g("span", {
					className: J("text-sm font-semibold", n.text),
					children: e.interpretation
				})
			}),
			e.description && /* @__PURE__ */ g("p", {
				className: "mt-3 text-sm text-gray-600",
				children: e.description
			})
		]
	});
}
function Vi({ result: e, title: t }) {
	return /* @__PURE__ */ _("div", {
		className: "space-y-6",
		children: [
			t && /* @__PURE__ */ g("div", {
				className: "text-center",
				children: /* @__PURE__ */ g("h2", {
					className: "text-xl font-bold text-gray-900",
					children: t
				})
			}),
			/* @__PURE__ */ g(Bi, {
				score: e.mainScore,
				isMain: !0
			}),
			e.subScores.length > 0 && /* @__PURE__ */ _("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ g("h3", {
					className: "text-sm font-semibold text-gray-700 uppercase tracking-wide",
					children: "Sous-scores"
				}), /* @__PURE__ */ g("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
					children: e.subScores.map((e) => /* @__PURE__ */ g(Bi, { score: e }, e.key))
				})]
			}),
			e.recommendations.length > 0 && /* @__PURE__ */ _("div", {
				className: "bg-blue-50 border border-blue-200 rounded-xl p-4",
				children: [/* @__PURE__ */ g("h3", {
					className: "text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3",
					children: "Recommandations"
				}), /* @__PURE__ */ g("ul", {
					className: "space-y-2",
					children: e.recommendations.map((e, t) => /* @__PURE__ */ _("li", {
						className: "flex items-start gap-2 text-sm text-blue-700",
						children: [/* @__PURE__ */ g("span", {
							className: "text-blue-500 mt-0.5",
							children: "•"
						}), e]
					}, t))
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "text-center text-xs text-gray-400",
				children: ["Calculé le ", new Date(e.computedAt).toLocaleDateString("fr-FR", {
					day: "numeric",
					month: "long",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/questionnaire/demo-video-player.tsx
function Hi(e) {
	if (!e) return {
		type: null,
		embedUrl: null
	};
	if (e.includes("youtube.com/watch?v=")) {
		let t = e.split("v=")[1]?.split("&")[0];
		return t ? {
			type: "youtube",
			embedUrl: `https://www.youtube.com/embed/${t}`
		} : {
			type: null,
			embedUrl: null
		};
	}
	if (e.includes("youtu.be/")) {
		let t = e.split("youtu.be/")[1]?.split("?")[0];
		return t ? {
			type: "youtube",
			embedUrl: `https://www.youtube.com/embed/${t}`
		} : {
			type: null,
			embedUrl: null
		};
	}
	if (e.includes("vimeo.com/")) {
		let t = e.split("vimeo.com/")[1]?.split("?")[0];
		return t ? {
			type: "vimeo",
			embedUrl: `https://player.vimeo.com/video/${t}`
		} : {
			type: null,
			embedUrl: null
		};
	}
	return e.match(/\.(mp4|webm|ogg)(\?.*)?$/i) ? {
		type: "direct",
		embedUrl: e
	} : {
		type: null,
		embedUrl: null
	};
}
function Ui({ videoUrl: e, instructions: t, onContinue: n }) {
	let [r, i] = m(!1), [a, o] = m(!1), s = p(null), { type: c, embedUrl: l } = Hi(e);
	return l ? /* @__PURE__ */ _("div", {
		className: "flex flex-col gap-4",
		children: [
			t && /* @__PURE__ */ g("div", {
				className: "p-4 bg-blue-50 border border-blue-200 rounded-lg",
				children: /* @__PURE__ */ g("p", {
					className: "text-sm text-blue-800",
					children: t
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "relative aspect-video bg-gray-900 rounded-lg overflow-hidden",
				children: c === "direct" ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("video", {
					ref: s,
					src: l,
					className: "w-full h-full object-contain",
					onEnded: () => {
						i(!0), o(!1);
					},
					onPlay: () => o(!0),
					onPause: () => o(!1),
					playsInline: !0,
					controls: a
				}), !a && !r && /* @__PURE__ */ g("button", {
					onClick: () => {
						s.current && (s.current.play(), o(!0));
					},
					className: "absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50",
					children: /* @__PURE__ */ g("div", {
						className: "w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg",
						children: /* @__PURE__ */ g(Vn, { className: "w-10 h-10 text-cyan-600 ml-1" })
					})
				})] }) : /* @__PURE__ */ g("iframe", {
					src: l,
					className: "w-full h-full",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowFullScreen: !0,
					title: "Vidéo de démonstration",
					onLoad: () => {
						setTimeout(() => i(!0), 5e3);
					}
				})
			}),
			/* @__PURE__ */ _("div", {
				className: "flex flex-col gap-3",
				children: [
					r && c === "direct" && /* @__PURE__ */ g(gt, {
						variant: "outline",
						onClick: () => {
							i(!1), s.current && (s.current.currentTime = 0, s.current.play(), o(!0));
						},
						fullWidth: !0,
						leftIcon: /* @__PURE__ */ g(Gn, { className: "w-4 h-4" }),
						children: "Revoir la vidéo"
					}),
					/* @__PURE__ */ g(gt, {
						variant: "primary",
						onClick: n,
						disabled: !r && c !== "youtube" && c !== "vimeo",
						fullWidth: !0,
						size: "lg",
						leftIcon: /* @__PURE__ */ g(hn, { className: "w-5 h-5" }),
						className: "shadow-md",
						children: "J'ai compris, continuer"
					}),
					!r && c === "direct" && /* @__PURE__ */ g("p", {
						className: "text-xs text-center text-gray-500",
						children: "Regardez la vidéo en entier pour pouvoir continuer"
					})
				]
			})
		]
	}) : /* @__PURE__ */ _("div", {
		className: "p-4 bg-amber-50 border border-amber-200 rounded-lg",
		children: [/* @__PURE__ */ g("p", {
			className: "text-sm text-amber-800 mb-4",
			children: "La vidéo de démonstration n'a pas pu être chargée."
		}), /* @__PURE__ */ g(gt, {
			onClick: n,
			fullWidth: !0,
			size: "lg",
			children: "Continuer sans vidéo"
		})]
	});
}
//#endregion
//#region src/components/questionnaire/emergency-screen.tsx
function Wi(e) {
	return typeof e == "string" ? e : e?.fr ? e.fr : e?.en ? e.en : "Alerte médicale détectée";
}
function Gi(e) {
	return e ? typeof e == "string" ? e : e?.fr ? e.fr : e?.en ? e.en : null : null;
}
function Ki({ triggeredFlag: e, onExit: t, practitionerName: n, practitionerPhone: r }) {
	let i = Wi(e.label), a = Gi(e.description);
	return /* @__PURE__ */ _("div", {
		className: "fixed inset-0 z-[100] bg-slate-50 flex flex-col",
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex-shrink-0 pt-safe-top px-4 pt-8 pb-4 bg-white border-b border-slate-200",
				children: [/* @__PURE__ */ g("div", {
					className: "flex justify-center mb-4",
					children: /* @__PURE__ */ g("div", {
						className: "w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center",
						children: /* @__PURE__ */ g("svg", {
							className: "w-8 h-8 text-amber-600",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ g("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})
						})
					})
				}), /* @__PURE__ */ g("h1", {
					className: "text-xl sm:text-2xl font-semibold text-slate-800 text-center",
					children: "Une consultation médicale est recommandée"
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "flex-1 overflow-auto px-4 py-6",
				children: /* @__PURE__ */ _("div", {
					className: "max-w-md mx-auto",
					children: [
						/* @__PURE__ */ _("div", {
							className: "bg-white rounded-xl p-5 mb-5 shadow-sm border border-slate-200",
							children: [/* @__PURE__ */ _("p", {
								className: "text-slate-700 text-base leading-relaxed",
								children: [
									"D'après vos réponses, certains symptômes méritent d'être",
									" ",
									/* @__PURE__ */ g("strong", {
										className: "text-slate-800",
										children: "évalués par un professionnel de santé"
									}),
									"."
								]
							}), /* @__PURE__ */ g("p", {
								className: "text-slate-500 text-sm mt-3",
								children: "Il s'agit d'une précaution. Votre médecin pourra vous examiner et vous orienter au mieux."
							})]
						}),
						/* @__PURE__ */ _("div", {
							className: "bg-slate-100 rounded-lg p-4 mb-6",
							children: [
								/* @__PURE__ */ g("p", {
									className: "text-slate-500 text-xs mb-1 uppercase tracking-wide",
									children: "Symptôme identifié"
								}),
								/* @__PURE__ */ g("p", {
									className: "text-slate-700 font-medium",
									children: i
								}),
								a && /* @__PURE__ */ g("p", {
									className: "text-slate-500 text-sm mt-1",
									children: a
								})
							]
						}),
						/* @__PURE__ */ _("div", {
							className: "space-y-3",
							children: [
								r && /* @__PURE__ */ _("button", {
									onClick: () => {
										r && (window.location.href = `tel:${r}`);
									},
									className: J("w-full flex items-center justify-center gap-3", "bg-cyan-500 text-white font-semibold py-4 px-6 rounded-xl", "hover:bg-cyan-600 active:scale-[0.98] transition-all"),
									children: [
										/* @__PURE__ */ g("svg", {
											className: "w-5 h-5",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ g("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											})
										}),
										"Appeler ",
										n || "mon praticien"
									]
								}),
								/* @__PURE__ */ _("button", {
									onClick: () => {
										window.location.href = "tel:15";
									},
									className: J("w-full flex items-center justify-center gap-3", "bg-white text-slate-700 font-medium py-3.5 px-6 rounded-xl", "border border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all"),
									children: [/* @__PURE__ */ g("svg", {
										className: "w-5 h-5 text-slate-500",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ g("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										})
									}), "Appeler le 15 (SAMU)"]
								}),
								/* @__PURE__ */ _("p", {
									className: "text-center text-slate-400 text-sm py-2",
									children: ["En cas d'urgence vitale : ", /* @__PURE__ */ g("a", {
										href: "tel:112",
										className: "text-slate-600 font-medium hover:underline",
										children: "112"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "flex-shrink-0 px-4 py-4 pb-safe-bottom bg-white border-t border-slate-200",
				children: /* @__PURE__ */ _("div", {
					className: "max-w-md mx-auto",
					children: [/* @__PURE__ */ g("p", {
						className: "text-slate-400 text-xs text-center mb-3",
						children: "Vos réponses ont été sauvegardées et seront accessibles à votre praticien."
					}), /* @__PURE__ */ g("button", {
						onClick: t,
						className: "w-full text-slate-500 text-sm py-2 hover:text-slate-700 transition-colors",
						children: "Retour à l'accueil"
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/exercises/eva-slider.tsx
var qi = [
	"#22c55e",
	"#4ade80",
	"#86efac",
	"#bef264",
	"#fde047",
	"#fbbf24",
	"#fb923c",
	"#f97316",
	"#ef4444",
	"#dc2626",
	"#b91c1c"
], Ji = [
	{
		Icon: Zn,
		color: "text-green-500"
	},
	{
		Icon: Zn,
		color: "text-green-400"
	},
	{
		Icon: Zn,
		color: "text-lime-500"
	},
	{
		Icon: In,
		color: "text-lime-400"
	},
	{
		Icon: In,
		color: "text-yellow-500"
	},
	{
		Icon: In,
		color: "text-amber-500"
	},
	{
		Icon: Dn,
		color: "text-orange-500"
	},
	{
		Icon: Dn,
		color: "text-orange-600"
	},
	{
		Icon: Yt,
		color: "text-red-500"
	},
	{
		Icon: Yt,
		color: "text-red-600"
	},
	{
		Icon: Xn,
		color: "text-red-700"
	}
], Yi = i(function({ value: e, onChange: t, label: n = "Niveau de douleur", showEmoji: r = !0, disabled: i = !1, referenceValue: a = null, constraint: o = null, className: s, ...c }, u) {
	let [d, f] = m(e);
	l(() => {
		f(e);
	}, [e]);
	let p = (e) => {
		if (!o || a === null) return e;
		switch (o) {
			case "below": return Math.min(e, Math.max(0, a - 1));
			case "above": return Math.max(e, Math.min(10, a + 1));
			case "equal": return a;
			default: return e;
		}
	}, h = (() => {
		if (!o || a === null) return {
			min: 0,
			max: 10
		};
		switch (o) {
			case "below": return {
				min: 0,
				max: Math.max(0, a - 1)
			};
			case "above": return {
				min: Math.min(10, a + 1),
				max: 10
			};
			case "equal": return {
				min: a,
				max: a
			};
			default: return {
				min: 0,
				max: 10
			};
		}
	})(), v = (e) => {
		let n = p(e);
		f(n), t(n);
	}, y = (e) => qi[Math.min(e, 10)], b = (e) => Ji[Math.min(e, 10)], x = (e) => e === 0 ? "Aucune douleur" : e <= 2 ? "Douleur legere" : e <= 4 ? "Douleur moderee" : e <= 6 ? "Douleur importante" : e <= 8 ? "Douleur intense" : "Douleur insupportable";
	return /* @__PURE__ */ _("div", {
		ref: u,
		className: J("w-full", i && "opacity-50 pointer-events-none", s),
		...c,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ g("span", {
					className: "text-sm font-medium text-gray-300",
					children: n
				}), /* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [r && (() => {
						let e = b(d);
						return /* @__PURE__ */ g(e.Icon, { className: J("w-7 h-7", e.color) });
					})(), /* @__PURE__ */ g("span", {
						className: "text-2xl font-bold tabular-nums",
						style: { color: y(d) },
						children: d
					})]
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ g("div", { className: "h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 opacity-30" }),
					/* @__PURE__ */ g("div", {
						className: "absolute top-0 h-3 rounded-full transition-all duration-150",
						style: {
							width: `${d / 10 * 100}%`,
							background: `linear-gradient(to right, #22c55e, ${y(d)})`
						}
					}),
					a != null && /* @__PURE__ */ _("div", {
						className: "absolute top-0 h-3 flex items-center justify-center pointer-events-none z-10",
						style: {
							left: `${a / 10 * 100}%`,
							transform: "translateX(-50%)"
						},
						children: [/* @__PURE__ */ g("div", { className: "w-0.5 h-5 bg-blue-500 rounded-full shadow-sm" }), /* @__PURE__ */ g("div", {
							className: "absolute -top-6 whitespace-nowrap",
							children: /* @__PURE__ */ _("span", {
								className: "text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded",
								children: ["Avant : ", a]
							})
						})]
					}),
					o && a !== null && o !== "equal" && /* @__PURE__ */ g("div", {
						className: "absolute top-0 h-3 bg-gray-400/30 rounded-full pointer-events-none",
						style: {
							left: o === "below" ? `${a / 10 * 100}%` : "0%",
							right: o === "above" ? `${100 - a / 10 * 100}%` : "0%",
							width: o === "below" ? `${100 - a / 10 * 100}%` : `${a / 10 * 100}%`
						}
					}),
					/* @__PURE__ */ g("input", {
						type: "range",
						min: h.min,
						max: h.max,
						step: "1",
						value: d,
						onChange: (e) => v(parseInt(e.target.value)),
						className: J("absolute top-0 w-full h-3 appearance-none bg-transparent cursor-pointer", "[&::-webkit-slider-thumb]:appearance-none", "[&::-webkit-slider-thumb]:w-6", "[&::-webkit-slider-thumb]:h-6", "[&::-webkit-slider-thumb]:rounded-full", "[&::-webkit-slider-thumb]:bg-white", "[&::-webkit-slider-thumb]:shadow-lg", "[&::-webkit-slider-thumb]:border-2", "[&::-webkit-slider-thumb]:border-gray-300", "[&::-webkit-slider-thumb]:cursor-pointer", "[&::-webkit-slider-thumb]:transition-transform", "[&::-webkit-slider-thumb]:hover:scale-110", "[&::-moz-range-thumb]:w-6", "[&::-moz-range-thumb]:h-6", "[&::-moz-range-thumb]:rounded-full", "[&::-moz-range-thumb]:bg-white", "[&::-moz-range-thumb]:shadow-lg", "[&::-moz-range-thumb]:border-2", "[&::-moz-range-thumb]:border-gray-300", "[&::-moz-range-thumb]:cursor-pointer"),
						disabled: i || o === "equal"
					})
				]
			}),
			/* @__PURE__ */ _("div", {
				className: "flex justify-between mt-2 text-xs text-gray-500",
				children: [
					/* @__PURE__ */ g("span", { children: "0" }),
					/* @__PURE__ */ g("span", { children: "5" }),
					/* @__PURE__ */ g("span", { children: "10" })
				]
			}),
			/* @__PURE__ */ g("p", {
				className: "text-center text-sm mt-2",
				style: { color: y(d) },
				children: x(d)
			})
		]
	});
}), Xi = {
	vert: {
		label: "Vert",
		iconColor: "text-green-500",
		fillColor: "fill-green-500",
		bgColor: "bg-green-500/20",
		textColor: "text-green-400",
		borderColor: "border-green-500",
		description: "Excellent ! Continuez comme ca"
	},
	orange: {
		label: "Orange",
		iconColor: "text-orange-500",
		fillColor: "fill-orange-500",
		bgColor: "bg-orange-500/20",
		textColor: "text-orange-400",
		borderColor: "border-orange-500",
		description: "Attention, surveillez votre douleur"
	},
	rouge: {
		label: "Rouge",
		iconColor: "text-red-500",
		fillColor: "fill-red-500",
		bgColor: "bg-red-500/20",
		textColor: "text-red-400",
		borderColor: "border-red-500",
		description: "Arret conseille, consultez si persistant"
	}
}, Zi = Y("inline-flex items-center gap-1.5 rounded-full border", {
	variants: {
		status: {
			vert: "bg-green-500/20 border-green-500",
			orange: "bg-orange-500/20 border-orange-500",
			rouge: "bg-red-500/20 border-red-500"
		},
		size: {
			sm: "px-2 py-1 text-xs",
			md: "px-3 py-1.5 text-sm",
			lg: "px-4 py-2 text-base"
		}
	},
	defaultVariants: {
		status: "vert",
		size: "md"
	}
}), Qi = {
	sm: "w-3 h-3",
	md: "w-4 h-4",
	lg: "w-5 h-5"
}, $i = o(i(function({ status: e, size: t = "md", showLabel: n = !0, animated: r = !1, className: i, ...a }, o) {
	let s = Xi[e];
	return /* @__PURE__ */ _("div", {
		ref: o,
		className: J(Zi({
			status: e,
			size: t
		}), r && e === "rouge" && "animate-pulse", i),
		...a,
		children: [/* @__PURE__ */ g(gn, { className: J(Qi[t || "md"], s.iconColor, s.fillColor) }), n && /* @__PURE__ */ g("span", {
			className: J("font-medium", s.textColor),
			children: s.label
		})]
	});
})), ea = o(i(function({ vert: e, orange: t, rouge: n, showPieChart: r = !0, size: i = "md", className: a, ...o }, s) {
	let c = e + t + n;
	if (c === 0) return /* @__PURE__ */ g("div", {
		ref: s,
		className: J("text-gray-500 text-sm", a),
		...o,
		children: "Aucune evaluation"
	});
	let l = Math.round(e / c * 100), u = Math.round(t / c * 100), d = Math.round(n / c * 100), f = e / c * 360, p = t / c * 360, m = i === "sm" ? 48 : i === "lg" ? 80 : 64, h = `conic-gradient(
        #22c55e 0deg ${f}deg,
        #f97316 ${f}deg ${f + p}deg,
        #ef4444 ${f + p}deg 360deg
      )`;
	return /* @__PURE__ */ _("div", {
		ref: s,
		className: J("flex items-center gap-4", a),
		...o,
		children: [r && /* @__PURE__ */ g("div", {
			className: "rounded-full flex-shrink-0",
			style: {
				width: m,
				height: m,
				background: h
			},
			children: /* @__PURE__ */ g("div", {
				className: "bg-white rounded-full flex items-center justify-center shadow-inner",
				style: {
					width: m - 16,
					height: m - 16,
					margin: 8
				},
				children: /* @__PURE__ */ g("span", {
					className: "text-gray-900 font-bold text-xs",
					children: c
				})
			})
		}), /* @__PURE__ */ _("div", {
			className: "flex flex-col gap-1",
			children: [
				/* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ g(gn, { className: "w-4 h-4 text-green-400 fill-green-400" }),
						/* @__PURE__ */ g("span", {
							className: "text-white font-medium",
							children: e
						}),
						/* @__PURE__ */ _("span", {
							className: "text-gray-500 text-sm",
							children: [
								"(",
								l,
								"%)"
							]
						})
					]
				}),
				/* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ g(gn, { className: "w-4 h-4 text-orange-400 fill-orange-400" }),
						/* @__PURE__ */ g("span", {
							className: "text-white font-medium",
							children: t
						}),
						/* @__PURE__ */ _("span", {
							className: "text-gray-500 text-sm",
							children: [
								"(",
								u,
								"%)"
							]
						})
					]
				}),
				/* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ g(gn, { className: "w-4 h-4 text-red-400 fill-red-400" }),
						/* @__PURE__ */ g("span", {
							className: "text-white font-medium",
							children: n
						}),
						/* @__PURE__ */ _("span", {
							className: "text-gray-500 text-sm",
							children: [
								"(",
								d,
								"%)"
							]
						})
					]
				})
			]
		})]
	});
})), ta = o(i(function({ vert: e, orange: t, rouge: n, height: r = 8, className: i, ...a }, o) {
	let s = e + t + n;
	if (s === 0) return /* @__PURE__ */ g("div", {
		ref: o,
		className: J("w-full bg-gray-700 rounded-full", i),
		style: { height: r },
		...a
	});
	let c = e / s * 100, l = t / s * 100, u = n / s * 100;
	return /* @__PURE__ */ _("div", {
		ref: o,
		className: J("w-full flex rounded-full overflow-hidden", i),
		style: { height: r },
		...a,
		children: [
			c > 0 && /* @__PURE__ */ g("div", {
				className: "bg-green-500 transition-all duration-500",
				style: { width: `${c}%` }
			}),
			l > 0 && /* @__PURE__ */ g("div", {
				className: "bg-orange-500 transition-all duration-500",
				style: { width: `${l}%` }
			}),
			u > 0 && /* @__PURE__ */ g("div", {
				className: "bg-red-500 transition-all duration-500",
				style: { width: `${u}%` }
			})
		]
	});
})), na = Y("flex flex-col gap-3", {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		theme: {
			light: "",
			dark: ""
		}
	},
	defaultVariants: {
		size: "md",
		theme: "dark"
	}
}), ra = [
	{
		number: 1,
		name: "Antalgique",
		description: "Soulagement de la douleur",
		color: "bg-primary-500",
		textColor: "text-primary-500",
		textColorDark: "text-primary-400",
		Icon: jn
	},
	{
		number: 2,
		name: "Stabilisation",
		description: "Renforcement progressif",
		color: "bg-cyan-500",
		textColor: "text-cyan-500",
		textColorDark: "text-cyan-400",
		Icon: bn
	},
	{
		number: 3,
		name: "Consolidation",
		description: "Optimisation des acquis",
		color: "bg-teal-500",
		textColor: "text-teal-600",
		textColorDark: "text-teal-400",
		Icon: Cn
	},
	{
		number: 4,
		name: "Prevention",
		description: "Maintien a long terme",
		color: "bg-emerald-500",
		textColor: "text-emerald-600",
		textColorDark: "text-emerald-400",
		Icon: Yn
	}
];
function ia(e) {
	return {
		"bg-primary-500": "#3b82f6",
		"bg-cyan-500": "#06b6d4",
		"bg-teal-500": "#14b8a6",
		"bg-emerald-500": "#10b981"
	}[e] || "#6b7280";
}
var aa = i(function({ currentPhase: e, size: t = "md", showLabel: n = !0, showDescription: r = !1, theme: i = "dark", className: a, ...o }, s) {
	let c = ra.find((t) => t.number === e) || ra[0], l = i === "light", u = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base"
	}, d = {
		sm: "w-3 h-3",
		md: "w-4 h-4",
		lg: "w-5 h-5"
	}, f = {
		sm: "w-6",
		md: "w-8",
		lg: "w-10"
	};
	return /* @__PURE__ */ _("div", {
		ref: s,
		className: J(na({
			size: t,
			theme: i
		}), a),
		...o,
		children: [
			/* @__PURE__ */ g("div", {
				className: "flex items-center",
				children: ra.map((n, r) => /* @__PURE__ */ _("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ _("div", {
						className: "relative",
						children: [/* @__PURE__ */ g("div", {
							className: J(d[t || "md"], "rounded-full transition-all duration-500 ease-out", n.number <= e ? n.color : l ? "bg-gray-300" : "bg-gray-600", n.number === e && "ring-2 ring-offset-2 ring-offset-white shadow-lg scale-110"),
							style: {
								"--tw-ring-color": n.number === e ? ia(n.color) : void 0,
								boxShadow: n.number === e ? `0 0 12px ${ia(n.color)}40` : void 0
							}
						}), n.number < e && /* @__PURE__ */ g("div", {
							className: "absolute inset-0 flex items-center justify-center",
							children: /* @__PURE__ */ g("svg", {
								className: "w-2.5 h-2.5 text-white",
								fill: "currentColor",
								viewBox: "0 0 20 20",
								children: /* @__PURE__ */ g("path", {
									fillRule: "evenodd",
									d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
									clipRule: "evenodd"
								})
							})
						})]
					}), r < ra.length - 1 && /* @__PURE__ */ g("div", { className: J(f[t || "md"], "h-1 mx-1 rounded-full transition-all duration-500", n.number < e ? n.color : l ? "bg-gray-200" : "bg-gray-700") })]
				}, n.number))
			}),
			n && /* @__PURE__ */ _("div", {
				className: J("flex items-center gap-2", u[t || "md"]),
				children: [/* @__PURE__ */ g(c.Icon, { className: J("w-5 h-5", l ? c.textColor : c.textColorDark) }), /* @__PURE__ */ _("span", {
					className: J("font-semibold", l ? c.textColor : c.textColorDark),
					children: [
						"Phase ",
						c.number,
						": ",
						c.name
					]
				})]
			}),
			r && /* @__PURE__ */ g("p", {
				className: J("text-sm", l ? "text-gray-600" : "text-gray-400"),
				children: c.description
			})
		]
	});
}), oa = i(function({ currentPhase: e, theme: t = "dark", className: n, ...r }, i) {
	let a = ra.find((t) => t.number === e) || ra[0], o = t === "light";
	return /* @__PURE__ */ _("div", {
		ref: i,
		className: J("p-4 rounded-xl border-2 transition-all", a.color.replace("bg-", "border-").replace("500", "500/50"), o ? a.color.replace("500", "50") : a.color.replace("500", "500/10"), n),
		...r,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ g("div", {
					className: J("w-12 h-12 rounded-full flex items-center justify-center shadow-lg", a.color),
					children: /* @__PURE__ */ g(a.Icon, { className: "w-6 h-6 text-white" })
				}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ _("h3", {
					className: J("font-bold", o ? a.textColor : a.textColorDark),
					children: ["Phase ", a.number]
				}), /* @__PURE__ */ g("p", {
					className: J("font-medium", o ? "text-gray-900" : "text-white"),
					children: a.name
				})] })]
			}),
			/* @__PURE__ */ g("p", {
				className: J("text-sm", o ? "text-gray-600" : "text-gray-400"),
				children: a.description
			}),
			e < 4 && /* @__PURE__ */ g("div", {
				className: J("mt-4 pt-4 border-t", o ? "border-gray-200" : "border-gray-700"),
				children: /* @__PURE__ */ _("div", {
					className: J("flex items-center justify-between text-xs", "text-gray-500"),
					children: [/* @__PURE__ */ _("span", { children: ["Progression vers Phase ", e + 1] }), /* @__PURE__ */ _("span", {
						className: o ? "text-gray-600" : "text-gray-400",
						children: [">=", "70% Vert sur 2 seances"]
					})]
				})
			})
		]
	});
}), sa = [
	{
		value: "facile",
		label: "Facile",
		Icon: Cn,
		description: "Je pourrais faire plus",
		color: "text-green-400",
		bgColor: "bg-green-500/20",
		borderColor: "border-green-500"
	},
	{
		value: "normal",
		label: "Normal",
		Icon: nr,
		description: "Effort adapte",
		color: "text-blue-400",
		bgColor: "bg-blue-500/20",
		borderColor: "border-blue-500"
	},
	{
		value: "difficile",
		label: "Difficile",
		Icon: Dn,
		description: "C'etait dur",
		color: "text-orange-400",
		bgColor: "bg-orange-500/20",
		borderColor: "border-orange-500"
	}
], ca = i(function({ value: e, onChange: t, disabled: n = !1, label: r = "Comment avez-vous trouve cet exercice ?", className: i, ...a }, o) {
	return /* @__PURE__ */ _("div", {
		ref: o,
		className: J("w-full", n && "opacity-50 pointer-events-none", i),
		...a,
		children: [/* @__PURE__ */ g("label", {
			className: "block text-sm font-medium text-gray-600 mb-3",
			children: r
		}), /* @__PURE__ */ g("div", {
			className: "grid grid-cols-3 gap-3",
			children: sa.map((r) => {
				let i = e === r.value;
				return /* @__PURE__ */ _("button", {
					onClick: () => t(r.value),
					disabled: n,
					className: J("relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200", i ? `${r.bgColor} ${r.borderColor} scale-105` : "bg-gray-50 border-gray-200 hover:border-gray-300"),
					children: [
						i && /* @__PURE__ */ g("div", {
							className: J("absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center", r.bgColor, r.borderColor),
							children: /* @__PURE__ */ g("svg", {
								className: J("w-4 h-4", r.color),
								fill: "currentColor",
								viewBox: "0 0 20 20",
								children: /* @__PURE__ */ g("path", {
									fillRule: "evenodd",
									d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
									clipRule: "evenodd"
								})
							})
						}),
						/* @__PURE__ */ g(r.Icon, { className: J("w-8 h-8 mb-2", i ? r.color : "text-gray-400") }),
						/* @__PURE__ */ g("span", {
							className: J("font-semibold", i ? r.color : "text-gray-900"),
							children: r.label
						}),
						/* @__PURE__ */ g("span", {
							className: "text-xs text-gray-500 mt-1 text-center",
							children: r.description
						})
					]
				}, r.value);
			})
		})]
	});
}), la = [
	{
		value: 1,
		label: "Repos",
		color: "#22c55e",
		description: "Aucun effort"
	},
	{
		value: 2,
		label: "Tres facile",
		color: "#4ade80",
		description: "Presque rien"
	},
	{
		value: 3,
		label: "Facile",
		color: "#86efac",
		description: "Leger effort"
	},
	{
		value: 4,
		label: "Leger",
		color: "#bef264",
		description: "Echauffement"
	},
	{
		value: 5,
		label: "Modere",
		color: "#fde047",
		description: "Travail leger"
	},
	{
		value: 6,
		label: "Modere+",
		color: "#fbbf24",
		description: "Travail modere"
	},
	{
		value: 7,
		label: "Difficile",
		color: "#fb923c",
		description: "Effort significatif"
	},
	{
		value: 8,
		label: "Tres difficile",
		color: "#f97316",
		description: "Effort important"
	},
	{
		value: 9,
		label: "Tres dur",
		color: "#ef4444",
		description: "Proche du max"
	},
	{
		value: 10,
		label: "Maximum",
		color: "#dc2626",
		description: "Epuisement total"
	}
], ua = i(function({ value: e, onChange: t, targetMin: n, targetMax: r, disabled: i = !1, className: a, ...o }, s) {
	let c = e ? la[e - 1] : null, l = n !== void 0 && r !== void 0;
	return /* @__PURE__ */ _("div", {
		ref: s,
		className: J("w-full", i && "opacity-50 pointer-events-none", a),
		...o,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ g("div", {
						className: "w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center",
						children: /* @__PURE__ */ g(On, { className: "w-5 h-5 text-orange-600" })
					}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
						className: "font-semibold text-gray-900",
						children: "Effort percu (RPE)"
					}), /* @__PURE__ */ g("p", {
						className: "text-xs text-gray-500",
						children: "A quel point c'etait dur ?"
					})] })]
				}), e && /* @__PURE__ */ g("span", {
					className: "text-3xl font-bold tabular-nums",
					style: { color: c?.color },
					children: e
				})]
			}),
			l && /* @__PURE__ */ g("div", {
				className: "mb-3 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg",
				children: /* @__PURE__ */ _("p", {
					className: "text-xs text-primary-700",
					children: ["Zone cible : ", /* @__PURE__ */ _("span", {
						className: "font-semibold",
						children: [
							n,
							" - ",
							r
						]
					})]
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-5 gap-2",
				children: la.map((i) => {
					let a = e === i.value, o = l && i.value >= (n || 0) && i.value <= (r || 10);
					return /* @__PURE__ */ _("button", {
						onClick: () => t(i.value),
						className: J("relative flex flex-col items-center justify-center p-2 rounded-lg transition-all", a ? "ring-2 ring-offset-2 shadow-md" : "hover:bg-gray-50", o && !a ? "bg-primary-50/50" : "bg-white border border-gray-200"),
						style: {
							borderColor: a ? i.color : void 0,
							"--tw-ring-color": a ? i.color : void 0
						},
						children: [
							/* @__PURE__ */ g("span", {
								className: "text-xl font-bold",
								style: { color: i.color },
								children: i.value
							}),
							/* @__PURE__ */ g("span", {
								className: "text-[10px] text-gray-500 text-center leading-tight mt-0.5",
								children: i.label
							}),
							o && /* @__PURE__ */ g("div", {
								className: "absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary-500",
								title: "Zone cible"
							})
						]
					}, i.value);
				})
			}),
			c && /* @__PURE__ */ _("div", {
				className: "mt-3 text-center",
				children: [/* @__PURE__ */ g("p", {
					className: "text-sm",
					style: { color: c.color },
					children: c.description
				}), l && /* @__PURE__ */ g("p", {
					className: "text-xs text-gray-500 mt-1",
					children: e && e >= (n || 0) && e <= (r || 10) ? /* @__PURE__ */ g("span", {
						className: "text-green-600",
						children: "Dans la zone cible"
					}) : e && e < (n || 0) ? /* @__PURE__ */ g("span", {
						className: "text-amber-600",
						children: "En dessous de la cible"
					}) : /* @__PURE__ */ g("span", {
						className: "text-red-600",
						children: "Au-dessus de la cible"
					})
				})]
			})
		]
	});
}), da = [
	{
		value: 0,
		label: "Echec",
		description: "Impossible d'en faire plus",
		color: "#dc2626",
		bgColor: "#fef2f2",
		Icon: nn
	},
	{
		value: 1,
		label: "1 de plus",
		description: "Juste une de plus possible",
		color: "#f97316",
		bgColor: "#fff7ed",
		Icon: en
	},
	{
		value: 2,
		label: "2 de plus",
		description: "Zone ideale HSR",
		color: "#eab308",
		bgColor: "#fefce8",
		Icon: tn
	},
	{
		value: 3,
		label: "3 de plus",
		description: "Effort significatif",
		color: "#84cc16",
		bgColor: "#f7fee7",
		Icon: tn
	},
	{
		value: 4,
		label: "4 de plus",
		description: "Effort modere",
		color: "#22c55e",
		bgColor: "#f0fdf4",
		Icon: $t
	},
	{
		value: 5,
		label: "5+ de plus",
		description: "Peut progresser",
		color: "#10b981",
		bgColor: "#ecfdf5",
		Icon: $t
	}
], fa = i(function({ value: e, onChange: t, targetMin: n, targetMax: r, disabled: i = !1, className: a, ...o }, s) {
	let c = e === null ? null : da.find((t) => t.value === e), l = n !== void 0 && r !== void 0;
	return /* @__PURE__ */ _("div", {
		ref: s,
		className: J("w-full", i && "opacity-50 pointer-events-none", a),
		...o,
		children: [
			/* @__PURE__ */ g("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ g("div", {
						className: "w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center",
						children: /* @__PURE__ */ g(rn, { className: "w-5 h-5 text-emerald-600" })
					}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
						className: "font-semibold text-gray-900",
						children: "Repetitions en reserve"
					}), /* @__PURE__ */ g("p", {
						className: "text-xs text-gray-500",
						children: "Combien de plus auriez-vous pu faire ?"
					})] })]
				})
			}),
			l && /* @__PURE__ */ g("div", {
				className: "mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg",
				children: /* @__PURE__ */ _("p", {
					className: "text-xs text-emerald-700",
					children: ["Zone cible : ", /* @__PURE__ */ _("span", {
						className: "font-semibold",
						children: [
							n,
							" - ",
							r,
							" RIR"
						]
					})]
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-2 gap-2",
				children: da.map((i) => {
					let a = e === i.value, o = l && i.value >= (n || 0) && i.value <= (r || 5), s = i.Icon;
					return /* @__PURE__ */ _("button", {
						onClick: () => t(i.value),
						className: J("relative flex items-center gap-3 p-3 rounded-xl transition-all text-left", a ? "ring-2 ring-offset-1 shadow-md" : o ? "bg-emerald-50/50 border border-emerald-200" : "bg-white border border-gray-200 hover:border-gray-300"),
						style: {
							backgroundColor: a ? i.bgColor : void 0,
							borderColor: a ? i.color : void 0,
							"--tw-ring-color": a ? i.color : void 0
						},
						children: [
							/* @__PURE__ */ g("div", {
								className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
								style: { backgroundColor: a ? `${i.color}20` : "#f3f4f6" },
								children: /* @__PURE__ */ g(s, {
									className: "w-5 h-5",
									style: { color: a ? i.color : "#6b7280" }
								})
							}),
							/* @__PURE__ */ _("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ _("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ g("span", {
										className: "font-bold text-lg",
										style: { color: i.color },
										children: i.value === 5 ? "5+" : i.value
									}), /* @__PURE__ */ g("span", {
										className: J("text-sm font-medium", a ? "text-gray-900" : "text-gray-600"),
										children: i.label
									})]
								}), a && /* @__PURE__ */ g("p", {
									className: "text-xs text-gray-500 mt-0.5",
									children: i.description
								})]
							}),
							o && !a && /* @__PURE__ */ g("div", {
								className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500",
								title: "Zone cible"
							})
						]
					}, i.value);
				})
			}),
			c && l && /* @__PURE__ */ g("div", {
				className: "mt-3 text-center",
				children: /* @__PURE__ */ g("p", {
					className: "text-xs text-gray-500",
					children: e !== null && e >= (n || 0) && e <= (r || 5) ? /* @__PURE__ */ g("span", {
						className: "text-emerald-600 font-medium",
						children: "Parfait ! Vous etes dans la zone cible"
					}) : e !== null && e < (n || 0) ? /* @__PURE__ */ g("span", {
						className: "text-amber-600 font-medium",
						children: "Effort eleve - Pensez a reduire la charge"
					}) : /* @__PURE__ */ g("span", {
						className: "text-primary-600 font-medium",
						children: "Vous pouvez progresser la prochaine fois"
					})
				})
			}),
			c && e !== null && e >= 1 && e <= 2 && /* @__PURE__ */ g("div", {
				className: "mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg",
				children: /* @__PURE__ */ _("p", {
					className: "text-xs text-amber-800 text-center",
					children: [/* @__PURE__ */ g("span", {
						className: "font-semibold",
						children: "Zone optimale HSR !"
					}), " Le tendon recoit une charge mecanique maximale."]
				})
			})
		]
	});
}), pa = [
	{
		value: "diminuee",
		label: "Diminuee",
		Icon: ir,
		description: "Ma douleur a diminue",
		color: "text-green-400",
		bgColor: "bg-green-500/20",
		borderColor: "border-green-500"
	},
	{
		value: "aucune",
		label: "Stable",
		Icon: Qt,
		description: "Pas de changement",
		color: "text-blue-400",
		bgColor: "bg-blue-500/20",
		borderColor: "border-blue-500"
	},
	{
		value: "augmentee",
		label: "Augmentee",
		Icon: ar,
		description: "Ma douleur a augmente",
		color: "text-red-400",
		bgColor: "bg-red-500/20",
		borderColor: "border-red-500"
	}
], ma = i(function({ value: e, onChange: t, disabled: n = !1, label: r = "Comment a evolue votre douleur pendant l'exercice ?", className: i, ...a }, o) {
	return /* @__PURE__ */ _("div", {
		ref: o,
		className: J("w-full", n && "opacity-50 pointer-events-none", i),
		...a,
		children: [/* @__PURE__ */ g("label", {
			className: "block text-sm font-medium text-gray-600 mb-3",
			children: r
		}), /* @__PURE__ */ g("div", {
			className: "grid grid-cols-3 gap-3",
			children: pa.map((r) => {
				let i = e === r.value;
				return /* @__PURE__ */ _("button", {
					onClick: () => t(r.value),
					disabled: n,
					className: J("relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200", i ? `${r.bgColor} ${r.borderColor} scale-105` : "bg-gray-50 border-gray-200 hover:border-gray-300"),
					children: [
						i && /* @__PURE__ */ g("div", {
							className: J("absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center", r.bgColor, r.borderColor),
							children: /* @__PURE__ */ g("svg", {
								className: J("w-4 h-4", r.color),
								fill: "currentColor",
								viewBox: "0 0 20 20",
								children: /* @__PURE__ */ g("path", {
									fillRule: "evenodd",
									d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
									clipRule: "evenodd"
								})
							})
						}),
						/* @__PURE__ */ g(r.Icon, { className: J("w-8 h-8 mb-2", i ? r.color : "text-gray-400") }),
						/* @__PURE__ */ g("span", {
							className: J("font-semibold", i ? r.color : "text-gray-900"),
							children: r.label
						}),
						/* @__PURE__ */ g("span", {
							className: "text-xs text-gray-500 mt-1 text-center",
							children: r.description
						})
					]
				}, r.value);
			})
		})]
	});
}), ha = i(function({ message: e, className: t, ...n }, r) {
	let i = e.startsWith("↑"), a = e.toLowerCase().includes("reprise") || e.toLowerCase().includes("consolidation"), o = e.startsWith("↓"), s = i ? {
		container: "bg-emerald-900/60 border-emerald-500/50",
		text: "text-emerald-300",
		Icon: ar
	} : a ? {
		container: "bg-amber-900/60 border-amber-500/50",
		text: "text-amber-300",
		Icon: Un
	} : o ? {
		container: "bg-orange-900/60 border-orange-500/50",
		text: "text-orange-300",
		Icon: ir
	} : {
		container: "bg-cyan-900/60 border-cyan-500/50",
		text: "text-cyan-300",
		Icon: Cn
	};
	return /* @__PURE__ */ _("div", {
		ref: r,
		className: J("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border", s.container, t),
		...n,
		children: [/* @__PURE__ */ g(s.Icon, { className: J("w-4 h-4", s.text) }), /* @__PURE__ */ g("span", {
			className: J("text-xs font-medium", s.text),
			children: e
		})]
	});
}), ga = {
	light: {
		icon: "🌱",
		title: "Reprise en douceur",
		description: "Votre seance est legerement adaptee pour une reprise confortable.",
		color: "bg-amber-50 border-amber-200",
		textColor: "text-amber-800",
		subTextColor: "text-amber-600"
	},
	moderate: {
		icon: "🌿",
		title: "Reprise progressive",
		description: "Apres quelques jours de pause, nous adaptons les exercices pour reprendre sereinement.",
		color: "bg-orange-50 border-orange-200",
		textColor: "text-orange-800",
		subTextColor: "text-orange-600"
	},
	heavy: {
		icon: "🌳",
		title: "Reprise prudente",
		description: "Une pause prolongee demande une reprise tres progressive. C'est normal !",
		color: "bg-orange-50 border-orange-300",
		textColor: "text-orange-800",
		subTextColor: "text-orange-600"
	},
	restart: {
		icon: "🌻",
		title: "Nouveau depart",
		description: "Pas d'inquietude ! Nous repartons ensemble avec une seance tres legere.",
		color: "bg-red-50 border-red-200",
		textColor: "text-red-800",
		subTextColor: "text-red-600"
	}
}, _a = i(function({ consolidationInfo: e, compact: t = !1, className: n, ...r }, i) {
	if (!e?.isActive) return null;
	let a = ga[e.level] || ga.light, o = e.daysSinceLastSession, s = e.reductionPercent;
	return t ? /* @__PURE__ */ _("div", {
		ref: i,
		className: J("flex items-center gap-2 p-3 rounded-lg border", a.color, n),
		...r,
		children: [/* @__PURE__ */ g("span", {
			className: "text-xl",
			children: a.icon
		}), /* @__PURE__ */ _("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ g("span", {
				className: J("text-sm font-medium", a.textColor),
				children: a.title
			}), /* @__PURE__ */ _("span", {
				className: J("text-xs ml-2", a.subTextColor),
				children: [
					"(",
					o,
					"j de pause - -",
					s,
					"%)"
				]
			})]
		})]
	}) : /* @__PURE__ */ g("div", {
		ref: i,
		className: J("p-4 rounded-xl border", a.color, n),
		...r,
		children: /* @__PURE__ */ _("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ g("div", {
				className: "text-2xl",
				children: a.icon
			}), /* @__PURE__ */ _("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ g("h3", {
						className: J("font-semibold", a.textColor),
						children: a.title
					}),
					/* @__PURE__ */ g("p", {
						className: J("text-sm mt-1", a.subTextColor),
						children: a.description
					}),
					/* @__PURE__ */ _("div", {
						className: J("flex items-center gap-3 mt-2 text-xs", a.subTextColor),
						children: [/* @__PURE__ */ _("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ g("svg", {
									className: "w-3.5 h-3.5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ g("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									})
								}),
								o,
								" jour",
								o > 1 ? "s" : "",
								" depuis la derniere seance"
							]
						}), /* @__PURE__ */ _("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ g("svg", {
									className: "w-3.5 h-3.5",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ g("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 2,
										d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
									})
								}),
								"Volume reduit de ",
								s,
								"%"
							]
						})]
					})
				]
			})]
		})
	});
}), va = i(function({ cooldowns: e, getExerciseTitle: t, compact: n = !1, className: r, ...i }, a) {
	if (!e || e.length === 0) return null;
	if (n) return /* @__PURE__ */ _("div", {
		ref: a,
		className: J("flex items-center gap-2 p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg", r),
		...i,
		children: [/* @__PURE__ */ g(Yn, { className: "w-4 h-4 text-orange-400" }), /* @__PURE__ */ _("span", {
			className: "text-xs text-orange-300",
			children: [
				e.length,
				" exercice",
				e.length > 1 ? "s" : "",
				" mis en pause"
			]
		})]
	});
	let o = e.reduce((e, t) => {
		let n = t.cooldownDays;
		return e[n] || (e[n] = []), e[n].push(t), e;
	}, {}), s = (e) => e === 1 ? "1 jour" : e === 7 ? "1 semaine" : e === 14 ? "2 semaines" : `${e} jours`, c = (e) => e >= 14 ? {
		bg: "bg-red-500/10",
		border: "border-red-500/30",
		text: "text-red-400",
		iconColor: "text-red-500",
		fillColor: "fill-red-500"
	} : e >= 7 ? {
		bg: "bg-orange-500/10",
		border: "border-orange-500/30",
		text: "text-orange-400",
		iconColor: "text-orange-500",
		fillColor: "fill-orange-500"
	} : {
		bg: "bg-yellow-500/10",
		border: "border-yellow-500/30",
		text: "text-yellow-400",
		iconColor: "text-yellow-500",
		fillColor: "fill-yellow-500"
	};
	return /* @__PURE__ */ _("div", {
		ref: a,
		className: J("space-y-3", r),
		...i,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ g(Yn, { className: "w-5 h-5 text-orange-400" }), /* @__PURE__ */ g("h3", {
					className: "text-sm font-semibold text-gray-200",
					children: "Protection automatique activee"
				})]
			}),
			/* @__PURE__ */ g("p", {
				className: "text-xs text-gray-400",
				children: "Certains exercices ont ete signales comme douloureux ou difficiles. Ils seront temporairement retires de vos futures seances."
			}),
			/* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: Object.entries(o).sort(([e], [t]) => Number(t) - Number(e)).map(([e, n]) => {
					let r = Number(e), i = c(r);
					return /* @__PURE__ */ _("div", {
						className: J("p-3 rounded-xl border", i.bg, i.border),
						children: [/* @__PURE__ */ _("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ g(gn, { className: J("w-4 h-4", i.iconColor, i.fillColor) }), /* @__PURE__ */ _("span", {
								className: J("text-sm font-medium", i.text),
								children: ["Pause de ", s(r)]
							})]
						}), /* @__PURE__ */ g("div", {
							className: "space-y-1.5",
							children: n.map((e, n) => {
								let r = t?.(e.exerciseId) || "Exercice";
								return /* @__PURE__ */ _("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ g("span", {
										className: "text-gray-500 text-xs mt-0.5",
										children: "-"
									}), /* @__PURE__ */ _("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ g("span", {
											className: "text-sm text-gray-200",
											children: r
										}), e.reason && /* @__PURE__ */ g("span", {
											className: "text-xs text-gray-500 block",
											children: e.reason
										})]
									})]
								}, `${e.exerciseId}-${n}`);
							})
						})]
					}, e);
				})
			}),
			/* @__PURE__ */ _("div", {
				className: "flex items-start gap-2 p-2 bg-gray-800/50 rounded-lg",
				children: [/* @__PURE__ */ g(Pn, { className: "w-4 h-4 text-blue-400 shrink-0 mt-0.5" }), /* @__PURE__ */ g("p", {
					className: "text-xs text-gray-400",
					children: "Ces exercices reapparaitront automatiquement une fois la periode de repos terminee. Cette protection preserve votre progression et evite les surcharges."
				})]
			})
		]
	});
}), ya = Y("", {
	variants: { compact: {
		true: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-900/80 text-indigo-300 text-xs font-medium",
		false: "bg-indigo-900/50 border border-indigo-500/50 rounded-lg p-3"
	} },
	defaultVariants: { compact: !1 }
}), ba = i(function({ compact: e = !1, className: t, ...n }, r) {
	return e ? /* @__PURE__ */ _("span", {
		ref: r,
		className: J(ya({ compact: !0 }), t),
		...n,
		children: [/* @__PURE__ */ g("span", { children: "🧘" }), "Retour au calme"]
	}) : /* @__PURE__ */ g("div", {
		ref: r,
		className: J(ya({ compact: !1 }), t),
		...n,
		children: /* @__PURE__ */ _("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ g("span", {
				className: "text-xl",
				children: "🧘"
			}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("span", {
				className: "text-indigo-300 font-medium text-sm",
				children: "Retour au calme"
			}), /* @__PURE__ */ g("p", {
				className: "text-indigo-400/80 text-xs mt-0.5",
				children: "Terminez votre seance en douceur pour une meilleure recuperation"
			})] })]
		})
	});
});
//#endregion
//#region src/components/exercises/fallback-indicator.tsx
function xa(e) {
	if (e.finalCount <= 1 && e.initialCount > 10) return e.afterAccessoryFilter !== void 0 && e.afterAccessoryFilter <= 2 ? "niveau2" : e.afterPhaseFilter !== void 0 && e.afterPhaseFilter <= 2 ? "niveau3" : "niveau4";
	let t = e.finalCount / e.initialCount;
	return t < .1 ? "niveau2" : t < .25 ? "niveau1" : "optimal";
}
var Sa = {
	optimal: {
		label: "Seance optimale",
		description: "Tous les exercices correspondent a vos criteres",
		Icon: $n,
		color: "text-green-400",
		bgColor: "bg-green-500/10",
		borderColor: "border-green-500/30",
		progressColor: "bg-green-500",
		percentage: 100
	},
	niveau1: {
		label: "Seance adaptee",
		description: "Quelques ajustements mineurs pour correspondre a vos accessoires",
		Icon: nr,
		color: "text-blue-400",
		bgColor: "bg-blue-500/10",
		borderColor: "border-blue-500/30",
		progressColor: "bg-blue-500",
		percentage: 80
	},
	niveau2: {
		label: "Seance ajustee",
		description: "Des exercices alternatifs ont ete selectionnes",
		Icon: Un,
		color: "text-amber-400",
		bgColor: "bg-amber-500/10",
		borderColor: "border-amber-500/30",
		progressColor: "bg-amber-500",
		percentage: 60
	},
	niveau3: {
		label: "Seance de secours",
		description: "Pool limite - positions alternatives utilisees",
		Icon: fr,
		color: "text-orange-400",
		bgColor: "bg-orange-500/10",
		borderColor: "border-orange-500/30",
		progressColor: "bg-orange-500",
		percentage: 40
	},
	niveau4: {
		label: "Seance minimale",
		description: "Exercices generiques selectionnes pour garantir votre seance",
		Icon: Yn,
		color: "text-red-400",
		bgColor: "bg-red-500/10",
		borderColor: "border-red-500/30",
		progressColor: "bg-red-500",
		percentage: 20
	}
}, Ca = i(function({ filteringReport: e, compact: t = !1, showDetails: n = !1, className: r, ...i }, a) {
	let o = e ? xa(e) : "optimal", s = Sa[o];
	return t ? /* @__PURE__ */ _("div", {
		ref: a,
		className: J("inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border", s.bgColor, s.color, s.borderColor, r),
		...i,
		children: [/* @__PURE__ */ g(s.Icon, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ g("span", {
			className: "font-medium",
			children: s.label
		})]
	}) : /* @__PURE__ */ _("div", {
		ref: a,
		className: J("p-4 rounded-xl border", s.bgColor, s.borderColor, r),
		...i,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-2",
				children: [/* @__PURE__ */ _("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ g(s.Icon, { className: J("w-5 h-5", s.color) }), /* @__PURE__ */ g("span", {
						className: J("font-semibold", s.color),
						children: s.label
					})]
				}), /* @__PURE__ */ _("span", {
					className: J("text-sm font-medium", s.color),
					children: [s.percentage, "%"]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "h-2 bg-gray-700 rounded-full overflow-hidden mb-2",
				children: /* @__PURE__ */ g("div", {
					className: J("h-full transition-all duration-500 ease-out", s.progressColor),
					style: { width: `${s.percentage}%` }
				})
			}),
			/* @__PURE__ */ g("p", {
				className: "text-xs text-gray-400",
				children: s.description
			}),
			n && e && /* @__PURE__ */ _("div", {
				className: "mt-3 pt-3 border-t border-gray-700/50 space-y-2",
				children: [
					/* @__PURE__ */ g("h4", {
						className: "text-xs font-semibold text-gray-400 uppercase tracking-wider",
						children: "Details du filtrage"
					}),
					/* @__PURE__ */ _("div", {
						className: "grid grid-cols-2 gap-2 text-xs",
						children: [
							/* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Exercices initiaux:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.initialCount
								})]
							}),
							e.afterRegionFilter !== void 0 && /* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Apres region:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.afterRegionFilter
								})]
							}),
							e.afterPhaseFilter !== void 0 && /* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Apres phase:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.afterPhaseFilter
								})]
							}),
							e.afterBdkFilter !== void 0 && /* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Apres BDK:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.afterBdkFilter
								})]
							}),
							e.afterAccessoryFilter !== void 0 && /* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Apres accessoires:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.afterAccessoryFilter
								})]
							}),
							e.afterCooldownFilter !== void 0 && /* @__PURE__ */ _("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-500",
									children: "Apres cooldowns:"
								}), /* @__PURE__ */ g("span", {
									className: "text-gray-300",
									children: e.afterCooldownFilter
								})]
							}),
							/* @__PURE__ */ _("div", {
								className: "flex justify-between col-span-2 pt-1 border-t border-gray-700/30",
								children: [/* @__PURE__ */ g("span", {
									className: "text-gray-400 font-medium",
									children: "Selectionnes:"
								}), /* @__PURE__ */ g("span", {
									className: J("font-medium", s.color),
									children: e.finalCount
								})]
							})
						]
					}),
					e.patientProfile && /* @__PURE__ */ g("div", {
						className: "mt-2 pt-2 border-t border-gray-700/30",
						children: /* @__PURE__ */ _("span", {
							className: "text-xs text-gray-500",
							children: [
								"Profil: ",
								e.patientProfile.ageCategory,
								",",
								" ",
								e.patientProfile.sportLevel || "N/A"
							]
						})
					})
				]
			}),
			o !== "optimal" && /* @__PURE__ */ _("div", {
				className: "mt-3 flex items-start gap-2 p-2 bg-gray-800/50 rounded-lg",
				children: [/* @__PURE__ */ g("span", {
					className: "text-blue-400 text-sm mt-0.5",
					children: "💡"
				}), /* @__PURE__ */ _("p", {
					className: "text-xs text-gray-400",
					children: [
						o === "niveau1" && "Votre seance est bien adaptee a vos besoins.",
						o === "niveau2" && "Ajoutez plus d'accessoires pour debloquer plus d'exercices.",
						o === "niveau3" && "Essayez d'elargir les positions possibles pour plus de variete.",
						o === "niveau4" && "Parlez a votre praticien des limitations rencontrees."
					]
				})]
			})
		]
	});
});
//#endregion
//#region src/components/exercises/session-messages.tsx
function wa(e) {
	let t = e.toLowerCase();
	return t.includes("progression") || t.includes("bravo") || t.includes("felicit") ? {
		Icon: tr,
		color: "text-green-400",
		bgColor: "bg-green-500/10"
	} : t.includes("duree") || t.includes("minute") || t.includes("temps") ? {
		Icon: vn,
		color: "text-blue-400",
		bgColor: "bg-blue-500/10"
	} : t.includes("difficile") || t.includes("facile") || t.includes("intensite") ? {
		Icon: dn,
		color: "text-purple-400",
		bgColor: "bg-purple-500/10"
	} : t.includes("limite") || t.includes("remplace") || t.includes("alternatif") ? {
		Icon: Un,
		color: "text-amber-400",
		bgColor: "bg-amber-500/10"
	} : t.includes("conseil") || t.includes("attention") || t.includes("important") ? {
		Icon: Fn,
		color: "text-yellow-400",
		bgColor: "bg-yellow-500/10"
	} : t.includes("educati") || t.includes("apprendre") || t.includes("savoir") ? {
		Icon: cn,
		color: "text-cyan-400",
		bgColor: "bg-cyan-500/10"
	} : {
		Icon: Pn,
		color: "text-gray-400",
		bgColor: "bg-gray-500/10"
	};
}
function Ta(e) {
	let t = e.toLowerCase();
	return t.includes("danger") || t.includes("stopper") || t.includes("urgence") || t.includes("douleur aigue") ? {
		Icon: mn,
		color: "text-red-400",
		bgColor: "bg-red-500/10",
		borderColor: "border-red-500/30"
	} : t.includes("attention") || t.includes("vigilance") || t.includes("surveiller") || t.includes("prudence") ? {
		Icon: or,
		color: "text-orange-400",
		bgColor: "bg-orange-500/10",
		borderColor: "border-orange-500/30"
	} : t.includes("conseil") || t.includes("recommand") || t.includes("sugger") ? {
		Icon: Fn,
		color: "text-yellow-400",
		bgColor: "bg-yellow-500/10",
		borderColor: "border-yellow-500/30"
	} : {
		Icon: or,
		color: "text-orange-400",
		bgColor: "bg-orange-500/10",
		borderColor: "border-orange-500/30"
	};
}
var Ea = i(function({ messages: e, alerts: t, alertsOnly: n = !1, compact: r = !1, onDismissAlert: i, className: a, ...o }, s) {
	let c = e && e.length > 0, l = t && t.length > 0;
	return !c && !l ? null : r ? /* @__PURE__ */ _("div", {
		ref: s,
		className: J("space-y-2", a),
		...o,
		children: [l && /* @__PURE__ */ _("div", {
			className: "flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg",
			children: [/* @__PURE__ */ g(or, { className: "w-4 h-4 text-orange-500 shrink-0 mt-0.5" }), /* @__PURE__ */ _("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ g("span", {
					className: "text-sm text-orange-700",
					children: t[0]
				}), t.length > 1 && /* @__PURE__ */ _("span", {
					className: "text-xs text-orange-500 block mt-1",
					children: [
						"+",
						t.length - 1,
						" autre",
						t.length > 2 ? "s" : "",
						" alerte",
						t.length > 2 ? "s" : ""
					]
				})]
			})]
		}), !n && c && /* @__PURE__ */ _("div", {
			className: "flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg",
			children: [/* @__PURE__ */ g(Pn, { className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5" }), /* @__PURE__ */ _("span", {
				className: "text-sm text-blue-700",
				children: [e[0], e.length > 1 && /* @__PURE__ */ _("span", {
					className: "text-xs text-blue-500 block mt-1",
					children: [
						"+",
						e.length - 1,
						" autre",
						e.length > 2 ? "s" : "",
						" info",
						e.length > 2 ? "s" : ""
					]
				})]
			})]
		})]
	}) : /* @__PURE__ */ _("div", {
		ref: s,
		className: J("space-y-4", a),
		...o,
		children: [l && /* @__PURE__ */ _("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ _("h4", {
				className: "text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2",
				children: [/* @__PURE__ */ g(or, { className: "w-4 h-4" }), /* @__PURE__ */ g("span", { children: "Alertes" })]
			}), /* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: t.map((e, t) => {
					let n = Ta(e);
					return /* @__PURE__ */ _("div", {
						className: J("relative flex items-start gap-3 p-3 rounded-xl border", n.bgColor, n.borderColor),
						children: [
							/* @__PURE__ */ g(n.Icon, { className: J("w-5 h-5 shrink-0", n.color) }),
							/* @__PURE__ */ g("p", {
								className: J("text-sm flex-1", n.color),
								children: e
							}),
							i && /* @__PURE__ */ g("button", {
								onClick: () => i(t),
								className: "text-gray-500 hover:text-gray-300 transition-colors p-1",
								"aria-label": "Fermer l'alerte",
								children: /* @__PURE__ */ g("svg", {
									className: "w-4 h-4",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
										clipRule: "evenodd"
									})
								})
							})
						]
					}, t);
				})
			})]
		}), !n && c && /* @__PURE__ */ _("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ _("h4", {
				className: "text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2",
				children: [/* @__PURE__ */ g(Pn, { className: "w-4 h-4" }), /* @__PURE__ */ g("span", { children: "Informations" })]
			}), /* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: e.map((e, t) => {
					let n = wa(e);
					return /* @__PURE__ */ _("div", {
						className: J("flex items-start gap-3 p-3 rounded-xl", n.bgColor),
						children: [/* @__PURE__ */ g(n.Icon, { className: J("w-5 h-5 shrink-0", n.color) }), /* @__PURE__ */ g("p", {
							className: J("text-sm", n.color),
							children: e
						})]
					}, t);
				})
			})]
		})]
	});
}), Da = [
	.5,
	.75,
	1,
	1.25,
	1.5,
	2
], Oa = i(function({ src: e, autoPlay: t = !1, loop: n = !1, showNativeControls: r = !1, onEnded: i, onPlay: a, onPause: o, isPlaying: c, poster: u, className: d, ...f }, h) {
	let v = p(null), y = p(null), b = p(null), [x, S] = m(t), [C, w] = m(0), [T, E] = m(0), [D, O] = m(1), [k, A] = m(!0), [j, M] = m(!1), [N, P] = m(!1), F = p(null), I = (e) => `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`, L = s(() => {
		let e = v.current;
		e && (e.paused ? (e.play(), S(!0), a?.()) : (e.pause(), S(!1), o?.()));
	}, [a, o]), ee = s(() => {
		let e = v.current;
		e && (e.currentTime = 0, e.play(), S(!0), a?.());
	}, [a]), te = s((e) => {
		let t = v.current;
		t && (t.playbackRate = e, O(e), M(!1));
	}, []), ne = s((e) => {
		let t = v.current, n = b.current;
		if (!t || !n) return;
		let r = n.getBoundingClientRect(), i = (e.clientX - r.left) / r.width * T;
		t.currentTime = i, w(i);
	}, [T]), R = s(() => {
		let e = y.current;
		e && (document.fullscreenElement ? document.exitFullscreen().then(() => {
			P(!1);
		}).catch(() => {}) : e.requestFullscreen().then(() => {
			P(!0);
		}).catch(() => {}));
	}, []), z = s(() => {
		A(!0), F.current && clearTimeout(F.current), x && (F.current = setTimeout(() => {
			A(!1), M(!1);
		}, 3e3));
	}, [x]);
	l(() => {
		let e = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			let t = v.current;
			if (t) switch (e.key) {
				case " ":
					e.preventDefault(), L();
					break;
				case "ArrowLeft":
					e.preventDefault(), t.currentTime = Math.max(0, t.currentTime - 5);
					break;
				case "ArrowRight":
					e.preventDefault(), t.currentTime = Math.min(T, t.currentTime + 5);
					break;
				case "f":
				case "F":
					e.preventDefault(), R();
					break;
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		L,
		R,
		T
	]), l(() => {
		let e = v.current;
		!e || c === void 0 || (c && e.paused ? (e.play(), S(!0)) : !c && !e.paused && (e.pause(), S(!1)));
	}, [c]), l(() => {
		let e = v.current;
		if (!e) return;
		let t = () => w(e.currentTime), n = () => E(e.duration), r = () => {
			S(!1), i?.();
		}, s = () => {
			S(!0), a?.();
		}, c = () => {
			S(!1), o?.();
		};
		return e.addEventListener("timeupdate", t), e.addEventListener("loadedmetadata", n), e.addEventListener("ended", r), e.addEventListener("play", s), e.addEventListener("pause", c), () => {
			e.removeEventListener("timeupdate", t), e.removeEventListener("loadedmetadata", n), e.removeEventListener("ended", r), e.removeEventListener("play", s), e.removeEventListener("pause", c);
		};
	}, [
		i,
		a,
		o
	]), l(() => {
		let e = () => {
			P(!!document.fullscreenElement);
		};
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []), l(() => () => {
		F.current && clearTimeout(F.current);
	}, []);
	let re = T > 0 ? C / T * 100 : 0;
	return /* @__PURE__ */ _("div", {
		ref: (e) => {
			y.current = e, typeof h == "function" ? h(e) : h && (h.current = e);
		},
		className: J("relative bg-black group", d),
		onMouseMove: z,
		onMouseLeave: () => x && A(!1),
		...f,
		children: [
			/* @__PURE__ */ g("video", {
				ref: v,
				src: e,
				poster: u,
				loop: n,
				muted: !0,
				playsInline: !0,
				autoPlay: t,
				controls: r,
				className: "w-full h-full object-contain",
				onClick: L
			}),
			!r && /* @__PURE__ */ _("div", {
				className: J("absolute inset-0 flex flex-col justify-end transition-opacity duration-300", k ? "opacity-100" : "opacity-0"),
				children: [
					/* @__PURE__ */ g("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" }),
					/* @__PURE__ */ g("button", {
						onClick: L,
						className: "absolute inset-0 flex items-center justify-center",
						"aria-label": x ? "Pause" : "Play",
						children: /* @__PURE__ */ g("div", {
							className: J("w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center transition-transform", k ? "scale-100" : "scale-0"),
							children: x ? /* @__PURE__ */ g("svg", {
								className: "w-8 h-8 text-white",
								fill: "currentColor",
								viewBox: "0 0 24 24",
								children: /* @__PURE__ */ g("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" })
							}) : /* @__PURE__ */ g("svg", {
								className: "w-8 h-8 text-white ml-1",
								fill: "currentColor",
								viewBox: "0 0 24 24",
								children: /* @__PURE__ */ g("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					/* @__PURE__ */ _("div", {
						className: "relative z-10 px-4 pb-4 space-y-2",
						children: [/* @__PURE__ */ g("div", {
							ref: b,
							className: "h-1 bg-white/30 rounded-full cursor-pointer group/progress",
							onClick: ne,
							children: /* @__PURE__ */ g("div", {
								className: "h-full bg-cyan-500 rounded-full relative",
								style: { width: `${re}%` },
								children: /* @__PURE__ */ g("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" })
							})
						}), /* @__PURE__ */ _("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ g("button", {
										onClick: L,
										className: "text-white hover:text-cyan-400 transition-colors",
										"aria-label": x ? "Pause" : "Play",
										children: x ? /* @__PURE__ */ g("svg", {
											className: "w-6 h-6",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ g("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" })
										}) : /* @__PURE__ */ g("svg", {
											className: "w-6 h-6",
											fill: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ g("path", { d: "M8 5v14l11-7z" })
										})
									}),
									/* @__PURE__ */ g("button", {
										onClick: ee,
										className: "text-white hover:text-cyan-400 transition-colors",
										"aria-label": "Replay",
										title: "Replay",
										children: /* @__PURE__ */ g("svg", {
											className: "w-5 h-5",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ g("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
											})
										})
									}),
									/* @__PURE__ */ _("span", {
										className: "text-white text-sm font-mono",
										children: [
											I(C),
											" / ",
											I(T)
										]
									})
								]
							}), /* @__PURE__ */ _("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _("div", {
									className: "relative",
									children: [/* @__PURE__ */ _("button", {
										onClick: () => M(!j),
										className: "text-white hover:text-cyan-400 transition-colors text-sm font-medium px-2 py-1 rounded bg-white/10",
										"aria-label": "Vitesse de lecture",
										title: "Vitesse de lecture",
										children: [D, "x"]
									}), j && /* @__PURE__ */ g("div", {
										className: "absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden",
										children: Da.map((e) => /* @__PURE__ */ _("button", {
											onClick: () => te(e),
											className: J("block w-full px-4 py-2 text-sm text-left transition-colors", D === e ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-700"),
											children: [e, "x"]
										}, e))
									})]
								}), /* @__PURE__ */ g("button", {
									onClick: R,
									className: "text-white hover:text-cyan-400 transition-colors",
									"aria-label": N ? "Quitter le plein ecran" : "Plein ecran",
									title: N ? "Quitter le plein ecran" : "Plein ecran",
									children: N ? /* @__PURE__ */ g("svg", {
										className: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ g("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M6 18L18 6M6 6l12 12"
										})
									}) : /* @__PURE__ */ g("svg", {
										className: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ g("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
										})
									})
								})]
							})]
						})]
					})
				]
			}),
			T === 0 && e && /* @__PURE__ */ g("div", {
				className: "absolute inset-0 flex items-center justify-center bg-black/50",
				children: /* @__PURE__ */ g("div", { className: "animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full" })
			})
		]
	});
}), ka = {
	hand: An,
	ribbon: Wn,
	circle: gn,
	pillow: er,
	dumbbell: Cn,
	weight: ur,
	cylinder: xn,
	minus: Ln,
	armchair: Xt,
	box: ln,
	square: er
}, Aa = i(function({ selectedAccessories: e, onChange: t, availableAccessories: n, disabled: r = !1, compact: i = !1, label: a = "Materiel a disposition", className: o, ...s }, c) {
	let l = (n) => {
		if (!r) if (e.includes(n)) {
			if (n === "aucun" && e.length === 1) return;
			t(e.filter((e) => e !== n));
		} else t(n === "aucun" ? ["aucun"] : [...e.filter((e) => e !== "aucun"), n]);
	}, u = () => {
		r || t(n.filter((e) => e.key !== "aucun").map((e) => e.key));
	}, d = () => {
		r || t(["aucun"]);
	};
	return i ? /* @__PURE__ */ g("div", {
		ref: c,
		className: J("w-full", r && "opacity-50 pointer-events-none", o),
		...s,
		children: /* @__PURE__ */ g("div", {
			className: "flex flex-wrap gap-2",
			children: n.map((t) => {
				let n = e.includes(t.key);
				return /* @__PURE__ */ _("button", {
					onClick: () => l(t.key),
					disabled: r,
					className: J("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all", n ? "bg-primary-100 border-primary-500 text-primary-700 border" : "bg-gray-100 border-gray-300 text-gray-600 border hover:border-gray-400"),
					children: [(() => {
						let e = ka[t.iconKey];
						return e ? /* @__PURE__ */ g(e, { className: J("w-4 h-4", n ? "text-primary-600" : "text-gray-500") }) : null;
					})(), /* @__PURE__ */ g("span", { children: t.label.split(" / ")[0] })]
				}, t.key);
			})
		})
	}) : /* @__PURE__ */ _("div", {
		ref: c,
		className: J("w-full", r && "opacity-50 pointer-events-none", o),
		...s,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ g("label", {
					className: "block text-sm font-medium text-gray-700",
					children: a
				}), /* @__PURE__ */ _("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ g("button", {
							onClick: u,
							disabled: r,
							className: "text-xs text-primary-600 hover:text-primary-700 transition-colors",
							children: "Tout selectionner"
						}),
						/* @__PURE__ */ g("span", {
							className: "text-gray-400",
							children: "|"
						}),
						/* @__PURE__ */ g("button", {
							onClick: d,
							disabled: r,
							className: "text-xs text-gray-500 hover:text-gray-700 transition-colors",
							children: "Aucun"
						})
					]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
				children: n.map((t) => {
					let n = e.includes(t.key), i = t.key === "aucun";
					return /* @__PURE__ */ _("button", {
						onClick: () => l(t.key),
						disabled: r,
						className: J("relative flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200", n ? i ? "bg-gray-100 border-gray-400 scale-[1.02]" : "bg-primary-50 border-primary-500 scale-[1.02]" : "bg-white border-gray-200 hover:border-gray-300"),
						children: [
							n && /* @__PURE__ */ g("div", {
								className: J("absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center", i ? "bg-gray-500" : "bg-primary-500"),
								children: /* @__PURE__ */ g("svg", {
									className: "w-3 h-3 text-white",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
										clipRule: "evenodd"
									})
								})
							}),
							(() => {
								let e = ka[t.iconKey];
								return e ? /* @__PURE__ */ g(e, { className: J("w-5 h-5 shrink-0", n ? i ? "text-gray-600" : "text-primary-600" : "text-gray-500") }) : null;
							})(),
							/* @__PURE__ */ g("span", {
								className: J("text-sm font-medium text-left", n ? i ? "text-gray-700" : "text-primary-700" : "text-gray-700"),
								children: t.label
							})
						]
					}, t.key);
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "mt-3 text-xs text-gray-500 text-center",
				children: e.includes("aucun") ? "Exercices sans materiel uniquement" : `${e.length} accessoire${e.length > 1 ? "s" : ""} selectionne${e.length > 1 ? "s" : ""}`
			})
		]
	});
}), ja = {
	user: lr,
	armchair: Xt,
	"bed-single": an,
	sofa: Qn,
	bed: on,
	dog: Sn,
	"person-standing": Bn
}, Ma = i(function({ selectedPositions: e, onChange: t, availablePositions: n, disabled: r = !1, compact: i = !1, label: a = "Positions possibles", basicPositionKeys: o = ["debout", "assis"], className: s, ...c }, l) {
	let u = (n) => {
		if (!r) if (e.includes(n)) {
			if (e.length === 1) return;
			t(e.filter((e) => e !== n));
		} else t([...e, n]);
	}, d = () => {
		r || t(n.map((e) => e.key));
	}, f = () => {
		r || t(o);
	};
	return i ? /* @__PURE__ */ g("div", {
		ref: l,
		className: J("w-full", r && "opacity-50 pointer-events-none", s),
		...c,
		children: /* @__PURE__ */ g("div", {
			className: "flex flex-wrap gap-2",
			children: n.map((t) => {
				let n = e.includes(t.key);
				return /* @__PURE__ */ _("button", {
					onClick: () => u(t.key),
					disabled: r,
					className: J("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all", n ? "bg-cyan-100 border-cyan-500 text-cyan-700 border" : "bg-gray-100 border-gray-300 text-gray-600 border hover:border-gray-400"),
					children: [(() => {
						let e = ja[t.iconKey];
						return e ? /* @__PURE__ */ g(e, { className: J("w-4 h-4", n ? "text-cyan-600" : "text-gray-500") }) : null;
					})(), /* @__PURE__ */ g("span", { children: t.label })]
				}, t.key);
			})
		})
	}) : /* @__PURE__ */ _("div", {
		ref: l,
		className: J("w-full", r && "opacity-50 pointer-events-none", s),
		...c,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ g("label", {
					className: "block text-sm font-medium text-gray-700",
					children: a
				}), /* @__PURE__ */ _("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ g("button", {
							onClick: d,
							disabled: r,
							className: "text-xs text-cyan-600 hover:text-cyan-700 transition-colors",
							children: "Toutes"
						}),
						/* @__PURE__ */ g("span", {
							className: "text-gray-400",
							children: "|"
						}),
						/* @__PURE__ */ g("button", {
							onClick: f,
							disabled: r,
							className: "text-xs text-gray-500 hover:text-gray-700 transition-colors",
							children: "Basiques"
						})
					]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
				children: n.map((t) => {
					let n = e.includes(t.key);
					return /* @__PURE__ */ _("button", {
						onClick: () => u(t.key),
						disabled: r,
						className: J("relative flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200", n ? "bg-cyan-50 border-cyan-500 scale-[1.02]" : "bg-white border-gray-200 hover:border-gray-300"),
						children: [
							n && /* @__PURE__ */ g("div", {
								className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-cyan-500",
								children: /* @__PURE__ */ g("svg", {
									className: "w-3 h-3 text-white",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ g("path", {
										fillRule: "evenodd",
										d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
										clipRule: "evenodd"
									})
								})
							}),
							(() => {
								let e = ja[t.iconKey];
								return e ? /* @__PURE__ */ g(e, { className: J("w-6 h-6", n ? "text-cyan-600" : "text-gray-500") }) : null;
							})(),
							/* @__PURE__ */ g("span", {
								className: J("text-xs font-medium", n ? "text-cyan-700" : "text-gray-700"),
								children: t.label
							})
						]
					}, t.key);
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "mt-3 text-xs text-gray-500 text-center",
				children: "Selectionnez les positions que vous pouvez maintenir confortablement"
			}),
			e.length <= 2 && /* @__PURE__ */ _("div", {
				className: "mt-2 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg",
				children: [/* @__PURE__ */ g(or, { className: "w-4 h-4 text-amber-500 shrink-0" }), /* @__PURE__ */ g("span", {
					className: "text-xs text-amber-700",
					children: "Moins de positions = moins d'exercices disponibles"
				})]
			})
		]
	});
}), Na = {
	idle: "Pret",
	concentric: "Montee",
	pause: "Pause",
	eccentric: "Descente"
}, Pa = {
	idle: "#6b7280",
	concentric: "#3b82f6",
	pause: "#8b5cf6",
	eccentric: "#f59e0b"
}, Fa = i(function({ tempo: e, repetitions: t, onComplete: n, compact: r = !1, className: i, ...a }, o) {
	let [s, c, u] = e.split("-").map(Number), [d, f] = m(!1), [h, v] = m("idle"), [y, b] = m(0), [x, S] = m(0), [C, w] = m(0), T = p(null), E = (e) => {
		switch (e) {
			case "concentric": return s;
			case "pause": return c;
			case "eccentric": return u;
			default: return 0;
		}
	}, D = (e) => {
		switch (e) {
			case "idle":
			case "eccentric": return "concentric";
			case "concentric": return c > 0 ? "pause" : "eccentric";
			case "pause": return "eccentric";
			default: return "concentric";
		}
	};
	l(() => (d && (T.current = setInterval(() => {
		b((e) => {
			if (e >= E(h) - 1) {
				let e = D(h);
				if (h === "eccentric") {
					let e = x + 1;
					if (S(e), w((e) => e + 1), t && e >= t) return f(!1), v("idle"), n?.(), 0;
				}
				return v(e), 0;
			}
			return e + 1;
		});
	}, 1e3)), () => {
		T.current && clearInterval(T.current);
	}), [
		d,
		h,
		x,
		t,
		s,
		u,
		c,
		n
	]);
	let O = () => {
		d ? f(!1) : (h === "idle" && v("concentric"), f(!0));
	}, k = () => {
		f(!1), v("idle"), b(0), S(0);
	}, A = E(h), j = A > 0 ? y / A : 0, M = 2 * Math.PI * 45, N = M * (1 - j);
	return r ? /* @__PURE__ */ _("div", {
		ref: o,
		className: J("flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200", i),
		...a,
		children: [/* @__PURE__ */ g("button", {
			onClick: O,
			className: "w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center",
			children: d ? /* @__PURE__ */ g(zn, { className: "w-5 h-5" }) : /* @__PURE__ */ g(Vn, { className: "w-5 h-5 ml-0.5" })
		}), /* @__PURE__ */ _("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ _("div", {
				className: "flex items-baseline gap-2",
				children: [/* @__PURE__ */ g("span", {
					className: "text-lg font-bold",
					style: { color: Pa[h] },
					children: Na[h]
				}), /* @__PURE__ */ _("span", {
					className: "text-sm text-gray-500",
					children: [A - y, "s"]
				})]
			}), /* @__PURE__ */ _("p", {
				className: "text-xs text-gray-400",
				children: [
					"Tempo: ",
					e,
					t && ` | Rep ${x + 1}/${t}`
				]
			})]
		})]
	}) : /* @__PURE__ */ _("div", {
		ref: o,
		className: J("bg-white rounded-xl border border-gray-200 p-4", i),
		...a,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
					className: "font-semibold text-gray-900",
					children: "Tempo"
				}), /* @__PURE__ */ _("p", {
					className: "text-sm text-gray-500",
					children: [
						s,
						"s montee - ",
						c,
						"s pause - ",
						u,
						"s descente"
					]
				})] }), t && /* @__PURE__ */ _("div", {
					className: "text-right",
					children: [/* @__PURE__ */ _("p", {
						className: "text-lg font-bold text-primary-600",
						children: [
							x,
							"/",
							t
						]
					}), /* @__PURE__ */ g("p", {
						className: "text-xs text-gray-500",
						children: "repetitions"
					})]
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "flex justify-center mb-4",
				children: /* @__PURE__ */ _("div", {
					className: "relative w-32 h-32",
					children: [/* @__PURE__ */ _("svg", {
						className: "w-full h-full transform -rotate-90",
						children: [/* @__PURE__ */ g("circle", {
							cx: "64",
							cy: "64",
							r: "45",
							fill: "none",
							stroke: "#e5e7eb",
							strokeWidth: "8"
						}), /* @__PURE__ */ g("circle", {
							cx: "64",
							cy: "64",
							r: "45",
							fill: "none",
							stroke: Pa[h],
							strokeWidth: "8",
							strokeLinecap: "round",
							strokeDasharray: M,
							strokeDashoffset: N,
							className: "transition-all duration-200"
						})]
					}), /* @__PURE__ */ _("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ g("span", {
							className: "text-3xl font-bold tabular-nums",
							style: { color: Pa[h] },
							children: A - y
						}), /* @__PURE__ */ g("span", {
							className: "text-xs font-medium",
							style: { color: Pa[h] },
							children: Na[h]
						})]
					})]
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "flex justify-center gap-4 mb-4",
				children: [
					"concentric",
					"pause",
					"eccentric"
				].map((e) => /* @__PURE__ */ _("div", {
					className: J("flex flex-col items-center", h === e ? "opacity-100" : "opacity-40"),
					children: [/* @__PURE__ */ g("div", {
						className: "w-3 h-3 rounded-full mb-1",
						style: { backgroundColor: Pa[e] }
					}), /* @__PURE__ */ g("span", {
						className: "text-xs text-gray-600",
						children: e === "concentric" ? `${s}s` : e === "pause" ? `${c}s` : `${u}s`
					})]
				}, e))
			}),
			/* @__PURE__ */ _("div", {
				className: "flex justify-center gap-3",
				children: [/* @__PURE__ */ g("button", {
					onClick: k,
					className: "p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors",
					children: /* @__PURE__ */ g(Un, { className: "w-5 h-5" })
				}), /* @__PURE__ */ g("button", {
					onClick: O,
					className: "p-4 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors",
					children: d ? /* @__PURE__ */ g(zn, { className: "w-6 h-6" }) : /* @__PURE__ */ g(Vn, { className: "w-6 h-6 ml-0.5" })
				})]
			}),
			C > 0 && /* @__PURE__ */ _("p", {
				className: "text-center text-xs text-gray-500 mt-3",
				children: [
					C,
					" repetition",
					C > 1 ? "s" : "",
					" completee",
					C > 1 ? "s" : ""
				]
			})
		]
	});
}), Ia = i(function({ daysSinceAlert: e, onContactPractitioner: t, onDismiss: n, compact: r = !1, className: i, ...a }, o) {
	let s = p(null);
	return l(() => {
		!r && s.current && s.current.focus();
	}, [r]), l(() => {
		if (r) return;
		let e = (e) => {
			e.key === "Escape" && n && n();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r, n]), r ? /* @__PURE__ */ g("div", {
		ref: o,
		className: J("bg-red-900/80 border border-red-500 rounded-lg p-4", i),
		role: "alert",
		"aria-live": "assertive",
		...a,
		children: /* @__PURE__ */ _("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ g("div", {
				className: "flex-shrink-0",
				children: /* @__PURE__ */ g(or, { className: "w-6 h-6 text-red-300 animate-pulse" })
			}), /* @__PURE__ */ _("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ g("h3", {
						className: "text-red-100 font-semibold text-sm",
						children: "Alerte medicale active"
					}),
					/* @__PURE__ */ g("p", {
						className: "text-red-200/80 text-xs mt-1",
						children: "Votre douleur reste elevee depuis plusieurs seances. Nous vous recommandons de consulter un professionnel de sante."
					}),
					t && /* @__PURE__ */ g("button", {
						onClick: t,
						className: "mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-md transition-colors",
						children: "Contacter mon praticien"
					})
				]
			})]
		})
	}) : /* @__PURE__ */ g("div", {
		ref: o,
		className: J("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", i),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "medical-alert-title",
		...a,
		children: /* @__PURE__ */ _("div", {
			ref: s,
			tabIndex: -1,
			className: "bg-gradient-to-br from-red-600 to-rose-600 border-2 border-red-400 rounded-xl p-6 max-w-sm w-full shadow-2xl",
			children: [
				/* @__PURE__ */ g("div", {
					className: "flex justify-center mb-4",
					children: /* @__PURE__ */ g("div", {
						className: "w-20 h-20 bg-red-500/30 rounded-full flex items-center justify-center animate-pulse",
						children: /* @__PURE__ */ g("svg", {
							className: "w-10 h-10 text-red-300",
							fill: "currentColor",
							viewBox: "0 0 20 20",
							children: /* @__PURE__ */ g("path", {
								fillRule: "evenodd",
								d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
								clipRule: "evenodd"
							})
						})
					})
				}),
				/* @__PURE__ */ g("h2", {
					id: "medical-alert-title",
					className: "text-xl font-bold text-red-100 text-center mb-2",
					children: "Alerte medicale"
				}),
				/* @__PURE__ */ _("p", {
					className: "text-red-200/90 text-center text-sm mb-4",
					children: ["Votre niveau de douleur reste eleve depuis plusieurs seances.", e && e > 0 && /* @__PURE__ */ _("span", {
						className: "block mt-1 text-red-300/70 text-xs",
						children: [
							"(Alerte active depuis ",
							e,
							" jour",
							e > 1 ? "s" : "",
							")"
						]
					})]
				}),
				/* @__PURE__ */ _("div", {
					className: "bg-red-950/50 border border-red-700/50 rounded-lg p-3 mb-5",
					children: [/* @__PURE__ */ g("p", {
						className: "text-red-100 text-sm font-medium mb-1",
						children: "Recommandation"
					}), /* @__PURE__ */ g("p", {
						className: "text-red-200/80 text-xs",
						children: "Nous vous recommandons de consulter votre medecin ou kinesitherapeute avant de poursuivre vos exercices."
					})]
				}),
				/* @__PURE__ */ _("div", {
					className: "space-y-2",
					children: [t && /* @__PURE__ */ _("button", {
						onClick: t,
						className: "w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ g("svg", {
							className: "w-5 h-5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ g("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							})
						}), "Contacter mon praticien"]
					}), n && /* @__PURE__ */ g("button", {
						onClick: n,
						className: "w-full py-2.5 bg-red-900/50 hover:bg-red-800/50 text-red-200 font-medium rounded-xl transition-colors text-sm",
						children: "J'ai compris, fermer"
					})]
				}),
				/* @__PURE__ */ g("p", {
					className: "text-red-300/50 text-xs text-center mt-4",
					children: "En cas d'urgence, appelez le 15 (SAMU) ou le 112."
				})
			]
		})
	});
}), La = i(function({ isOpen: e, consecutiveDays: t, onTakeRestDay: n, onContinueAnyway: r, className: i, ...a }, o) {
	return e ? /* @__PURE__ */ g("div", {
		ref: o,
		className: J("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", i),
		...a,
		children: /* @__PURE__ */ _("div", {
			className: "bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-200",
			children: [/* @__PURE__ */ _("div", {
				className: "bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-center",
				children: [
					/* @__PURE__ */ g("div", {
						className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ g(yn, { className: "w-8 h-8 text-white" })
					}),
					/* @__PURE__ */ g("h2", {
						className: "text-xl font-bold text-white",
						children: "Bravo pour votre regularite !"
					}),
					/* @__PURE__ */ _("p", {
						className: "text-amber-100 text-sm mt-1",
						children: [t, " jours d'exercices consecutifs"]
					})
				]
			}), /* @__PURE__ */ _("div", {
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ _("div", {
						className: "flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg",
						children: [/* @__PURE__ */ g(Mn, { className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("p", {
							className: "text-sm font-medium text-amber-900",
							children: "Un jour de repos serait benefique"
						}), /* @__PURE__ */ g("p", {
							className: "text-xs text-amber-700 mt-1",
							children: "Le repos fait partie de la reeducation. Il permet a votre corps de recuperer et de progresser plus efficacement."
						})] })]
					}),
					/* @__PURE__ */ _("div", {
						className: "flex items-start gap-3 p-3 bg-gray-50 rounded-lg",
						children: [/* @__PURE__ */ g(mn, { className: "w-5 h-5 text-gray-500 shrink-0 mt-0.5" }), /* @__PURE__ */ g("p", {
							className: "text-xs text-gray-600",
							children: "Faire trop d'exercices sans pause peut etre contre-productif et augmenter le risque de douleurs."
						})]
					}),
					/* @__PURE__ */ _("div", {
						className: "space-y-3 pt-2",
						children: [/* @__PURE__ */ _("button", {
							onClick: n,
							className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all",
							children: [/* @__PURE__ */ g(yn, { className: "w-5 h-5" }), "Prendre un jour de repos"]
						}), /* @__PURE__ */ _("button", {
							onClick: r,
							className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors",
							children: [/* @__PURE__ */ g(Cn, { className: "w-5 h-5" }), "Continuer quand meme"]
						})]
					})
				]
			})]
		})
	}) : null;
}), Ra = {
	lumbar: Zt,
	cervical: kn,
	shoulder: Cn,
	knee: En,
	ankle: En,
	hip: sn,
	thoracic: Mn,
	elbow: Cn,
	wrist: An
};
function za(e) {
	return e && Ra[e] ? Ra[e] : _n;
}
function Ba(e) {
	switch (e) {
		case "lumbar": return "Lombaire";
		case "cervical": return "Cervical";
		case "shoulder": return "Epaule";
		case "knee": return "Genou";
		case "ankle": return "Cheville";
		case "hip": return "Hanche";
		case "thoracic": return "Thoracique";
		case "elbow": return "Coude";
		case "wrist": return "Poignet";
		default: return "Programme";
	}
}
var Va = i(function({ programs: e, selectedProgram: t, onSelectProgram: n, className: r, ...i }, a) {
	return e.length <= 1 ? null : /* @__PURE__ */ _("div", {
		ref: a,
		className: J("mb-4", r),
		...i,
		children: [/* @__PURE__ */ _("p", {
			className: "text-xs text-gray-500 mb-2",
			children: [e.length, " programmes actifs - Selectionnez celui a afficher :"]
		}), /* @__PURE__ */ g("div", {
			className: "flex flex-wrap gap-2",
			children: e.map((e) => {
				let r = t?.treatmentFileId === e.treatmentFileId, i = e.questionnaire?.bodyRegion, a = za(i), o = e.questionnaire?.title || Ba(i), s = e.questionnaireCompleted;
				return /* @__PURE__ */ _("button", {
					onClick: () => n(e.treatmentFileId),
					className: J("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200", r ? s ? "bg-primary-500 text-white shadow-md" : "bg-amber-500 text-white shadow-md" : s ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"),
					title: s ? void 0 : "Questionnaire non complete",
					children: [
						/* @__PURE__ */ g(a, { className: J("w-4 h-4", r ? "text-white" : s ? "text-gray-500" : "text-amber-500") }),
						/* @__PURE__ */ g("span", {
							className: "truncate max-w-[120px]",
							children: o
						}),
						!s && /* @__PURE__ */ g(wn, { className: J("w-4 h-4 ml-1", r ? "text-white/80" : "text-amber-500") }),
						s && e.todayCompleted && /* @__PURE__ */ g(fn, { className: J("w-4 h-4 ml-1", r ? "text-white/80" : "text-green-600") }),
						e.medicalAlertActive && /* @__PURE__ */ g(or, { className: J("w-4 h-4 ml-1", r ? "text-white/80" : "text-red-500") })
					]
				}, e.treatmentFileId);
			})
		})]
	});
}), Ha = i(function({ dailyAvailabilityMinutes: e, todayMinutesCompleted: t, todayMinutesRemaining: n, todaySessionsCount: r, dailyQuotaReached: i, currentStreak: a, canStartSession: o, motivationMessage: s, onStartSession: c, onDismissMotivation: l, onOpenSettings: u, children: d, className: f, ...p }, h) {
	let [v, y] = m(!0), b = Math.min(100, t / e * 100), x = () => {
		y(!1), l?.();
	}, S = i;
	return /* @__PURE__ */ _("div", {
		ref: h,
		className: J("rounded-2xl border overflow-hidden", S ? "bg-[#f0f7f4] border-[#bbdece]" : "bg-white border-[#e8e6de]", f),
		style: { boxShadow: "0 1px 3px rgba(26,26,24,0.05), 0 1px 2px rgba(26,26,24,0.03)" },
		...p,
		children: [
			/* @__PURE__ */ g("div", {
				className: J("px-5 py-4", S ? "bg-[#2a7554]" : "bg-[#3a9169]"),
				children: /* @__PURE__ */ _("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ _("div", {
						className: "flex items-center gap-3",
						children: [i ? /* @__PURE__ */ g("div", {
							className: "w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ g(sr, { className: "w-5 h-5 text-white" })
						}) : t > 0 ? /* @__PURE__ */ g("div", {
							className: "w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ g(tr, { className: "w-5 h-5 text-white" })
						}) : /* @__PURE__ */ g("div", {
							className: "w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center",
							children: /* @__PURE__ */ g($n, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h2", {
							className: "text-base font-semibold text-white",
							children: i ? "Objectif atteint !" : t > 0 ? "Continuez votre effort" : "Votre seance du jour"
						}), /* @__PURE__ */ g("p", {
							className: "text-sm text-white/75",
							children: i ? "Felicitations pour cette journee" : t > 0 ? `Encore ${n} min pour l'objectif` : "Pret a commencer votre reeducation ?"
						})] })]
					}), a > 0 && /* @__PURE__ */ _("div", {
						className: "flex items-center gap-1.5 px-2.5 py-1 bg-white/15 rounded-lg",
						children: [/* @__PURE__ */ g(Tn, { className: "w-3.5 h-3.5 text-amber-300" }), /* @__PURE__ */ _("span", {
							className: "text-sm font-semibold text-white",
							children: [a, "j"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ _("div", {
				className: "p-5 space-y-4",
				children: [
					s && v && !i && /* @__PURE__ */ _("div", {
						className: J("flex items-start gap-3 p-3 rounded-xl border", S ? "bg-[#dceee5]/50 border-[#bbdece]" : "bg-[#f5f4ef] border-[#e8e6de]"),
						children: [
							/* @__PURE__ */ g("div", {
								className: "text-lg flex-shrink-0 mt-0.5",
								children: s.emoji
							}),
							/* @__PURE__ */ g("div", {
								className: "flex-1 min-w-0",
								children: /* @__PURE__ */ g("p", {
									className: "text-sm text-[#504d45]",
									children: s.message
								})
							}),
							/* @__PURE__ */ g("button", {
								onClick: x,
								className: "p-1 hover:bg-black/5 rounded-lg transition-colors flex-shrink-0 text-[#9f9a8c]",
								"aria-label": "Fermer",
								children: /* @__PURE__ */ g("svg", {
									className: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ g("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeWidth: 1.5,
										d: "M6 18L18 6M6 6l12 12"
									})
								})
							})
						]
					}),
					/* @__PURE__ */ _("div", { children: [
						/* @__PURE__ */ _("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ _("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ g(vn, { className: "w-4 h-4 text-[#726d60]" }), /* @__PURE__ */ g("span", {
									className: "text-sm font-medium text-[#504d45]",
									children: "Objectif du jour"
								})]
							}), u && /* @__PURE__ */ g("button", {
								onClick: u,
								className: "p-1.5 hover:bg-black/5 rounded-lg transition-colors text-[#9f9a8c]",
								"aria-label": "Reglages",
								children: /* @__PURE__ */ g(Jn, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ g("div", {
							className: "h-2 rounded-full overflow-hidden bg-[#e8e6de]",
							children: /* @__PURE__ */ g("div", {
								className: J("h-full rounded-full transition-all duration-500", "bg-[#3a9169]"),
								style: { width: `${b}%` }
							})
						}),
						/* @__PURE__ */ _("div", {
							className: "flex items-center justify-between mt-2",
							children: [/* @__PURE__ */ g("span", {
								className: "text-sm text-[#726d60]",
								children: r > 0 ? `${r} seance${r > 1 ? "s" : ""} aujourd'hui` : "Aucune seance"
							}), /* @__PURE__ */ _("span", {
								className: "text-sm font-bold text-[#504d45]",
								children: [
									t,
									"/",
									e,
									" min"
								]
							})]
						})
					] }),
					i ? /* @__PURE__ */ _("div", {
						className: "flex items-center gap-3 p-4 bg-[#f0f7f4] rounded-xl border border-[#bbdece]",
						children: [/* @__PURE__ */ g("div", {
							className: "w-11 h-11 bg-[#3a9169] rounded-full flex items-center justify-center flex-shrink-0",
							children: /* @__PURE__ */ g(hn, { className: "w-5 h-5 text-white" })
						}), /* @__PURE__ */ _("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ g("p", {
								className: "font-semibold text-[#1f4b38]",
								children: "Bravo !"
							}), /* @__PURE__ */ g("p", {
								className: "text-sm text-[#3a9169]",
								children: a > 1 ? `${a} jours consecutifs d'exercices` : "Vous avez atteint votre objectif"
							})]
						})]
					}) : o && c ? /* @__PURE__ */ _("button", {
						onClick: c,
						className: "w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-[#3a9169] hover:bg-[#2a7554] text-white font-medium rounded-xl transition-colors group",
						style: { boxShadow: "0 1px 3px rgba(26,26,24,0.1)" },
						children: [
							/* @__PURE__ */ g(Vn, { className: "w-5 h-5 group-hover:scale-110 transition-transform" }),
							/* @__PURE__ */ g("span", { children: t > 0 ? "Continuer ma seance" : "Faire mes exercices" }),
							/* @__PURE__ */ g(pn, { className: "w-5 h-5 group-hover:translate-x-0.5 transition-transform" })
						]
					}) : null
				]
			}),
			d
		]
	});
}), Ua = [
	{
		value: 5,
		label: "5 min",
		description: "1 seance courte"
	},
	{
		value: 10,
		label: "10 min",
		description: "1-2 seances"
	},
	{
		value: 15,
		label: "15 min",
		description: "2-3 seances"
	},
	{
		value: 30,
		label: "30 min",
		description: "3-4 seances"
	},
	{
		value: 45,
		label: "45 min",
		description: "4-5 seances"
	},
	{
		value: 60,
		label: "60 min",
		description: "5+ seances"
	}
], Wa = i(function({ value: e, onChange: t, onSave: n, disabled: r = !1, compact: i = !1, className: a, ...o }, s) {
	let [c, u] = m(e), [d, f] = m(!1), [p, h] = m(!1), [v, y] = m(null);
	l(() => {
		u(e);
	}, [e]);
	let b = async (e) => {
		if (!(d || r)) {
			f(!0), y(null), h(!1);
			try {
				let r = !0;
				n && (r = await n(e)), r ? (u(e), h(!0), t?.(e), setTimeout(() => h(!1), 2e3)) : y("Erreur lors de la sauvegarde");
			} catch {
				y("Erreur inattendue");
			} finally {
				f(!1);
			}
		}
	}, x = () => {
		b(Math.min(60, c + 5));
	}, S = () => {
		b(Math.max(5, c - 5));
	}, C = (e) => {
		e !== c && b(e);
	};
	return i ? /* @__PURE__ */ _("div", {
		ref: s,
		className: J(r && "opacity-50 pointer-events-none", a),
		...o,
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center justify-between gap-4",
			children: [/* @__PURE__ */ _("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ g(vn, { className: "w-4 h-4 text-gray-400" }), /* @__PURE__ */ g("span", {
					className: "text-sm text-gray-600",
					children: "Objectif journalier"
				})]
			}), /* @__PURE__ */ _("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ g("button", {
						onClick: S,
						disabled: d || c <= 5,
						className: "w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50",
						children: /* @__PURE__ */ g(Ln, { className: "w-4 h-4 text-gray-600" })
					}),
					/* @__PURE__ */ g("span", {
						className: "w-16 text-center font-semibold text-gray-900",
						children: d ? "..." : `${c} min`
					}),
					/* @__PURE__ */ g("button", {
						onClick: x,
						disabled: d || c >= 60,
						className: "w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50",
						children: /* @__PURE__ */ g(Hn, { className: "w-4 h-4 text-gray-600" })
					})
				]
			})]
		}), p && /* @__PURE__ */ _("div", {
			className: "flex items-center justify-end gap-1 mt-1 text-green-600 text-xs",
			children: [/* @__PURE__ */ g(fn, { className: "w-3 h-3" }), "Sauvegarde"]
		})]
	}) : /* @__PURE__ */ _("div", {
		ref: s,
		className: J(r && "opacity-50 pointer-events-none", a),
		...o,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center gap-2 mb-4",
				children: [/* @__PURE__ */ g("div", {
					className: "w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center",
					children: /* @__PURE__ */ g(vn, { className: "w-5 h-5 text-cyan-600" })
				}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("h3", {
					className: "font-semibold text-gray-900",
					children: "Disponibilite journaliere"
				}), /* @__PURE__ */ g("p", {
					className: "text-sm text-gray-500",
					children: "Temps que vous souhaitez consacrer a vos exercices chaque jour"
				})] })]
			}),
			/* @__PURE__ */ g("div", {
				className: "bg-gradient-to-r from-cyan-50 to-primary-50 rounded-xl p-5 mb-4",
				children: /* @__PURE__ */ _("div", {
					className: "flex items-center justify-center gap-4",
					children: [
						/* @__PURE__ */ g("button", {
							onClick: S,
							disabled: d || c <= 5,
							className: "w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all disabled:opacity-50 disabled:shadow-none",
							children: /* @__PURE__ */ g(Ln, { className: "w-5 h-5 text-gray-600" })
						}),
						/* @__PURE__ */ _("div", {
							className: "text-center min-w-[100px]",
							children: [
								/* @__PURE__ */ g("span", {
									className: "text-4xl font-bold text-gray-900",
									children: d ? "..." : c
								}),
								/* @__PURE__ */ g("span", {
									className: "text-xl text-gray-500 ml-1",
									children: "min"
								}),
								p && /* @__PURE__ */ _("div", {
									className: "flex items-center justify-center gap-1 mt-1 text-green-600 text-sm",
									children: [/* @__PURE__ */ g(fn, { className: "w-4 h-4" }), "Sauvegarde"]
								})
							]
						}),
						/* @__PURE__ */ g("button", {
							onClick: x,
							disabled: d || c >= 60,
							className: "w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all disabled:opacity-50 disabled:shadow-none",
							children: /* @__PURE__ */ g(Hn, { className: "w-5 h-5 text-gray-600" })
						})
					]
				})
			}),
			/* @__PURE__ */ g("div", {
				className: "grid grid-cols-3 gap-2",
				children: Ua.map((e) => /* @__PURE__ */ _("button", {
					onClick: () => C(e.value),
					disabled: d,
					className: J("px-3 py-2 rounded-lg text-center transition-all disabled:opacity-50", c === e.value ? "bg-cyan-500 text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"),
					children: [/* @__PURE__ */ g("div", {
						className: "font-semibold text-sm",
						children: e.label
					}), /* @__PURE__ */ g("div", {
						className: J("text-xs", c === e.value ? "text-cyan-100" : "text-gray-500"),
						children: e.description
					})]
				}, e.value))
			}),
			v && /* @__PURE__ */ g("div", {
				className: "mt-3 text-center text-red-600 text-sm",
				children: v
			}),
			/* @__PURE__ */ g("p", {
				className: "mt-4 text-xs text-gray-400 text-center",
				children: "Vous pouvez faire plusieurs seances courtes jusqu'a atteindre votre objectif"
			})
		]
	});
}), Ga = i(function({ homeProfile: e, officeProfile: t, currentAccessories: n, currentPositions: r, onSelectProfile: i, onSaveProfile: a, onDeleteProfile: o, disabled: s = !1, className: c, ...l }, u) {
	let [d, f] = m(null), [p, v] = m(null), [y, b] = m(null), [x, S] = m(null), C = (n) => {
		let r = n === "home" ? e : t;
		r && (f(n), i(r.accessories, r.positions));
	}, w = async (e) => {
		v(e);
		try {
			await a(e), b(null), f(e);
		} finally {
			v(null);
		}
	}, T = async (e) => {
		try {
			await o(e), S(null), d === e && f(null);
		} catch (e) {
			console.error("Error deleting profile:", e);
		}
	}, E = (e) => {
		if (!e) return "Non configure";
		let t = e.accessories.filter((e) => e !== "aucun").length, n = e.positions.length, r = [];
		return t > 0 && r.push(`${t} accessoire${t > 1 ? "s" : ""}`), n > 0 && r.push(`${n} position${n > 1 ? "s" : ""}`), r.join(", ") || "Aucun accessoire";
	}, D = (e) => d === e, O = (i) => {
		let a = i === "home" ? e : t;
		if (!a) return !0;
		let o = JSON.stringify([...n].sort()) === JSON.stringify([...a.accessories].sort()), s = JSON.stringify([...r].sort()) === JSON.stringify([...a.positions].sort());
		return !o || !s;
	};
	return /* @__PURE__ */ _("div", {
		ref: u,
		className: J("space-y-3", c),
		...l,
		children: [
			/* @__PURE__ */ _("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ g("h4", {
					className: "text-sm font-semibold text-gray-900",
					children: "Profils rapides"
				}), /* @__PURE__ */ g("span", {
					className: "text-xs text-gray-500",
					children: "Selection en 1 clic"
				})]
			}),
			/* @__PURE__ */ _("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ _("div", {
					className: "relative",
					children: [/* @__PURE__ */ g("button", {
						onClick: () => e && C("home"),
						disabled: s || !e,
						className: J("w-full p-3 rounded-lg border-2 transition-all text-left", D("home") ? "border-emerald-500 bg-emerald-50" : e ? "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50" : "border-dashed border-gray-300 bg-gray-50 cursor-default", s && "opacity-50 cursor-not-allowed"),
						children: /* @__PURE__ */ _("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ g("div", {
								className: J("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", D("home") ? "bg-emerald-500 text-white" : e ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"),
								children: /* @__PURE__ */ g(Nn, { className: "w-4 h-4" })
							}), /* @__PURE__ */ _("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ _("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ g("span", {
										className: J("text-sm font-medium", e ? "text-gray-900" : "text-gray-500"),
										children: "Maison"
									}), D("home") && /* @__PURE__ */ g(fn, { className: "w-3.5 h-3.5 text-emerald-600" })]
								}), /* @__PURE__ */ g("p", {
									className: "text-xs text-gray-500 truncate",
									children: E(e)
								})]
							})]
						})
					}), /* @__PURE__ */ _("div", {
						className: "absolute -top-1 -right-1 flex gap-1",
						children: [e && /* @__PURE__ */ g("button", {
							onClick: (e) => {
								e.stopPropagation(), S("home");
							},
							className: "w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors",
							title: "Supprimer le profil",
							children: /* @__PURE__ */ g(dr, { className: "w-3 h-3" })
						}), O("home") && /* @__PURE__ */ g("button", {
							onClick: (e) => {
								e.stopPropagation(), b("home");
							},
							className: "w-5 h-5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 flex items-center justify-center transition-colors",
							title: "Sauvegarder comme profil maison",
							children: /* @__PURE__ */ g(Kn, { className: "w-3 h-3" })
						})]
					})]
				}), /* @__PURE__ */ _("div", {
					className: "relative",
					children: [/* @__PURE__ */ g("button", {
						onClick: () => t && C("office"),
						disabled: s || !t,
						className: J("w-full p-3 rounded-lg border-2 transition-all text-left", D("office") ? "border-blue-500 bg-blue-50" : t ? "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50" : "border-dashed border-gray-300 bg-gray-50 cursor-default", s && "opacity-50 cursor-not-allowed"),
						children: /* @__PURE__ */ _("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ g("div", {
								className: J("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", D("office") ? "bg-blue-500 text-white" : t ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"),
								children: /* @__PURE__ */ g(un, { className: "w-4 h-4" })
							}), /* @__PURE__ */ _("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ _("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ g("span", {
										className: J("text-sm font-medium", t ? "text-gray-900" : "text-gray-500"),
										children: "Bureau"
									}), D("office") && /* @__PURE__ */ g(fn, { className: "w-3.5 h-3.5 text-blue-600" })]
								}), /* @__PURE__ */ g("p", {
									className: "text-xs text-gray-500 truncate",
									children: E(t)
								})]
							})]
						})
					}), /* @__PURE__ */ _("div", {
						className: "absolute -top-1 -right-1 flex gap-1",
						children: [t && /* @__PURE__ */ g("button", {
							onClick: (e) => {
								e.stopPropagation(), S("office");
							},
							className: "w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors",
							title: "Supprimer le profil",
							children: /* @__PURE__ */ g(dr, { className: "w-3 h-3" })
						}), O("office") && /* @__PURE__ */ g("button", {
							onClick: (e) => {
								e.stopPropagation(), b("office");
							},
							className: "w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors",
							title: "Sauvegarder comme profil bureau",
							children: /* @__PURE__ */ g(Kn, { className: "w-3 h-3" })
						})]
					})]
				})]
			}),
			!e && !t && /* @__PURE__ */ _("p", {
				className: "text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-2",
				children: [
					"Configurez vos accessoires et positions ci-dessous, puis cliquez sur",
					/* @__PURE__ */ g(Kn, { className: "w-3 h-3 inline mx-1" }),
					"pour sauvegarder un profil."
				]
			}),
			y && /* @__PURE__ */ g("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",
				children: /* @__PURE__ */ _("div", {
					className: "bg-white rounded-lg shadow-xl max-w-sm w-full p-4",
					children: [
						/* @__PURE__ */ _("div", {
							className: "flex items-center gap-3 mb-3",
							children: [/* @__PURE__ */ g("div", {
								className: J("w-10 h-10 rounded-lg flex items-center justify-center", y === "home" ? "bg-emerald-100" : "bg-blue-100"),
								children: y === "home" ? /* @__PURE__ */ g(Nn, { className: "w-5 h-5 text-emerald-600" }) : /* @__PURE__ */ g(un, { className: "w-5 h-5 text-blue-600" })
							}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ _("h3", {
								className: "font-semibold text-gray-900",
								children: ["Sauvegarder le profil ", y === "home" ? "Maison" : "Bureau"]
							}), /* @__PURE__ */ g("p", {
								className: "text-sm text-gray-500",
								children: "Cette action remplacera le profil existant"
							})] })]
						}),
						/* @__PURE__ */ _("div", {
							className: "bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600",
							children: [
								/* @__PURE__ */ g("p", {
									className: "font-medium mb-1",
									children: "Configuration actuelle :"
								}),
								/* @__PURE__ */ _("p", { children: [
									"- ",
									n.filter((e) => e !== "aucun").length || "Aucun",
									" accessoire(s)"
								] }),
								/* @__PURE__ */ _("p", { children: [
									"- ",
									r.length,
									" position(s)"
								] })
							]
						}),
						/* @__PURE__ */ _("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ g("button", {
								onClick: () => b(null),
								className: "flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors",
								children: "Annuler"
							}), /* @__PURE__ */ g("button", {
								onClick: () => w(y),
								disabled: p === y,
								className: J("flex-1 py-2.5 px-4 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2", y === "home" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-500 hover:bg-blue-600"),
								children: p === y ? /* @__PURE__ */ g("div", { className: "animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" }) : /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(Kn, { className: "w-4 h-4" }), "Sauvegarder"] })
							})]
						})
					]
				})
			}),
			x && /* @__PURE__ */ g("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50",
				children: /* @__PURE__ */ _("div", {
					className: "bg-white rounded-lg shadow-xl max-w-sm w-full p-4",
					children: [/* @__PURE__ */ _("div", {
						className: "flex items-center gap-3 mb-3",
						children: [/* @__PURE__ */ g("div", {
							className: "w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center",
							children: /* @__PURE__ */ g(rr, { className: "w-5 h-5 text-red-600" })
						}), /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ _("h3", {
							className: "font-semibold text-gray-900",
							children: ["Supprimer le profil ", x === "home" ? "Maison" : "Bureau"]
						}), /* @__PURE__ */ g("p", {
							className: "text-sm text-gray-500",
							children: "Cette action est irreversible"
						})] })]
					}), /* @__PURE__ */ _("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ g("button", {
							onClick: () => S(null),
							className: "flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors",
							children: "Annuler"
						}), /* @__PURE__ */ _("button", {
							onClick: () => T(x),
							className: "flex-1 py-2.5 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ g(rr, { className: "w-4 h-4" }), "Supprimer"]
						})]
					})]
				})
			})
		]
	});
});
//#endregion
export { ka as ACCESSORY_ICONS, Aa as AccessorySelector, wr as Alert, Mi as AnatomicalBodyMap, Pr as Avatar, Fr as AvatarGroup, pi as BODY_COMPONENTS, Ra as BODY_REGION_ICONS, wt as Badge, gi as BodySilhouette, _i as BodyZone, Lr as BottomSheet, Rr as BottomSheetActions, gt as Button, ga as CONSOLIDATION_LEVEL_CONFIG, vt as Card, bt as CardContent, xt as CardFooter, yt as CardHeader, hr as Chip, gr as ChipGroup, Hr as ConfirmDialog, _a as ConsolidationBanner, va as CooldownAlert, ba as CooldownBadge, $ as DETAIL_PATHS_BACK, Q as DETAIL_PATHS_FRONT, sa as DIFFICULTY_OPTIONS, Wa as DailyAvailabilitySettings, ni as DailyMotivationBanner, Ha as DailyProgressCard, oi as DeleteAccountModal, Ui as DemoVideoPlayer, ca as DifficultySelector, Yi as EVASlider, qi as EVA_COLORS, Ji as EVA_ICONS, Ki as EmergencyScreen, Gr as EmptyState, Sa as FALLBACK_LEVELS, Ca as FallbackIndicator, Qr as FormField, Et as IconButton, Ri as IndividualScoresDisplay, Ot as Input, Ci as IntensitySelector, wi as IntensitySelectorCompact, Jr as LoadingSpinner, Ga as LocationProfileSelector, Ia as MedicalAlertCR2, Xr as OfflineBanner, pa as PAIN_EVOLUTION_OPTIONS, ra as PHASES, Pa as PHASE_COLORS, Na as PHASE_LABELS, Da as PLAYBACK_RATES, ja as POSITION_ICONS, Ua as PRESET_OPTIONS, ma as PainEvolutionSelector, di as PatientProfileView, oa as PhaseCard, aa as PhaseIndicator, Ma as PositionSelector, Va as ProgramSelector, Dr as Progress, ha as ProgressionBadge, Pi as QuestionnaireProgress, fa as RIRSelector, da as RIR_LEVELS, ua as RPESelector, la as RPE_LEVELS, La as RestDaySuggestionModal, Xi as STATUS_CONFIG, si as SUGGESTED_SPORTS, fi as SVG_VIEWBOX, Vi as ScoreDisplay, zt as SegmentedControl, Mt as Select, Ea as SessionMessages, $r as SkipLink, _r as Slider, $e as Slot, ci as SportsPracticedInput, Ar as StepProgress, ii as SupervisionApprovedBanner, ri as SupervisionPendingBanner, It as Switch, Fa as TempoMetronome, At as Textarea, $i as VORBadge, ta as VORProgressBar, ea as VORStats, Oa as VideoPlayer, ki as ZoneDetailSheet, vr as alertVariants, jr as avatarVariants, St as badgeVariants, Ti as bodyZones, ht as buttonVariants, _t as cardVariants, Oi as categoryLabels, pr as chipVariants, J as cn, it as colors, zr as confirmButtonVariants, ya as cooldownBadgeVariants, xa as determineFallbackLevel, Ur as emptyStateActionVariants, Zr as formFieldInputVariants, za as getBodyRegionIcon, Ba as getBodyRegionLabel, ct as getPainColor, lt as getPainLabel, Di as getZonesByCategory, Ei as getZonesForView, Br as iconBgVariants, Tt as iconButtonVariants, Dt as inputVariants, st as intensityToColorKey, qr as loadingSpinnerTextVariants, Kr as loadingSpinnerVariants, Yr as offlineBannerVariants, ut as painBgClasses, ft as painBorderClasses, at as painColors, ot as painLabels, dt as painTextClasses, na as phaseIndicatorVariants, Er as progressBarVariants, Tr as progressTrackVariants, nt as radius, Lt as segmentedControlVariants, jt as selectVariants, tt as spacing, Nt as switchVariants, kt as textareaVariants, rt as touchTarget, Zi as vorBadgeVariants };

//# sourceMappingURL=index.js.map