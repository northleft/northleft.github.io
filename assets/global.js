
function returnRandom(r){
  return Math.floor(Math.random() * (r + 1));
}

var body, win;
var wWidth = 0;
var wHeight = 0;

function init(){
  console.log('init', Date.now());

  win = $(window);
  body = $('body');


  $('nav + span').on('click', function(){
    body.toggleClass('show-nav');
  });

  $('nav ul').on('click', function(){
    win.trigger('resize');
    setTimeout(function(){
      body.removeClass('show-nav');
    }, 10);
  });

  win
  .on('resize', function(){
    wWidth = win.outerWidth();
    wHeight = win.outerHeight();
    wCenterX = wWidth / 2;
    wCenterY = wHeight / 2;

    document.documentElement.style.setProperty(
      '--navradius',
      $('nav ul').outerHeight() + 150 + 'px'
    );

    let scale = Math.min(wHeight / 1000, wWidth / 1000);

    $('#shapes svg').css({
      transform: 'scale(' + scale + ')'
    }).find('path').css({
      strokeWidth: 1.25 * 1 / scale + 'px'
    });
  }).trigger('resize');
  
  initDiamond();
  initShapes();
}

function initShapes(){
  let shapes = $('#shapes');
  let shapeTop = 0;
  let shapeHeight = 0;
  let path = null;
  let pathLength = null;

	$.ajax({
		type: 'GET',
		dataType: 'text',
		url: 'assets/flourishes.svg?' + Date.now(),
		success: function(svgText){
      $(svgText).appendTo('#shapes > div');
      let paths = shapes.find('path');

      path = paths.eq(Math.floor(paths.length * Math.random()));
      pathLength = path[0].getTotalLength();
      path.show();
      
      win
      .on('scroll', shapeScroll)
      .trigger('resize');
		}
	});

  function shapeScroll(){
    let top = win.scrollTop();
    shapeTop = shapes.offset().top;
    shapeHeight = shapes.outerHeight();

    body.removeClass('show-shapes');

    let pct = Math.max(0, Math.min(1, (shapeTop - top - wHeight) / -(shapeHeight - 0)))

    if (pct == 0){
      path.removeAttr('style');
    } else if (pct == 1){
      path.css({
        'stroke-dasharray': pathLength + 'px, ' + pathLength + 'px',
        opacity: 1
      });
    }

    if (pct && pct < 1){
      body.addClass('show-shapes');
      path.css({
        'stroke-dasharray': (pathLength * pct) + 'px, ' + pathLength + 'px',
        opacity: 1
      });
    }
  }
}

function initDiamond(){
  const lineNumber = 30;
  const amplitudeMax = 60;
  const frequency = .005;
  const nodeDensity = 4;
  const moveSpeed = -.004;

  const width = 300;
  const hyp = Math.sqrt(Math.pow(width, 2) * 2);
  const svg = document.querySelector('#diamond');
  const d0 = document.querySelector('#d0');
  const d1 = document.querySelector('#d1');
  const lines = [];
  const noise = new SimplexNoise();
  const length = d0.getTotalLength();

  let wCenterX = 0;
  let wCenterY = 0;
  let mouseLoc = {
    x: 0,
    y: 0
  }
  let twn = null;

  for (let i = 0; i < lineNumber; i++){
    let line = document.createElementNS('http://www.w3.org/2000/svg', "polyline");
    svg.appendChild(line);
    let distance = (i + 1) / (lineNumber + 1) * length;
    let A = d0.getPointAtLength(distance);
    let B = d1.getPointAtLength(distance);

    distance = B.x - A.x;

    let pointsNum = Math.floor(distance / nodeDensity);
    let pointsX = distance / pointsNum;
    let eases = [];

    for (let j = 0; j <= pointsNum; j++){
      eases.push(easings.easeInOutSine(1 - Math.abs((j / pointsNum * -1 + .5) / .5)));
    }

    lines.push({
      el: line,
      A: A,
      B: B,
      pointsNum: pointsNum,
      pointsX: pointsX,
      eases: eases
    });
  }

  let index = 0;

  function draw(){
    for (let i = 0; i < lineNumber; i++){
      let line = lines[i];
      let A = line.A;
      let pointsX = line.pointsX;
      let pointsNum = line.pointsNum;
      let pointsTxt = '';

      for (let j = 0; j <= pointsNum; j++){
        let x = A.x + j * pointsX;
        let y = A.y + noise.noise2D(x * frequency + wWidth + mouseLoc.x * moveSpeed + (index * moveSpeed), A.y * frequency + wHeight + mouseLoc.y * moveSpeed + (index * moveSpeed)) * amplitudeMax * line.eases[j];
        pointsTxt += x + ',' + y + ' ';
      }

      line.el.setAttribute('points', pointsTxt);
    }

    index++;
    
    window.requestAnimationFrame(function(){
      setTimeout(draw, 20);
    });
  }

  win
  .on('mousemove', function(e){
    e = e.originalEvent || e;

   let x = e.pageX;
   let y = e.pageY;
   if (twn){
     twn.kill();
   }
   twn = gsap.to(mouseLoc, {
     x: x * .1,
     y: y * .1,
     delay: 0,
     duration: .01,
     ease: 'circ.inOut'
   });
  })
  .trigger('resize');

  draw();
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

(function(){
  const pow = Math.pow;
  const cos = Math.cos;
  const sin = Math.sin;
  const sqrt = Math.sqrt;
  const PI = Math.PI;
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  const c3 = c1 + 1;
  const c4 = (2 * PI) / 3;
  const c5 = (2 * Math.PI) / 4.5;
  const n1 = 7.5625;
  const d1 = 2.75;

  function bounceOut(x){
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  };

  const easings = {
    easeLinear: function(x){
      return x;
    },
    easeInQuad: function(x){
      return x * x;
    },
    easeOutQuad: function(x){
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function(x){
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function(x){
      return x * x * x;
    },
    easeOutCubic: function(x){
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function(x){
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeMiddleCubic: function(x){
      return x > 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function(x){
      return x * x * x * x;
    },
    easeOutQuart: function(x){
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function(x){
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function(x){
      return x * x * x * x * x;
    },
    easeOutQuint: function(x){
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function(x){
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function(x){
      return 1 - cos((x * PI) / 2);
    },
    easeOutSine: function(x){
      return sin((x * PI) / 2);
    },
    easeInOutSine: function(x){
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function(x){
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function(x){
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function(x){
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? pow(2, 20 * x - 10) / 2
        : (2 - pow(2, -20 * x + 10)) / 2
      ;
    },
    easeInCirc: function(x){
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function(x){
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function(x){
      return x < 0.5
        ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
        : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInBack: function(x){
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function(x){
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function(x){
      return x < 0.5
        ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInElastic: function(x){
      return x === 0
        ? 0
        : x === 1
        ? 1
        : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function(x){
      return x === 0
        ? 0
        : x === 1
        ? 1
        : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function(x){
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
        : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
    },
    easeInBounce: function(x){
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function(x){
      return x < 0.5
        ? (1 - bounceOut(1 - 2 * x)) / 2
        : (1 + bounceOut(2 * x - 1)) / 2;
    },
    use: function(ease){
      return easings[ease] || easings.easeLinear;
    }
  };

  ['Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Expo', 'Circ'].map(function(ease){
    easings['easeMiddle' + ease] = function(x){
      if (x < .5){
        return easings['easeOut' + ease](2 * x) * .5;
      } else {
        return easings['easeIn' + ease]((x - .5) * 2) * .5 + .5;
      }
    }
  })

  window.easings = easings;
})();