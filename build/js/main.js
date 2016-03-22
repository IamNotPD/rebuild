"use strict";
// Paul Irish <3
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBQYXVsIElyaXNoIDwzXHJcbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XHJcbiAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XHJcbiAgICAgICAgICBmdW5jdGlvbiggY2FsbGJhY2sgKXtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgICB9O1xyXG59KSgpO1xyXG5cclxudmFyIFNsaWRlciA9IChmdW5jdGlvbigpe1xyXG4gIHZhciB3aWR0aCA9IDExMDA7XHJcbiAgdmFyIGNvdW50O1xyXG4gIHZhciBzbGlkZXI7XHJcbiAgdmFyIHdyYXA7XHJcbiAgdmFyIHBvc2l0aW9uO1xyXG4gIHZhciB0UG9zaXRpb247XHJcbiAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQgOiBmdW5jdGlvbihlbGVtKSB7XHJcblxyXG4gICAgICBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytlbGVtKTtcclxuICAgICAgd3JhcCA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJyk7XHJcbiAgICAgIHBvc2l0aW9uID0gK3dyYXAuc3R5bGUubWFyZ2luTGVmdC5zdWJzdHIoMCx3cmFwLnN0eWxlLm1hcmdpbkxlZnQubGVuZ3RoLTIpIHx8IDA7XHJcbiAgICAgIGNvdW50ID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5zbGlkZScpLmxlbmd0aDtcclxuICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBcclxuICAgIGxlZnQgOiBmdW5jdGlvbihlbGVtKSB7XHJcblxyXG4gICAgICBTbGlkZXIuaW5pdChlbGVtKTtcclxuICAgICAgdFBvc2l0aW9uID0gcG9zaXRpb24gKyB3aWR0aDtcclxuICAgICAgKHBvc2l0aW9uIDwgMCkgPyBTbGlkZXIuYW5pbWF0ZUxlZnQodFBvc2l0aW9uLGVsZW0pIDogZWxlbS5zdHlsZS5tYXJnaW5MZWZ0ID0gcG9zaXRpb24gKyAncHgnO1xyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG4gICAgcmlnaHQgOiBmdW5jdGlvbihlbGVtKSB7XHJcblxyXG4gICAgICBTbGlkZXIuaW5pdChlbGVtKTtcclxuICAgICAgdFBvc2l0aW9uID0gcG9zaXRpb24gLSB3aWR0aDtcclxuICAgICAgKHBvc2l0aW9uID4gLShjb3VudC0xKSp3aWR0aCkgPyBTbGlkZXIuYW5pbWF0ZVJpZ2h0KHRQb3NpdGlvbixlbGVtKSA6IGVsZW0uc3R5bGUubWFyZ2luTGVmdCA9IHBvc2l0aW9uICsgJ3B4JztcclxuICAgXHJcbiAgICB9LFxyXG4gIFxyXG5cclxuICAgIGFuaW1hdGVMZWZ0IDogZnVuY3Rpb24gKCl7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIHN0YXJ0VGltZSA9PSB1bmRlZmluZWQgKXsgXHJcbiAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAgICAgICAgXHJcbiAgICAgIHZhciBwYXNzZWRQYXJ0ID0gICgodGltZSAtIHN0YXJ0VGltZSkgfHwgMSkgLyA1MDA7XHJcblxyXG4gICAgICBpZiAocGFzc2VkUGFydCA8IDEpIHtcclxuICAgICAgICAgIHdyYXAuc3R5bGUubWFyZ2luTGVmdCA9IHBvc2l0aW9uICsgKHdpZHRoICogcGFzc2VkUGFydCkgKyAncHgnO1xyXG4gICAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShTbGlkZXIuYW5pbWF0ZUxlZnQsd3JhcCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgd3JhcC5zdHlsZS5tYXJnaW5MZWZ0ID0gdFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGFuaW1hdGVSaWdodCA6IGZ1bmN0aW9uICgpe1xyXG4gICAgICBcclxuICAgICAgaWYgKCBzdGFydFRpbWUgPT0gdW5kZWZpbmVkICl7IFxyXG4gICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcclxuICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7ICAgICAgICBcclxuICAgICAgdmFyIHBhc3NlZFBhcnQgPSAgKCh0aW1lIC0gc3RhcnRUaW1lKSB8fCAxKSAvIDUwMDtcclxuXHJcbiAgICAgIGlmIChwYXNzZWRQYXJ0IDwgMSkge1xyXG4gICAgICAgICAgd3JhcC5zdHlsZS5tYXJnaW5MZWZ0ID0gcG9zaXRpb24gLSAod2lkdGggKiBwYXNzZWRQYXJ0KSArICdweCc7XHJcbiAgICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKFNsaWRlci5hbmltYXRlUmlnaHQsd3JhcCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgd3JhcC5zdHlsZS5tYXJnaW5MZWZ0ID0gdFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfTtcclxufSkoKTsiXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
