// going to try and rewrite the javascript for this project 
// if successful will replace the index.js with this new file

const movieInputValue = document.getElementById('film-name-input')
const searchForm = document.getElementById('search-form')
const searchListContainer = document.getElementById('search-list-container')
const watchlistContainer = document.getElementById('watchlist-container')
const watchlistButton = document.getElementById('watchlist-button')

searchForm.addEventListener('submit', handleSearch)
// searchListContainer.addEventListener('click', addToWatchlist)
// watchlistButton.addEventListener('click', openWatchlist)

let moviesInfo = []
const watchlist = []

// Search for movies based on input file title/keyword
async function fetchMovies(movieTitle) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&s=${movieTitle}&type=movie`)
    const data = await res.json()
    return data.Search
}

// Get movie info from returned films
async function fetchMovieInfo(movieId) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&i=${movieId}`)
    const data = await res.json()
    console.log(data)
    return data
}


// get movies data from api and store in list 
async function handleSearch(event) {
    event.preventDefault()

    // clear the global moviesInfo array on every new search
    // may not need to be global 
    moviesInfo = []

    if(movieInputValue.value) {
        const moviesRes = await fetchMovies(movieInputValue.value)

        for (let movie of moviesRes) {
            const movieInfo = await fetchMovieInfo(movie.imdbID)
            moviesInfo.push(movieInfo)
        }
        console.log(moviesInfo)

    }

    renderSearchMovies(moviesInfo)
}

function renderSearchMovies(movies) {
    let moviesHtml = ''

    if(movies) {
        for (let movie of movies) {
            moviesHtml += getMovieCardHtml(movie)

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

function getMovieCardHtml(movie) {
    const buttonHtml = getButtonHtml(movie)

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
                    ${buttonHtml}
                </div>
                <p class='movie-plot'>${movie.Plot}</p>
            </div>
        </div>
    `
}

function getButtonHtml(movie) {
    if (!watchlist.includes(movie)) {
        return `<button id=${movie.imdbID} data-action='add'><img src='images/IconPlus.png'> Watchlist</button>`
    } else {
        return `<button id=${movie.imdbID} data-action'remove'><img src='images/IconPlus.png'> Watchlist</button>`
    }
}

    
 