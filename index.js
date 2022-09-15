//this will fetch the data and load it up
let movies = [];
fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cbb53a38daad4a38723daab094adb724')
.then((res) => res.json())
.then((movie) =>  {
    console.log(movie.results, "fetched form database");
    for(let i = 0; i < movie.results.length; i++){
        movies.push(movie.results[i])
        renderMovies(movie.results[i]);
    }

});


// second page of json data 
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cbb53a38daad4a38723daab094adb724')
.then((res) => res.json())
.then((movie) =>  {
    console.log(movie.results, "fetched form database");
    for(let i = 0; i < movie.results.length; i++){
        movies.push(movie.results[i])
        renderMovies(movie.results[i]);
    }

});

fetch('http://localhost:3000/video')
.then((res) => res.json())
.then((video) => {
    video.forEach (video => {
        console.log('Loaded Movies')
        loadVideos(video)
    })
});

function loadVideos (video) {
}



//makes the movie images load 
function renderMovies(movie) {
    let div = document.createElement("div")
    let panel = document.querySelector(".genreButton")
    let image = document.createElement("img")
    image.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    panel.append(image)

image.addEventListener("click", () => {
    renderDetails(movie)
    //refresh the search bar after we click the image
    searchBar.value = ''
    //lets you type after you click on the image without clicking search bar again
    searchBar.focus()
})
image.addEventListener("mouseover" , () => {
    image.style.filter = "grayscale(0%)"
})
image.addEventListener("mouseout" , () => {
    image.style.filter = "grayscale(100%)"


})
}


// display when we click the movie images
function renderDetails(movie) {

let movieTitle = document.querySelector("#title")
movieTitle.textContent = movie.title
let language = document.querySelector("#language")
language.innerText =`Original Language: ${movie.original_language}`
let releaseDate = document.querySelector("#release_date")
releaseDate.innerText = `Release Date: ${movie.release_date}` 
let voteAverage = document.querySelector("#vote_average")
voteAverage.innerText = `IMDb Rating: ${movie.vote_average}`
let description = document.querySelector("#overview")
description.innerText = movie.overview
// console.log(movie.title)
// let image = document.querySelector("#movieImage")
// image.src = image.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
}

//button that toggle night and light mode 
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () =>{
    //change theme of website
    document.body.classList.toggle("dark")
})


const searchBar = document.querySelector('#myInput')
const movieList = document.querySelector('.genreButton')
console.log(searchBar)
searchBar.addEventListener('input', (e) => {
    movieList.innerHTML = ''
    movies.forEach(movie => {
        if (movie.title.toLowerCase().includes(e.target.value.toLowerCase()) ) {
            renderMovies(movie)
        }

    })
    
})

