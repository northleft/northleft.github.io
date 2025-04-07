let theData = [
  {
    "id": "VBVQSO",
    "title": "Black Bag",
    "description": "When his beloved wife, Kathryn, is suspected of betraying the nation, intelligence agent George Woodhouse faces the ultimate test &mdash; loyalty to his marriage or his country.",
    "mpaarating": "R",
    "genre": "Triller",
    "length": "94",
    "thumburl": "movie-black-bag.jpeg",
    "likes": "1020",
    "dislikes": "1014",
    "released": "20250314"
  },
  {
    "id": "1NSR4R",
    "title": "Captain America: Brave New World",
    "description": "Sam finds himself in the middle of an international incident after meeting with President Thaddeus Ross. He must soon discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
    "mpaarating": "PG-13",
    "genre": "Action Sci-fi",
    "length": "127",
    "thumburl": "movie-captain-america-brave-new-world.jpeg",
    "likes": "220033",
    "dislikes": "20002",
    "released": "20250214",
    "voted": "dislike"
  },
  {
    "id": "4TXB83",
    "title": "Dog Man",
    "description": "When a police officer and his faithful police dog get injured in the line of duty, a harebrained but life-saving surgery fuses the two of them together -- and Dog Man is born. As Dog Man learns to embrace his new identity, he must stop feline supervillain Petey the Cat from cloning himself and going on a crime spree.",
    "mpaarating": "PG",
    "genre": "Comedy/Adventure",
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
    "genre": "Drama/True-Story",
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
    "genre": "Suspense/Thriller",
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
    "genre": "Sci-fi/Comedy",
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
    "genre": "Action/Thriller",
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
    "genre": "Family/Fantasy",
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
    "genre": "Crime/Drama",
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
    "genre": "Family/Comedy",
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
    "genre": "Horror",
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
  const urlPrepend = 'data/'; // prepends urls to the correct path for images

  // this keeps track of the overall data
  const tracker = {
    list: []
  };

  window.tracker = tracker;

  // the main div that contains all of the movies
  const movieContainer = $('#movies');

  // iterates through the json data to create movie objects
  d.map(function(item, index){
    // movie object
    const movie = new newMovie(item, index);

    // data tracker
    tracker[movie.id] = movie;
    tracker.list.push(movie.id);

    movieContainer.append(movie.figure);
  });

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
    let arr = tracker.list.sort((a, b) => {
      if (tracker[a][sortby] < tracker[b][sortby]) return 1;
      if (tracker[a][sortby] > tracker[b][sortby]) return -1;
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
      movieContainer.append(tracker[item].figure)
    });
  }).trigger('change');

  function newMovie(movieData, index){
    const movie = this;

    // insuring that movieData contains default values
    const data = Object.assign({
      id: Math.random().toString(36).slice(2, 6),
      title: 'Untitled Film',
      description: 'No description available',
      mpaarating: false,
      genre: false,
      length: false,
      thumburl: 'movie-nothumb.png',
      likes: 0,
      dislikes: 0,
      released: false,
      voted: false
    }, movieData);

    //const data = movie.data;
    data.likes = parseInt(data.likes);
    data.dislikes = parseInt(data.dislikes);

    // dummy api to update database on user interaction
    const api = {
      addLike: function(){
        data.likes++;
        data.voted = 'like';
        update();
      },
      removeLike: function(){
        data.likes = Math.max(data.likes - 1, 0);
        update();
      },
      addDislike: function(){
        data.dislikes++;
        data.voted = 'dislike';
        update();
      },
      removeDislike: function(){
        data.dislikes = Math.max(data.dislikes - 1, 0);
        update();
      }
    }

    // Resolves the sorting title
    movie.sorttitle = data.title.toLowerCase();
    if (movie.sorttitle.indexOf('the ') == 0){
      movie.sorttitle = movie.sorttitle.replace('the ', '');
    }
    // for sorting
    movie.released = data.released;
    movie.id = data.id;


    // thumbnail markup
    // reuses the same markup for the thumbnail and the info modal
    const thumbHTML = `
    <div class="movie-thumb"><img class="movie-info movie-thumb-img" src="${urlPrepend + data.thumburl}" width="120" height="183"></div>
    <p class="movie-rating">
      <span class="movie-rating-value"><span></span></span>
      <span class="movie-rating-action">
        <button class="movie-rating-button movie-rating-dislike"><span>&nbsp;</span></button>
        <button class="movie-rating-button movie-rating-like"><span>&nbsp;</span></button>
      </span>
    </p>
    <p class="movie-vote-count"></p>
    `;

    // Builds the thumbnail
    movie.figure = $(`<figure class="movie-block movie-block-place" data-id="${data.id}">`).append(thumbHTML);
    
    // Meta markup (mpaa, genre, length, release date)
    let meta = '';

    if (data.mpaarating){
      meta += `<span id="movie-detail-mpaarating">${data.mpaarating}</span>`;
    }
    // Movie genre
    if (data.genre){
      meta += `<span id="movie-detail-genre">${data.genre}</span>`;
    }
    // length in readable format
    if (data.length){
      const hours = Math.floor(parseInt(data.length) / 60);
      const minutes = parseInt(data.length) % 60;
      meta += `<span id="movie-detail-length">${(hours > 0 ? hours + 'h ' : '') + minutes + 'm'}</span>`;
    }
    // setting the date in readable format
    if (data.released){
      const released = data.released;
      meta += `<span id="movie-detail-date">${released.substr(4, 2) + '/' + released.substr(6, 2) + '/' + released.substr(0, 4)}</span>`;
    }
    // adds meta markup
    if (meta.length){
      meta = `<p id="movie-detail-meta">${meta}</p>`;
    }

    // builds the inforation modal
    movie.detail = $(`
    <div id="movie-detail" data-id="${data.id}">
      <div id="movie-detail-screen" class="movie-detail-exit"></div>
      <div id="movie-detail-content">
        <div id="movie-detail-thumb-container">${thumbHTML}</div>
        <div id="movie-detail-copy">
          <h2>${data.title}</h2>
          ${meta}
          <p id="movie-detail-description">${data.description}<br><br>
        </div>
        <p id="movie-detail-description2">${data.description}<br><br>
        <div id="movie-detail-exit" class="movie-detail-exit"></div>
      </div>
    </div>
    `);

    // adds click event to open info modal
    movie.figure.find('.movie-info').on('click', function(){
      movieContainer.find('#movie-detail').remove();
      movieContainer.append(movie.detail);
      addEvents(movie.detail);
    });

    // fades in the image when it is loaded
    movie.figure.find('.movie-thumb-img').on('load', function(){
      movie.figure.removeClass('movie-block-place');
    });

    // elements is both dom elements combined
    movie.elements = movie.figure.add(movie.detail);

    function update(){
      const likes = data.likes;
      const dislikes = data.dislikes;
      const totalVotes = likes + dislikes;
      const ratingClasses = ['movie-rating-high', 'movie-rating-med', 'movie-rating-low'];
      const rating = Math.round(likes / (likes + dislikes) * 100);

      // for sorting purposes
      movie.score = rating;

      let voteCount = '';
      if (totalVotes < 1000){
        voteCount = totalVotes.toString();
      } else if (totalVotes < 1000000){
        voteCount = Math.floor(totalVotes / 1000) + 'K+';
      } else {
        voteCount = Math.floor(totalVotes / 1000000) + 'M+';
      }
      voteCount += ' Votes';
      movie.elements.find('.movie-vote-count').html(voteCount);

      // color coding ratings
      let ratingClass = '';
      if (rating > 65){
        ratingClass = ratingClasses[0];
      } else if (rating > 40){
        ratingClass = ratingClasses[1];
      } else {
        ratingClass = ratingClasses[2];
      }
      
      movie.elements
      // shows if movie has been voted on
      .attr('data-voted', data.voted)
      // sets the rating chip color and value
      .find('.movie-rating-value')
      .removeClass('movie-rating-high movie-rating-med movie-rating-low')
      .addClass(ratingClass)
      .html(rating);

      // updates the master data object
      theData[index] = data;
    }
    // exposes update function
    movie.update = update;

    let voteButtonIsInteracted = false;

    function builtInDelay(el, addClass){
      if (addClass){
        el.addClass('movie-bounce');
      }
      voteButtonIsInteracted = true;
      setTimeout(function(){
        el.removeClass('movie-bounce');
        
        voteButtonIsInteracted = false;
      }, 800);
    }

    // adds rate buttons events
    function addEvents(div){
      div.find('.movie-detail-exit').on('click', function(){
        movieContainer.find('#movie-detail').remove();
      });
      div.find('.movie-rating-like').on('click', function(){
        const that = $(this);
        const isLiked = data.voted == 'like';
        const isDisliked = data.voted == 'dislike';

        if (!voteButtonIsInteracted){
          data.voted = false;
          let addClass = false;

          if (isLiked){
            api.removeLike();
          } else {
            addClass = true;
            api.addLike();

            if (isDisliked){
              api.removeDislike();
            }
          }

          builtInDelay(that, addClass);
        }
      });
      div.find('.movie-rating-dislike').on('click', function(){
        const that = $(this);
        const isLiked = data.voted == 'like';
        const isDisliked = data.voted == 'dislike';

        if (!voteButtonIsInteracted){
          data.voted = false;
          let addClass = false;

          if (isDisliked){
            api.removeDislike();
          } else {
            addClass = true;
            api.addDislike();

            if (isLiked){
              api.removeLike();
            }
          }

          builtInDelay(that, addClass);
        }
      });
    }

    update();
    addEvents(movie.figure);
  }
}

