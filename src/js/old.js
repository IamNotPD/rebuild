var Slider = (function(){
  var width = 1100;
  var count;
  var slider;
  var wrap;
  var position;
  var tPosition;
  var startTime = undefined;
  var ii = 0;

  return {
    init : function(elem) {

      slider = document.querySelector('#'+elem);
      wrap = slider.querySelector('.slider');
      position = +wrap.style.marginLeft.substr(0,wrap.style.marginLeft.length-2) || 0;
      count = slider.querySelectorAll('div.slide').length;
    
    },

    
    left : function(elem) {

      Slider.init(elem);
      tPosition = position + width;
      (position < 0) ? Slider.animate(tPosition,wrap) : wrap.style.marginLeft = position + 'px';
    
    },

    
    right : function(elem) {

      Slider.init(elem);
      position = Math.max(position - width, -width * (count-1));
      wrap.style.marginLeft = position + 'px';
   
    },   
  

    animate : function (target,elem){
      if ( startTime == undefined ){ startTime = new Date().getTime() };
      
      var time = new Date().getTime();        
      var passedPart =  ((time - startTime) || 1) / 1000;

      if (passedPart < 1) {
          elem.style.marginLeft = position + (width * passedPart) + 'px';
          requestAnimFrame(Slider.animate,wrap);
      }else{
          startTime = undefined;
          elem.style.marginLeft = 0 + 'px';
      };
    },
  };
})();