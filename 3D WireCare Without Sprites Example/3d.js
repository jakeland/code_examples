// JS for product show page when the product has a 3D image.
// requires all the common functions for a product show. 
//= require_tree ./product/show
// requires all the extra functions for 3d views
//= require_tree ./product/ThreeD

myProductImages = new productImagesPrototype;
$(document).ready(function(){
	// overwrites the myProductImages to check for the current view3D's drag state. 
	// instead of just returning false. 
	myProductImages.dragging3Dimage = function(){return view3D.dragging()};
	// initializes myProductImages after it is created. 
	myProductImages.init();
	view3D.init();
});