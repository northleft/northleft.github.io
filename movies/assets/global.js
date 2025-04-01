const theData = [
  {
    "id": "VBVQSO",
    "title": "Black Bag",
    "description": "When his beloved wife, Kathryn, is suspected of betraying the nation, intelligence agent George Woodhouse faces the ultimate test &mdash; loyalty to his marriage or his country.",
    "mpaarating": "R",
    "type": "Triller",
    "length": "94",
    "thumburl": "movie-black-bag.jpeg",
    "likes": "20",
    "dislikes": "14",
    "released": "20250314"
  },
  {
    "id": "1NSR4R",
    "title": "Captain America: Brave New World",
    "description": "Sam finds himself in the middle of an international incident after meeting with President Thaddeus Ross. He must soon discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
    "mpaarating": "PG-13",
    "type": "Action Sci-fi",
    "length": "127",
    "thumburl": "movie-captain-america-brave-new-world.jpeg",
    "likes": "33",
    "dislikes": "2",
    "released": "20250214"
  },
  {
    "id": "4TXB83",
    "title": "Dog Man",
    "description": "When a police officer and his faithful police dog get injured in the line of duty, a harebrained but life-saving surgery fuses the two of them together -- and Dog Man is born. As Dog Man learns to embrace his new identity, he must stop feline supervillain Petey the Cat from cloning himself and going on a crime spree.",
    "mpaarating": "PG",
    "type": "Comedy/Adventure",
    "length": "94",
    "thumburl": "movie-dog-man.jpeg",
    "likes": "50",
    "dislikes": "60",
    "released": "20250131"
  },
  {
    "id": "X0EBV8",
    "title": "Last Breath",
    "description": "The true story of seasoned deep-sea divers who battle the raging elements to rescue a crewmate who's trapped hundreds of feet below the ocean's surface.",
    "mpaarating": "PG-13",
    "type": "Drama/True-Story",
    "length": "93",
    "thumburl": "movie-last-breath.jpeg",
    "likes": "44",
    "dislikes": "88",
    "released": "20250228"
  },
  {
    "id": "4V3DIT",
    "title": "Locked",
    "description": "When Eddie breaks into a luxury SUV, he steps into a deadly trap set by a self-proclaimed vigilante who delivers his own brand of twisted justice. Trapped inside the car, Eddie soon discovers escape is an illusion and survival is a nightmare.",
    "mpaarating": "R",
    "type": "Suspense/Thriller",
    "length": "95",
    "thumburl": "movie-locked.jpeg",
    "likes": "2",
    "dislikes": "6",
    "released": "20250321"
  },
  {
    "id": "WO8ERC",
    "title": "Mickey 17",
    "description": "A disposable employee is sent on a human expedition to colonize the ice world Niflheim. After one iteration dies, a new body is regenerated with most of his memories intact.",
    "mpaarating": "R",
    "type": "Sci-fi/Comedy",
    "length": "140",
    "thumburl": "movie-mickey-17.jpeg",
    "likes": "8",
    "dislikes": "3",
    "released": "20250307"
  },
  {
    "id": "5NUWYO",
    "title": "Novocaine",
    "description": "When the girl of his dreams gets kidnapped, a man turns his inability to feel pain into an unexpected advantage as he fights a bunch of thugs to get her back.",
    "mpaarating": "R",
    "type": "Action/Thriller",
    "length": "110",
    "thumburl": "movie-novocaine.jpeg",
    "likes": "56",
    "dislikes": "40",
    "released": "20250314"
  },
  {
    "id": "35Z9RW",
    "title": "Snow White",
    "description": "Disney's Snow White, or simply Snow White, is a 2025 American musical fantasy film directed by Marc Webb and written by Erin Cressida Wilson",
    "mpaarating": "PG",
    "type": "Family/Fantasy",
    "length": "109",
    "thumburl": "movie-snow-white.jpeg",
    "likes": "6",
    "dislikes": "3",
    "released": "20250321"
  },
  {
    "id": "KT5MSR",
    "title": "The Alto Knights",
    "description": "In the 1950s, notorious New York crime bosses Frank Costello and Vito Genovese vie for control of the city streets. Once the best of friends, petty jealousies and a series of betrayals place them on a deadly collision course that reshapes organized crime forever.",
    "mpaarating": "R",
    "type": "Crime/Drama",
    "length": "123",
    "thumburl": "movie-the-alto-knights.jpeg",
    "likes": "8",
    "dislikes": "4",
    "released": "20250321"
  },
  {
    "id": "5J8L5Q",
    "title": "The Day the Earth Blew Up",
    "description": "Porky Pig and Daffy Duck become Earth's only hope when their antics at the local bubble-gum factory uncover a secret alien mind-control plot. Faced with cosmic odds, they must save their town and the world while not driving each other totally looney.",
    "mpaarating": "PG",
    "type": "Family/Comedy",
    "length": "91",
    "thumburl": "movie-the-day-the-earth-blew-up.jpeg",
    "likes": "7",
    "dislikes": "3",
    "released": "20250314"
  },
  {
    "id": "H1N2XC",
    "title": "The Monkey",
    "description": "When twin brothers find a mysterious wind-up monkey, a series of outrageous deaths tear their family apart. Twenty-five years later, the monkey begins a new killing spree, forcing the estranged siblings to confront the cursed toy.",
    "mpaarating": "R",
    "type": "Horror",
    "length": "100",
    "thumburl": "movie-the-monkey.jpeg",
    "likes": "6",
    "dislikes": "8",
    "released": "20250221"
  }
]

function init(){
  setupData(theData);
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
  d.map(function(item){
    // movie object
    const movie = returnMovieItem(item);

    // data tracker
    data[movie.id] = movie;
    data.list.push(movie.id);
  });

/**
 * Creates and returns a movie item enclosure object
 * @param {number} movieItem - an data entry from the json array.
 * @returns {object} Enclosure object with references to data and html elements.
 */

  function returnMovieItem(movieitem){
    // a list of keys to add url prepend
    // basically to get the correct path from json
    const addUrlPrependToTheseKeys = ['thumburl'];

    // number of likes from the movie entry
    let likes = parseInt(movieitem.likes) || 0;

    // the number of dislikes from the movie entry
    let dislikes = parseInt(movieitem.dislikes) || 0;

    // the rating scored based off of the number a likes vs dislikes
    movieitem.score = 0;

    // hours and minutes to display in the info modal
    const hours = Math.floor(parseInt(movieitem.length) / 60);
    const minutes = parseInt(movieitem.length) % 60;
    movieitem.totaltime = (hours > 0 ? hours + 'h ' : '') + minutes + 'm';

    // setting the date in readable format
    let released = movieitem.released;
    movieitem.releasedate = released.substr(4, 2) + '/' + released.substr(6, 2) + '/' + released.substr(0, 4);

    let itemHTML = itemTemplateHTML;
    let detailHTML = detailTemplateHTML;
    const keys = Object.keys(movieitem);

    keys.forEach(function(key){
      const reg = new RegExp('{{' + key + '}}', 'g');
      let value = movieitem[key];

      if (addUrlPrependToTheseKeys.indexOf(key) > -1){
        value = urlPrepend + value;
      }

      itemHTML = itemHTML.replace(reg, value);
      detailHTML = detailHTML.replace(reg, value);
    });

    const el = $(itemHTML);
    const detail = $(detailHTML);
    const all = el.add(detail);

    function score(){
      const ratingClasses = ['movie-rating-high', 'movie-rating-med', 'movie-rating-low'];
      const rating = Math.round(likes / (likes + dislikes) * 100);
      const ratingssummerization = `${likes} Thumbs up, ${dislikes} Thumbs down.`;
      
      movieitem.score = rating;

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
      all.find('.movie-detail-ratings-summerization').html(ratingssummerization)
      ;
    }
    score();

    el.find('.movie-thumb-img').on('load', function(){
      el.removeClass('movie-block-place');
    });
    el.find('.movie-info').on('click', function(){
      movieContainer.find('#movie-detail').remove();
      movieContainer.append(detail);
      addEvents(detail);
    });

    addEvents(el);

    function addEvents(div){
      div.find('.movie-detail-exit').on('click', function(){
        movieContainer.find('#movie-detail').remove();
      });
      div.find('.movie-rating-like').on('click', function(){
        likes++;
        score();
      });
      div.find('.movie-rating-dislike').on('click', function(){
        dislikes++;
        score();
      });
    }

    movieitem.el = el;
    movieitem.sorttitle = movieitem.title.toLowerCase().replace('the ', '');

    return movieitem
  }

  $(window).on('resize', function(){
    // during browser resize - removes the information modal
    movieContainer.find('#movie-detail').remove();
  });

  const msort = $('#moviesort');
  msort.on('change', function(){
    // the value at which to sort - from the sort select field.
    const sortValue = msort.val();

    // removes the -rev for reveresed 
    const sortby = sortValue.replace('-rev', '');
    
    // creates a new array that is sorted
    let arr = data.list.sort((a, b) => {
      if (data[a][sortby] < data[b][sortby]) return 1;
      if (data[a][sortby] > data[b][sortby]) return -1;
      return 0;
    });

    // reverses these keys
    const reverseDatesForTheseKeys = [
      'sorttitle',
      'released',
      'score-rev'
    ]
    if (reverseDatesForTheseKeys.indexOf(sortValue) > -1){
      arr = arr.reverse();
    }
    
    arr.map(function(item){
      movieContainer.append(data[item].el)
    });
  }).trigger('change');

  console.log(data)
}

