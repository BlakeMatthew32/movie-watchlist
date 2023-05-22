
const filmNameInput = document.getElementById('film-name-input')
const searchForm = document.getElementById('search-form')
const movieContainer = document.getElementById('movie-container')


searchForm.addEventListener('submit', handleSearch)

// Search for movies based on input file title/keyword
async function SearchMovies(movieTitle) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&s=${movieTitle}`)
    const data = await res.json()
    return data.Search
}


// Get movie info from returned films
async function SearchMovieInfo(movie) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=41a510e&i=${movie.imdbID}`)
    const data = await res.json()
    return await data
}


async function handleSearch(event) {
    event.preventDefault()
    
    const searchedMovies = []
    // console.log(filmNameInput.value) remove later

    if(filmNameInput.value) {
        const movies = await SearchMovies(filmNameInput.value)

        for (let movie of movies) {
            searchedMovies.push(await SearchMovieInfo(movie))
        }
        
    }

    renderSearchList(searchedMovies)
}


function renderSearchList(movies) {
    let searchListHtml = ''

    if(movies) {
        for (let movie of movies) {
            searchListHtml += getMovieCardHtml(movie)
        }
    }

    movieContainer.innerHTML = searchListHtml
}

// need to search for the individual films from the api to get the plot, rating and tags

function getMovieCardHtml(movie) {

    // template of the movie card to be created from the data.
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
                    <button><img src='images/IconPlus.png'> Watchlist</button>
                </div>
                <p class='movie-plot'>${movie.Plot}</p>
            </div>
        </div>
    `
}

// SearchMovies('batman')