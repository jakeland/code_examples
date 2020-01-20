// product-images controls the images on the product show page. 
// tied closely with product-show.js


// we don't use es6, but we want to convert to it soon. Using design pattern to make that easier. 
function productImagesPrototype() {
	self = this, //reference the object created by this constructor. lexical this.
	// returns a function to match behavior of overwritten object. 
	// ensures dragging3Dimage always gets called the same way. 
	// can be overwritten by behavior when a 3d object is on the page. 
	this.dragging3Dimage =  function(){return false;}, 
	this.init =  function(){
		//binds the image so that we show our images first.
		$('img.multi-image-item').on('load', function(){
			$('.image3d').hide();
			$('.main-image-display.collapse').show();
		})
		//sets up our zoom function on the image.
		self.zoomImage()
		//binds our hover function to the target.
		$('.thumbnail').hover(this.changeImage);
	},
	this.changeImage = function(e){
		// stops images from switching while scrolling 3D images. 
		if(self.dragging3Dimage()){
			return;
		}
		// clears the zoom. 
		// e.target can probably also use the this keyword. 
		// not sure which is faster.
      	$(e.target).trigger('click');
		$('.thumbnail').removeClass('image-thumbnail-active');
		$(e.target).addClass('image-thumbnail-active');
		if($(e.target).hasClass('threed-thumb')){
			$('.main-image-display.collapse').hide();
			$('.image3d').show();
		}else{
			srcImg = $(e.target).data('imageurl')
			$('img.multi-image-item').attr('src', srcImg)	
			$('img.zoomImg').attr('src', srcImg)		
		}
	},
	this.toggleZoom = function(target){
		$(target).toggleClass('main-image-display-zoomed')
	}
	this.zoomImage =  function(){
		// this doesn't do anything on mobile.
		// maybe return an exception if it's ever called? 
		return;
	}
}

function setZoom(target){
	$(target).zoom({
		magnify: 1,
		on: 'click',
		target: target,
		onZoomIn: function(){
			$(target).addClass('main-image-display-zoomed')
		},
		onZoomOut: function(){
			$(target).removeClass('main-image-display-zoomed')
		}
	});
}

var myProductImages;
$(document).ready(function(){
	
})
