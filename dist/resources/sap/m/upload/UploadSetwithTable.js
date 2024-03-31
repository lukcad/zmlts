/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Table","sap/m/ToolbarSpacer","sap/m/upload/UploadSetwithTableRenderer","sap/ui/unified/FileUploader","sap/m/upload/UploaderHttpRequestMethod","sap/m/OverflowToolbar","sap/m/upload/UploadSetwithTableItem","sap/base/util/deepEqual","sap/base/Log","sap/m/library","sap/m/IllustratedMessageType","sap/m/IllustratedMessage","sap/m/IllustratedMessageSize","sap/m/upload/UploaderTableItem","sap/ui/core/dnd/DragDropInfo","sap/ui/core/dnd/DropInfo","sap/m/upload/FilePreviewDialog","sap/ui/base/Event","sap/m/Dialog","sap/m/Label","sap/m/Input","sap/m/MessageBox","sap/m/Button","sap/ui/core/Core","sap/ui/fl/variants/VariantManagement","sap/m/upload/p13n/PersManager","sap/m/upload/p13n/mediator/ColumnsMediator","sap/m/upload/p13n/mediator/SortMediator","sap/m/upload/p13n/mediator/GroupMediator","sap/m/upload/p13n/mediator/FilterMediator","sap/ui/core/mvc/XMLView","sap/ui/core/Element","sap/m/MenuButton","sap/m/MenuItem","sap/m/Menu"],function(e,t,i,o,a,r,l,s,n,p,d,u,h,g,c,_,m,f,T,y,b,F,E,U,P,I,D,C,M,S,v,A,w,x,N){"use strict";var R=e.extend("sap.m.upload.UploadSetwithTable",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:"No documents available"},noDataDescription:{type:"string",defaultValue:"Drag and drop files here to upload"},uploadUrl:{type:"string",defaultValue:null},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:a.Post},multiple:{type:"boolean",group:"Behavior",defaultValue:false},uploadButtonInvisible:{type:"boolean",group:"Appearance",defaultValue:false},uploadEnabled:{type:"boolean",defaultValue:true},itemValidationHandler:{type:"function",defaultValue:null},directory:{type:"boolean",group:"Behavior",defaultValue:false},noDataIllustrationType:{type:"sap.m.IllustratedMessageType",group:"Appearance",defaultValue:d.UploadCollection},enableVariantManagement:{type:"boolean",defaultValue:false},cloudFilePickerEnabled:{type:"boolean",group:"Behavior",defaultValue:false},cloudFilePickerServiceUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},cloudFilePickerButtonText:{type:"string",defaultValue:""}},aggregations:{uploader:{type:"sap.m.upload.UploaderTableItem",multiple:false},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"}},associations:{previewDialog:{type:"sap.m.upload.FilePreviewDialog",multiple:false}},events:{itemRenamed:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"},response:{type:"string"},readyState:{type:"string"},status:{type:"string"},responseXML:{type:"string"},responseText:{type:"string"},headers:{type:"object"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},beforeInitiatingItemUpload:{parameters:{item:{type:"sap.m.upload.UploadSetwithTableItem"}}},itemDragStart:{},itemDrop:{}}},renderer:i});var L=p.UploadState;var B=p.UploadSetwithTableActionPlaceHolder;R.prototype.init=function(){e.prototype.init.call(this);this._setDragDropConfig();this._filesTobeUploaded=[];this._filePreviewDialogControl=null;this._oRb=U.getLibraryResourceBundle("sap.m");this._bPersoRegistered=false;this._setIllustratedMessage()};R.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.call(this)};R.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.call(this);if(!this._bPersoRegistered){I.getInstance().register(this,{mediators:{columns:new D({control:this,targetAggregation:"columns",p13nMetadataTarget:"columns"}),sort:new C({control:this,targetAggregation:"sortConditions",p13nMetadataTarget:"sort"}),group:new M({control:this,targetAggregation:"groupConditions",p13nMetadataTarget:"group"}),filter:new S({control:this,targetAggregation:"filterConditions",p13nMetadataTarget:"filter"})}});this._bPersoRegistered=true}if(this.getCloudFilePickerEnabled()){this._oFileUploader.addStyleClass("sapMUSTFileUploaderVisibility")}};R.prototype.exit=function(){e.prototype.exit.call(this);if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null}if(this._oFileUploader){this._oFileUploader.destroy();this._oFileUploader=null}if(this._illustratedMessage){this._illustratedMessage.destroy();this._illustratedMessage=null}this._bPersoRegistered=false;I.getInstance().deregister(this)};R.prototype.getHeaderToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("headerToolbar");var e=this.getCloudFilePickerEnabled()&&!this.getUploadButtonInvisible()?this._getCloudFilePickerMenu():this.getDefaultFileUploader();var i=this.getCloudFilePickerEnabled()&&this.getUploadButtonInvisible()?this._getCloudFilePickerButton():null;var o=this.getEnableVariantManagement()?this._getPersonalizationControl():null;if(!this._oToolbar){const a=[new t,e,i,o];if(this.getEnableVariantManagement()){a.unshift(this._getVariantManagementControl())}this._oToolbar=new r(this.getId()+"-toolbar",{content:a});this.addDependent(this._oToolbar)}else{const t=this._getPlaceholderPosition(this._oToolbar,B.UploadButtonPlaceholder);if(this._oToolbar&&t>-1){this._setControlInToolbar(t,e)}else if(this._oToolbar){this._oToolbar.addContent(e)}const o=this._getPlaceholderPosition(this._oToolbar,B.CloudFilePickerButtonPlaceholder);if(this._oToolbar&&o>-1){this._setControlInToolbar(o,i)}else if(this._oToolbar){this._oToolbar.addContent(i)}const a=this._getPlaceholderPosition(this._oToolbar,B.PersonalizationSettingsPlaceholder);if(this._oToolbar&&a>-1){this._setControlInToolbar(a,this._getPersonalizationControl())}else if(this._oToolbar){if(this.getEnableVariantManagement()){this._oToolbar.addContent(this._getPersonalizationControl())}}if(this.getEnableVariantManagement()){const e=this._getPlaceholderPosition(this._oToolbar,B.VariantManagementPlaceholder);if(e>-1){this._setControlInToolbar(e,this._getVariantManagementControl())}else{this._oToolbar.insertContent(this._getVariantManagementControl(),0)}}}if(this.getCloudFilePickerEnabled()){this._oToolbar.addContent(this.getDefaultFileUploader())}}return this._oToolbar};R.prototype._getPersonalizationControl=function(){return new E({icon:"sap-icon://action-settings",press:function(){I.getInstance().show(this,["columns","sort","group","filter"])}.bind(this)})};R.prototype._getVariantManagementControl=function(){if(!this._oVariantManagement){this._oVariantManagement=new P({id:this.getId()+"-variantManagement",for:[this]})}return this._oVariantManagement};R.prototype.getView=function(){return this.getControlOfType(this,v)};R.prototype.getControlOfType=function(e,t){if(e instanceof t){return e}if(e&&typeof e["getParent"==="function"]){return this.getControlOfType(e.getParent(),t)}return undefined};R.prototype._getP13nMetadata=function(){if(!this._p13nMetadata){const e=this.getView(),t=this.getColumns().map(function(t){return{key:e?e.getLocalId(t.getId()):t.getId(),label:t.getColumnPersonalizationText(),path:t.getPath(),visible:t.getVisible(),sortable:t.getSortable(),groupable:t.getGroupable(),filterable:t.getFilterable()}});this._p13nMetadata={columns:[],sort:[],group:[],filter:[]};t.forEach(e=>{this._p13nMetadata.columns.push({key:e.key,label:e.label});if(e.sortable&&e.path){this._p13nMetadata.sort.push({key:e.key,label:e.label,path:e.path})}if(e.groupable&&e.path){this._p13nMetadata.group.push({key:e.key,label:e.label,path:e.path})}if(e.filterable&&e.path){this._p13nMetadata.filter.push({key:e.key,label:e.label,path:e.path})}})}return this._p13nMetadata};R.prototype.setFileTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this.getDefaultFileUploader().setFileType(t)}return this};R.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this.getDefaultFileUploader().setMaximumFilenameLength(e)}return this};R.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this.getDefaultFileUploader().setMaximumFileSize(e)}return this};R.prototype.setMediaTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this.getDefaultFileUploader().setMimeType(t)}return this};R.prototype.setUploadButtonInvisible=function(e){if(e!==this.getUploadButtonInvisible()){var t=!e;this.getDefaultFileUploader().setVisible(t);this.setProperty("uploadButtonInvisible",e,true)}return this};R.prototype.setMultiple=function(e){if(this.getMultiple()!==e){this.setProperty("multiple",e);this.getDefaultFileUploader().setMultiple(e)}return this};R.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);this.setProperty("uploadEnabled",e,false)}return this};R.prototype.setDirectory=function(e){if(this.getDirectory()!==e){this.setProperty("directory",e);this.getDefaultFileUploader().setDirectory(e);if(e){this.setProperty("multiple",false)}}return this};R.prototype.setNoDataIllustrationType=function(e){if(this.getNoDataIllustrationType()!==e){this.setProperty("noDataIllustrationType",e);if(this._illustratedMessage){this._illustratedMessage.setIllustrationType(this.getNoDataIllustrationType())}}return this};R.prototype.setNoDataText=function(e){if(this.getNoData()!==e){this.setProperty("noDataText",e);if(this._illustratedMessage){this._illustratedMessage.setTitle(this.getNoDataText())}}return this};R.prototype.setNoDataDescription=function(e){if(this.getNoDataDescription()!==e){this.setProperty("noDataDescription",e);if(this._illustratedMessage){this._illustratedMessage.setDescription(this.getNoDataDescription())}}return this};R.prototype.getDefaultFileUploader=function(){var e="Upload";if(!this._oFileUploader){this._oFileUploader=new o(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:false,enabled:this.getUploadEnabled(),icon:"",iconFirst:false,style:"Transparent",name:"UploadSetwithTableFileUploader",sameFilenameAllowed:true,fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),maximumFilenameLength:this.getMaxFileNameLength(),maximumFileSize:this.getMaxFileSize(),multiple:this.getDirectory()?false:this.getMultiple(),useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],typeMissmatch:[this._fireFileTypeMismatch,this],fileSizeExceed:[this._fireFileSizeExceed,this],filenameLengthExceed:[this._fireFilenameLengthExceed,this],visible:!this.getUploadButtonInvisible(),directory:this.getDirectory()})}return this._oFileUploader};R.getIconForFileType=function(e,t){return l._getIconByMimeType(e,t)};R.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this))};R.prototype.fileSelectionHandler=function(){var e=this.getDefaultFileUploader();if(e&&e.oFileUpload&&e.oFileUpload.click){e.oFileUpload.click()}};R.getFileSizeWithUnits=function(e){var t=1024;var i=t*1024;var o=i*1024;if(typeof e==="number"){if(e<i){return(e/t).toFixed(2)+" KB"}else if(e<o){return(e/i).toFixed(2)+" MB"}else{return(e/o).toFixed(2)+" GB"}}return e};R.prototype.uploadItemViaUrl=function(e,t,i){var o=new File([new Blob([])],e);var a=new l({uploadState:L.Ready});a._setFileObject(o);a.setFileName(o.name);a.setUrl(t);i.then(()=>this._initateItemUpload(a).bind(this)).catch(()=>a.destroy());return a};R.prototype.uploadItemWithoutFile=function(e){var t=new File([new Blob([])],"-");var i=new l({uploadState:L.Ready});i._setFileObject(t);i.setFileName(t.name);e.then(()=>this._initateItemUpload(i)).catch(()=>i.destroy());return i};R.prototype.renameItem=function(e){if(e&&e instanceof l){const t=this._getFileRenameDialog(e);t.open()}};R.prototype._setControlInToolbar=function(e,t){this._oToolbar.getContent()[e].setVisible(false);this._oToolbar.insertContent(t,e)};R.prototype._getPlaceholderPosition=function(e,t){for(var i=0;i<e.getContent().length;i++){if(e.getContent()[i].isA("sap.m.upload.ActionsPlaceholder")&&e.getContent()[i].getPlaceholderFor()===t){return i}}return-1};R.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");if(t&&t.length){var i=this.getSelectedItems();var o=i&&i.length==1?i[0]:null;var a=o?o&&o.getFileName&&o.getFileName()==="-":false;if(a){this._oItemToUpdate=t[0]}this._processSelectedFileObjects(t)}};R.prototype._processSelectedFileObjects=function(e){var t=[];for(var i=0;i<e.length;i++){t.push(e[i])}t.forEach(e=>{var i=new l({uploadState:L.Ready});i.setParent(this);i._setFileObject(e);i.setFileName(e.name);if(this.getItemValidationHandler()&&typeof this.getItemValidationHandler()==="function"){const e={oItem:i,iTotalItemsForUpload:t.length,oSource:this};var o=this.getItemValidationHandler()(e);if(o&&o instanceof Promise){o.then(e=>{if(e instanceof l){this._initateItemUpload(e)}}).catch(e=>{if(e&&this._oItemToUpdate&&e instanceof l&&e.getId()===this._oItemToUpdate.getId()){this._oItemToUpdate=null}})}else{i.destroy();n.error("Invalid usage, missing Promise: ItemValidationHandler callback expects Promise to be returned.")}}else{this._initateItemUpload(i)}})};R.prototype._initateItemUpload=function(e){this.fireBeforeInitiatingItemUpload({item:e});if(this._oItemToUpdate){this._oItemToUpdate=e}this._uploadItemIfGoodToGo(e)};R.prototype._fireFileTypeMismatch=function(e){var t=this.getMediaTypes();var i=this.getFileTypes();var o=e.getParameter("fileType");var a=e.getParameter("mimeType");var r=!!t&&t.length>0&&!!a&&t.indexOf(a)===-1;var s=!!i&&i.length>0&&!!o&&i.indexOf(o)===-1;var n=[new Blob([])];var p={type:e.getParameter("fileType"),webkitRelativePath:"",name:e.getParameter("fileName")};var d=new File(n,e.getParameter("fileName"),p);var u=new l;u._setFileObject(d);u.setFileName(d.name);if(r){this.fireMediaTypeMismatch({item:u})}else if(s){this.fireFileTypeMismatch({item:u})}};R.prototype._fireFilenameLengthExceed=function(e){var t=new l;t.setFileName(e.getParameter("fileName"));this.fireFileNameLengthExceeded({item:t})};R.prototype._fireFileSizeExceed=function(e){var t=new l;t.setFileName(e.getParameter("fileName"));this.fireFileSizeExceeded({item:t})};R.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(L.Uploading)};R.prototype._onUploadCompleted=function(e){var t=e.getParameter("item"),i=e.getParameter("responseXHR"),o=null;if(i.responseXML){o=i.responseXML.documentElement.textContent}var a={item:t,response:i.response,responseXML:o,responseText:i.responseText,readyState:i.readyState,status:i.status,headers:i.headers};if(this._oItemToUpdate){this._oItemToUpdate.setFileName(t.getFileName());this._oItemToUpdate._setFileObject(t.getFileObject());this._oItemToUpdate=null}t.setUploadState(L.Complete);this.fireUploadCompleted(a)};R.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===L.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){const t=this.getHeaderFields()?.length?this.getHeaderFields():[];const i=e.getHeaderFields()?.length?e.getHeaderFields():[];const o=[...t,...i];this._getActiveUploader().uploadItem(e,o)}}};R.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};R.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new g({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};R.prototype._setIllustratedMessage=function(){if(!this._illustratedMessage){this._illustratedMessage=new u({illustrationType:this.getNoDataIllustrationType(),illustrationSize:h.Spot,title:this.getNoDataText()?this.getNoDataText():this._oRb.getText("UPLOADSET_WITH_TABLE_NO_DATA_TEXT"),description:this.getNoDataDescription()?this.getNoDataDescription():this._oRb.getText("UPLOADSET_WITH_TABLE_NO_DATA_DESCRIPTION")})}this.setAggregation("_noColumnsMessage",this._illustratedMessage);this.setAggregation("noData",this._illustratedMessage)};R.prototype._setDragDropConfig=function(){var e=new c({sourceAggregation:"items",targetAggregation:"items",dragStart:[this._onDragStartItem,this],drop:[this._onDropItem,this]});var t=new _({dropEffect:"Move",dropPosition:"OnOrBetween",dragEnter:[this._onDragEnterFile,this],drop:[this._onDropFile,this]});this.addDragDropConfig(e);this.addDragDropConfig(t)};R.prototype._onDragStartItem=function(e){this.fireItemDragStart(e)};R.prototype._onDropItem=function(e){this.fireItemDrop(e)};R.prototype._onDragEnterFile=function(e){var t=e.getParameter("dragSession");var i=t.getDragControl();if(i){e.preventDefault()}};R.prototype._onDropFile=function(e){e.preventDefault();if(!this.getUploadEnabled()){n.error("Upload is not enabled, to continue uploading with drag and drop of files enable property 'UploadEnabled' ");return}let t=e.getParameter("browserEvent").dataTransfer.items;t=Array.from(t);t=t.filter(function(e){return e.webkitGetAsEntry()?true:false});const i=t.map(function(e){const t=e.webkitGetAsEntry();return{entryType:t&&t.isFile?"File":"Directory"}});if(t&&t.length>1&&!this.getMultiple()&&!this.getDirectory()){const e=this._oRb.getText("UPLOADSET_WITH_TABLE_MULTIPLE_RESTRICTED");n.warning("Multiple files upload is retsricted for this multiple property set");F.error(e);return}else if(t&&t.length>1&&this.getMultiple()&&!o("File",i)){const e=this._oRb.getText("UPLOADSET_WITH_TABLE_DIRECTORY_RESTRICTED");n.warning("Multiple files upload is retsricted, drag & drop only files");F.error(e);return}if(t&&t.length&&!this.getDirectory()&&o("Directory",i)){const e=this._oRb.getText("UPLOADSET_WITH_TABLE_DIRECTORY_RESTRICTED");n.warning("Directory of files upload is retsricted for this directory property set");F.error(e);return}else if(t&&t.length&&this.getDirectory()&&!o("Directory",i)){const e=this._oRb.getText("UPLOADSET_WITH_TABLE_DROP_DIRECTORY_ALLOWED");n.warning("Directory of files upload is retsricted, drag & drop only directories here.");F.error(e);return}if(t&&t.length){this._getFilesFromDataTransferItems(t).then(e=>{if(e&&e.length){this._processSelectedFileObjects(e)}})}function o(e,t){return t.every(function(t){return t.entryType===e})}};R.prototype._getFilesFromDataTransferItems=function(e){const t=[];return new Promise((o,a)=>{const r=[];for(let t=0;t<e.length;t++){r.push(i(e[t]?.webkitGetAsEntry()))}Promise.all(r).then(e=>{o(t)},e=>{a(e)})});function i(e){return new Promise((o,a)=>{if(e.isFile){e.file(e=>{t.push(e);o(e)},e=>{a(e)})}else if(e.isDirectory){const t=e.createReader();t.readEntries(function(e){const t=[];for(let o=0;o<e.length;o++){t.push(i(e[o]))}o(Promise.all(t))})}})}};R.prototype._openFilePreview=function(e){if(!this.getPreviewDialog()){const e=new m;this.setPreviewDialog(e)}this._filePreviewDialogControl=A.getElementById(this.getPreviewDialog());if(this._filePreviewDialogControl){this._filePreviewDialogControl._previewItem=e;this._filePreviewDialogControl._items=this.getItems();this._filePreviewDialogControl._open()}};R.prototype._getFileRenameDialog=function(e){const t=l._splitFileName(e.getFileName());let i=this.getMaxFileNameLength();const o=t.extension?t.extension.length+1:0;i=i?i:0;let a=i-o;a=a<0?0:a;const r=new b({type:p.InputType.Text,value:t.name,width:"90%",maxLength:a,liveChange:[this._handleItemNameValidation,this]});r.addStyleClass("sapUiTinyMarginTop");r.addStyleClass("sapUiSmallMarginBegin");const s=new y({text:this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_INPUT_LABEL"),labelFor:r.getId()});s.addStyleClass("sapUiSmallMarginTop");s.addStyleClass("sapUiSmallMarginBegin");s.addStyleClass("sapUiSmallMarginEnd");var n=new T({title:this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_DIALOG_TEXT"),contentWidth:"22.5rem",contentHeight:"12rem",content:[s,r],beginButton:new E({type:p.ButtonType.Emphasized,text:this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_APPLY_BUTTON_TEXT"),press:this._handleItemRenameConfirmation.bind(this),enabled:r.getValueState()!=="Error"}),endButton:new E({text:this._oRb.getText("UPLOADSET_WITH_TABLE_CANCELBUTTON_TEXT"),press:this._handleItemRenameCancel.bind(this)}),customData:{key:"item",value:e},afterClose:function(){n.destroy()}});return n};R.prototype._handleItemRenameCancel=function(e){const t=e.getSource().getParent();const i=t.getContent()[1];const o=t&&t.data?t.data().item:null;const a=l._splitFileName(o.getFileName());if(o&&i&&a.name!==i.getValue()){F.warning(this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_DISCARD_POPUP_CHANGES_TEXT"),{actions:[this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_SAVE_BUTTON_TEXT"),this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_DISCARD_CHANGES_BUTTON_TEXT")],emphasizedAction:this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_SAVE_BUTTON_TEXT"),onClose:e=>{if(e!==this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_SAVE_BUTTON_TEXT")){t.close()}else{var i=t.getBeginButton();var o=new f("click",i);i.firePress(o)}}})}else{t.close()}};R.prototype._handleItemRenameConfirmation=function(e){const t=e.getSource().getParent();const i=t.getContent()[1];if(i&&i.getValueState()==="Error"){i.focus(i);i.setShowValueStateMessage(true);return}const o=t&&t.data?t.data().item:null;const a=l._splitFileName(o.getFileName());if(o&&a.name!==i.getValue()){if(a&&a.extension){o.setFileName(i.getValue()+"."+a.extension)}else{o.setFileName(i.getValue())}t.close();this.fireItemRenamed({item:o})}else{t.close()}};R.prototype._handleItemNameValidation=function(e){const t=e.getSource();let i=t.getValue();i=i.trim();if(i===""){t.setProperty("valueState","Error",true);t.setValueStateText(this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_EMPTY_NAME_VALIDATION_ERROR_MESSAGE"));t.setShowValueStateMessage(true);return}const o=new RegExp(/[@#$]/);if(o.test(i)){t.setShowValueStateMessage(true);t.setProperty("valueState","Error",true);t.setValueStateText(this._oRb.getText("UPLOADSET_WITH_TABLE_DOCUMENT_RENAME_SPLC_VALIDATION_ERROR_MESSAGE","@#$"))}else{t.setShowValueStateMessage(false);t.setProperty("valueState","None",true)}};R.prototype._getCloudFilePickerMenu=function(){this._oMenuButton=new w({text:this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT"),buttonMode:sap.m.MenuButtonMode.Split,menu:this._getMenuButtonItems(),defaultAction:this.fileSelectionHandler.bind(this)});return this._oMenuButton};R.prototype._getCloudFilePickerButton=function(){this._oCloudFilePickerButton=new E({text:this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT"),press:this._invokeCloudFilePicker.bind(this)});return this._oCloudFilePickerButton};R.prototype._itemSelectedCallback=function(e){var t=e.getParameter("item");switch(t.getText()){case this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT"):this._oMenuButton.detachEvent("defaultAction",this.fileSelectionHandler.bind(this)).attachEvent("defaultAction",this._invokeCloudFilePicker.bind(this));this._invokeCloudFilePicker();this._oMenuButton.setText(t.getText());break;case this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT"):this._oMenuButton.detachEvent("defaultAction",this._invokeCloudFilePicker.bind(this)).attachEvent("defaultAction",this.fileSelectionHandler.bind(this));this.fileSelectionHandler();this._oMenuButton.setText(t.getText());break}};R.prototype._getMenuButtonItems=function(){return new N({items:[new x({text:this._oRb.getText("UPLOAD_SET_DEFAULT_LFP_BUTTON_TEXT")}),new x({text:this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT")})],itemSelected:this._itemSelectedCallback.bind(this)})};R.prototype._invokeCloudFilePicker=function(){var e=null;if(this._cloudFilePickerControl){e=this._getCloudFilePickerInstance();e.open()}else{this._loadCloudFilePickerDependency().then(t=>{this._cloudFilePickerControl=t;e=this._getCloudFilePickerInstance();e.open()}).catch(e=>{n.error(e)})}return e};R.prototype._onCloudPickerFileChange=function(e){var t=e.getParameters();var i=[];if(t&&t.selectedFiles){t.selectedFiles.forEach(e=>{i.push(this._createFileFromCloudPickerFile(e))})}this._processNewCloudPickerFileObjects(i)};R.prototype._createFileFromCloudPickerFile=function(e){var t=[new Blob([])];var i={type:e.getFileShareItemContentType(),size:e.getFileShareItemContentSize(),webkitRelativePath:"",name:e.getFileShareItemName()};var o=new File(t,e.getFileShareItemName(),i);return{file:o,fileShareProperties:e.mProperties}};R.prototype._processNewCloudPickerFileObjects=function(e){e.forEach(t=>{var i=t.file;const o=t.fileShareProperties;var a=new l({uploadState:L.Ready});a._setFileObject(i);a.setFileName(i.name);if(i&&o){a._setCloudFileInfo(o)}if(this.getItemValidationHandler()&&typeof this.getItemValidationHandler()==="function"){const t={oItem:a,iTotalItemsForUpload:e.length,oSource:this};var r=this.getItemValidationHandler()(t);if(r&&r instanceof Promise){r.then(e=>{if(e instanceof l){this._initateItemUpload(e)}}).catch(e=>{if(e&&this._oItemToUpdate&&e instanceof l&&e.getId()===this._oItemToUpdate.getId()){this._oItemToUpdate=null}})}else{a.destroy();n.error("Invalid usage, missing Promise: ItemValidationHandler callback expects Promise to be returned.")}}else{this._initateItemUpload(a)}})};R.prototype._loadCloudFilePickerDependency=function(){return new Promise((e,t)=>{U.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(i){sap.ui.require(["sap/suite/ui/commons/CloudFilePicker"],function(t){e(t)},function(e){t(e)})}).catch(function(){t("CloudFilePicker Control not available.")})})};R.prototype._getCloudFilePickerInstance=function(){return new this._cloudFilePickerControl({serviceUrl:this.getCloudFilePickerServiceUrl(),confirmButtonText:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),title:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),fileNameMandatory:true,select:this._onCloudPickerFileChange.bind(this)})};return R});
//# sourceMappingURL=UploadSetwithTable.js.map