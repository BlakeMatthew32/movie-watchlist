
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
        const moviesRes = await SearchMovies(movieInputValue.value)
        const movieIdArr =  moviesRes.map(movie => movie.imdbID)
        console.log(movieIdArr)

    //     for (let movie of movies) {
    //         searchedMovies.push(await SearchMovieInfo(movie))
    //     }
        
    }

    // for(let movie of searchedMovies) {
    //     movieData.push({
    //         movieId: movie.imdbID,
    //         movieHtml: getMovieCardHtml(movie)
    //     })
    // }
    
    // renderSearchList(movieData)
}

function openWatchlist() {
    watchlistContainer.classList.toggle('hidden')
    searchListContainer.classList.toggle('hidden')
}

function addToWatchlist(event) {
    console.log(event.target.id)

    const movieToAdd = movieData.filter(movie => movie.movieId === event.target.id)[0]
    console.log(!watchlistData.includes(movieToAdd))
    if (!watchlistData.includes(movieToAdd)) { 
        watchlistData.push(movieToAdd)
        renderWatchlist()
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
                    <button id=${movie.imdbID}><img src='images/IconPlus.png'> Watchlist</button>
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


//  TODO 

// need to make a way for the watchlist to track what is in it so that the button to add to the watchlist
// has different text '(-) Remove', also want this behaviour to be mirrored in the search list or to now show
// movies already in the watch list.

// store watch list in local storage to render on load.