var body, win;
var wWidth = 0;
var wHeight = 0;

function bgloaded(el){
  el.classList.add('loaded'); 
}

function init(){
  console.log('init', Date.now());

  gsap.registerPlugin(ScrollTrigger);

  win = $(window);
  body = $('body');

  /*
  $('nav + span').on('click', function(){
    body.toggleClass('show-nav');
  });

  $('nav ul').on('click', function(){
    win.trigger('resize');
    setTimeout(function(){
      body.removeClass('show-nav');
    }, 10);
  });
  */
  
  win
  .on('resize', function(){
    wWidth = win.outerWidth();
    wHeight = win.outerHeight();
    wCenterX = wWidth / 2;
    wCenterY = wHeight / 2;

    //document.documentElement.style.setProperty(
    //  '--navradius',
    //  $('nav ul').outerHeight() + 150 + 'px'
    //);
    
  }).trigger('resize');
  
  setupHeader();
  setupScroller();
  setupFooter();
}

function setupFooter(){
  const footer = $('footer');
  let html = footer.html();
  
  html = html.replace(/{{email}}/g, 'hello' + '@' + 'juan-garcia.dev');
  html = html.replace(/{{phone}}/g, '862.812.4094');

  footer.html(html);
}

function setupHeader(){
  const svg = $('header svg');
  const groups = svg.find('g');
  const duration = 1;
  const stagger = .1;
  
  const num = groups.length;
  const half = num / 2;

  groups.each(function(i){
    const g = $(this);
    const path = g.find('path');
    const delay = i * stagger;
    const length = path[0].getTotalLength();
    const v = {val: 0};

    gsap.set(path, {
      'stroke-dasharray': length,
      'stroke-dashoffset': length
    });

    gsap.to(g, {
      rotation: 0,
      duration: duration,
      delay: delay,
      ease: 'power1.inOut'
    });

    gsap.to(g, {
      autoAlpha: 1,
      duration: 1,
      delay: delay
    });

    gsap.to(path, {
      'stroke-dashoffset': 0,
      duration: 1,
      delay: delay,
      ease: 'power3.inOut'
    });
  });
}

function setupScroller(){
  let timelines = [];
  const bg0 = $('#bg0');

  win.on('resize', function(){
    timelines.map(function(tl){
      tl.progress(0);
      tl.kill(true);
    });

    timelines = [];
    
    const bgHeight = bg0.outerHeight();

    timelines.push(
      gsap.fromTo(bg0, {
        y: 0
      }, {
        y: wHeight - bgHeight,
        scrollTrigger: {
          id: 'bg0',
          trigger: 'header',
          start: 0,
          end: 'bottom',
          scrub: 1.2
        }
      })
    )

    timelines.push(
      gsap.fromTo('#bg1', {
        y: 0
      }, {
        y: -150,
        scrollTrigger: {
          id: 'bg1',
          trigger: 'header',
          start: 0,
          end: '+=300',
          scrub: 0.75
        }
      })
    )
  }).trigger('resize');
}