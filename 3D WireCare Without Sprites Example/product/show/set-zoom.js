$(document).ready(function(){
	myProductImages = new productImagesPrototype; //from product_image.js
	if (!$('.main-image-display').data('mobile')) {
		if ($('.single-image-display').length == 0){
			//build zoom functionality. 
			myProductImages.zoomImage = function(){
				setZoom('.main-image-display');
			}
		}else{
			myProductImages.zoomImage = function(){
				setZoom('.single-image-display');
			}
		}
	}			
});
