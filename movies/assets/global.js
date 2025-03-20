

function init(){
  $.ajax({
    url: 'data/data.json',
    dataType: 'json'
  }).done(setupData);
}

function setupData(d){
  const urlPrepend = 'data/'; // prepends the url to the correct path for images

  // this keeps track of the overall data
  const data = {
    list: []
  };

  // the main div that contains all of the movies
  const movieContainer = $('#movies.movie-block-container');

  // html template stuff
  const itemTemplateEL = movieContainer.find('.movie-block.movie-block-template').removeClass('movie-block-template');
  const itemTemplateHTML = $('<div>').append(itemTemplateEL).remove().html();

  const detailTemplateEL = movieContainer.find('#movie-detail').removeClass('movie-block-template');
  const detailTemplateHTML = $('<div>').append(detailTemplateEL).remove().html();

  // iterates through the json data to create movie objects
  d.map(function(item, index){
    // movie object
    const movie = movieItem(item);

    // data tracker
    data[movie.id] = movie;
    data.list.push(movie.id);

    // appends to movie container
    movieContainer.append(movie.el)
  });

  function movieItem(movieinfo){
    // a list of keys to add url prepend
    const addUrlPrependToTheseKeys = ['thumburl'];
    let likes = parseInt(movieinfo.likes) || 0;
    let dislikes = parseInt(movieinfo.dislikes) || 0;
    movieinfo.ratingScore = 0;

    const hours = Math.floor(parseInt(movieinfo.length) / 60);
    const minutes = parseInt(movieinfo.length) % 60;
    movieinfo.totaltime = (hours > 0 ? hours + 'h ' : '') + minutes + 'm';

    let itemHTML = itemTemplateHTML;
    let detailHTML = detailTemplateHTML;
    const keys = Object.keys(movieinfo);

    keys.forEach(function(key){
      const reg = new RegExp('{{' + key + '}}', 'g');
      let value = movieinfo[key];

      if (addUrlPrependToTheseKeys.indexOf(key) > -1){
        value = urlPrepend + value;
      }

      itemHTML = itemHTML.replace(reg, value);
      detailHTML = detailHTML.replace(reg, value);
    });

    const el = $(itemHTML);
    const detail = $(detailHTML);
    const all = el.add(detail);

    function ratingScore(){
      const ratingClasses = ['movie-rating-high', 'movie-rating-med', 'movie-rating-low'];
      let rating = Math.round(likes / (likes + dislikes) * 100);
      movieinfo.ratingScore = rating;

      // color coding ratings
      let ratingClass = '';
      if (rating > 65){
        ratingClass = ratingClasses[0];
      } else if (rating > 40){
        ratingClass = ratingClasses[1];
      } else {
        ratingClass = ratingClasses[2];
      }
      
      all
      .find('.movie-rating-value')
      .removeClass('movie-rating-high movie-rating-med movie-rating-low')
      .addClass(ratingClass)
      .html(rating);
      ;
    }
    ratingScore();

    el.find('.movie-thumb-img').on('load', function(){
      el.removeClass('movie-block-place');
    });
    all.find('.movie-rating-like').on('click', function(){
      likes++;
      ratingScore();
    });
    all.find('.movie-rating-dislike').on('click', function(){
      dislikes++;
      ratingScore();
    });
    el.find('.movie-info').on('click', function(){
      movieContainer.find('#movie-detail').remove();
      movieContainer.append(detail);
    });

    detail.find('#movie-detail-exit').on('click', function(){
      movieContainer.find('#movie-detail').remove();
    })


    return {
      id: movieinfo.id,
      el: el
    }
  }
}

