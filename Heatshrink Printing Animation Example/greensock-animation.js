$(document).ready(function () {
  var back = $(".back");
  var front = $(".front");
  back.hide();
  //whatever space you want to add perspective to, makes the card look 'more 3D or 'less 3D'
  TweenLite.set(".duplex-preview", {
    perspective: 400
  });
  //setup for preserving the 3D
  TweenLite.set(".card", {
    transformStyle: "preserve-3d"
  });

  //tells the timeline what it has access to, and anything you want them to start with
  TweenLite.set([".back", ".front"], {
  });
    
  //this timeline is the click function
  var t2 = new TimelineMax({
    paused:true, 
    onComplete:restartLine,
    onCompleteParams:[0]
  });

  t2 
     .set("#card",  {
     rotattionX:0
    })
    .to("#card", .5, {
      ease:Power1.easeIn,
      rotationX: 90,
     
    })
    .set(".front",{
      display:"none"
    })
    .set(".back",{
        display:"inline-block"
     })
    .to("#card", 0.5, {
      ease:Power1.ease,
      rotationX: 180,
      onComplete:enableButton
    })
    .addPause()
    .to("#card", .5, {
      ease:Power1.easeIn,
      rotationX: 90
    })
    .set(".back",{
      display:"none"
    })
    .set(".front",{
        display:"inline-block"
     })
    .to("#card", 0.5, {
      ease:Power1.easeOut,
      rotationX: 0,
      onComplete:enableButton
    });
   //function for your button click
  function clickMe(){
   t2.play();
  }

  function enableButton () {
     $('.flip-dual').removeAttr('disabled');
  }

  //function that resets the head of the timeline to 9
  function restartLine(position){
    t2.play(position);
    t2.pause();
  }
  //function that adds the click funtion to your button, use whatever you had instead, probably
  $('.flip-dual').click(function(){
    clickMe();
  })
})