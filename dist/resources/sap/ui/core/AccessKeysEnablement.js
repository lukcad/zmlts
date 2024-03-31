/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/config","sap/ui/base/Object","sap/ui/core/Element","sap/ui/Device"],function(e,t,n,i){"use strict";var s=t.extend("sap.ui.core.AccessKeysEnablement",{});s.controlRegistry=new Set;s.CSS_CLASS="sapUiAccKeysHighlighDom";s.bListenersAttached=false;var r=function(){var e=function(e){var t=e.getEnabled&&!e.getEnabled();if(t){return}if(e){e.setProperty("highlightAccKeysRef",true);e.onAccKeysHighlightStart&&e.onAccKeysHighlightStart()}};s.controlRegistry.forEach(function(t){e(t)})};var a=function(){var e=function(e){if(e){e.setProperty("highlightAccKeysRef",false);e.onAccKeysHighlightStart&&e.onAccKeysHighlightEnd()}};s.controlRegistry.forEach(function(t){e(t)})};s.attachKeydownListeners=function(){document.addEventListener("keydown",function(e){if(this.hasHighlightedElements()){e.preventDefault()}this.handleHighlightStart(e);document.addEventListener("keydown",function(e){if(this.hasHighlightedElements()){e.preventDefault()}}.bind(this),{once:true})}.bind(this));document.addEventListener("keyup",function(e){this.handleHighlightEnd(e)}.bind(this));window.addEventListener("blur",function(){this.handleHighlightEnd(true)}.bind(this))};s.handleHighlightStart=function(e){var t=e.altKey;var n=e.key;if(t){r();if(this.hasHighlightedElements()){var i=this.getElementToBeFocused(n);if(!i.length){return}var s=document.activeElement;var a=e.shiftKey;var c=i.indexOf(s);if(a){var o=i[c-1];if(o){o.focus()}else if(c===0){i[i.length-1].focus()}}else{var l=i[c+1];if(l){l.focus()}else if(c===i.length-1){i[0].focus()}}}}};s.hasHighlightedElements=function(){return document.getElementsByClassName(s.CSS_CLASS).length};s.handleHighlightEnd=function(e,t){if(!e.altKey||t){a()}};s.getElementToBeFocused=function(e){return[].filter.call(document.querySelectorAll("[data-ui5-accesskey='"+e.toLowerCase()+"']"),function(e){var t=n.getElementById(e.getAttribute("id"));var i=t.getEnabled?t.getEnabled():true;var s=t.getVisible();return i&&s}).map(function(e){e=n.getElementById(e.getAttribute("id"));return e.getAccessKeysFocusTarget?e.getAccessKeysFocusTarget():e.getFocusDomRef()})};s.registerControl=function(t){var n=e.get({name:"sapUiXxAccKeys",type:e.Type.Boolean,external:true});if(i.os.macintosh){return}this.controlRegistry.add(t);if(n&&!this.bListenersAttached){this.attachKeydownListeners();s.bListenersAttached=true}var r=t.exit;t.exit=function(){s.controlRegistry.delete(t);r&&r.call(t)}};s.deregisterControl=function(e){s.registerControl.delete()};return s});
//# sourceMappingURL=AccessKeysEnablement.js.map