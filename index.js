
const filmNameInput = document.getElementById('film-name-input')
const searchForm = document.getElementById('search-form')

searchForm.addEventListener('submit', handleSearch)

async function SearchMovies(movieTitle) {
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=41a510e&s=${movieTitle}`)
    const data = await res.json()
    renderSearchList(data.Search)
}

function handleSearch(event) {
    event.preventDefault()
    // console.log(filmNameInput.value) remove later

    if(filmNameInput.value) {
        const searchList = SearchMovies(filmNameInput.value)
        console.log(searchList)
    }
}

function renderSearchList(movies) {
    let searchListHtml = ''

    if(movies) {
        for (let movie of movies) {
            searchListHtml += getMovieCardHtml(movie)
        }
    }
}

// need to search for the individual films from the api to get the plot, rating and tags

function getMovieCardHtml(movie) {
    console.log(movie)

    // template of the movie card to be created from the data.
    return `
        <div class="movie-container">
            <img src=${movie.Poster} />
            <div class='movie-info'>
                <h1>Movie Title</h1>
                <p>Rating</p>
                <p>Run time</p>
                <p>Tags</p>
                <button>Add to watch list</button>
                <p>Plot</p>
            </div>
        </div>
    `
}