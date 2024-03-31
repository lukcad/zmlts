/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/StaticArea","sap/ui/core/theming/Parameters","./RatingIndicatorRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Configuration","sap/ui/core/LabelEnablement"],function(e,t,a,i,s,n,o,jQuery,u,r){"use strict";var l=e.RatingIndicatorVisualMode;var p=t.extend("sap.m.RatingIndicator",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},maxValue:{type:"int",group:"Behavior",defaultValue:5},value:{type:"float",group:"Behavior",defaultValue:0,bindable:"bindable"},iconSize:{type:"sap.ui.core.CSSSize",group:"Behavior",defaultValue:null},iconSelected:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},iconUnselected:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},iconHovered:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},visualMode:{type:"sap.m.RatingIndicatorVisualMode",group:"Behavior",defaultValue:l.Half},displayOnly:{type:"boolean",group:"Behavior",defaultValue:false},editable:{type:"boolean",group:"Behavior",defaultValue:true},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"int"}}},liveChange:{parameters:{value:{type:"float"}}}},designtime:"sap/m/designtime/RatingIndicator.designtime"},renderer:s});p.sizeMapppings={};p.iconPaddingMappings={};p.paddingValueMappping={};p.prototype.init=function(){this.allowTextSelection(false);this._iIconCounter=0;this._fHoverValue=0;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m")};p.prototype.setValue=function(e){var t=typeof e!=="string"?e:Number(e);t=this.validateProperty("value",t);if(t<0){return this}if(isNaN(t)){o.warning('Ignored new rating value "'+e+'" because it is NAN')}else if(this.$().length&&t>this.getMaxValue()){o.warning('Ignored new rating value "'+t+'" because it is out  of range (0-'+this.getMaxValue()+")")}else{t=this._roundValueToVisualMode(t);this.setProperty("value",t);this._fHoverValue=t}return this};p.prototype.onThemeChanged=function(e){this.invalidate()};p.prototype.onBeforeRendering=function(){var e=this.getValue();var t=this.getMaxValue();if(e>t){this.setValue(t);o.warning("Set value to maxValue because value is > maxValue ("+e+" > "+t+").")}else if(e<0){this.setValue(0);o.warning("Set value to 0 because value is < 0 ("+e+" < 0).")}var a=this.getIconSize();if(a){this._setRegularSizes(a)}else if(this.getDisplayOnly()){this._setDisplayOnlySizes()}else{this._setContentDensitySizes()}};p.prototype._isRequired=function(){return this.getRequired()||r.isRequired(this)};p.prototype._setDisplayOnlySizes=function(){var e="sapUiRIIconSizeDisplayOnly",t="sapUiRIIconPaddingDisplayOnly";if(p.sizeMapppings[e]&&p.paddingValueMappping[t]){this._iPxIconSize=p.sizeMapppings[e];this._iPxPaddingSize=p.paddingValueMappping[t];return}var a=this._getDensityMode();if(a==="Compact"){e="sapUiRIIconSizeCompact";t="sapUiRIIconPaddingCompact"}var s=Object.assign({sapUiRIIconSizeDisplayOnly:"1rem",sapUiRIIconPaddingDisplayOnly:"0.125rem"},i.get({name:[e,t],callback:function(a){this.setIconAndPaddingSizes(e,t,a[e],a[t])}.bind(this)}));this.setIconAndPaddingSizes(e,t,s[e],s[t])};p.prototype._setContentDensitySizes=function(){var e=this._getDensityMode();var t="sapUiRIIconSize"+e;var a="sapUiRIIconPadding"+e;if(p.sizeMapppings[t]&&p.paddingValueMappping[a]){this._iPxIconSize=p.sizeMapppings[t];this._iPxPaddingSize=p.paddingValueMappping[a];return}var s=i.get({name:[t,a],callback:function(e){this.setIconAndPaddingSizes(t,a,e[t],e[a])}.bind(this)});if(s){this.setIconAndPaddingSizes(t,a,s[t],s[a])}};p.prototype._setRegularSizes=function(e){p.sizeMapppings[e]=p.sizeMapppings[e]||this._toPx(e);var t=p.sizeMapppings[e];p.iconPaddingMappings[t]=p.iconPaddingMappings[t]||"sapUiRIIconPadding"+this._getIconSizeLabel(t);var a=p.iconPaddingMappings[t];if(p.paddingValueMappping[a]){this._iPxIconSize=p.sizeMapppings[e];this._iPxPaddingSize=p.paddingValueMappping[a];return}var s=i.get({name:a,callback:function(t){this.setIconAndPaddingSizes(e,a,p.sizeMapppings[e],t)}.bind(this)});if(s){this.setIconAndPaddingSizes(e,a,p.sizeMapppings[e],s)}};p.prototype.setIconAndPaddingSizes=function(e,t,a,i){p.sizeMapppings[e]=this._toPx(a);p.paddingValueMappping[t]=this._toPx(i);this._iPxIconSize=p.sizeMapppings[e];this._iPxPaddingSize=p.paddingValueMappping[t]};p.prototype.onAfterRendering=function(){this._updateAriaValues()};p.prototype.exit=function(){this._iIconCounter=null;this._fStartValue=null;this._iPxIconSize=null;this._iPxPaddingSize=null;this._fHoverValue=null;this._oResourceBundle=null};p.prototype._getDensityMode=function(){var e=[{name:"Cozy",style:"sapUiSizeCozy"},{name:"Compact",style:"sapUiSizeCompact"},{name:"Condensed",style:"sapUiSizeCondensed"}],t,a,i;for(i in e){t=e[i].style;if(jQuery("html").hasClass(t)||jQuery("."+t).length>0){a=e[i].name}}return a||e[0].name};p.prototype._getIconSizeLabel=function(e){switch(true){case e>=32:return"L";case e>=22:return"M";case e>=16:return"S";case e>=12:return"XS";default:return"M"}};p.prototype._toPx=function(e){var t=Math.round(e),i;if(isNaN(t)){if(RegExp("^(auto|0)$|^[+-.]?[0-9].?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)$").test(e)){i=jQuery("<div>&nbsp;</div>").css({display:"none",width:e,margin:0,padding:0,height:"auto","line-height":1,border:0,overflow:"hidden"}).appendTo(a.getDomRef());t=i.width();i.remove()}else{return false}}return Math.round(t)};p.prototype._updateUI=function(e,t){var a=this.$("sel"),i=this.$("unsel-wrapper"),s=this.$("hov"),n=this._iPxIconSize,u=this._iPxPaddingSize,r="px",l=this.getMaxValue(),p=e*n+(Math.round(e)-1)*u,h=l*(n+u)-u;this._fHoverValue=e;if(p<0){p=0}this._updateAriaValues(e);i.width(h-p+r);if(t){s.width(p+r);a.hide();s.show()}else{a.width(p+r);s.hide();a.show()}o.debug("Updated rating UI with value "+e+" and hover mode "+t)};p.prototype._updateAriaValues=function(e){var t=this.$();var a;if(e===undefined){a=this.getValue()}else{a=e}var i=this.getMaxValue();t.attr("aria-valuenow",a);t.attr("aria-valuemax",i);var s=this._oResourceBundle.getText("RATING_VALUEARIATEXT",[a,i]);t.attr("aria-valuetext",s)};p.prototype._calculateSelectedValue=function(e){var t=-1,a=0,i=this.$(),s=(i.innerWidth()-i.width())/2,n,o=u.getRTL();if(e.targetTouches){n=e.targetTouches[0]}else{n=e}if(!n||!n.pageX){n=e;if((!n||!n.pageX)&&e.changedTouches){n=e.changedTouches[0]}}if(!n.pageX){return parseFloat(t)}if(n.pageX<i.offset().left){t=0}else if(n.pageX-i.offset().left>i.innerWidth()-s){t=this.getMaxValue()}else{a=(n.pageX-i.offset().left-s)/i.width();t=a*this.getMaxValue()}if(o){t=this.getMaxValue()-t}return this._roundValueToVisualMode(t,true)};p.prototype._roundValueToVisualMode=function(e,t){if(t){if(e<.25){e=0}else if(e<this.getMaxValue()-.4){e+=.4}e=Math.round(e)}else{if(this.getVisualMode()===l.Full){e=Math.round(e)}else if(this.getVisualMode()===l.Half){e=Math.round(e*2)/2}}return parseFloat(e)};p.prototype._getIncreasedValue=function(){var e=this.getMaxValue(),t=this.getValue()+this._getValueChangeStep();if(t>e){t=e}return t};p.prototype._getDecreasedValue=function(){var e=this.getValue()-this._getValueChangeStep();if(e<0){e=0}return e};p.prototype._getValueChangeStep=function(){var e=this.getVisualMode(),t;switch(e){case l.Full:t=1;break;case l.Half:if(this.getValue()%1===.5){t=.5}else{t=1}break;default:o.warning("VisualMode not supported",e)}return t};p.prototype.ontouchstart=function(e){if(e.which==2||e.which==3||!this.getEnabled()||this.getDisplayOnly()||!this.getEditable()){return}e.setMarked();if(!this._touchEndProxy){this._touchEndProxy=jQuery.proxy(this._ontouchend,this)}if(!this._touchMoveProxy){this._touchMoveProxy=jQuery.proxy(this._ontouchmove,this)}jQuery(document).on("touchend.sapMRI touchcancel.sapMRI mouseup.sapMRI",this._touchEndProxy);jQuery(document).on("touchmove.sapMRI mousemove.sapMRI",this._touchMoveProxy);this._fStartValue=this.getValue();var t=this._calculateSelectedValue(e);if(t>=0&&t<=this.getMaxValue()){this._updateUI(t,true);if(this._fStartValue!==t){this.fireLiveChange({value:t})}}};p.prototype._ontouchmove=function(e){if(e.isMarked("delayedMouseEvent")){return}e.preventDefault();if(this.getEnabled()){var t=this._calculateSelectedValue(e);if(t>=0&&t<=this.getMaxValue()){this._updateUI(t,true);if(this._fStartValue!==t){this.fireLiveChange({value:t})}}}};p.prototype._ontouchend=function(e){if(e.isMarked("delayedMouseEvent")){return}if(this.getEnabled()){var t=this._calculateSelectedValue(e);if(this.getValue()===1&&t===1){t=0}this.setProperty("value",t,true);this._updateUI(t,false);if(this._fStartValue!==t){this.fireLiveChange({value:t});this.fireChange({value:t})}jQuery(document).off("touchend.sapMRI touchcancel.sapMRI mouseup.sapMRI",this._touchEndProxy);jQuery(document).off("touchmove.sapMRI mousemove.sapMRI",this._touchMoveProxy);delete this._fStartValue}};p.prototype.ontouchcancel=p.prototype.ontouchend;p.prototype.onsapincrease=function(e){var t=this._getIncreasedValue();this._handleKeyboardValueChange(e,t)};p.prototype.onsapdecrease=function(e){var t=this._getDecreasedValue();this._handleKeyboardValueChange(e,t)};p.prototype.onsaphome=function(e){var t=0;this._handleKeyboardValueChange(e,t)};p.prototype.onsapend=function(e){var t=this.getMaxValue();this._handleKeyboardValueChange(e,t)};p.prototype.onsapselect=function(e){var t;if(this.getValue()===this.getMaxValue()){t=0}else{t=this._getIncreasedValue()}this._handleKeyboardValueChange(e,t)};p.prototype.onkeyup=function(e){var t=this.getMaxValue();if(!this.getEnabled()||this.getDisplayOnly()||!this.getEditable()){return false}switch(e.which){case n.DIGIT_0:case n.NUMPAD_0:this.setValue(0);break;case n.DIGIT_1:case n.NUMPAD_1:this.setValue(1);break;case n.DIGIT_2:case n.NUMPAD_2:this.setValue(Math.min(2,t));break;case n.DIGIT_3:case n.NUMPAD_3:this.setValue(Math.min(3,t));break;case n.DIGIT_4:case n.NUMPAD_4:this.setValue(Math.min(4,t));break;case n.DIGIT_5:case n.NUMPAD_5:this.setValue(Math.min(5,t));break;case n.DIGIT_6:case n.NUMPAD_6:this.setValue(Math.min(6,t));break;case n.DIGIT_7:case n.NUMPAD_7:this.setValue(Math.min(7,t));break;case n.DIGIT_8:case n.NUMPAD_8:this.setValue(Math.min(8,t));break;case n.DIGIT_9:case n.NUMPAD_9:this.setValue(Math.min(9,t));break}};p.prototype._handleKeyboardValueChange=function(e,t){if(!this.getEnabled()||this.getDisplayOnly()||!this.getEditable()){return}if(t!==this.getValue()){this.setValue(t);this.fireLiveChange({value:t});this.fireChange({value:t})}if(e){e.preventDefault();e.stopPropagation()}};p.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{role:"slider",type:e.getText("ACC_CTR_TYPE_RATING"),description:e.getText("ACC_CTR_STATE_RATING",[this.getValue(),this.getMaxValue()]),focusable:this.getEnabled()&&!this.getDisplayOnly(),enabled:this.getEnabled(),editable:this.getEditable()}};return p});
//# sourceMappingURL=RatingIndicator.js.map