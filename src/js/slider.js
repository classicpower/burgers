window.onload = function () {
    var slider = new Slider({
      slide: '.burgers__center',
      classPrev: '.burgers__left .burgers__prev',
      classNext: '.burgers__right .burgers__next',
      auto: false
  });

  function Slider(obj) {
      this.obj = obj;
      var slideArray = document.querySelectorAll(obj.slide);
      console.log(slideArray);
      var btnPrev = document.querySelector(obj.classPrev);
      var btnNext = document.querySelector(obj.classNext);
      var auto = obj.auto;
      var time = obj.time || 2000;
      var i = 0;

      var prev = function () {
          slideArray[i].classList.remove('showed');
          i--;

          if (i < 0) {
              i = slideArray.length - 1;
          }

          slideArray[i].classList.add('showed');
      };
      btnPrev.addEventListener('click', function () {
          prev();
      })

      var next = function () {
          slideArray[i].classList.remove('showed');
          i++;

          if (i >= slideArray.length) {
              i = 0;
          }

          slideArray[i].classList.add('showed');
      };
      btnNext.addEventListener('click', function () {
          next();
      })
      if (auto) {
          setInterval(function () {
              next()
          }, time);
      }
  }
}