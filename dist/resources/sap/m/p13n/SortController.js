/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/SelectionController","sap/m/p13n/SortPanel","sap/m/p13n/modules/xConfigAPI"],function(t,e,n){"use strict";var r=t.extend("sap.m.p13n.SortController",{constructor:function(){t.apply(this,arguments);this._bResetEnabled=true}});r.prototype.getStateKey=function(){return"sorters"};r.prototype.getDelta=function(e){e.deltaAttributes.push("descending");return t.prototype.getDelta.apply(this,arguments)};r.prototype.initAdaptationUI=function(t){var n;n=new e;var r=this.mixInfoAndState(t);n.setP13nData(r.items);this._oPanel=n;return Promise.resolve(n)};r.prototype.model2State=function(){var t=[];if(this._oPanel){this._oPanel.getP13nData(true).forEach(function(e){if(e.sorted){t.push({key:e.key})}});return t}};r.prototype.getChangeOperations=function(){return{add:"addSort",remove:"removeSort"}};r.prototype.getCurrentState=function(t){var e=n.readConfig(this.getAdaptationControl())||{};var r=e.hasOwnProperty("properties")?e.properties.sortConditions:[];return r||[]};r.prototype._createAddRemoveChange=function(t,e,n){var r={selectorElement:t,changeSpecificData:{changeType:e,content:n}};return r};r.prototype._createMoveChange=function(t,e,n,r,o,i){var a={selectorElement:o,changeSpecificData:{changeType:r,content:{id:t,key:e,index:n}}};if(!i){delete a.changeSpecificData.content.id}return a};r.prototype._getPresenceAttribute=function(t){return"sorted"};r.prototype.mixInfoAndState=function(t){var e=this.getCurrentState();var n=this.arrayToMap(e);var r=this.prepareAdaptationData(t,function(t,e){var r=n[e.key];t.sorted=r?true:false;t.sortPosition=r?r.position:-1;t.descending=r?!!r.descending:false;return!(e.sortable===false)});this.sortP13nData({visible:"sorted",position:"sortPosition"},r.items);r.presenceAttribute=this._getPresenceAttribute();r.items.forEach(function(t){delete t.sortPosition});return r};return r});
//# sourceMappingURL=SortController.js.map