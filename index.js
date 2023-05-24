
const movieInputValue = document.getElementById('film-name-input')
const searchForm = document.getElementById('search-form')
const searchListContainer = document.getElementById('search-list-container')
const watchlistContainer = document.getElementById('watchlist-container')
const watchlistButton = document.getElementById('watchlist-button')


let movieData = []
let watchlistData = []

searchForm.addEventListener('submit', handleSearch)
searchListContainer.addEventListener('click', addToWatchlist)
watchlistButton.addEventListener('click', openWatchlist)

// Search for movies based on input file title/keyword
async function SearchMovies(movieTitle) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&s=${movieTitle}&type=movie`)
    const data = await res.json()
    return data.Search
}

// Get movie info from returned films
async function SearchMovieInfo(movie) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&i=${movie.imdbID}`)
    const data = await res.json()
    return await data
}


// EVENT FUNCTIONS 

// get movies data from api and store in list 
async function handleSearch(event) {
    event.preventDefault()
    
    const searchedMovies = []
    movieData = []

    if(movieInputValue.value) {
        const movies = await SearchMovies(movieInputValue.value)

        for (let movie of movies) {
            searchedMovies.push(await SearchMovieInfo(movie))
        }
        
    }

    for(let movie of searchedMovies) {
        movieData.push({
            movieId: movie.imdbID,
            movieHtml: getMovieCardHtml(movie)
        })
    }
    
    renderSearchList(movieData)
}

function openWatchlist() {
    watchlistContainer.classList.toggle('hidden')
    searchListContainer.classList.toggle('hidden')
}

function addToWatchlist(event) {
    console.log(event.target.id)

    const movieToAdd = movieData.filter(movie => movie.movieId === event.target.id)
    watchlistData.push(movieToAdd[0])
    renderWatchlist()
}



function renderSearchList(movies) {
    let moviesHtml = ''

    if(movies) {
        for (let movie of movies) {
            moviesHtml += movie.movieHtml

        }
        
        searchListContainer.innerHTML = moviesHtml
    } else {
        searchListContainer.innerHTML = `
            <div class="center">
                <img src="images/Icon.png">
                <p>Start exploring</p>
            </div>
        `
    }
}

function renderWatchlist() {
    let watchlistHtml = ''

    if(watchlistData) {
        for (let movie of watchlistData) {
            watchlistHtml += movie.movieHtml
        }
        
        watchlistContainer.innerHTML = watchlistHtml
    } else {
        watchlistContainer.innerHTML = `
            <div class="center">
                <p>Your watchlist is looking a little empty...</p>
            </div>
        `
    }

}

function getMovieCardHtml(movie) {
    return `
        <div class="movie-card">
            <img src=${movie.Poster} />
            <div class='movie-info'>
                <div class='title-container'>
                    <h3>${movie.Title}</h3>
                    <p><img src='images/IconStar.png'> ${movie.imdbRating}</p>
                </div>
                <div class='info-container'>
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <button id=${movie.imdbID}><img src='images/IconPlus.png'> Watchlist</button>
                </div>
                <p class='movie-plot'>${movie.Plot}</p>
            </div>
        </div>
    `
}