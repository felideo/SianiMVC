$(function(){"use strict";var e=window.console||{log:function(){}},t=$(".docs-alert"),o=t.find(".message"),a=function(e,a){o.text(e),a&&o.addClass(a),t.fadeIn(),setTimeout(function(){t.fadeOut()},3e3)},n=$(".img-container > img"),r=$("#dataX"),i=$("#dataY"),p=$("#dataHeight"),c=$("#dataWidth"),d=$("#dataRotate"),l={guides:!1,highlight:!1,movable:!1,resizable:!1,minCanvasWidth:320,minCanvasHeight:180,aspectRatio:16/9,preview:".img-preview",crop:function(e){r.val(Math.round(e.x)),i.val(Math.round(e.y)),p.val(Math.round(e.height)),c.val(Math.round(e.width)),d.val(Math.round(e.rotate))}};n.on({"build.cropper":function(t){e.log(t.type)},"built.cropper":function(t){e.log(t.type)},"dragstart.cropper":function(t){e.log(t.type,t.dragType)},"dragmove.cropper":function(t){e.log(t.type,t.dragType)},"dragend.cropper":function(t){e.log(t.type,t.dragType)},"zoomin.cropper":function(t){e.log(t.type)},"zoomout.cropper":function(t){e.log(t.type)}}).cropper(l),$(document.body).on("click","[data-method]",function(){var t,o,a=$(this).data();if(a.method){if(a=$.extend({},a),"undefined"!=typeof a.target&&(t=$(a.target),"undefined"==typeof a.option))try{a.option=JSON.parse(t.val())}catch(r){e.log(r.message)}if(o=n.cropper(a.method,a.option),"getCroppedCanvas"===a.method&&$("#getCroppedCanvasModal").modal().find(".modal-body").html(o),$.isPlainObject(o)&&t)try{t.val(JSON.stringify(o))}catch(r){e.log(r.message)}}}).on("keydown",function(e){switch(e.which){case 37:e.preventDefault(),n.cropper("move",-1,0);break;case 38:e.preventDefault(),n.cropper("move",0,-1);break;case 39:e.preventDefault(),n.cropper("move",1,0);break;case 40:e.preventDefault(),n.cropper("move",0,1)}});var s,g=$("#inputImage"),u=window.URL||window.webkitURL;u?g.change(function(){var e,t=this.files;t&&t.length&&(e=t[0],/^image\/\w+$/.test(e.type)?(s=u.createObjectURL(e),n.one("built.cropper",function(){u.revokeObjectURL(s)}).cropper("reset",!0).cropper("replace",s),g.val("")):a("Please choose an image file."))}):g.parent().remove(),$(".docs-options :checkbox").on("change",function(){var e=$(this);l[e.val()]=e.prop("checked"),n.cropper("destroy").cropper(l)})});