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
    "dislikes": "14"
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
    "dislikes": "2"
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
    "dislikes": "60"
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
    "dislikes": "88"
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
    "dislikes": "6"
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
    "dislikes": "3"
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
    "dislikes": "40"
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
    "dislikes": "3"
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
    "dislikes": "4"
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
    "dislikes": "3"
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
    "dislikes": "8"
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

