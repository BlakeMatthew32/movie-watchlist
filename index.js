

async function SearchMovies(movieTitle) {
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=41a510e&t=${movieTitle}`)
    const data = await res.json()
    console.log(data.Runtime)
}
