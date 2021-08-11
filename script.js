const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const heading = document.getElementById('heading');
const button = document.getElementById('icon');

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}

function showMovies(movies) {
  const result = document.createElement('h2');
  result.innerHTML = `<h2>Popular Movies</h2>`;
  heading.appendChild(result);

  main.innerHTML = '';

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    
        <img
          src="${IMGPATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
        </div>
        <div class ='overview'>
        <h4>Overview : </h4>
        ${overview}
        </div>

      `;

    main.appendChild(movieEl);
  });
}

async function showResults(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showSearchResults(respData.results);
}

function showSearchResults(movies) {
  heading.innerHTML = '';
  const result = document.createElement('h2');
  result.innerHTML = `<h2>Search Results</h2>`;
  heading.appendChild(result);

  main.innerHTML = '';
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        
        <img
          src="${IMGPATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
        </div>
        <div class ='overview'>
        <h4>Overview : </h4>
        ${overview}
        </div>

      `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    showResults(SEARCHAPI + searchTerm);
    search.value = '';
  }
});

button.addEventListener('click', () => {
  const searchTerm = search.value;

  if (searchTerm) {
    showResults(SEARCHAPI + searchTerm);
    search.value = '';
  }
});
