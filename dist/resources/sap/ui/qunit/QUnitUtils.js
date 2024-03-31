/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/qunit/QUnitUtils",["sap/base/Log","sap/base/strings/camelize","sap/base/strings/capitalize","sap/base/util/extend","sap/base/util/ObjectPath","sap/ui/base/DataType","sap/ui/core/Element","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,r,n,i,a,o,s,jQuery){"use strict";if(typeof QUnit!=="undefined"){var u=!(parseFloat(QUnit.version)>=2);var f=new URLSearchParams(window.location.search);if(u){QUnit.equals=window.equals=window.equal}var c=f.get("sap-ui-qunittimeout");if(c!=null||!("testTimeout"in QUnit.config)){if(!c||isNaN(c)){c="30000"}QUnit.config.testTimeout=parseInt(c)}if(u){QUnit.config.reorder=false}if(window["sap-ui-qunit-coverage"]!=="client"&&/x|true/i.test(f.get("coverage-report"))){QUnit.done(function(e,t){if(window._$blanket){var r=window.QUnit;window.QUnit=undefined;sap.ui.requireSync("sap/ui/thirdparty/blanket");window.QUnit=r;window.blanket.report({})}})}}jQuery.now=function(){return Date.now()};var l={};l.delayTestStart=function(e){QUnit.config.autostart=false;if(e){window.setTimeout(function(){QUnit.start()},e)}else{jQuery(function(){QUnit.start()})}};var v=function(){};var g=v;try{new jQuery.Event({type:"mousedown"}).preventDefault()}catch(e){g=function(e){if(e){e.preventDefault=e.preventDefault||v;e.stopPropagation=e.stopPropagation||v;e.stopImmediatePropagation=e.stopImmediatePropagation||v}};const t=jQuery.Event;jQuery.Event=function(e,r){const n=new t(e,r);g(n.originalEvent);return n};jQuery.Event.prototype=t.prototype}function p(e,t,r){var n=jQuery.Event({type:e});if(t!=null){n.target=t}if(r){for(var i in r){n[i]=r[i];if(i==="originalEvent"){g(n[i])}else{n.originalEvent[i]=r[i]}}}return n}l.triggerEvent=function(e,t,r){if(typeof t=="string"){t=t?document.getElementById(t):null}var n=p(e,null,r);jQuery(t).trigger(n)};var d=o.closestTo&&o.closestTo.bind(o);if(d==null){d=function(e){return jQuery(e).control(0)}}l.triggerTouchEvent=function(e,t,r,n){if(typeof t=="string"){t=t?document.getElementById(t):null}var i=p(e,t,r),a=d(t),o=(n==null?"on":n)+e;if(a&&a[o]){a[o].call(a,i)}};function y(e){if(!e){return undefined}if(!isNaN(e)){var t=Object.keys(s).filter(function(t){return s[t]===e});if(t.length===1){e=t[0]}}if(e.toLowerCase().startsWith("numpad_")){return"NUMPAD"}}function h(e){if(!isNaN(e)){e=m(e)}if(!e){return undefined}e=e.toLowerCase();e=t(e.replace(/_/g,"-"));var n=r(e);if(n.startsWith("Digit")){return n.substring("Digit".length)}else if(n.startsWith("Numpad")){n=n.substring("Numpad".length)}switch(n){case"Break":return"Pause";case"Space":return" ";case"Print":return"PrintScreen";case"Windows":return"Meta";case"Sleep":return"Standby";case"TurnOff":return"PowerOff";case"Asterisk":return"*";case"Plus":return"+";case"Minus":return"-";case"Comma":return",";case"Slash":return"/";case"OpenBracket":return";";case"Dot":return".";case"Pipe":return"|";case"Semicolon":return";";case"Equals":return"=";case"SingleQUote":return"=";case"Backslash":return"\\";case"GreatAccent":return"`";default:return n}}function m(e){for(var t in s){if(s.hasOwnProperty(t)){if(s[t]===e){return t}}}}l.triggerKeyEvent=function(e,t,r,n,i,a){var o={};var u=!isNaN(r);o.keyCode=u?r:s[r];if(u){r=m(r)}o.key=h(r);o.location=y(r);o.which=o.keyCode;o.shiftKey=!!n;o.altKey=!!i;o.metaKey=!!a;o.ctrlKey=!!a;l.triggerEvent(e,t,o)};l.triggerKeydown=function(e,t,r,n,i){l.triggerKeyEvent("keydown",e,t,r,n,i)};l.triggerKeyup=function(e,t,r,n,i){l.triggerKeyEvent("keyup",e,t,r,n,i)};l.triggerKeyboardEvent=function(e,t,r,n,i){l.triggerKeydown(e,t,r,n,i)};l.triggerKeypress=function(e,t,r,n,i){var a=t&&t.toUpperCase();if(s[a]===null){QUnit.ok(false,"Invalid character for triggerKeypress: '"+t+"'")}var o=t.charCodeAt(0);var u={};u.charCode=o;u.which=o;u.key=h(a);u.location=y(a);u.shiftKey=!!r;u.altKey=!!n;u.metaKey=!!i;u.ctrlKey=!!i;l.triggerEvent("keypress",e,u)};l.triggerCharacterInput=function(e,t,r){l.triggerKeypress(e,t);if(typeof e=="string"){e=e?document.getElementById(e):null}var n=jQuery(e);if(typeof r!=="undefined"){n.val(r)}else{n.val(n.val()+t)}};l.triggerMouseEvent=function(e,t,r,n,i,a,o){var s={};s.offsetX=r;s.offsetY=n;s.pageX=i;s.pageY=a;s.button=o;l.triggerEvent(t,e,s)};l._removeAllWhitespaces=function(e){return e.replace(/\s/g,"")};l.triggerSelectAll=function(){document.getSelection().selectAllChildren(document.body)};l.isSelectedTextEqual=function(e){var t=l.getSelectedText();return e?e===t:!!t};l.includesSelectedText=function(e){var t=l.getSelectedText();if(!e){return!!t}if(!Array.isArray(e)){e=[e]}return e.every(function(e){return t.indexOf(e)>-1})};l.getSelectedText=function(){return l._removeAllWhitespaces(document.getSelection().toString())};var w={normal:400,bold:700};jQuery.fn.extend({_sapTest_dataEvents:function(){var e=this[0];return e?jQuery._data(e,"events"):null},_sapTest_cssFontWeight:function(){var e=this.css("font-weight");return e?w[e]||e:e}});(function(){function t(t){e.info(t)}var r={boolean:[false,true],int:[0,1,5,10,100],float:[NaN,0,.01,3.14,97.7],string:["","some","very long otherwise not normal and so on whatever","<"+"script>alert('XSS attack!');</"+"script>"]};var o=Object.create(r);function s(e){return e&&!(e instanceof Array)?[e]:e}l.resetDefaultTestValues=function(e){if(typeof e==="string"){delete o[e]}else{o=Object.create(r)}};l.setDefaultTestValues=function(e,t){if(typeof e==="string"){o[e]=s(t)}else if(typeof e==="object"){n(o,e)}};l.createSettingsDomain=function(e,t){function r(e){if(!o[e]){var t=a.getType(e);var r=t&&t.isEnum()?t.getEnumValues():undefined;if(!t){try{sap.ui.requireSync(e.replace(/\./g,"/"))}catch(e){}r=i.get(e)}if(r&&!(r instanceof a)){o[e]=Object.keys(r)}else{o[e]=[]}}return o[e]}e=(new e).getMetadata().getClass();t=t||{};var n={};var u=e.getMetadata().getAllProperties();for(var f in u){n[f]=s(t[f])||r(u[f].type)}return n};l.genericTest=function(e,r,n){if(n&&n.skip===true){return}e=(new e).getMetadata().getClass();n=n||{};var i=l.createSettingsDomain(e,n.allPairTestValues||{});t("domain");for(var a in i){var o=i[a].length;var s=[];s.push("  ",a,":","[");for(var u=0;u<o;u++){s.push(i[a][u],",")}s.push("]");t(s.join(""))}function f(e,t){return e+t.substring(0,1).toUpperCase()+t.substring(1)}function c(e,t){var r={};for(var n in t){if(e[f("get",n)]){r[n]=e[f("get",n)]()}}return r}var v;var g;var p=new l.AllPairsGenerator(i);var d=[];while(p.hasNext()){d.push(p.next())}var y=0;function h(){t("testNextCombination("+y+")");if(y>=d.length){t("last combination -> done");QUnit.start();return}v=new e(g);var n=c(v,g);QUnit.deepEqual(n,g,"settings");v.placeAt(r);t("before explicit rerender");v.getUIArea().rerender();t("after explicit rerender");t("info");setTimeout(m,0)}QUnit.stop(15e3);h();function m(){t("continueAfterRendering("+y+")");var e=d[d.length-y-1];for(var r in e){var n=v[f("set",r)](e[r]);QUnit.equal(v[f("get",r)](),e[r],"setter for property '"+r+"'");QUnit.ok(n==v,"setter for property '"+r+"' supports chaining (after rendering)")}y=y+1;setTimeout(h,0)}};l.suppressErrors=function(e){if(e!==false){t("suppress global errors")}else{t("reenable global errors")}};l.RandomPairsGenerator=function(e){var t=0;for(var r in e){if(e[r]&&!(e[r]instanceof Array)){e[r]=[e[r]]}if(e[r]&&e[r].length>0){if(t==0){t=e[r].length}else{t=t*e[r].length}}}function n(t){var r={};for(var n in e){var i=e[n]&&e[n].length;if(i==1){r[n]=e[n][0]}else if(i>1){var a=t%i;r[n]=e[n][a];t=(t-a)/i}}return r}this.hasNext=function(){return true};this.next=function(){return n(Math.floor(100*t*Math.random()))}};l.AllPairsGenerator=function(e){var t=[];for(var r in e){t.push({name:r,n:e[r].length,values:e[r]})}var n=t.length;var i=[];var a=[];var o=0;for(var s=0;s<n-1;s++){var u=t[s];for(var f=s+1;f<n;f++){var c=t[f];a[s*n+f]=o;for(var l=u.n*c.n;l>0;l--){i[o++]=0}}}function v(e,r,i,o){return a[e*n+r]+i*t[r].n+o}function g(){var e=[];function r(r,a){var o={va:a,pairs:0,redundant:0};for(var s=0;s<n;s++){var u;if(s<r){u=i[v(s,r,e[s],a)]}else if(s>r){var f=v(r,s,a,0),c=f+t[s].n;for(u=i[f];u>0&&f<c;f++){if(i[f]<u){u=i[f]}}}o.redundant=o.redundant+u;if(u==0){o.pairs++}}return o}for(var a=0;a<n;a++){var o=t[a];var s=r(a,0);for(var u=1;u<o.n;u++){var f=r(a,u);if(f.pairs>s.pairs||f.pairs==s.pairs&&f.redundant<s.redundant){s=f}}e[a]=s.va}return e}this.hasNext=function(){return o>0};var p;var d=-1;this.next=function(){p=g();d=0;var e={};for(var r=0;r<n;r++){for(var a=r+1;a<n;a++){var s=v(r,a,p[r],p[a]);if(i[s]==0){o--;d++}i[s]++}e[t[r].name]=t[r].values[p[r]]}return e};this.lastPairs=function(){return d}}})();i.set("sap.ui.test.qunit",l);window.qutils=l;return l},true);
//# sourceMappingURL=QUnitUtils.js.map