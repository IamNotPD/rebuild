var Slider = (function(){
  var width = 1100;
  var count;
  var slider;
  var wrap;
  var position;
  var tPosition;
  var startTime = undefined;

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
      (position < 0) ? Slider.animateLeft(tPosition,elem) : elem.style.marginLeft = position + 'px';
    
    },

    
    right : function(elem) {

      Slider.init(elem);
      tPosition = position - width;
      (position > -(count-1)*width) ? Slider.animateRight(tPosition,elem) : elem.style.marginLeft = position + 'px';
   
    },
  

    animateLeft : function (){
      
      if ( startTime == undefined ){ 
        startTime = new Date().getTime();
      };
      
      var time = new Date().getTime();        
      var passedPart =  ((time - startTime) || 1) / 500;

      if (passedPart < 1) {
          wrap.style.marginLeft = position + (width * passedPart) + 'px';
          requestAnimFrame(Slider.animateLeft,wrap);
      }else{
          startTime = undefined;
          wrap.style.marginLeft = tPosition + 'px';
      };
    },


    animateRight : function (){
      
      if ( startTime == undefined ){ 
        startTime = new Date().getTime(); 
      };
      
      var time = new Date().getTime();        
      var passedPart =  ((time - startTime) || 1) / 500;

      if (passedPart < 1) {
          wrap.style.marginLeft = position - (width * passedPart) + 'px';
          requestAnimFrame(Slider.animateRight,wrap);
      }else{
          startTime = undefined;
          wrap.style.marginLeft = tPosition + 'px';
      };
    },
  };
})();