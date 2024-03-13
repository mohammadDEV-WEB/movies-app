
// ===============متغیر ها==============
const API_URL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.querySelector(".movies");
const search = document.querySelector(".input-text");
const homeBtn = document.querySelector(".homeBtn");
const form = document.querySelector("form");

// ===============home button =============

homeBtn.addEventListener('click',()=>{
    window.location.reload()
})

requestApi(API_URL);

async function requestApi(url) {
    const request = await fetch(url);
    const promise = await request.json();
    loadMovie(promise.results);
}


function loadMovie(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="title">
          <h2>${title}</h2>
          <div class="title-num ${colorRa(vote_average)}">${vote_average}</div>
        </div>
        <div class="about">
          <h2>overview</h2>
           ${overview} 
        </div>
        `;
        main.appendChild(movieEL)
  });
}

function colorRa(number){
    if (number>=8) {
        return 'green'
    }else if(number>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueSearch = search.value;
  if (valueSearch && !valueSearch == "") {
    requestApi(SEARCH_API + valueSearch);
    valueSearch = "";
  } else {
    
  }
});
