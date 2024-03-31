/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/Device"],function(t,e){"use strict";var i=t.extend("sap.ui.layout.cssgrid.GridResponsiveLayout",{metadata:{library:"sap.ui.layout",properties:{containerQuery:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{layout:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutS:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutM:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutL:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutXL:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false}},events:{layoutChange:{parameters:{layout:{type:"string"}}}}}});i.mSizeClasses={Phone:"sapUiLayoutCSSGridS",Tablet:"sapUiLayoutCSSGridM",Desktop:"sapUiLayoutCSSGridL",LargeDesktop:"sapUiLayoutCSSGridXL"};i.mSizeLayouts={Phone:"layoutS",Tablet:"layoutM",Desktop:"layoutL",LargeDesktop:"layoutXL"};i.prototype.init=function(){this._sActiveLayout="layout"};i.prototype.getActiveGridSettings=function(){return this.getAggregation(this._sActiveLayout)};i.prototype.isResponsive=function(){return true};i.prototype.onGridAfterRendering=function(t){this.setActiveLayout(t,false)};i.prototype.onGridResize=function(t){if(!t||t.size.width===0){return}this.setActiveLayout(t.control,true)};i.prototype.applySizeClass=function(t,e){if(t.hasClass(e)){return}var a=Object.keys(i.mSizeClasses).map(function(t){return i.mSizeClasses[t]});t.removeClass(a.join(" "));t.addClass(e)};i.prototype.setActiveLayout=function(t,a){var s=this.getContainerQuery()?t.$().outerWidth():window.innerWidth;var o=e.media.getCurrentRange("StdExt",s),u=i.mSizeLayouts[o.name],r=this._getLayoutToApply(u);this.applySizeClass(t.$(),i.mSizeClasses[o.name]);if(this._sActiveLayout===r){return}this._sActiveLayout=r;if(a){this.fireLayoutChange({layout:r})}};i.prototype._getLayoutToApply=function(t){if(this.getAggregation(t)){return t}return"layout"};return i});
//# sourceMappingURL=GridResponsiveLayout.js.map