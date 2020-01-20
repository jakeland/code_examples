var mousePos;

function handleMouseMove(event) {
	var eventDoc, doc, body, pageX, pageY;
	event = event || window.event; // IE-ism
	//event for ie 11       
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;
		event.pageX = event.clientX +
			(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			(doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
			(doc && doc.scrollTop || body && body.scrollTop || 0) -
			(doc && doc.clientTop || body && body.clientTop || 0);
	}
	mousePos = {
		x: event.pageX,
		y: event.pageY
	};

}
//faking it for Ie. 
//unfortunately, have to bind this event to the document to get it to fire correctly in IE. 
//needed a quick fix. 
$(document).on("mousemove", handleMouseMove);


// view 3D is an object created using the revealing module pattern. 
// any function or variable not returned in the return statement is not public.
// Pros: doesn't pollute the global namespace, easier to read, kind of awesome. 
// Cons: doesn't work with unit testing well.  
var view3D = (function(){
	var img3d;
	var dragState = false;
	var currRow = 1;
	var currCol = 1;
	var maxRow = 6; //in case we ever need to change this. 
	var maxCol = 16; //In Case we ever need to change this. 
	var deltaX;
	var deltaY;
	var startMousePos;
	var imgsOK = 0;
	// checks if we have moved past a specific point
	// needed for move
	var delta_coords = function(lastcoord, currentcoord, threshold) {
		var x = lastcoord - currentcoord;
		if (Math.abs(x) > threshold) {
			return x;
		} else {
			return 0;
		}
	}
	// changes our drag state, affects mouseMove on the doc
	var dragStart = function(e){
		e.preventDefault();
		startMousePos = mousePos;
		dragState = true;
	}
	// sets dragState back to false. 
	var dragStop = function(e){
		dragState = false;
	}
	// loads the images in the background of the doc.
	var imagesAreLoaded = function(){
		//do some loading stuff.
		$('.column3D').addClass('thisInBack');
		$('.loading').hide();
		$("#img3d1col1").addClass('thisInFront');
	};
	var getDragState = function(){
		return dragState;
	}
	var prepImages = function(rowN, colN){
		var total = rowN * colN;
		for (i = 1; i <= rowN; i++) {
			for (j = 1; j <= colN; j++) {
				testimg = document.getElementById('img3d'+i+'col'+j)
				testimgsrc = testimg.dataset.url;
				testimg.addEventListener('load', function(e){
					imgsOK++
					loadNumber = parseInt(imgsOK/total * 100);
					$('.percentage').replaceWith("<div class='percentage'>"+loadNumber+"%</div>")
					if (imgsOK >= total) {
						imagesAreLoaded();
					}
				});
				testimg.src = testimgsrc;
			}
		}
	};
	var changeImage = function(e) {
		if (dragState == true) {
			e.preventDefault();
			deltaX = Math.sign(delta_coords(startMousePos.x, mousePos.x, 15));
			deltaY = Math.sign(delta_coords(startMousePos.y, mousePos.y, 15));
			//reset mouse Position after we get our values 
			// -1 flips the controls.
			xCheck = deltaX != 0;
			yCheck = deltaY != 0;
			if (xCheck){
				startMousePos.x = mousePos.x
			}
			if (yCheck){
				startMousePos.y = mousePos.y				
			}
			if (xCheck || yCheck){
				currRow += (-1 * deltaY)
				currCol += deltaX
				if (currRow >= maxRow) {
					currRow = maxRow;
				}
				if (currRow <= 0)
					currRow = 1;
				if (currCol >= maxCol) {
					currCol = 1;
				}
				if (currCol <= 0)
					currCol = maxCol;
				$('.thisInFront').removeClass('thisInFront');
				$('#img3d' + currRow + "col" + currCol).addClass('thisInFront');
			}
		}
	}
	//public
	var init = function(){
		img3d = document.getElementById('imageHolder3d');
		prepImages(maxRow, maxCol);
		//binds event to document
		$(document).on("mouseup", dragStop);
		//returns fast if the state of dragging is false
		$(document).on("mousemove", changeImage);
		//binds event to the container of all the images, short bubble up time. 
		$('.wrap-target').on("mousedown", dragStart);
	}
	return {
		init: init,
		dragging: getDragState
	}
})();
