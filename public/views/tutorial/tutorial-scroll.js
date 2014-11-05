(function(){
  'use strict';

  var scrollTo = function(el, cb){
    $('html, body').animate({
        scrollTop: $(el).offset().top - 60
    }, 1000, cb);
  };

  var els = [
    '.fui-bookmark',
    '.homefolio',
    '.houzz'
  ];

  var index = 0;

  setInterval(function(){
    scrollTo(els[index], function(){
      index++;
    });
  }, 3000);

})();
