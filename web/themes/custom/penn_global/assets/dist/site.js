(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = global || self, global.Site = factory(global.jQuery));
}(this, function ($) { 'use strict';

	$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

	//ForEach Polly
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	//Closest Polly
	//https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
	if (window.Element && !Element.prototype.closest) {
		Element.prototype.closest =
			function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i,
					el = this;
				do {
					i = matches.length;
					while (--i >= 0 && matches.item(i) !== el) { }			} while ((i < 0) && (el = el.parentElement));
				return el;
			};
	}

	//Assign Polyfill
	if (typeof Object.assign !== 'function') {
		// Must be writable: true, enumerable: false, configurable: true
		Object.defineProperty(Object, "assign", {
			value: function assign(target, varArgs) { // .length of function is 2
				var arguments$1 = arguments;

				if (target === null || target === undefined) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var to = Object(target);

				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments$1[index];

					if (nextSource !== null && nextSource !== undefined) {
						for (var nextKey in nextSource) {
							// Avoid bugs when hasOwnProperty is shadowed
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
			},
			writable: true,
			configurable: true
		});
	}

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var bows_min = createCommonjsModule(function (module, exports) {
	!function(e){{ module.exports=e(); }}(function(){return function e(n,o,r){function t(f,d){if(!o[f]){if(!n[f]){var u="function"==typeof commonjsRequire&&commonjsRequire;if(!d&&u){ return u(f,!0); }if(i){ return i(f,!0); }var a=new Error("Cannot find module '"+f+"'");throw a.code="MODULE_NOT_FOUND",a}var s=o[f]={exports:{}};n[f][0].call(s.exports,function(e){var o=n[f][1][e];return t(o||e)},s,s.exports,e,n,o,r);}return o[f].exports}for(var i="function"==typeof commonjsRequire&&commonjsRequire,f=0;f<r.length;f++){ t(r[f]); }return t}({1:[function(e,n,o){(function(o){(function(){var r=function(){return s+=.618033988749895,360*(s%=1)},t="undefined"==typeof window,i=!t&&function(){var e;try{e=window.localStorage;}catch(e){}return e}(),f=i&&i.andlogKey?i.andlogKey:"debug",d=!(!i||!i[f])&&i[f],u=e("andlog"),a=Function.prototype.bind,s=0,c=!0,l="|",p=15,w=function(){},g=i&&i.debugColors?"false"!==i.debugColors:function(){if("undefined"==typeof window||"undefined"==typeof navigator){ return !1; }var e,n=!!window.chrome,r=/firefox/i.test(navigator.userAgent),t=o&&o.versions&&o.versions.electron;if(r){var i=navigator.userAgent.match(/Firefox\/(\d+\.\d+)/);i&&i[1]&&Number(i[1])&&(e=Number(i[1]));}return n||e>=31||t}(),v=null,h=null,y=!1,m={};d&&"!"===d[0]&&"/"===d[1]&&(y=!0,d=d.slice(1)),h=d&&"/"===d[0]&&new RegExp(d.substring(1,d.length-1));for(var b=["log","debug","warn","error","info"],x=0,E=b.length;x<E;x++){ w[b[x]]=w; }v=function(e){if(!i){ return w; }var n,o,t;if(c?(n=e.slice(0,p),n+=Array(p+3-n.length).join(" ")+l):n=e+Array(3).join(" ")+l,h){var f=e.match(h);if(!y&&!f||y&&f){ return w }}if(!a){ return w; }var d=[u];if(g){m[e]||(m[e]=r());var s=m[e];n="%c"+n,o="color: hsl("+s+",99%,40%); font-weight: bold",d.push(n,o);}else { d.push(n); }if(arguments.length>1){var v=Array.prototype.slice.call(arguments,1);d=d.concat(v);}return t=a.apply(u.log,d),b.forEach(function(e){t[e]=a.apply(u[e]||t,d);}),t},v.config=function(e){e.padLength&&(p=e.padLength),"boolean"==typeof e.padding&&(c=e.padding),e.separator?l=e.separator:!1!==e.separator&&""!==e.separator||(l="");},void 0!==n?n.exports=v:window.bows=v;}).call();}).call(this,e("_process"));},{_process:3,andlog:2}],2:[function(e,n,o){!function(){var e="undefined"==typeof window,r=!e&&function(){var e;try{e=window.localStorage;}catch(e){}return e}(),t={};if(e||!r){ return void(n.exports=console); }var i=r.andlogKey||"debug";if(r&&r[i]&&window.console){ t=window.console; }else { for(var f="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d=f.length,u=function(){};d--;){ t[f[d]]=u; } }void 0!==o?n.exports=t:window.console=t;}();},{}],3:[function(e,n,o){function r(){}var t=n.exports={};t.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e){ return function(e){return window.setImmediate(e)}; }if(n){var o=[];return window.addEventListener("message",function(e){var n=e.source;if((n===window||null===n)&&"process-tick"===e.data&&(e.stopPropagation(),o.length>0)){o.shift()();}},!0),function(e){o.push(e),window.postMessage("process-tick","*");}}return function(e){setTimeout(e,0);}}(),t.title="browser",t.browser=!0,t.env={},t.argv=[],t.on=r,t.addListener=r,t.once=r,t.off=r,t.removeListener=r,t.removeAllListeners=r,t.emit=r,t.binding=function(e){throw new Error("process.binding is not supported")},t.cwd=function(){return "/"},t.chdir=function(e){throw new Error("process.chdir is not supported")};},{}]},{},[1])(1)});
	});

	/**
	 * this implementation of fitvid doesn't force items to 16/9.  It measures them and then keeps the ratio unique per embed
	 *
	 * @var selectors (string|array) additional selectors search for in the DOM
	 * @return nodes - array of matched items
	 */

	function fitvid (selectors) {
		var config = {
			selectors: [
				'iframe[src*="player.vimeo.com"]',
				'iframe[src*="youtube.com"]',
				'iframe[src*="youtube-nocookie.com"]',
				'object',
				'embed',
				'video'
			]
		};

		if (selectors) {
			if (!Array.isArray(selectors)) {
				selectors = [selectors];
			}
			config.selectors = config.selectors.concat(opts.selectors).filter(function (val, index, arr) { return arr.indexOf(val) === index; });
		}

		var nodes = Array.prototype.slice.call(document.querySelectorAll(config.selectors.join(',')));

		if (nodes.length > 0) {
			nodes.forEach(function (node) {
				if (node.getAttribute('data-fitvid')) {
					return;
				}
				var wrapper = document.createElement('div');
				var computed = window.getComputedStyle(node);
				var ratio = ((computed.height > 0 && computed.width > 0) ? computed.height / computed.width : 9 / 16) * 100;

				wrapper.className = 'fitvid';
				wrapper.style.width = '100%';
				wrapper.style.height = 0;
				wrapper.style.position = 'relative';
				wrapper.style.paddingTop = ratio + "%";

				node.style.position = 'absolute';
				node.style.top = 0;
				node.style.left = 0;
				node.style.width = '100%';
				node.style.height = '100%';
				node.setAttribute('data-fitvid', ratio);
				node.parentNode.insertBefore(wrapper, node);

				wrapper.appendChild(node);
			});
		}

		return nodes;
	}

	var log = bows_min('keyboardFocus');
	var keyboardFocusClass = 'keyboard--focus';

	// Internal flag
	var keyboardFocus = false;

	function init() {
		// Keydown event trigger
		window.addEventListener('keydown', function (e) {
			if (e.defaultPrevented || keyboardFocus) {
				return; // Do nothing
			}
			// Capture certain keys (or alt key press)
			if ('Tab' === e.key || 'Enter' === e.key || e.altKey) {
				keyboardFocus = true;
				document.body.classList.add(keyboardFocusClass);
				log('site.keyboardFocus', keyboardFocus);
			}
		});

		// Mousedown event cancel
		window.addEventListener('mousedown', function (e) {
			if (e.defaultPrevented || !keyboardFocus) {
				return; // Do nothing
			}
			// Cancel keyboard active
			keyboardFocus = false;
			document.body.classList.remove(keyboardFocusClass);
			log('site.keyboardFocus', keyboardFocus);
		});
	}
	var keyboardFocus$1 = {
		init: init
	};

	var sizeResize = {
		xlarge: [],
		large: [],
		medium: [],
		small: [],
		any: [],
		body: document.body,
		small_max: 640,
		medium_max: 1024,
		large_max: 1200,
		pause: 100,
		currentSize: '',
		previousSize: ''
	};


	function addXlarge(func, params) {
		sizeResize.xlarge.push([func, params]);
	}

	function addLarge(func, params) {
		sizeResize.large.push([func, params]);
	}

	function addMedium(func, params) {
		sizeResize.medium.push([func, params]);
	}

	function addSmall(func, params) {
		sizeResize.small.push([func, params]);
	}

	function addAny(func, params) {
		sizeResize.any.push([func, params]);
	}

	function getWidth() {
		return sizeResize.body.clientWidth;
	}

	function getCurrent(width) {
		sizeResize.previousSize = sizeResize.currentSize;
		if (width <= sizeResize.small_max) {
			sizeResize.currentSize = 'small';
		} else if (width > sizeResize.small_max && width <= sizeResize.medium_max) {
			sizeResize.currentSize = 'medium';
		} else if (width > sizeResize.medium_max && width <= sizeResize.large_max) {
			sizeResize.currentSize = 'large';
		} else {
			sizeResize.currentSize = 'xlarge';
		}
		return sizeResize.currentSize;
	}

	function runFunctions() {
		sizeResize.body.classList.remove('size--xlarge');
		sizeResize.body.classList.remove('size--large');
		sizeResize.body.classList.remove('size--medium');
		sizeResize.body.classList.remove('size--small');
		if (sizeResize.currentSize === 'small') {
			sizeResize.body.classList.add('size--small');
			for (var i = 0; i < sizeResize.small.length; i++) {
				sizeResize.small[i][0].apply(this, sizeResize.small[i][1]);
			}
		} else if (sizeResize.currentSize === 'medium') {
			sizeResize.body.classList.add('size--medium');
			for (var i = 0; i < sizeResize.medium.length; i++) {
				sizeResize.medium[i][0].apply(this, sizeResize.medium[i][1]);
			}
		} else if (sizeResize.currentSize === 'large') {
			sizeResize.body.classList.add('size--large');
			for (var i = 0; i < sizeResize.large.length; i++) {
				sizeResize.large[i][0].apply(this, sizeResize.large[i][1]);
			}
		} else if (sizeResize.currentSize === 'xlarge') {
			sizeResize.body.classList.add('size--xlarge');
			for (var i = 0; i < sizeResize.xlarge.length; i++) {
				sizeResize.xlarge[i][0].apply(this, sizeResize.xlarge[i][1]);
			}
		}

		for (var i = 0; i < sizeResize.any.length; i++) {
			sizeResize.any[i][0].apply(this, sizeResize.any[i][1]);
		}
	}

	function sizeCheck() {
		var _this = this;
		if (_this.getCurrent(_this.getWidth()) === sizeResize.previousSize) {
			return false;
		}

		_this.runFunctions();
	}

	function init$1() {
		var _this = this;
		_this.getCurrent(_this.getWidth());
		_this.runFunctions();

		var endResizeEvent;
		window.onresize = function () {
			clearTimeout(endResizeEvent);
			endResizeEvent = setTimeout(function () {
				// Run code here, resizing has "stopped"
				_this.sizeCheck();
			}, sizeResize.pause);
		};
	}


	var size = {
		init: init$1,
		addXlarge: addXlarge,
		addLarge: addLarge,
		addMedium: addMedium,
		addSmall: addSmall,
		addAny: addAny,
		getWidth: getWidth,
		getCurrent: getCurrent,
		runFunctions: runFunctions,
		sizeCheck: sizeCheck
	};

	/*! npm.im/object-fit-images 3.2.4 */

	var OFI = 'bfred-it:object-fit-images';
	var propRegex = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g;
	var testImg = typeof Image === 'undefined' ? {style: {'object-position': 1}} : new Image();
	var supportsObjectFit = 'object-fit' in testImg.style;
	var supportsObjectPosition = 'object-position' in testImg.style;
	var supportsOFI = 'background-size' in testImg.style;
	var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
	var nativeGetAttribute = testImg.getAttribute;
	var nativeSetAttribute = testImg.setAttribute;
	var autoModeEnabled = false;

	function createPlaceholder(w, h) {
		return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
	}

	function polyfillCurrentSrc(el) {
		if (el.srcset && !supportsCurrentSrc && window.picturefill) {
			var pf = window.picturefill._;
			// parse srcset with picturefill where currentSrc isn't available
			if (!el[pf.ns] || !el[pf.ns].evaled) {
				// force synchronous srcset parsing
				pf.fillImg(el, {reselect: true});
			}

			if (!el[pf.ns].curSrc) {
				// force picturefill to parse srcset
				el[pf.ns].supported = false;
				pf.fillImg(el, {reselect: true});
			}

			// retrieve parsed currentSrc, if any
			el.currentSrc = el[pf.ns].curSrc || el.src;
		}
	}

	function getStyle(el) {
		var style = getComputedStyle(el).fontFamily;
		var parsed;
		var props = {};
		while ((parsed = propRegex.exec(style)) !== null) {
			props[parsed[1]] = parsed[2];
		}
		return props;
	}

	function setPlaceholder(img, width, height) {
		// Default: fill width, no height
		var placeholder = createPlaceholder(width || 1, height || 0);

		// Only set placeholder if it's different
		if (nativeGetAttribute.call(img, 'src') !== placeholder) {
			nativeSetAttribute.call(img, 'src', placeholder);
		}
	}

	function onImageReady(img, callback) {
		// naturalWidth is only available when the image headers are loaded,
		// this loop will poll it every 100ms.
		if (img.naturalWidth) {
			callback(img);
		} else {
			setTimeout(onImageReady, 100, img, callback);
		}
	}

	function fixOne(el) {
		var style = getStyle(el);
		var ofi = el[OFI];
		style['object-fit'] = style['object-fit'] || 'fill'; // default value

		// Avoid running where unnecessary, unless OFI had already done its deed
		if (!ofi.img) {
			// fill is the default behavior so no action is necessary
			if (style['object-fit'] === 'fill') {
				return;
			}

			// Where object-fit is supported and object-position isn't (Safari < 10)
			if (
				!ofi.skipTest && // unless user wants to apply regardless of browser support
				supportsObjectFit && // if browser already supports object-fit
				!style['object-position'] // unless object-position is used
			) {
				return;
			}
		}

		// keep a clone in memory while resetting the original to a blank
		if (!ofi.img) {
			ofi.img = new Image(el.width, el.height);
			ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
			ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;

			// preserve for any future cloneNode calls
			// https://github.com/bfred-it/object-fit-images/issues/53
			nativeSetAttribute.call(el, "data-ofi-src", el.src);
			if (el.srcset) {
				nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
			}

			setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);

			// remove srcset because it overrides src
			if (el.srcset) {
				el.srcset = '';
			}
			try {
				keepSrcUsable(el);
			} catch (err) {
				if (window.console) {
					console.warn('https://bit.ly/ofi-old-browser');
				}
			}
		}

		polyfillCurrentSrc(ofi.img);

		el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
		el.style.backgroundPosition = style['object-position'] || 'center';
		el.style.backgroundRepeat = 'no-repeat';
		el.style.backgroundOrigin = 'content-box';

		if (/scale-down/.test(style['object-fit'])) {
			onImageReady(ofi.img, function () {
				if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
					el.style.backgroundSize = 'contain';
				} else {
					el.style.backgroundSize = 'auto';
				}
			});
		} else {
			el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
		}

		onImageReady(ofi.img, function (img) {
			setPlaceholder(el, img.naturalWidth, img.naturalHeight);
		});
	}

	function keepSrcUsable(el) {
		var descriptors = {
			get: function get(prop) {
				return el[OFI].img[prop ? prop : 'src'];
			},
			set: function set(value, prop) {
				el[OFI].img[prop ? prop : 'src'] = value;
				nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
				fixOne(el);
				return value;
			}
		};
		Object.defineProperty(el, 'src', descriptors);
		Object.defineProperty(el, 'currentSrc', {
			get: function () { return descriptors.get('currentSrc'); }
		});
		Object.defineProperty(el, 'srcset', {
			get: function () { return descriptors.get('srcset'); },
			set: function (ss) { return descriptors.set(ss, 'srcset'); }
		});
	}

	function hijackAttributes() {
		function getOfiImageMaybe(el, name) {
			return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
		}
		if (!supportsObjectPosition) {
			HTMLImageElement.prototype.getAttribute = function (name) {
				return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
			};

			HTMLImageElement.prototype.setAttribute = function (name, value) {
				return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
			};
		}
	}

	function fix(imgs, opts) {
		var startAutoMode = !autoModeEnabled && !imgs;
		opts = opts || {};
		imgs = imgs || 'img';

		if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
			return false;
		}

		// use imgs as a selector or just select all images
		if (imgs === 'img') {
			imgs = document.getElementsByTagName('img');
		} else if (typeof imgs === 'string') {
			imgs = document.querySelectorAll(imgs);
		} else if (!('length' in imgs)) {
			imgs = [imgs];
		}

		// apply fix to all
		for (var i = 0; i < imgs.length; i++) {
			imgs[i][OFI] = imgs[i][OFI] || {
				skipTest: opts.skipTest
			};
			fixOne(imgs[i]);
		}

		if (startAutoMode) {
			document.body.addEventListener('load', function (e) {
				if (e.target.tagName === 'IMG') {
					fix(e.target, {
						skipTest: opts.skipTest
					});
				}
			}, true);
			autoModeEnabled = true;
			imgs = 'img'; // reset to a generic selector for watchMQ
		}

		// if requested, watch media queries for object-fit change
		if (opts.watchMQ) {
			window.addEventListener('resize', fix.bind(null, imgs, {
				skipTest: opts.skipTest
			}));
		}
	}

	fix.supportsObjectFit = supportsObjectFit;
	fix.supportsObjectPosition = supportsObjectPosition;

	hijackAttributes();

	var ofi_commonJs = fix;

	//import $ from "jquery";

	var log$1 = bows_min("modal");
	var modalBtn = document.querySelectorAll("[data-modal]");
	var body = document.querySelector("body");
	var top = document.getElementById("top");
	var modalOverlay = document.getElementById("modal-overlay");



	var focusable = top.querySelectorAll(
		"a,button,input,select,iframe,video,audio, textarea"
	);

	var current_modal = "";

	// Allow Esc key to close modal
	function esc() {
		document.addEventListener("keydown", function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key == "Escape" || evt.key == "Esc";
			} else {
				isEscape = evt.keyCode == 27;
			}

			if (isEscape && body.classList.contains("modal-open")) {
				closeModal();
			}
		});
	}

	// Remove focus from anything in the #top div. Traps focus in the  modal
	function removeFocus() {
		focusable.forEach(function (elm) {
			elm.setAttribute("tabindex", "-1");
		});
	}

	// Allows focus outside of the modal.
	function enableFocus() {
		focusable.forEach(function (elm) {
			elm.removeAttribute("tabindex");
		});
	}

	function closeModal() {
		var player = current_modal.querySelector('video');
		var return_focus = document.querySelector(".return_focus");

		current_modal.classList.remove("modal--show");
		if (player) {
			player.pause();
		}
		setTimeout(function () {
			current_modal.setAttribute("aria-hidden", true);
			body.classList.remove("modal-open");
		}, 250);

		enableFocus();
		return_focus.focus();
		return_focus.classList.remove("return_focus");
	}

	function doModal() {
		var player = current_modal.querySelector('video');

		body.classList.add("modal-open");

		current_modal.setAttribute("aria-hidden", false);
		current_modal.setAttribute("tabindex", "-1");

		setTimeout(function () {
			current_modal.classList.add("modal--show");
		}, 150);

		// Get elements to remove focus on, grab each time incase of AJAX loaded content
		focusable = top.querySelectorAll(
			"a,button,input,select,iframe,video,audio, textarea"
		);
		removeFocus();


		current_modal.focus();
		if (player) {
			player.play();
		}

	}

	function showModal() {
		var which = this.getAttribute("data-modal");
		current_modal = document.getElementById(which);
		if (current_modal !== undefined && current_modal !== null) {
			log$1(which);
			this.classList.add("return_focus");
			doModal();
		}
	}



	function init$2() {
		log$1("modal init");
		if (modalBtn) {
			var modal_close = document.querySelectorAll(".modal__close");
			modal_close.forEach(function (btn) {
				btn.addEventListener("click", closeModal);
			});
			modalBtn.forEach(function (btn) {
				btn.addEventListener("click", showModal);
			});

			esc();
		}


		if (modalOverlay) {
			// Closes modal if user clicks the overlay
			modalOverlay.addEventListener("click", closeModal);
		}

	}

	var modal = {
		init: init$2
	};

	var headroom = createCommonjsModule(function (module, exports) {
	/*!
	 * headroom.js v0.11.0 - Give your page some headroom. Hide your header until you need it
	 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
	 * License: MIT
	 */

	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, function () {
	  function isBrowser() {
	    return typeof window !== "undefined";
	  }

	  /**
	   * Used to detect browser support for adding an event listener with options
	   * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	   */
	  function passiveEventsSupported() {
	    var supported = false;

	    try {
	      var options = {
	        // eslint-disable-next-line getter-return
	        get passive() {
	          supported = true;
	        }
	      };
	      window.addEventListener("test", options, options);
	      window.removeEventListener("test", options, options);
	    } catch (err) {
	      supported = false;
	    }

	    return supported;
	  }

	  function isSupported() {
	    return !!(
	      isBrowser() &&
	      function() {}.bind &&
	      "classList" in document.documentElement &&
	      Object.assign &&
	      Object.keys &&
	      requestAnimationFrame
	    );
	  }

	  function isDocument(obj) {
	    return obj.nodeType === 9; // Node.DOCUMENT_NODE === 9
	  }

	  function isWindow(obj) {
	    // `obj === window` or `obj instanceof Window` is not sufficient,
	    // as the obj may be the window of an iframe.
	    return obj && obj.document && isDocument(obj.document);
	  }

	  function windowScroller(win) {
	    var doc = win.document;
	    var body = doc.body;
	    var html = doc.documentElement;

	    return {
	      /**
	       * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
	       * @return {Number} the scroll height of the document in pixels
	       */
	      scrollHeight: function() {
	        return Math.max(
	          body.scrollHeight,
	          html.scrollHeight,
	          body.offsetHeight,
	          html.offsetHeight,
	          body.clientHeight,
	          html.clientHeight
	        );
	      },

	      /**
	       * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
	       * @return {Number} the height of the viewport in pixels
	       */
	      height: function() {
	        return win.innerHeight || html.clientHeight || body.clientHeight;
	      },

	      /**
	       * Gets the Y scroll position
	       * @return {Number} pixels the page has scrolled along the Y-axis
	       */
	      scrollY: function() {
	        if (win.pageYOffset !== undefined) {
	          return win.pageYOffset;
	        }

	        return (html || body.parentNode || body).scrollTop;
	      }
	    };
	  }

	  function elementScroller(element) {
	    return {
	      /**
	       * @return {Number} the scroll height of the element in pixels
	       */
	      scrollHeight: function() {
	        return Math.max(
	          element.scrollHeight,
	          element.offsetHeight,
	          element.clientHeight
	        );
	      },

	      /**
	       * @return {Number} the height of the element in pixels
	       */
	      height: function() {
	        return Math.max(element.offsetHeight, element.clientHeight);
	      },

	      /**
	       * Gets the Y scroll position
	       * @return {Number} pixels the element has scrolled along the Y-axis
	       */
	      scrollY: function() {
	        return element.scrollTop;
	      }
	    };
	  }

	  function createScroller(element) {
	    return isWindow(element) ? windowScroller(element) : elementScroller(element);
	  }

	  /**
	   * @param element EventTarget
	   */
	  function trackScroll(element, options, callback) {
	    var isPassiveSupported = passiveEventsSupported();
	    var rafId;
	    var scrolled = false;
	    var scroller = createScroller(element);
	    var lastScrollY = scroller.scrollY();
	    var details = {};

	    function update() {
	      var scrollY = Math.round(scroller.scrollY());
	      var height = scroller.height();
	      var scrollHeight = scroller.scrollHeight();

	      // reuse object for less memory churn
	      details.scrollY = scrollY;
	      details.lastScrollY = lastScrollY;
	      details.direction = scrollY > lastScrollY ? "down" : "up";
	      details.distance = Math.abs(scrollY - lastScrollY);
	      details.isOutOfBounds = scrollY < 0 || scrollY + height > scrollHeight;
	      details.top = scrollY <= options.offset;
	      details.bottom = scrollY + height >= scrollHeight;
	      details.toleranceExceeded =
	        details.distance > options.tolerance[details.direction];

	      callback(details);

	      lastScrollY = scrollY;
	      scrolled = false;
	    }

	    function handleScroll() {
	      if (!scrolled) {
	        scrolled = true;
	        rafId = requestAnimationFrame(update);
	      }
	    }

	    var eventOptions = isPassiveSupported
	      ? { passive: true, capture: false }
	      : false;

	    element.addEventListener("scroll", handleScroll, eventOptions);
	    update();

	    return {
	      destroy: function() {
	        cancelAnimationFrame(rafId);
	        element.removeEventListener("scroll", handleScroll, eventOptions);
	      }
	    };
	  }

	  function normalizeTolerance(t) {
	    return t === Object(t) ? t : { down: t, up: t };
	  }

	  /**
	   * UI enhancement for fixed headers.
	   * Hides header when scrolling down
	   * Shows header when scrolling up
	   * @constructor
	   * @param {DOMElement} elem the header element
	   * @param {Object} options options for the widget
	   */
	  function Headroom(elem, options) {
	    options = options || {};
	    Object.assign(this, Headroom.options, options);
	    this.classes = Object.assign({}, Headroom.options.classes, options.classes);

	    this.elem = elem;
	    this.tolerance = normalizeTolerance(this.tolerance);
	    this.initialised = false;
	    this.frozen = false;
	  }
	  Headroom.prototype = {
	    constructor: Headroom,

	    /**
	     * Start listening to scrolling
	     * @public
	     */
	    init: function() {
	      if (Headroom.cutsTheMustard && !this.initialised) {
	        this.addClass("initial");
	        this.initialised = true;

	        // defer event registration to handle browser
	        // potentially restoring previous scroll position
	        setTimeout(
	          function(self) {
	            self.scrollTracker = trackScroll(
	              self.scroller,
	              { offset: self.offset, tolerance: self.tolerance },
	              self.update.bind(self)
	            );
	          },
	          100,
	          this
	        );
	      }

	      return this;
	    },

	    /**
	     * Destroy the widget, clearing up after itself
	     * @public
	     */
	    destroy: function() {
	      this.initialised = false;
	      Object.keys(this.classes).forEach(this.removeClass, this);
	      this.scrollTracker.destroy();
	    },

	    /**
	     * Unpin the element
	     * @public
	     */
	    unpin: function() {
	      if (this.hasClass("pinned") || !this.hasClass("unpinned")) {
	        this.addClass("unpinned");
	        this.removeClass("pinned");

	        if (this.onUnpin) {
	          this.onUnpin.call(this);
	        }
	      }
	    },

	    /**
	     * Pin the element
	     * @public
	     */
	    pin: function() {
	      if (this.hasClass("unpinned")) {
	        this.addClass("pinned");
	        this.removeClass("unpinned");

	        if (this.onPin) {
	          this.onPin.call(this);
	        }
	      }
	    },

	    /**
	     * Freezes the current state of the widget
	     * @public
	     */
	    freeze: function() {
	      this.frozen = true;
	      this.addClass("frozen");
	    },

	    /**
	     * Re-enables the default behaviour of the widget
	     * @public
	     */
	    unfreeze: function() {
	      this.frozen = false;
	      this.removeClass("frozen");
	    },

	    top: function() {
	      if (!this.hasClass("top")) {
	        this.addClass("top");
	        this.removeClass("notTop");

	        if (this.onTop) {
	          this.onTop.call(this);
	        }
	      }
	    },

	    notTop: function() {
	      if (!this.hasClass("notTop")) {
	        this.addClass("notTop");
	        this.removeClass("top");

	        if (this.onNotTop) {
	          this.onNotTop.call(this);
	        }
	      }
	    },

	    bottom: function() {
	      if (!this.hasClass("bottom")) {
	        this.addClass("bottom");
	        this.removeClass("notBottom");

	        if (this.onBottom) {
	          this.onBottom.call(this);
	        }
	      }
	    },

	    notBottom: function() {
	      if (!this.hasClass("notBottom")) {
	        this.addClass("notBottom");
	        this.removeClass("bottom");

	        if (this.onNotBottom) {
	          this.onNotBottom.call(this);
	        }
	      }
	    },

	    shouldUnpin: function(details) {
	      var scrollingDown = details.direction === "down";

	      return scrollingDown && !details.top && details.toleranceExceeded;
	    },

	    shouldPin: function(details) {
	      var scrollingUp = details.direction === "up";

	      return (scrollingUp && details.toleranceExceeded) || details.top;
	    },

	    addClass: function(className) {
	      this.elem.classList.add.apply(
	        this.elem.classList,
	        this.classes[className].split(" ")
	      );
	    },

	    removeClass: function(className) {
	      this.elem.classList.remove.apply(
	        this.elem.classList,
	        this.classes[className].split(" ")
	      );
	    },

	    hasClass: function(className) {
	      return this.classes[className].split(" ").every(function(cls) {
	        return this.classList.contains(cls);
	      }, this.elem);
	    },

	    update: function(details) {
	      if (details.isOutOfBounds) {
	        // Ignore bouncy scrolling in OSX
	        return;
	      }

	      if (this.frozen === true) {
	        return;
	      }

	      if (details.top) {
	        this.top();
	      } else {
	        this.notTop();
	      }

	      if (details.bottom) {
	        this.bottom();
	      } else {
	        this.notBottom();
	      }

	      if (this.shouldUnpin(details)) {
	        this.unpin();
	      } else if (this.shouldPin(details)) {
	        this.pin();
	      }
	    }
	  };

	  /**
	   * Default options
	   * @type {Object}
	   */
	  Headroom.options = {
	    tolerance: {
	      up: 0,
	      down: 0
	    },
	    offset: 0,
	    scroller: isBrowser() ? window : null,
	    classes: {
	      frozen: "headroom--frozen",
	      pinned: "headroom--pinned",
	      unpinned: "headroom--unpinned",
	      top: "headroom--top",
	      notTop: "headroom--not-top",
	      bottom: "headroom--bottom",
	      notBottom: "headroom--not-bottom",
	      initial: "headroom"
	    }
	  };

	  Headroom.cutsTheMustard = isSupported();

	  return Headroom;

	}));
	});

	var hoverintent = function(el, onOver, onOut) {
	  var x, y, pX, pY;
	  var mouseOver = false;
	  var focused = false;
	  var h = {},
	    state = 0,
	    timer = 0;

	  var options = {
	    sensitivity: 7,
	    interval: 100,
	    timeout: 0,
	    handleFocus: false
	  };

	  function delay(el, e) {
	    if (timer) { timer = clearTimeout(timer); }
	    state = 0;
	    return focused ? undefined : onOut.call(el, e);
	  }

	  function tracker(e) {
	    x = e.clientX;
	    y = e.clientY;
	  }

	  function compare(el, e) {
	    if (timer) { timer = clearTimeout(timer); }
	    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
	      state = 1;
	      return focused ? undefined : onOver.call(el, e);
	    } else {
	      pX = x;
	      pY = y;
	      timer = setTimeout(function() {
	        compare(el, e);
	      }, options.interval);
	    }
	  }

	  // Public methods
	  h.options = function(opt) {
	    var focusOptionChanged = opt.handleFocus !== options.handleFocus;
	    options = Object.assign({}, options, opt);
	    if (focusOptionChanged) {
	      options.handleFocus ? addFocus() : removeFocus();
	    }
	    return h;
	  };

	  function dispatchOver(e) {
	    mouseOver = true;
	    if (timer) { timer = clearTimeout(timer); }
	    el.removeEventListener('mousemove', tracker, false);

	    if (state !== 1) {
	      pX = e.clientX;
	      pY = e.clientY;

	      el.addEventListener('mousemove', tracker, false);

	      timer = setTimeout(function() {
	        compare(el, e);
	      }, options.interval);
	    }

	    return this;
	  }

	  function dispatchOut(e) {
	    mouseOver = false;
	    if (timer) { timer = clearTimeout(timer); }
	    el.removeEventListener('mousemove', tracker, false);

	    if (state === 1) {
	      timer = setTimeout(function() {
	        delay(el, e);
	      }, options.timeout);
	    }

	    return this;
	  }

	  function dispatchFocus(e) {
	    if (!mouseOver) {
	      focused = true;
	      onOver.call(el, e);
	    }
	  }

	  function dispatchBlur(e) {
	    if (!mouseOver && focused) {
	      focused = false;
	      onOut.call(el, e);
	    }
	  }

	  function addFocus() {
	    el.addEventListener('focus', dispatchFocus, false);
	    el.addEventListener('blur', dispatchBlur, false);
	  }

	  function removeFocus() {
	    el.removeEventListener('focus', dispatchFocus, false);
	    el.removeEventListener('blur', dispatchBlur, false);
	  }

	  h.remove = function() {
	    if (!el) { return; }
	    el.removeEventListener('mouseover', dispatchOver, false);
	    el.removeEventListener('mouseout', dispatchOut, false);
	    removeFocus();
	  };

	  if (el) {
	    el.addEventListener('mouseover', dispatchOver, false);
	    el.addEventListener('mouseout', dispatchOut, false);
	  }

	  return h;
	};

	var log$2 = bows_min("overlays");

	/*
	No jQuery necessary.
	Thanks to Dan's StackOverflow answer for this:
	http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/

	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function isAnyPartOfElementInViewport(el) {

		var rect = el.getBoundingClientRect();
		// DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
		var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
		var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

		// http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
		var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
		var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

		return (vertInView && horInView);
	}


	var inViewport = {
		isElementInViewport: isElementInViewport,
		isAnyPartOfElementInViewport: isAnyPartOfElementInViewport
	};

	var alertContent = document.querySelector('.alert-content');
	var header = document.getElementById('header');
	var closeBtn = document.querySelectorAll('.alert__close');
	var notification = document.querySelectorAll('.alert');
	var body$1 = document.querySelector('body');

	var log$3 = bows_min("alerts");

	function alertHeight() {
		if (header && alertContent) {
			header.style.top = alertContent.offsetHeight + 'px';
		}
	}

	function closeAlert() {
		//close alert, get new height of alertContent & change header top position
		//localStorage to remember what's been closed
		var currentAlert = this.closest('.alert');

		if (currentAlert.classList.contains('alert--emergency') === true) {
			body$1.classList.remove('alert-emergency');
		}
		log$3(currentAlert.dataset.alert);

		currentAlert.style.display = 'none';

		if (currentAlert.dataset.alert) {
			localStorage.setItem(currentAlert.dataset.alert, true);
		}

		setTimeout(function () {
			alertHeight();
		}, 100);

	}

	window.clearAlert = function () {
		localStorage.removeItem('emergency');
		localStorage.removeItem('primary');
		localStorage.removeItem('secondary');
		log$3('alerts cleared');
	};


	function init$3() {
		if (alertContent) {

			//header top position
			alertHeight();

			closeBtn.forEach(function (btn) {
				btn.addEventListener("click", closeAlert);
			});

			notification.forEach(function (notification) {
				if (notification.dataset.alert && localStorage.getItem(notification.dataset.alert)) {
					notification.style.display = 'none';
					alertHeight();
				} else {
					if (notification.classList.contains('alert--emergency') === true && body$1.classList.contains('styleguide') === false) {
						body$1.classList.add('alert-emergency');
					}
					body$1.classList.add('has-alerts');
					notification.style.display = 'block';
					alertHeight();
				}
			});


			window.addEventListener('resize', alertHeight);

		}
	}

	var alert = {
		init: init$3, alertHeight: alertHeight
	};

	// import $ from "jquery";


	var log$4 = bows_min("navigation");
	var body$2 = document.body;

	var top$1 = document.getElementById("top");
	var header$1 = document.getElementById('header');
	var search = document.getElementById('search__input');

	var mainNav = document.querySelector('.nav--primary');
	var navMainBtn = document.querySelector('.header__toggle-btn--menu');
	var mobileSubNavButton = document.querySelectorAll('.nav__menu-button--level-1');
	var topLevelButton = document.querySelectorAll('.nav__menu-button--level-0');
	var topLevelLink = document.querySelectorAll('.nav__menu-link[data-level="0"]');
	var childMenus = document.querySelectorAll('.nav__menu-item--level-0.nav__menu-item--children');


	var searchBtn = document.querySelectorAll('.header__toggle-btn--search');
	var searchCloseBtn = document.querySelector('.search__close');
	var searchSection = document.querySelector('.search--header');

	var dropdown = document.querySelector('.nav-dropdown');
	var dropdownBtn = document.querySelector('.nav-dropdown__toggle-btn');
	var utilItems = document.querySelectorAll('.nav--secondary > *:not(.nav-dropdown)');

	var skipSearch = document.querySelector('.skip-link--search');
	var skipResources = document.querySelector('.skip-link--resources');

	var headerMenus = document.getElementById('headerMenus');
	var secondaryNav = document.querySelector('.nav--secondary');

	var isSafari = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome;
	if (isSafari) {
		body$2.classList.add('isSafari');
	}

	log$4(alert.alertHeight());

	// headroom variables
	var headroomActive = false;
	var hero = document.querySelector('main>*:first-child');
	//let hero = document.querySelector('.hero');

	var herosticky = false;
	var nav = document.getElementById('header');
	var headroom$1 = new headroom(nav, {
		offset: 60,
		tolerance: {
			down: 25,
			up: 25
		},
		onNotTop: function () {
			body$2.classList.remove('search-open', 'search-opened');
		}
	});



	var focusable$1 = top$1.querySelectorAll(
		"a,button,input,select,iframe,video,audio, textarea"
	);

	function enableFocus$1() {
		focusable$1.forEach(function (elm) {
			elm.removeAttribute("tabindex");
		});
	}

	function returnFocus(doFocus) {
		var returnFocusElm = document.querySelector('.return-focus');
		if (returnFocusElm !== null) {
			if (doFocus !== false) {
				returnFocusElm.focus();
			}
			returnFocusElm.classList.remove('return-focus');
		}
	}

	function closeAllSubNav() {
		mobileSubNavButton.forEach(function (msb) {
			closeSubMenu(msb);
		});
	}

	function openMenu() {

		// focusable = top.querySelectorAll(
		// 	"a,button,input,select,iframe,video,audio, textarea"
		// );

		// removeFocus();

		// focusable = header.querySelectorAll(
		// 	"a,button,input,select,iframe,video,audio, textarea"
		// );
		// enableFocus();

		body$2.classList.add('menu-opened');
		body$2.classList.add('menu-open');

		hideAlerts();

		//headerMenus.setAttribute('tabindex', '-1');
		setTimeout(function () {

			var firstItem = headerMenus.querySelector('a');
			firstItem.focus();
		}, 500);
	}

	function closeMenu(doFocus) {
		if ( doFocus === void 0 ) doFocus = true;

		var ariaExpanded = header$1.querySelectorAll('[aria-expanded]');
		ariaExpanded.forEach(function (ae) {
			ae.setAttribute('aria-expanded', false);
		});

		enableFocus$1();
		body$2.classList.remove('menu-open');
		body$2.classList.remove('menu-opened');

		showAlerts();

		// setTimeout(() => {
		// 	body.classList.remove('menu-opened');
		// }, 5);

		returnFocus(doFocus);

		var nmbo = document.querySelectorAll('.nav__menu-button--open');
		nmbo.forEach(function (el) {
			closeSubMenu(el);
		});

	}

	function hideAlerts() {
		if ( $("body").hasClass("has-alerts") == true ) {
			if ( $("#header").hasClass("headroom--not-top") == false ) {
				$(".header").css({
				"position": "fixed",
				"top": "0"
				});
			}
		
			$(".alert-content").css("visibility", "hidden");
		
			if ( $("#header").hasClass("headroom--not-top") == false ) {
				$("#content").css("margin", "-"+alertContentHeight()+"px 0 0 0");
			}
		}
	}

	function showAlerts() {
		if ( $("body").hasClass("has-alerts") == true ) {
			if ( $("#header").hasClass("headroom--not-top") == false ) {
				$(".header").css({
				"position": "absolute",
				"top": alertContentHeight()+"px"
				});
			}
		
			$(".alert-content").css("visibility", "visible");
		
			if ( $("#header").hasClass("headroom--not-top") == false ) {
				$("#content").css("margin", "0 0 0 0");
			}
		}
	}

	function closeMenuIfInactive(e) {
		setTimeout(function() {
			if (body$2.clientWidth >= 1024 && !mainNav.contains(document.activeElement)) {
				closeMenu(false); //close menu without returning focus, since the user has left the menu
			} else if (body$2.clientWidth < 1024 && !header$1.contains(document.activeElement)) {
				// On mobile, close the menu when focus leaves the header altogether
				closeMenu(false);
			}
		}.bind(this), 500); // give users enough time to finish a full click
	}

	function closeSearchIfInactive(e) {
		setTimeout(function() {
			if (!searchSection.contains(document.activeElement)) {
				closeSearch();
			}
		}.bind(this), 500); // give users enough time to finish a full click
	}

	function setReturnFocus($this) {
		returnFocus(false);
		$this.classList.add('return-focus');
	}


	function toggleMenu() {
		this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
		if (body$2.classList.contains('menu-opened') === false) {
			shouldCloseSearch();
			setReturnFocus(this);
			openMenu();
		} else {
			closeMenu();
		}
	}

	function esc$1() {
		document.addEventListener("keydown", function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key == "Escape" || evt.key == "Esc";
			} else {
				isEscape = evt.keyCode == 27;
			}

			if (isEscape && (body$2.classList.contains('menu-opened') === true ||  body$2.classList.contains('toplevel-opened') )) {
				closeMenu();
			}
			if (isEscape && body$2.classList.contains('search-opened') === true) {
				closeSearch();
			}
			if (isEscape && dropdown.classList.contains('nav-dropdown--active') === true) {
				closeDropdown();
			}
		});
	}


	function subMenuOpen(el, time) {

		el.classList.add('nav__submenu--visible');
		setTimeout(function () {
			el.classList.add('nav__submenu--active');
		}, time);
	}

	function subMenuClose(el, time) {
		el.classList.remove('nav__submenu--visible');
		setTimeout(function () {
			el.classList.remove('nav__submenu--active');
		}, time);
	}

	function openSubMenu(el) {

		var navItem = el.closest('.nav__menu-item');
		var nextSubmenu = navItem.querySelector('.nav__submenu');
		var nextNavmenu = navItem.querySelector('.nav__menu');
		var prevSibling = el.previousElementSibling;

		el.classList.add('nav__menu-button--open');
		navItem.classList.add('nav__menu-item--open');

		el.setAttribute('aria-expanded', true);
		prevSibling.classList.add('nav__menu-link--active');

		if (nextSubmenu) {
			subMenuOpen(nextSubmenu, 5);
		} else if (nextNavmenu) {
			subMenuOpen(nextNavmenu, 5);
		}
	}

	function closeSubMenu(el) {
		// let thisParent = this.parentNode;
		if (el !== undefined) {
			el.classList.remove('nav__menu-button--open');
			var navItem = el.closest('.nav__menu-item');
			var nextSubmenu = navItem.querySelector('.nav__submenu');
			var prevSibling = el.previousElementSibling;

			navItem.classList.remove('nav__menu-item--open');

			el.setAttribute('aria-expanded', false);
			prevSibling.classList.remove('nav__menu-link--active');

			var nextSibling = el.nextElementSibling;

			if (nextSibling !== null) {
				subMenuClose(nextSibling, 5);
			} else if (nextSubmenu) {
				subMenuClose(nextSubmenu, 5);
			}
		}
	}

	function toggleSubMenu() {
		this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
		if (this.classList.contains('nav__menu-button--open') === false) {
			if (body$2.clientWidth >= 1024) {
				closeAllSubNav();
			}
			openSubMenu(this);

		} else {
			closeSubMenu(this);
		}
	}


	function closeTopLevel(all, $this) {
		if (document.body.clientWidth >= 1024 && all !== false) {
			childMenus.forEach(function (el) {
				var btn = el.querySelector('.nav__menu-button--level-0');
				var subMenu = el.querySelector('.nav__submenu');
				var navItem = el.closest('.nav__menu-item');
				if (btn) {
					btn.classList.remove('nav__menu-button--open');
				}
				if (subMenu) {
					subMenu.classList.remove('nav__submenu--visible');
					subMenu.classList.remove('nav__submenu--active');
				}
				if (navItem) {
					navItem.classList.remove('nav__menu-item--open');
				}
				body$2.classList.remove('toplevel-opened');
			});
		} else {
			var subMenu = $this.closest('li').querySelector('.nav__submenu');
			var navItem = $this.closest('.nav__menu-item');
			$this.setAttribute('aria-expanded', false);
			$this.classList.remove('nav__menu-button--open');
			navItem.classList.remove('nav__menu-item--open');
			body$2.classList.remove('toplevel-opened');
			if (subMenu) {
				subMenu.classList.remove('nav__submenu--visible');
				setTimeout(function () {
					subMenu.classList.remove('nav__submenu--active');
				}, 10);
			}
		}
	}

	function openTopLevel($this) {
		var subMenu = $this.closest('li').querySelector('.nav__submenu');
		var navItem = $this.closest('.nav__menu-item');
		$this.setAttribute('aria-expanded', true);
		$this.classList.add('nav__menu-button--open');
		navItem.classList.add('nav__menu-item--open');
		body$2.classList.add('toplevel-opened');
		if (subMenu) {
			subMenu.classList.add('nav__submenu--visible');
			setTimeout(function () {
				subMenu.classList.add('nav__submenu--active');
			}, 10);
		}
	}

	function toggleTopMenu() {
		this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
		if (this.classList.contains('nav__menu-button--open')) {
			closeTopLevel(false, this);
		} else {
			if (document.body.clientWidth >= 1024) {
				closeTopLevel(true);
				setReturnFocus(this);
			}
			openTopLevel(this);
			shouldCloseSearch();
		}

	}


	function openSearch() {
		body$2.classList.add('search-opened');
		setTimeout(function () {
			body$2.classList.add('search-open');
		}, 100);
		setTimeout(function () {
			search.focus();
		}, 800);

	}

	function shouldCloseSearch() {
		log$4('shouldCloseSearch');
		if (body$2.classList.contains('search-opened') === true) {
			closeSearch(false);
		}
	}

	function closeSearch(doReturnFocus) {
		body$2.classList.remove('search-open');

		setTimeout(function () {
			body$2.classList.add('search-closing');
		}, 100);
		setTimeout(function () {
			body$2.classList.remove('search-opened');
			body$2.classList.remove('search-closing');
		}, 500);

		if (doReturnFocus !== false) {
			returnFocus();
		}
	}

	function toggleSearch() {
		if (body$2.classList.contains('search-opened') === false) {
			if (body$2.classList.contains('menu-opened') === true) {
				closeMenu();
			}
			if (document.body.clientWidth >= 1024) {
				closeTopLevel();
			}
			setReturnFocus(this);
			openSearch();
		} else {
			closeSearch();
		}

	}

	function openDropdown() {

		if (body$2.classList.contains('search-open') === true) {
			closeSearch(false);
		}
		closeMenu();

		dropdown.classList.add('nav-dropdown--active');
		dropdownBtn.classList.add('nav__dropdown-toggle-btn--open');
		dropdownBtn.setAttribute('aria-expanded', true);
	}

	function closeDropdown() {
		dropdown.classList.remove('nav-dropdown--active');
		dropdownBtn.classList.remove('nav__dropdown-toggle-btn--open');
		dropdownBtn.setAttribute('aria-expanded', false);
	}

	function toggleDropdown() {
		if (this.classList.contains('nav__dropdown-toggle-btn--open') === false) {
			openDropdown();
		} else {
			closeDropdown();
		}
	}

	function itemHoverIntent(element, theClass, visClass, time) {
		var opts = {
			timeout: time
		};

		element.forEach(function (elem) {
			var hoverListener = hoverintent(elem,
				function () {
					if (document.body.clientWidth >= 1024) {
						closeTopLevel();
						closeSearch();
					}
					elem.classList.add(visClass);
					setTimeout(function () {
						elem.classList.add(theClass);
					}, 100);
				},
				function () {
					elem.classList.remove(theClass);
					setTimeout(function () {
						elem.classList.remove(visClass);
						closeAllSubNav();
					}, 100);
				}).options(opts);
		});
	}


	function is_touch_device() {
		return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0));
	}

	var alertContent$1 = document.querySelector('.alert-content');
	function stickyHeaderAlertSmall() {
		if (document.body.clientWidth < 1024) {
			if (headroomActive === false) {
				if (inViewport.isAnyPartOfElementInViewport(alertContent$1) === false) {
					headroom$1.init();
					headroomActive = true;
					body$2.classList.add('header-sticky');
				}

			} else {
				if (inViewport.isAnyPartOfElementInViewport(alertContent$1) === true) {
					headroom$1.destroy();
					headroomActive = false;
					body$2.classList.remove('header-sticky');
				}
			}
		}
	}

	// Make the navigation sticky after it scrolls past the first element in the <main id="content">
	// Navigation will be sticky in different places on each page based on content size

	function stickyHeaderFirstElement() {
		if (headroomActive === false) {
			if (inViewport.isAnyPartOfElementInViewport(hero) === false && herosticky === false) {
				herosticky = true;
				headroom$1.init();
				headroomActive = true;
				body$2.classList.add('hero-out');

				setTimeout(function () {
					body$2.classList.add('hero-out--show');
				}, 250);
			}

		} else if (inViewport.isAnyPartOfElementInViewport(hero) === true && herosticky === true) {
			if (headroomActive === true) {
				herosticky = false;
				body$2.classList.add('hero-leave');
				body$2.classList.remove('hero-out--show');
				setTimeout(function () {
					body$2.classList.remove('hero-leave');
					body$2.classList.remove('hero-out');
					headroom$1.destroy();
					headroomActive = false;
				}, 250);
			}
		}
	}

	// Get the height of the alert content in px
	function alertContentHeight() {
		if (header$1 && alertContent$1) {
			return alertContent$1.offsetHeight;
		} else { return 0; }
	}

	function init$4() {
		var navMenuItem0 = document.querySelectorAll('.nav--primary .nav__menu-item--level-0.nav__menu-item--children');

		if (!is_touch_device()) {
			itemHoverIntent(navMenuItem0, 'nav__menu-item--active', 'nav__menu-item--visible', 200);
		}

		if (topLevelLink) {
			topLevelLink.forEach(function (tll) {
				tll.addEventListener('focus', function () {
					if (document.body.clientWidth >= 1024) {
						closeMenu();
					}
				});
			});

		}
		if (navMainBtn) {
			navMainBtn.addEventListener('click', toggleMenu);
		}
		if (header$1) {
			header$1.addEventListener('focusout', closeMenuIfInactive);
		}
		if (topLevelButton) {
			topLevelButton.forEach(function (tlb) {
				tlb.addEventListener('click', toggleTopMenu);
			});
		}

		if (mobileSubNavButton) {
			mobileSubNavButton.forEach(function (msnb) {
				msnb.addEventListener('click', toggleSubMenu);
			});
		}

		if (searchBtn) {
			searchBtn.forEach(function (sb) {
				sb.addEventListener('click', toggleSearch);
			});
		}
		if (searchCloseBtn) {
			searchCloseBtn.addEventListener('click', closeSearch);
		}
		if (searchSection) {
			searchSection.addEventListener('focusout', closeSearchIfInactive);
		}

		if (dropdown) {
			dropdown.addEventListener('mouseleave', function () {
				closeDropdown();
			});
		}

		if (dropdownBtn) {
			dropdownBtn.addEventListener('click', toggleDropdown);
		}

		if (skipSearch) {
			skipSearch.addEventListener('click', openSearch);
		}
		if (skipResources) {
			skipResources.addEventListener('click', openDropdown);
		}

		if (utilItems) {
			utilItems.forEach(function (ui) {
				ui.addEventListener('focus', closeDropdown);
			});
		}

		if (navMainBtn || searchBtn || dropdownBtn) {
			esc$1();
		}



		if (nav) {

			// Can be used to provide homepage different instructions for sticky nav if desired
			// if (body.classList.contains('homepage') === true) {

			// } else {


			if (body$2.clientWidth < 1024) {
				if (alertContent$1) {
					stickyHeaderAlertSmall();
				} else {
					headroomActive = true;
					headroom$1.init();
				}
				//
				//
				//find last item in #headerMenus and on blur return to toggle-btn with class return-focus (less than 1024)
				secondaryNav.lastElementChild.addEventListener('blur', function () {
					navMainBtn.focus();
				});
			}


			window.addEventListener('scroll', function () {
				stickyHeaderFirstElement();
				if (alertContent$1) {
					stickyHeaderAlertSmall();
				}
				// stickyHeaderScrollPosition(1500)
			});



			window.addEventListener('resize', function () {
				headroomActive = false;
				setTimeout(function () {
					if (body$2.clientWidth < 1024) {

						if (alertContent$1) {
							stickyHeaderAlertSmall();
						} else {
							headroomActive = true;
							headroom$1.init();
						}
					} else {
						stickyHeaderFirstElement();
						// stickyHeaderScrollPosition(1500)
					}
				}, 100);

				if (body$2.classList.contains('menu-opened')) {
					hideAlerts();
				}
			});
			//}

		}

	}

	var navigation = {
		init: init$4
	};

	// import $ from "jquery";

	var log$5 = bows_min("video-inline");
	var videoInline = document.querySelectorAll('.video-inline');

	function changeButtonType(btn, value, hidden) {
		var btnText = btn.querySelector('.a11y');
		btnText.innerHTML = value;
		if (value === 'pause') {
			btn.classList.add('video-button--pause');
			btn.classList.remove('video-button--play');
		} else {
			btn.classList.remove('video-button--pause');
			btn.classList.add('video-button--play');
		}

		if (hidden === true) {
			btn.setAttribute('hidden', true);

		}
	}

	function playPauseVideo(player, btnPlayPause) {
		if (player.paused || player.ended) {
			// Change the button to a pause button
			var isloop = player.getAttribute('autoplay');
			if (isloop !== null && isloop !== false) {
				changeButtonType(btnPlayPause, 'pause', false);
			} else {
				changeButtonType(btnPlayPause, 'pause', true);
			}

			if (player.classList.contains('video-inline__video--controls') === true) {
				player.setAttribute('controls', true);
			}
			player.play();
		}
		else {
			changeButtonType(btnPlayPause, 'play', false);
			if (player.classList.contains('video-inline__video--controls') === true) {
				player.removeAttribute('controls');
			}
			player.pause();
		}
	}


	function setUp() {
		videoInline.forEach(function (el) {
			var player = el.querySelector('video');
			var btnPlayPause = el.querySelector('.video-button--play-toggle');

			if (btnPlayPause) {
				btnPlayPause.addEventListener('click', function () {
					playPauseVideo(player, btnPlayPause);
				});
			}

			if (player) {
				// Add a listener for the play and pause events so the buttons state can be updated
				player.addEventListener('play', function () {
					// Change the button to be a pause button
					changeButtonType(btnPlayPause, 'pause');
				}, false);

				player.addEventListener('pause', function () {
					// Change the button to be a play button
					changeButtonType(btnPlayPause, 'play');
				}, false);
			}
		});
	}

	function init$5() {
		if (videoInline.length) {
			setUp();
		}
	}

	var video_inline = {
		init: init$5
	};

	var log$6 = bows_min("video-vimeo");

	var vimeo_videos = document.querySelectorAll('[data-vimeo]');


	function add_api() {
		var tag = document.createElement('script'),
			firstScriptTag = document.getElementsByTagName('script')[0];

		tag.src = "https://player.vimeo.com/api/player.js";
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}



	function load_videos() {
		vimeo_videos.forEach(function (vid) {

			//Play button
			var play_button = vid.querySelector('.video-button--play');


			//Id of Vimeo Video
			var vimeo_id = vid.getAttribute('data-vimeo');

			var player_id = "vimeo_" + vimeo_id;
			// element that vimeo will be loaded into
			var vimeo_div = vid.querySelector('.video-vimeo__vimeo');

			// Vimeo options
			var options = {
				id: vimeo_id,
				width: 1450,
				autoplay: false,
				dnt: true
			};


			//Adds a unique ID to video div to attach player
			vimeo_div.setAttribute('id', player_id);

			// Create a new Vimeo.Player and load video with options
			var video_player = new Vimeo.Player(player_id, options);

			//When the video has loaded fir fitvid for responsive videos
			video_player.ready().then(function () {
				fitvid();
			});

			if (play_button) {
				play_button.addEventListener('click', function () {
					vid.classList.remove('video-vimeo--poster');
					vid.classList.add('video-vimeo--hide-buttons');
					video_player.play();
				});
			}
		});

	}

	function init$6() {
		log$6("video vimeo");
		if (vimeo_videos.length) {
			add_api();

			$(window).on('load', function () {
				load_videos();
			});
		}
	}

	var video_vimeo = {
		init: init$6
	};

	// import $ from "jquery";

	var log$7 = bows_min("filter");

	var filters = document.querySelectorAll('.filter');

	function filterToggle($this) {
		$this.classList.toggle('filter--active');
	}

	function filterTrigger($this, filter, btn) {

		var currentExpanded = filter.querySelector('[aria-expanded="true"]');
		var isExpanded = $this.getAttribute('aria-expanded');
		var controls = $this.dataset.controls;

		var activeTrigger = filter.querySelector('.filter__trigger--active');

		if (activeTrigger) {
			activeTrigger.classList.remove('filter__trigger--active');
		}

		if (isExpanded === 'false') {
			if (currentExpanded) {
				var showingId = currentExpanded.dataset.controls;
				var showing = document.getElementById(showingId);
				currentExpanded.setAttribute('aria-expanded', false);
				showing.classList.remove('filter-section--active');
				showing.classList.remove('filter-section--showing');
			}
			var toShow = document.getElementById(controls);
			$this.classList.add('filter__trigger--active');
			$this.setAttribute('aria-expanded', true);
			toShow.classList.add('filter-section--active');
			setTimeout(function () {
				toShow.classList.add('filter-section--showing');
			}, 50);

		}


		filter.classList.toggle('filter--active');
		//start text change
		var text = $this.innerHTML;
		var textChange = btn.querySelector('.filter__toggle__text');
		if (textChange) {
			textChange.innerHTML = text;
		}
		//end text change

		btn.focus();
	}

	function doFilters() {
		filters.forEach(function (filter) {
			var btn = filter.querySelector('.filter__toggle');
			var trigger = filter.querySelectorAll('.filter__trigger');

			if (btn) {
				btn.addEventListener('click', function () {
	        this.focus(); // compensates for idiosyncratic treatment of <button> focus across browsers
					filterToggle(filter);
				});


				trigger.forEach(function (el) {
					el.addEventListener('click', function () {
						filterTrigger(this, filter, btn);
					});
				});
			}

			filter.addEventListener('mouseleave', function () {
				log$7('mouseleave');
				this.classList.remove('filter--active');
			});
			filter.addEventListener('focusout', function () {
				var this$1 = this;

				setTimeout(function () {
					var focused = filter.querySelector(':focus');
					if (focused === null) {
						this$1.classList.remove('filter--active');
					}
				}, 500);

			});

		});
	}



	function init$7() {

		if (filters) {
			doFilters();
		}
	}

	var filter = {
		init: init$7
	};

	var log$8 = bows_min("hero");
	var heroContent = document.querySelector('.hero__content');
	var heroText = document.querySelector('.hero__text');
	var heroExcerpt = document.querySelector('.hero__excerpt');
	var heroLink = document.querySelector('.hero__link');
	var heroClass = 'hero__text--hover';

	function itemHoverIntent$1(element, theClass, time, num) {
		var opts = {
			timeout: time,
			interval: num
		};
		log$8(element);
		var hoverListener = hoverintent(element,
			function () {
				heroText.classList.add(theClass);
			},
			function () {
				heroText.classList.remove(theClass);
			}).options(opts);
	}


	function init$8() {
		if (heroExcerpt) {
			itemHoverIntent$1(heroContent, heroClass, 200, 50);
		}
		if (heroLink) {
			heroLink.addEventListener('focus', function () {
				heroText.classList.add(heroClass);
			});
			heroLink.addEventListener('blur', function () {
				heroText.classList.remove(heroClass);
			});
		}
	}

	var hero$1 = {
		init: init$8
	};

	// import $ from "jquery";

	var log$9 = bows_min("accordion-controls");
	var accordionBtns = document.querySelectorAll('.js-wikit-accordion-toggle__btn');

	function openAll(triggers) {
		triggers.forEach(function (trigger) {
			var isExpanded = trigger.getAttribute('aria-expanded');
			if (isExpanded === 'false') {
				trigger.click();
			}
		});
	}

	function closeAll(triggers) {
		triggers.forEach(function (trigger) {
			var isExpanded = trigger.getAttribute('aria-expanded');
			if (isExpanded === 'true') {
				trigger.click();
			}
		});
	}

	function accordionToggle() {
		var which = this.dataset.toggle;
		var accordionSet = this.closest('.js-wikit-accordion-group');
		var triggers = accordionSet.querySelectorAll('.js-wikit-accordion__trigger');

		if (which === 'expand') {
			openAll(triggers);
		} else if (which === 'collapse') {
			closeAll(triggers);
		}

	}

	function init$9() {
		accordionBtns.forEach(function (ab) {
			ab.addEventListener('click', accordionToggle);
		});
	}

	var accordionControls = {
		init: init$9
	};

	/*
		*   This content is licensed according to the W3C Software License at
		*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
		*
		*   Simple accordion pattern example
		*  https://www.w3.org/TR/wai-aria-practices/#accordion
		* https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
		*/

	function init$a() {

		Array.prototype.slice.call(document.querySelectorAll('.js-wikit-accordion')).forEach(function (accordion) {

			// Allow for multiple accordion sections to be expanded at the same time
			var allowMultiple = accordion.hasAttribute('data-allow-multiple');
			// Allow for each toggle to both open and close individually
			//(`allowMultiple = ${allowMultiple}`)

			var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');
			//console.log(`allowToggle = ${allowToggle}`);
			// Create the array of toggle elements for the accordion group
			var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.js-wikit-accordion__trigger'));

			//panels var from original code
			//var panels = Array.prototype.slice.call(accordion.querySelectorAll('.js-wikit-accordion__panel'));


			accordion.addEventListener('click', function (event) {
				// jlongwill: commented out because it is preventing default on links in accordions
				// event.preventDefault();
				event.stopPropagation();
				var target = event.target;
				//(target);
				if (target.classList.contains('js-wikit-accordion__trigger') && target.classList.contains('js-wikit-accordion__trigger--animating') === false) {
					// Check if the current toggle is expanded.
					// if (target.classList.contains('js-wikit-accordion__trigger--animating')) { return false; }
					var isExpanded = target.getAttribute('aria-expanded') == 'true';
					var active = accordion.querySelector('[aria-expanded="true"]');
					target.classList.add('js-wikit-accordion__trigger--animating');
					setTimeout(function () {
						target.classList.remove('js-wikit-accordion__trigger--animating');
						console.log('removed Class');
					}, 1000);
					// without allowMultiple, close the open accordion
					if (!allowMultiple && active && active !== target) {

						// Set the expanded state on the triggering element
						active.setAttribute('aria-expanded', 'false');
						active.closest('.js-wikit-accordion__item').classList.remove('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section
						document.getElementById(active.getAttribute('aria-controls')).classList.remove('js-wikit-accordion__panel--open');

						setTimeout(function () {
							document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');
						}, 1000);


						// When toggling is not allowed, clean up disabled state
						if (!allowToggle) {
							active.removeAttribute('aria-disabled');
						}
					}

					if (!isExpanded) {
						// Set the expanded state on the triggering element
						target.setAttribute('aria-expanded', 'true');
						target.closest('.js-wikit-accordion__item').classList.add('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section

						document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');
						setTimeout(function () {
							document.getElementById(target.getAttribute('aria-controls')).classList.add('js-wikit-accordion__panel--open');
						}, 10);
						// If toggling is not allowed, set disabled state on trigger
						if (!allowToggle) {
							target.setAttribute('aria-disabled', 'true');
						}
					}
					else if (allowToggle && isExpanded) {
						// Set the expanded state on the triggering element
						target.setAttribute('aria-expanded', 'false');
						target.closest('.js-wikit-accordion__item').classList.remove('is-expanded');
						// Hide the accordion sections, using aria-controls to specify the desired section
						// document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');

						document.getElementById(target.getAttribute('aria-controls')).classList.remove('js-wikit-accordion__panel--open');
						setTimeout(function () {
							document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
						}, 1000);

					}

					event.preventDefault();
				}
			});

			// Bind keyboard behaviors on the main accordion container
			accordion.addEventListener('keydown', function (event) {
				var target = event.target;
				var key = event.which.toString();

				var isExpanded = target.getAttribute('aria-expanded') == 'true';
				var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

				// 33 = Page Up, 34 = Page Down
				var ctrlModifier = (event.ctrlKey && key.match(/33|34/));
				// console.log('target is ' + target);
				// Is this coming from an accordion header?
				if (target !== undefined && target !== null) {
					if (target.classList.contains('js-wikit-accordion__trigger')) {
						// Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
						// 38 = Up, 40 = Down
						if (key.match(/38|40/) || ctrlModifier) {
							var index = triggers.indexOf(target);
							var direction = (key.match(/34|40/)) ? 1 : -1;
							var length = triggers.length;
							var newIndex = (index + length + direction) % length;

							triggers[newIndex].focus();

							event.preventDefault();
						}
						else if (key.match(/35|36/)) {
							// 35 = End, 36 = Home keyboard operations
							switch (key) {
								// Go to first accordion
								case '36':
									triggers[0].focus();
									break;
								// Go to last accordion
								case '35':
									triggers[triggers.length - 1].focus();
									break;
							}
							event.preventDefault();

						}

					}
				}
			});

			// These are used to style the accordion when one of the buttons has focus
			accordion.querySelectorAll('.js-wikit-accordion__trigger').forEach(function (trigger) {

				trigger.addEventListener('focus', function (event) {
					accordion.classList.add('focus');
				});

				trigger.addEventListener('blur', function (event) {
					accordion.classList.remove('focus');
				});

			});

			// Minor setup: will set disabled state, via aria-disabled, to an
			// expanded/ active accordion which is not allowed to be toggled close
			if (!allowToggle) {
				// Get the first expanded/ active accordion
				var expanded = accordion.querySelector('[aria-expanded="true"]');

				// If an expanded/ active accordion is found, disable
				if (expanded) {
					expanded.setAttribute('aria-disabled', 'true');
				}
			}

		});

		accordionControls.init();

	}
	var accordion = {
		init: init$a
	};

	// https://codepen.io/heydon/pen/veeaEa
	// import $ from "jquery";


	// Get relevant elements and collections
	var tabbed = document.querySelectorAll('.js-wikit-tabbed');

	var accordionTitle = document.querySelectorAll('.accordion-toggle-tab');

	function doEachTab(tablist, tabs, panels, toggleTab) {

		// The tab switching function
		var switchTab = function (oldTab, newTab, isFocus) {

			if (isFocus !== false) {
				newTab.focus();
			} else

				// Make the active tab focusable by the user (Tab key)
				{ newTab.removeAttribute('tabindex'); }

			// Set the selected state
			newTab.setAttribute('aria-selected', 'true');
			newTab.removeAttribute('tabindex');
			oldTab.removeAttribute('aria-selected');
			oldTab.setAttribute('tabindex', '-1');
			oldTab.setAttribute('aria-selected', 'false');
			// Get the indices of the new and old tabs to find the correct
			// tab panels to show and hide
			var index = Array.prototype.indexOf.call(tabs, newTab);
			var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);

			panels[oldIndex].hidden = true;
			panels[index].hidden = false;

			// Code for updating accordions
			var oldAtt = oldTab.getAttribute('href').split('#');
			var newAtt = newTab.getAttribute('href').split('#');


			oldAtt = document.querySelector((".accordion-toggle-tab[aria-controls=\"" + (oldAtt[1]) + "\"]"));
			newAtt = document.querySelector((".accordion-toggle-tab[aria-controls=\"" + (newAtt[1]) + "\"]"));

			if (oldAtt) {
				oldAtt.setAttribute('aria-expanded', 'false');
			}

			if (newAtt) {
				newAtt.setAttribute('aria-expanded', 'true');
			}

			// Trigger resize event for sliders
			window.dispatchEvent(new Event('resize'));
			window.upennsliders.forEach(function (slider) {
				slider.slick('setPosition');
			});
		};



		// Add the tablist role to the first <ul> in the .tabbed container
		tablist.setAttribute('role', 'tablist');

		// Add semantics are remove user focusability for each tab
		Array.prototype.forEach.call(tabs, function (tab, i) {
			tab.setAttribute('role', 'tab');
			// tab.setAttribute('id', 'tab' + (i + 1));
			tab.setAttribute('tabindex', '-1');
			tab.parentNode.setAttribute('role', 'presentation');

			// Handle clicking of tabs for mouse users
			tab.addEventListener('click', function (e) {
				e.preventDefault();
				var currentTab = tablist.querySelector('[aria-selected="true"]');
				if (e.currentTarget !== currentTab) {

					switchTab(currentTab, e.currentTarget, true);
				}
			});


			// Handle keydown events for keyboard users
			tab.addEventListener('keydown', function (e) {
				// Get the index of the current tab in the tabs node list
				var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
				// Work out which key the user is pressing and
				// Calculate the new tab's index where appropriate
				var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
				if (dir !== null) {
					e.preventDefault();
					// If the down key is pressed, move focus to the open panel,
					// otherwise switch to the adjacent tab

					dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
				}
			});
		});

		// Add tab panel semantics and hide them all
		Array.prototype.forEach.call(panels, function (panel, i) {
			panel.setAttribute('role', 'tabpanel');
			panel.setAttribute('tabindex', '-1');
			var id = panel.getAttribute('id');
			panel.setAttribute('aria-labelledby', tabs[i].id);
			panel.hidden = true;
		});


		// Initially activate the first tab and reveal the first tab panel
		tabs[0].removeAttribute('tabindex');
		tabs[0].setAttribute('aria-selected', 'true');

		Array.prototype.forEach.call(toggleTab, function (tt) {
			tt.setAttribute('aria-expanded', false);
		});
		toggleTab[0].setAttribute('aria-expanded', true);
		panels[0].hidden = false;

	}


	function tabAccordionFix() {
		// Ensure that accordion buttons are set correctly if user goes from large to small screens
		var acc = document.querySelectorAll('.accordion-toggle-tab');
		acc.forEach(function (tab) {
			var isHidden = tab.nextElementSibling.getAttribute('hidden');
			if (isHidden !== null && isHidden !== true) {
				tab.setAttribute('aria-expanded', false);
			}
		});

	}

	function init$b() {
		if (tabbed.length > 0) {
			for (var i = 0; i < tabbed.length; i++) {
				var tablist = tabbed[i].querySelector('ul');
				var tabs = tablist.querySelectorAll('a');
				var panels = tabbed[i].querySelectorAll('[id^="tabpanel"]');
				var toggleTab = tabbed[i].querySelectorAll('.accordion-toggle-tab');
				doEachTab(tablist, tabs, panels, toggleTab);
			}

			var endResizeEvent;
			window.addEventListener('resize', function () {

				clearTimeout(endResizeEvent);
				endResizeEvent = setTimeout(function () {
					tabAccordionFix();
					// Code below ensures that
					if (window.innerWidth >= 1024) {

						// Run code here, resizing has "stopped"
						var tf = document.querySelectorAll('.tablist--fix');
						tf.forEach(function ($this) {
							var wk = $this.closest('.js-wikit-tabbed').querySelectorAll('.wikit-tab');
							var activeTab = $this.querySelector('[aria-selected="true"]').getAttribute('href').split('#');
							var removeHidden = document.getElementById(activeTab[1]);

							$this.classList.remove('tablist--fix');
							wk.forEach(function (wk) {
								wk.setAttribute('hidden', 'hidden');
							});

							if (removeHidden) {
								removeHidden.removeAttribute('hidden');
							}
						});
					}
				}, 250);

			});
		}


		Array.prototype.forEach.call(accordionTitle, function (at) {
			var btn = at;
			var target = at.nextElementSibling;

			btn.onclick = function () {
				var expanded = btn.getAttribute('aria-expanded') === 'true';

				btn.setAttribute('aria-expanded', !expanded);
				target.hidden = expanded;

				var tabTarget = target.getAttribute('id');
				var activeTab = document.querySelector((".tab-nav__link[href=\"#" + tabTarget + "\"]"));

				if (activeTab) {
					var tabList = activeTab.parentElement.parentElement;
					var tabs = tabList.querySelectorAll('a[role="tab"]');

					tabList.classList.add('tablist--fix');
					Array.prototype.forEach.call(tabs, function (tab) {
						tab.removeAttribute('aria-selected');
						tab.setAttribute('tabindex', '-1');
						tab.setAttribute('aria-selected', 'false');
					});

					activeTab.setAttribute('aria-selected', 'true');
					activeTab.removeAttribute('tabindex');
				}
				// Trigger resize event for sliders
				window.dispatchEvent(new Event('resize'));
				window.upennsliders.forEach(function (slider) {
					slider.slick('setPosition');
				});
			};
		});

	}

	var tabs = {
		init: init$b
	};

	var log$a = bows_min("link-grid");
	var linkGrid = document.getElementById("linkGrid");
	var linkGridImg = document.querySelectorAll('.link-grid__image');
	var linkGridItem = document.querySelectorAll('.link-grid__link');


	function showGridBackground(grid) {
		var showGrid = linkGrid.querySelector(("." + grid));

		if (showGrid) {
			if (showGrid.classList.contains('link-grid__image--active') === false) {
				hideGridBackground();
				showGrid.classList.add('link-grid__image--active');
				setTimeout(function () {
					showGrid.classList.add('link-grid__image--opacity');
				}, 20);
			}
		}
	}

	function hideGridBackground() {
		var currentGrid = linkGrid.querySelector('.link-grid__image--active');
		if (currentGrid) {
			currentGrid.classList.remove('link-grid__image--opacity');
			setTimeout(function () {
				currentGrid.classList.remove('link-grid__image--active');
			}, 500);
		}
	}

	function itemHoverIntent$2(element, theClass, time) {
		var opts = {
			timeout: time
		};
		log$a(element);
		element.forEach(function (elem) {
			var hoverListener = hoverintent(elem,
				function () {
					elem.classList.add(theClass);
					var grid = elem.dataset.grid;
					log$a(grid);
					showGridBackground(grid);

				},
				function () {
					elem.classList.remove(theClass);
				}).options(opts);
		});
	}

	// Can be called in site.js on window load to preload background images.
	function loadAllGrid() {
		linkGridImg.forEach(function (item) {
			item.classList.add('link-grid__image--loading');
			setTimeout(function () {
				item.classList.remove('link-grid__image--loading');
			}, 100);
		});
	}

	function init$c() {
		if (linkGridItem) {
			itemHoverIntent$2(linkGridItem, 'link-grid__item--active', 250);
			linkGridItem.forEach(function (item) {
				item.addEventListener('focus', function () {
					var grid = this.dataset.grid;
					showGridBackground(grid);
				});
			});
		}
	}

	var link_grid = {
		init: init$c,
		loadAllGrid: loadAllGrid
	};

	// Make :contain case insensitive
	jQuery.expr[':'].Contains = function (a, i, m) {
		return jQuery(a).text().toUpperCase()
			.indexOf(m[3].toUpperCase()) >= 0;
	};


	var $azSearch = $('#a-z-search');
	var log$b = bows_min("a-to-z");

	var $aToZ = '';
	var $aToZItems = '';
	var $aToZNoResults = $('#a-to-z-no-results');
	var activeButton = 'ALL';


	function letterUpdates(letter) {
		activeButton = letter;
		$('.a-z-search__button--active').removeClass('a-z-search__button--active');

		$((".a-z-search__button[value=\"" + letter + "\"]")).addClass('a-z-search__button--active');
		$('.a-z-search__select').find(("option[value=\"" + letter + "\"]")).prop('selected', true);
		if (letter === 'ALL') {
			$aToZ.css('display', 'block');
			isSectionEmpty();
		} else {
			$aToZ.hide();
			$((".a-to-z[data-letter=\"" + letter + "\"]")).css('display', 'block');
		}
		showNoResults();
	}

	function showNoResults() {
		var $this = '';
		if (activeButton === 'ALL') {
			$this = $('#content');
		} else {
			$this = $(("[data-letter=\"" + activeButton + "\"]"));
		}

		var $items = $this.find('.a-to-z__item');
		var $itemsHidden = $this.find('.a-to-z__item--hidden');

		if ($items.length === $itemsHidden.length) {
			$aToZNoResults.addClass('no-results--active');
		} else {
			$aToZNoResults.removeClass('no-results--active');
		}
	}
	function aToZSelect() {
		$('.a-z-search__select').on('change', function () {
			var letter = $(this).val().toUpperCase();
			letterUpdates(letter);
		});
	}

	function aToZButtons() {
		$azSearch.on('click', '.a-z-search__button', function () {
			var $this = $(this);
			if ($this.hasClass('a-z-search__button--active') === false) {
				var letter = $this.val().toUpperCase();
				letterUpdates(letter);
			}
		});
	}

	function isSectionEmpty() {
		$aToZ.each(function () {
			var $this = $(this);
			var $items = $this.find('.a-to-z__item');
			var $itemsHidden = $this.find('.a-to-z__item--hidden');

			if ($items.length === $itemsHidden.length) {
				$this.hide();
			} else {
				$this.css('display', 'block');
			}
		});
	}

	function aToZSearch() {
		$('.a-z-search__input').on('keyup', function () {
			var textVal = $(this).val();
			log$b(textVal);

			if (textVal.length >= 1) {
				$aToZItems.addClass('a-to-z__item--hidden');
				var aZSearchResults = $((".a-to-z__item:Contains('" + textVal + "')"));


				aZSearchResults.removeClass('a-to-z__item--hidden');

			} else {
				$aToZItems.removeClass('a-to-z__item--hidden');
				$aToZNoResults.removeClass('no-results--active');
			}
			showNoResults();
			if (activeButton === 'ALL') {
				isSectionEmpty();
			}
		});
	}

	function init$d() {
		if ($azSearch.length) {
			$aToZ = $('.a-to-z');
			$aToZItems = $('.a-to-z__item');
			aToZButtons();
			aToZSearch();
			aToZSelect();

			$('.a-z-search__form').on('submit', function () {
				var this$1 = this;

				$(this).attr('tabindex', '-1').focus();
				setTimeout(function () {
					$(this$1).removeAttr('tabindex');
				}, 100);
				return false;
			});
		}
	}

	var a_to_z = {
		init: init$d
	};

	var log$c = bows_min("general");
	var body$3 = $('body');
	var $header = $('#header');
	var $figcaption = $('figcaption');

	function scrollTo($this) {

		var href = $this.attr('href');
		var where = $(href);
		var scrollToIt = where.offset().top - $header.height();

		if (href === '#top') {
			scrollToIt = 0;
		}

		$('html,body').animate({ scrollTop: scrollToIt }, 'slow', function () {

			if (href !== '#top') {

				where.focus();
			} else {
				body$3.attr('tabindex', '-1');
				body$3.focus();
				setTimeout(function () {
					body$3.removeAttr('tabindex');
				}, 100);
			}
		});
		return false;
	}

	function figcaptionWidth() {
		$figcaption.each(function () {
			var $this = $(this);
			var img = $this.closest('figure').find('img').eq(0);
			if (img.length) {
				var newWidth = img.width();
				$this.css('max-width', newWidth);
			}
		});
	}

	function init$e() {

		$('.footer__to-top, .jump-link').on('click', function () {
			scrollTo($(this));
			return false;
		});

		// Move video modal outside of #top
		$(".modal").detach().insertAfter("#modal-overlay");

		$(window).on('load', function () {
			figcaptionWidth();
		}).on('resize', function () {
			clearTimeout(timeout);
			var timeout = setTimeout(function () {
				figcaptionWidth();
			}, 100);
		});

	}

	var general = {
		init: init$e
	};

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_throttle = throttle;

	var log$d = bows_min("fact-bar");

	var factbars = document.querySelectorAll('.fact-bar');

	var throttleIt = lodash_throttle(inview, 100);

	var activeFactbars = 0;
	function inview() {
		log$d('throttleing');
		factbars.forEach(function (fb) {
			if (inViewport.isElementInViewport(fb) === true && fb.classList.contains('fact-bar--active') === false) {
				var fbb = fb.querySelector('.fact-bar__bar');
				var fbb_width = 0;
				if (fbb) {
					fbb_width = parseInt(fbb.dataset.percentage, 10);
				}
				fb.classList.add('fact-bar--active');
				activeFactbars++;
				setTimeout(function () {
					fbb.style.maxWidth = fbb_width + "%";
				}, 500);


			}
		});

		if (activeFactbars === factbars.length) {
			window.removeEventListener('scroll', throttleIt);
		}
	}



	function init$f() {
		if (factbars.length > 0) {
			window.addEventListener('scroll', throttleIt);
			$(window).on('load', function () {
				inview();
			});
		}

	}

	var factbars$1 = {
		init: init$f
	};

	var card_links = document.querySelectorAll('.card a');
	var log$e = bows_min("card");

	function addCardHover() {
		card_links.forEach(function (card) {

			card.addEventListener("mouseenter", function () {
				this.closest('.card').classList.add('is-hovered');
			});

			card.addEventListener("mouseout", function () {
				this.closest('.card').classList.remove('is-hovered');
			});
		});
	}

	function init$g() {
		if (card_links) {
			addCardHover();
		}
	}

	var cards = {
		init: init$g
	};

	var card_links$1 = document.querySelectorAll('.article-card__link');
	var log$f = bows_min("article-card");

	function addCardHover$1() {
		card_links$1.forEach(function (card) {

			card.addEventListener("mouseenter", function () {
				this.closest('.article-card').classList.add('is-hovered');
			});

			card.addEventListener("mouseout", function () {
				this.closest('.article-card').classList.remove('is-hovered');
			});
		});
	}

	function init$h() {
		if (card_links$1) {
			addCardHover$1();
		}
	}

	var articleCards = {
		init: init$h
	};

	var card_links$2 = document.querySelectorAll('.featured-initiative-card__title__link');
	var card_button = document.querySelectorAll('.featured-initiative-card .btn');

	var log$g = bows_min("featured-initiative-card");

	function addCardListener(el) {
		el.addEventListener("mouseenter", function () {
			this.closest('.featured-initiative-card ').classList.add('is-hovered');
		});

		el.addEventListener("mouseout", function () {
			this.closest('.featured-initiative-card ').classList.remove('is-hovered');
		});
	}


	function init$i() {
		if (card_links$2) {
			card_links$2.forEach(function (card) {
				addCardListener(card);
			});
		}

		if (card_button) {
			card_button.forEach(function (button) {
				addCardListener(button);
			});
		}
	}

	var featuredInitiativeCards = {
		init: init$i
	};

	var card_links$3 = document.querySelectorAll('.event-card__link');
	var card_image_links = document.querySelectorAll('.event-card__image-link');

	var log$h = bows_min("event-card");

	function addCardListener$1(el) {
		el.addEventListener("mouseenter", function () {
			this.closest('.event-card ').classList.add('is-hovered');
		});

		el.addEventListener("mouseout", function () {
			this.closest('.event-card ').classList.remove('is-hovered');
		});
	}


	function init$j() {
		if (card_links$3) {
			card_links$3.forEach(function (card) {
				addCardListener$1(card);
			});
		}

		if (card_image_links) {
			card_image_links.forEach(function (image_link) {
				addCardListener$1(image_link);
			});
		}
	}

	var eventCards = {
		init: init$j
	};

	var card_links$4 = document.querySelectorAll('.listing-card__title__link, .listing-card__image');

	var log$i = bows_min("listing-card");

	function addCardHover$2() {
		card_links$4.forEach(function (card) {

			card.addEventListener("mouseenter", function () {
				this.closest('.listing-card').classList.add('is-hovered');
			});

			card.addEventListener("mouseout", function () {
				this.closest('.listing-card').classList.remove('is-hovered');
			});
		});
	}

	function init$k() {
		if (card_links$4) {
			addCardHover$2();
		}
	}

	var listingCards = {
		init: init$k
	};

	var card_links$5 = document.querySelectorAll('.grid-card__image-link, .grid-card__link');
	var log$j = bows_min("card");

	function addCardHover$3() {
		card_links$5.forEach(function (card) {

			card.addEventListener("mouseenter", function () {
				this.closest('.grid-card').classList.add('is-hovered');
			});

			card.addEventListener("mouseout", function () {
				this.closest('.grid-card').classList.remove('is-hovered');
			});
		});
	}

	function init$l() {
		if (card_links$5) {
			addCardHover$3();
		}
	}

	var gridCards = {
		init: init$l
	};

	var $slidersThreeAcross = $('[data-slider="three-across"]');
	var sliderInitiated = false;

	var $body = $('body');
	var log$k = bows_min("sliders:three-across");

	function sliderReInit() {
		// log('threeAcrossReInit');
		$slidersThreeAcross = $('[data-slider="three-across"]');
		sliderInit();
	}

	function sliderInit() {
		$slidersThreeAcross.each(function () {
			var $this = $(this);
			var role = $this.attr('role');

			if (role !== 'region' && $body.width() < 1024) {
				$this.slick({
					dots: true,
					mobileFirst: true,
					speed: 500,
					// adaptiveHeight: true,
					touchThreshold: 20,
					infinite: false,
					variableWidth: true,
					slidesToShow: 1,
					arrows: false,
					responsive: [
						{
							breakpoint: 1024,
							settings: "unslick"
						}
					]
				});
			}

			if (sliderInitiated === false) {
				size.addMedium(sliderReInit);
				size.addSmall(sliderReInit);
				sliderInitiated = true;
			}
		});

	}


	function init$m() {
		if ($slidersThreeAcross.length) {
			sliderInit();
		}
	}

	var threeAcross = {
		init: init$m
	};

	var $centerToEdge = $('[data-slider="center-to-edge"]');


	var log$l = bows_min("sliders:center-to-edge");

	function sliderInit$1() {

		$centerToEdge.each(function () {
			var $this = $(this);

			var appendArrowsTo = $this.next('.penn-priorities__arrows');
			var slider = $this.slick({
				dots: true,
				mobileFirst: true,
				speed: 500,

				infinite: false,
				variableWidth: false,
				slidesToShow: 1,
				arrows: false,
				slidesToScroll: 1,
				touchThreshold: 20,
				responsive: [
					{
						breakpoint: 676,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							dots: true,
							centerMode: true,
							variableWidth: true,
							arrows: true,
							appendArrows: appendArrowsTo
						}
					}
				]
			});
			window.upennsliders.push(slider);

			//move arrows inside slider so that we can vertically center
			$(appendArrowsTo).detach().appendTo($this);
		});
	}

	function init$n() {
		if ($centerToEdge.length) {
			sliderInit$1();
		}
	}

	var centerToEdge = {
		init: init$n
	};

	// Calendar view


	var $singleSmall = $('[data-slider="single-small"]');
	var sliderInitiated$1 = false;

	var $body$1 = $('body');
	var log$m = bows_min("sliders:single-small");

	function sliderReInit$1() {
		$singleSmall = $('[data-slider="single-small"]');
		sliderInit$2();
	}


	function sliderInit$2() {
		$singleSmall.each(function () {
			var $this = $(this);
			var role = $this.attr('role');

			if (role !== 'region' && $body$1.width() < 1024) {
				$this.slick({
					dots: true,
					mobileFirst: true,
					speed: 500,
					infinite: false,
					arrows: false,
					responsive: [
						{
							breakpoint: 1023,
							settings: "unslick"
						},
						{
							breakpoint: 690,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: 639,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}

			if (sliderInitiated$1 === false) {
				size.addMedium(sliderReInit$1);
				size.addSmall(sliderReInit$1);
				sliderInitiated$1 = true;
			}
		});

	}


	function init$o() {
		if ($singleSmall.length) {
			sliderInit$2();
		}
	}

	var singleSmall = {
		init: init$o
	};

	var $gallery = $('[data-slider="gallery"]');

	var log$n = bows_min("sliders:gallery");

	function setControls($self, $gn) {

		var currentImageHeight = $self.find('img').height();
		$gn.css('top', currentImageHeight + 40);
	}


	function sliderInit$3() {
		$gallery.each(function () {
			var $self = $(this);
			var role = $self.attr('role');
			var $btns = $self.find('.gallery-card__button');
			var $galleryslider = $self.closest('.gallery-slider');
			var $gn = $galleryslider.find('.gallery__navigation');
			var $gb = $galleryslider.find('.gallery__arrows');
			var $gd = $galleryslider.find('.gallery__dots');

			if (role !== 'region') {
				var $slider = $self.slick({
					slidesToShow: 1,
					infinite: true,
					dots: true,
					appendDots: $gd,
					arrows: true,
					appendArrows: $gb,
					draggable: true,
					touchThreshold: 20,
					adaptiveHeight: false
				});

				$galleryslider.addClass('gallery-slider--active');
				setTimeout(function () {
					setControls($self.find('.slick-current'), $gn);
				}, 100);

				$slider.on('afterChange', function (event, slick, currentSlide) {
					setControls($self.find(("[data-slick-index=\"" + currentSlide + "\"]")), $gn);
				});

				$(window).on('resize', function () {
					setTimeout(function () {
						setControls($self.find('.slick-current'), $gn);
					}, 100);
				});

			}
		});

	}


	function init$p() {

		if ($gallery.length) {
			sliderInit$3();
		}
	}

	var gallery = {
		init: init$p
	};

	var $slidersTwoAcross = $('[data-slider="two-across"]');

	var $body$2 = $('body');
	var log$o = bows_min("sliders:two-across");


	function sliderInit$4() {
		$slidersTwoAcross.each(function () {
			var $this = $(this);
			var role = $this.attr('role');

			if (role !== 'region') {
				$this.slick({
					dots: true,
					//mobileFirst: true,
					speed: 500,
					// adaptiveHeight: true,
					infinite: false,
					//variableWidth: true,
					slidesToShow: 2,
					arrows: false,
					responsive: [
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}
		});

	}


	function init$q() {
		if ($slidersTwoAcross.length) {
			sliderInit$4();
		}
	}

	var twoAcross = {
		init: init$q
	};

	// Calendar view


	var $single = $('[data-slider="single"]');


	var $body$3 = $('body');
	var log$p = bows_min("sliders:single-small");



	function sliderInit$5() {
		$single.each(function () {
			var $this = $(this);
			var role = $this.attr('role');

			if (role !== 'region') {
				$this.slick({
					dots: true,
					mobileFirst: true,
					speed: 500,
					infinite: true,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true
				});
			}
		});

	}


	function init$r() {
		if ($single.length) {
			sliderInit$5();
		}
	}

	var single = {
		init: init$r
	};

	var $singleImage = $('[data-slider="single-image"]');


	var $body$4 = $('body');
	var log$q = bows_min("sliders:single-image");



	function sliderInit$6() {
		$singleImage.each(function () {
			var $this = $(this);
			var role = $this.attr('role');
			var prev = $(this).find('[data-direction="prev"]');
			var next = $(this).find('[data-direction="next"]');
			var slider = '';

			if (role !== 'region') {
				slider = $this.slick({
					dots: false,
					mobileFirst: true,
					speed: 500,
					infinite: true,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				});
			}

			prev.on('click', function () {
				slider.slick('slickPrev');
			});
			next.on('click', function () {
				slider.slick('slickNext');
			});
		});

	}


	function init$s() {
		if ($singleImage.length) {
			sliderInit$6();
		}
	}

	var singleImage = {
		init: init$s
	};

	var $slidersThreeAcrossCards = $('[data-slider="three-across-cards"]');

	var $body$5 = $('body');
	var log$r = bows_min("sliders:three-across-cards");


	function sliderInit$7() {
		$slidersThreeAcrossCards.each(function () {
			var $this = $(this);
			var role = $this.attr('role');

			if (role !== 'region') {
				var slider = $this.slick({
					dots: true,
					//mobileFirst: true,
					speed: 500,
					// adaptiveHeight: true,
					//infinite: false,
					//variableWidth: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: true,
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});

				window.upennsliders.push(slider);
			}
		});

	}


	function init$t() {
		if ($slidersThreeAcrossCards.length) {
			sliderInit$7();
		}
	}

	var threeAcrossCards = {
		init: init$t
	};

	// Polyfill


	var log$s = bows_min("site");

	var Site = function Site() {
		var this$1 = this;

		document.addEventListener('DOMContentLoaded', function () { return this$1.ready(); });
		window.addEventListener('load', function () { return this$1.load(); });
	};

	Site.prototype.ready = function ready () {
		var log = bows_min("site:domReady");
		alert.init();
		//Creates globablly accessible array for sliders to be used to fix issue with slider in tabs
		window.upennsliders = [];

		keyboardFocus$1.init();

		log('document.DOMContentLoaded');

		navigation.init();
		modal.init();

		size.init();
		filter.init();
		fitvid();
		video_inline.init();
		video_vimeo.init();
		hero$1.init();
		accordion.init();
		tabs.init();
		link_grid.init();
		a_to_z.init();
		general.init();
		factbars$1.init();

		//Cards
		cards.init();
		articleCards.init();
		featuredInitiativeCards.init();
		eventCards.init();
		listingCards.init();
		gridCards.init();

		// Sliders
		threeAcross.init();
		centerToEdge.init();
		singleSmall.init();
		gallery.init();
		twoAcross.init();
		single.init();
		singleImage.init();
		threeAcrossCards.init();
	};

	Site.prototype.load = function load () {
		var log = bows_min("site:windowLoad");
		log("window.onload");
		ofi_commonJs();


		//Uncomment to preload background images for Link Grid
		//link_grid.loadAllGrid();


	};

	return Site;

}));
