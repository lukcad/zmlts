/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/Engine","sap/m/p13n/modules/xConfigAPI"],function(e,t){"use strict";var n={};var a=function(e,t){var n=function(t){if(e._pQueue===t){delete e._pQueue}};e._pQueue=e._pQueue instanceof Promise?e._pQueue.then(t):t();e._pQueue.then(n.bind(null,e._pQueue));return e._pQueue};function r(t,n){if(t.isA){e.getInstance().trace(t,{selectorElement:t,changeSpecificData:{changeType:n.getChangeType(),content:n.getContent()}});if(!t._pPendingModification){t._pPendingModification=e.getInstance().waitForChanges(t).then(function(){e.getInstance().fireStateChange(t);e.getInstance().clearTrace(t);delete t._pPendingModification})}}}function g(e){const t=["add","remove","move","set"];return t.find(t=>e.indexOf(t)===0)}n.createHandler=function(t){if(!t||!t.hasOwnProperty("property")){throw new Error("Please provide a map containing the affected aggregation and property name!")}var n=t.property;var o;return{changeHandler:{applyChange:function(i,u,p){return a(u,function(){return e.getInstance().readXConfig(u,{propertyBag:p}).then(function(a){var r=g(i.getChangeType());o=i.getContent().targetAggregation;var c={key:i.getContent().key};if(r!=="set"){c.value=r!=="add"}else{c.value=null}var f;if(r==="move"){f=e.getInstance().getController(u,i.getChangeType()).getCurrentState();var s=f.find(function(e,t){if(e.key===i.getContent().key){return e}});c.targetAggregation=i.getContent().targetAggregation;c.index=f.indexOf(s)}if(a&&a.aggregations&&a.aggregations[o]&&a.aggregations[o][i.getContent().key]&&a.aggregations[o][i.getContent().key][n]){c.value=a.aggregations[o][i.getContent().key][n]}i.setRevertData(c);var y={property:n,key:i.getContent().key,value:i.getContent(),operation:r,changeType:i.getChangeType(),propertyBag:p,markAsModified:true};if(t.aggregationBased){y.controlMeta={aggregation:o}}return e.getInstance().enhanceXConfig(u,y)}).then(function(){r(u,i)})})},completeChangeContent:function(e,t,n){},revertChange:function(a,i,u){var p=g(a.getChangeType());o=a.getContent().targetAggregation;var c={controlMeta:{aggregation:o,property:n},property:n,operation:p,changeType:a.getChangeType(),key:a.getRevertData().key,value:a.getRevertData(),propertyBag:u};if(t.aggregationBased){c.controlMeta={aggregation:o}}return e.getInstance().enhanceXConfig(i,c).then(function(){a.resetRevertData();r(i,a)})}},layers:{USER:true}}};return n});
//# sourceMappingURL=xConfigHandler.js.map