
function returnRandom(r){
  return Math.floor(Math.random() * (r + 1));
}

function init(){
  console.log('init', Date.now());

  let win = $(window);
  let body = $('body');
  let svgs = $('#svgs');
  let div = svgs.children('div');
  let jg0, jg1, jg2, jghi;
  let v = {x:0,y:0};
  let shapes = $('#shapes');
  let shapesPaths = false;
  let shapesPct = false;
  let shapeTop = 0;
  let shapeHeight = 0;
  let shapesPathsLengths = [];

  let paths = [];

  while (jg0 == jg1 || jg0 == jg2 || jg1 == jg2){
    jg0 = returnRandom(2);
    jg1 = returnRandom(2);
    jg2 = returnRandom(2);
  }

  function returnJG(n, c){
    let j = $('#j' + n);
    let g = $('#g' + n);
    let jg = $('#jg' + n).addClass('jg' + c);
    paths.push({
      jg: jg,
      j: j,
      jlength: j[0].getTotalLength(),
      g: g,
      glength: g[0].getTotalLength()
    });

    return jg;
  }
  
  jg0 = returnJG(jg0, 0);
  jg1 = returnJG(jg1, 1);
  jg2 = returnJG(jg2, 2);

  jg2.prependTo(div);
  jg2.find('path').clone().removeAttr('id').appendTo('#jghi');

  jghi = $('#jghi');

  let wHeight = 0;
  let wWidth = 0;
  let max = 0;
  let svgloc = {
    x: 0,
    y: 0
  }
  let twn = false;
  win
  .on('resize', resize)
  .on('pointermove', function(e){
    if (e.originalEvent){
      e = e.originalEvent;
    }

    let x = (svgloc.x - e.pageX) / max * 30;
    let y = (svgloc.y - e.pageY) / max * 30;

    logoMove(x, y);
  })
  .on('scroll', function(){
    let top = win.scrollTop();

    body.removeClass('show-jg show-shapes');
    if (top > wHeight / 2){
      body.addClass('show-jg');
    }

    let pct = Math.max(0, Math.min(1, (shapeTop - top) / -(shapeHeight - wHeight)));
    let num = Math.floor(pct / shapesPct) + 1;
    let npct = pct % shapesPct / shapesPct;

    if (pct && pct < 1){
      body.addClass('show-shapes');
    }

    if (shapesPaths){
      shapesPaths.removeAttr('style');
      
      if (pct){
        shapesPaths.eq(num).css({
          'stroke-dasharray': (shapesPathsLengths[num] * npct / .8) + 'px, ' + shapesPathsLengths[num] + 'px',
          opacity: 1
        });
        shapesPaths.eq(num - 1).css({
          //'stroke-dasharray': '0px, ' + (shapesPathsLengths[num - 1] * npct / .6) + 'px, ' + shapesPathsLengths[num - 1] + 'px',
          'stroke-dasharray': shapesPathsLengths[num - 1] + 'px',
          opacity: 1 - (npct / .2)
        });
      } else {
        shapesPaths.eq(0).css({
          'stroke-dasharray': shapesPathsLengths[0] + 'px'
        });
      }
    }
  })
  .trigger('resize scroll');

  let deviceX = false;
  let deviceY = false;

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(ev){
      if (deviceX === false){
        deviceX = ev.beta;
        deviceY = ev.gamma;
      }

      deviceOrientation(ev.gamma, ev.beta);
    }, true);
  } else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(ev){
      if (deviceX === false){
        deviceX = ev.acceleration.x;
        deviceY = ev.acceleration.y;
      }

      deviceOrientation(ev.acceleration.x, ev.acceleration.y);
    }, true);
  }

  function deviceOrientation(x, y){
    let ax = Math.abs(x);
    let ay = Math.abs(y);

    x = Math.min(1, ax / max) * (x / ax);
    y = Math.min(1, ay / max) * (y / ay);

    console.log(x, y);

    logoMove(x, y);
  }

  function logoMove(x, y){

    window.requestAnimationFrame(function(){
      if (twn){
        twn.kill();
      }
      twn = gsap.to(v, {
        x: x,
        y: y,
        delay: 0,
        duration: .06,
        ease: 'circ.inOut',
        onUpdate: function(){
          jg0.css({
            transform: 'translate(' + v.x + 'px,' + v.y + 'px)'
          });
          jg1.css({
            transform: 'translate(' + -v.x + 'px,' + -v.y + 'px)'
          });
        }
      });
    });
  }







  function resize(){
    let top = win.scrollTop();
    wHeight = win.outerHeight();
    wWidth = win.outerWidth();
    shapeTop = shapes.offset().top;
    shapeHeight = shapes.outerHeight();

    max = Math.sqrt(wHeight * wHeight + wWidth * wWidth) / 2;
    
    let scale = Math.min(wHeight / 1000, wWidth / 1000);

    $('.svgs svg').css({
      transform: 'scale(' + scale + ')'
    }).find('path').css({
      strokeWidth: 1 / scale + 'px'
    });

    let svgoff = svgs.offset();
    svgloc.x = svgoff.left + svgs.outerWidth() / 2;
    svgloc.y = svgoff.top + svgs.outerHeight() / 2;
    
    let ul = $('nav ul');
    let rad = ul.offset().top - top + ul.outerHeight() + 100;

    document.documentElement.style.setProperty(
      '--navradius',
      rad + 'px'
    );

    document.documentElement.style.setProperty(
      '--navpad',
      getScrollbarWidth() + 'px'
    );

    win.trigger('scroll');
  }

  resize();




  setTimeout(function(){
    win.trigger('resize');
  }, 1000);

  $('nav + span').on('click', function(){
    body.toggleClass('show-nav');
  });

  $('nav ul').on('click', function(){
    win.trigger('resize');
    setTimeout(function(){
    body.removeClass('show-nav');
    }, 10);
  });

	$.ajax({
		type: 'GET',
		dataType: 'text',
		url: 'assets/flourishes.svg?' + Date.now(),
		success: function(text){
      $(text).appendTo('#shapes > div');
      shapesPaths = shapes.find('path');
      shapesPct = 1 / (shapesPaths.length - 1);

      shapesPaths.each(function(){
        shapesPathsLengths.push(this.getTotalLength())
      });

      win.trigger('resize');
		}
	});

  (function(){
    let v = {v:0};
    let jpath = paths[2].j;
    let jlength = paths[2].jlength;
    let gpath = paths[2].g;
    let glength = paths[2].glength;

    gsap.to(v, {
      v:1,
      delay: 0,
      duration: 3,
      ease: 'circ.inOut',
      onUpdate: function(){
        jpath.css({
          'stroke-dasharray': (jlength * v.v) + 'px, ' + jlength + 'px'
        });
        gpath.css({
          'stroke-dasharray': (glength * v.v) + 'px, ' + glength + 'px'
        });
      },
      onComplete: function(){
        body.addClass('intro-done');
      }
    });

    function shimmer(){
      let sv = {v:0};
      let j = jghi.find('.j');
      let jpct = (Math.random() * .1 + .05);
      let jspan = jpct * jlength;
      let g = jghi.find('.g');
      let gpct = (Math.random() * .1 + .1);
      let gspan = gpct * glength;

      function calculateArray(pct, length, span, inc){
        let distance = pct * (length + length * inc);
        let dif = distance - span;
        
        let a = dif > 0 ? '0px ' + dif + 'px ': '';
        a += Math.min(distance, span) + 'px 99999px';

        return a;
      }

      gsap.to(sv, {
        v:1,
        delay: 0,
        duration: Math.random() * 2 + 2,
        ease: 'sine.inOut',
        onUpdate: function(){
          j.css({
            'stroke-dasharray': calculateArray(sv.v, jlength, jspan, jpct)
          });
          g.css({
            'stroke-dasharray': calculateArray(sv.v, glength, gspan, gpct)
          });
        },
        onComplete: function(){
          setTimeout(shimmer, (Math.random() * 5 + 5) * 1000);
        }
      });
    }

    setTimeout(shimmer, 4000);
  })();
}

function getScrollbarWidth() {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}