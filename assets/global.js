
const tumbleURL = 'juandrawn.tumblr.com';
const GSAPscrollSpeed = .63;
const posts = {
  list: []
};

var
  body,
  win,
  wWidth = 0,
  wHeight = 0
;

function init(){        
  win = $(window);
  body = $('body');

  setupCSSvars();
  
  // sets up shorthand abbreviations
  body.find('[data-short]').each(function(){
    const that = $(this);
    const text = that.html();
    const short = that.attr('data-short');
    that.html(`<span>${text}</span><span>${short}</span>`);
  });

  // sets up scrolling
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  setupHeaderAnimation();
  
  // create the scrollSmoother before your scrollTriggers
  const smooth = ScrollSmoother.create({
    smooth: GSAPscrollSpeed, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    wrapper: '#container',
    content: '#content'
  });

  gsap.fromTo('#bg-grad-0', {
    y: 0,
    x: 0
  }, {
    //y: -30,
    x: -70,
    ease: 'none',
    scrollTrigger: {
      trigger: '#bgs',
      start: 0,
      scrub: GSAPscrollSpeed * 5
    }
  });

  gsap.fromTo('#bg-grad-1', {
    y: 0
  }, {
    y: '-20vh',
    ease: 'none',
    scrollTrigger: {
      trigger: '#bgs',
      start: 0,
      scrub: GSAPscrollSpeed
    }
  });

  gsap.fromTo('#bg-grad-2', {
    y: 0
  }, {
    y: '-30vh',
    ease: 'none',
    scrollTrigger: {
      trigger: '#bgs',
      start: 0,
      scrub: GSAPscrollSpeed
    }
  });


  setTimeout(() => {
    const emailLink = ['hello', '@juan', '-garcia.', 'dev'].join('')
    const phoneLink = ['8628', '1240', '94'].join('');
    const phoneRead = ['862.8', '12.40', '94'].join('');

    [
      $('#contact'),
      $('#footer')
    ].map((container) => {
      const HTML = container.html();
      container.html(HTML
        .replace(/!email!/g, emailLink)
        .replace(/!phone!/g, phoneLink)
        .replace(/!phone-read!/g, phoneRead)
      )
    })
  }, 342)
  
  //setupHeaderSize();
  setupRSS();
}

function createScroll(div){
  const shim = div.find('.shim');
  const container = div.find('.scroll-container');
  const content = div.find('.scroll-content');
  
  div.find('img').on('load', resize);

  let resizeInt = null;
  let articleTwn = null;

  function resize(){
    if (articleTwn){
      articleTwn.kill();
      articleTwn = null;
    }

    clearTimeout(resizeInt);

    resizeInt = setTimeout(function(){
      const windowHeight = container.outerHeight();
      const contentHeight = content.outerHeight();
      const scrollHeight = contentHeight - windowHeight;

      shim.height(contentHeight);

      articleTwn = gsap.fromTo(content, {
        y: 0
      }, {
        y: -scrollHeight,
        ease: 'none',
        scrollTrigger: {
          //trigger: shim,
          start: 0,
          end: scrollHeight,
          scrub: GSAPscrollSpeed,
          scroller: container,
        }
      });
    }, 100);
  }

  win.on('resize.article', resize);
  setTimeout(resize, 300);
}

function setupCSSvars(){

  // scrollbar width
  body.append(`
    <style id="cssvars">
      :root{
        --scrollbar-width: ${window.innerWidth - document.documentElement.clientWidth}px;
      }
    </style>
  `).addClass('scroll-measured');
}

function setupHeaderAnimation(){
  const container = $('#header-height');
  const svg = container.find('svg');
  //const svg2 = svg.clone().appendTo(container);
  const allPaths = svg.find('path');
  const paths = svg.find('path, polyline');
  const duration = 4.25;
  const pathStagger = .05;
  let colors = [
    '#FBF3C1',
    '#64E2B7',
    '#DC8BE0',
    '#D50B8B'
    //'#b5179e',
    //'#7209b7',
    //'#480ca8',
    //'#3a0ca3',
    //'#3f37c9',
    //'#4361ee',
    //'#4895ef'
  ];

  // converts to an array of rgb colors [x, x, x]
  colors.map(function(color, index){
    colors[index] = hexToRgb(color);
  });

  // this bit appends a reversed colors array to form a rotating gradient
  colors = colors.concat([...colors].slice(0, colors.length - 1).reverse().slice(0, colors.length - 2));

  const colorsPct = 1 / colors.length;
  const gradientNum = 15; // might determine the speed of transition
  const gradientPct = 1 / gradientNum;
  let gradient = [];

  for (let i = 0; i < gradientNum; i++){
    const index = Math.floor((i * gradientPct) / colorsPct);
    let pct = ((i * gradientPct / colorsPct) % 1).toFixed(4);

    color0 = colors[index];
    color1 = colors[(index + 1) % colors.length];

    const r = (color1[0] - color0[0]) * pct + color0[0];
    const g = (color1[1] - color0[1]) * pct + color0[1];
    const b = (color1[2] - color0[2]) * pct + color0[2];
    gradient.push(
      `rgb(${r}, ${g}, ${b})`
    )
  }
  
  function doColor(num){
    paths.each(function(index){
      const color = gradient[(num + index) % gradient.length];
      gsap.set(this, {
        //'stroke': `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        'stroke': color
      });
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        num++;
        doColor(num);
      });
    }, 50)
  }
  //doColor(0);
  
  paths.each(function(j){
    const path = $(this);
    const length = path[0].getTotalLength();
    const color = gradient[j % gradient.length];

    gsap.set(path, {
      'stroke-dasharray': length,
      'stroke-dashoffset': length,
      'stroke': color
    });
    
    gsap.to(path, {
      'stroke-dashoffset': 0,
      duration: duration,
      delay: j * pathStagger,
      ease: 'power2.inOut'
    });
  });

  $('header h1').each(function(){
    gsap.set(this, {
      y: 5,
      opacity: 0,
    });

    gsap.to(this, {
      y: 0,
      opacity: 1,
      duration: .9,
      delay: 4,
      ease: 'ease.inOut'
    });
  });
}


function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace("#", "");

  // Handle short form (e.g., "ABC")
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

function setupRSS(){
  //const main = $('main');
  const prot = document.location.protocol.indexOf('ps:') > -1 ? 'https://' : 'http://';
  const articlesContainer = $('#articles-container');

  $.getJSON(prot + tumbleURL + '/api/read/json?num=20&callback=?', function(data){
    data.posts.map(function(item, index){
      const id = Math.random().toString(36).slice(2, 7).toUpperCase();
      
      const articleBody = $(`<div>${item['regular-body']}</div>`);
      const thumb = articleBody.find('img').eq(0).clone();
      const title = articleBody.find('h1').eq(0).text();
      //const cls = ['photo', 'code', 'art', ];
      let tags = false;

      if (item.tags){
        tags = '|';
        item.tags.map(function(tag){
          tags += tag + '|';
            //tags.push(tag);
            //console.log('tag', tag)
            //if (cls.indexOf(tag) > -1){
            //  cl.push('article-' + tag);
            //}
        });
      }

      thumb.on('load', function(){
        win.trigger('resize');
      })

      articleBody.find('a').attr('target', '_blank');

      const fig = $(`
        <figure data-tags="${tags}" data-article="${id}">
          <h3>${title}</h3>
        </figure>
      `).prepend(thumb).appendTo(articlesContainer);

      if (index < 1){
        $(`<div id="article-blank-${index}" class="article-blank"></div>`).appendTo(articlesContainer);
      }

      posts[id] = {
        article: buildArticle(item, articleBody.html(), id),
        figure: fig,
        title: title,
        thumb: thumb,
        body: item['regular-body']
      }
      posts.list.push(id);
    })
  });

  let articleTwn = null;

  body.on('click', '[data-article]', function(){
    const that = $(this);
    const id = that.attr('data-article');
    const post = posts[id];
    const article = $(post.article).appendTo(body);
    
    body.addClass('show-article');
    
    createScroll(article);
  });

  body.on('click', 'article .article-exit', function(){
    const that = $(this);
    
    if (articleTwn){
      articleTwn.kill();
      articleTwn = null;
    }
    win.off('resize.article');

    that.parents('article').remove();
    body.removeClass('show-article')
  });
}

function buildArticle(post, html, id){
  let tagsHTML = '';

  if (post.tags){
    post.tags.map(function(tag){
      tagsHTML += `<a href="https://${tumbleURL}/tagged/${tag}" target="_bank">${tag}</a>`;
    });
  }

  return `
    <article id="article-${id}">
      <div class="scroll-container article-container">
        <div class="shim"></div>
      </div>
      <div class="scroll-content">
        <div class="article-content">
          ${html}
          <p>&nbsp;</p>
          <h3><em>Tags:</em></h3>
          <p class="article-tags">${tagsHTML}</p>
          <p class="article-links">Visit this article on <a href="${post['url-with-slug']}" target="_blank">Tumblr</a></p>
        </div>
      </div>
      <button class="article-exit"><div></div></button>
    </article>
  `;
}

function setupScrolling(){
  body.addClass('use-scroller');

  const shim = $('#shim');
  const div = $('#container > div');
  const header = $('header');
  const headerDiv = header.children('div').eq(0);

  let twns = [];
  let resizeInt = null;

  function resize(){
    twns.map(function(twn){
      twn.kill();
    });

    const headerHeight = header.outerHeight();
    const windowHeight = win.outerHeight();
    const divHeight = div.outerHeight();

    const scrub = .5;
    const headerMin = 282;

    shim.height(divHeight);

    clearTimeout(resizeInt);

    resizeInt = setTimeout(() => {
      // DIV ANIMATION
      twns = [
        gsap.fromTo(div, {
          y: 0
        }, {
          y: windowHeight - divHeight,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: -(windowHeight - divHeight),
            scrub: scrub
          }
        })
        ,
        // HEADER ANIMATION
        gsap.fromTo(headerDiv, {
          top: 0
        }, {
          top: `calc(100vh - ${headerMin}px)`,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: windowHeight - headerMin,
            scrub: scrub
          }
        })
      ]
    }, 50);
  }
  win
  .on('resize', resize)
  .trigger('resize');
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

function setupHeaderSize(){
  
}