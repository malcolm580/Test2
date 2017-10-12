// JavaScript File
$(document).ready(function() {
  var ul = $(".img-slider ul");
  var slide_count = ul.children().length;
  var slide_width_pc = 100.0 / slide_count;
  var slide_index = 0;

  ul.find("li").each(function(indx) {
    var left_percent = (slide_width_pc * indx) + "%";
    $(this).css({"left":left_percent});
    $(this).css({width:(100 / slide_count) + "%"});
  });
  
  
  // Listen for click of prev button
  $(".img-slider .prev").on('click', function() {
    slide(slide_index - 1);
  });

  // Listen for click of next button
  $(".img-slider .next").on('click', function() {
    slide(slide_index + 1);
  });
  
  // Listen for resize the screen
  $(window).on('resize', function() {
    var width = $(".img-slider").width();
    $(".img-slider").height(width * 380/940 + "px");
  });
  
  function slide(new_slide_index) {
  
    if(new_slide_index < 0) {
      
      return;
      
    } else if(new_slide_index >= slide_count) {
      
      new_slide_index = 0;
      
    }
  
    var margin_left_pc = (new_slide_index * (-100)) + "%";
  
    ul.animate({"margin-left": margin_left_pc}, 400, function() {
  
      slide_index = new_slide_index;
  
    });
  
  }
  
  //startSlide
  setInterval(function(){
  		slide(slide_index+1);
	},5000);
  
});
