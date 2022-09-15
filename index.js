//this will fetch the data and load it up, top rated movies 
let movies = [];
fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cbb53a38daad4a38723daab094adb724')
.then ((res) => res.json())
.then((movie) =>  {
    console.log(movie.results, "fetched form database");
    for(let i = 0; i < movie.results.length; i++){
        movies.push(movie.results[i])
        renderMovies(movie.results[i]);
    }
});


// second page of json data, newly released movies 
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cbb53a38daad4a38723daab094adb724')
.then ((res) => res.json())
.then((movie) =>  {
    console.log(movie.results, "fetched form database");
    for(let i = 0; i < movie.results.length; i++){
        movies.push(movie.results[i])
        renderMovies(movie.results[i]);
    }
});

//makes the movie images load 
function renderMovies(movie) {
    let panel = document.querySelector(".genreButton")
    let image = document.createElement("img")
    image.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    panel.append(image)
// adding click events so movie info will load when clicked 
//EVENT LISTENER ONE 
image.addEventListener("click", () => {
    console.log("clicked movie")
    renderDetails(movie)
    //refresh the search bar after we click the image
    searchBar.value = ''
    //lets you type after you click on the image without clicking search bar again
    searchBar.focus()
})
//when we mouse over the image it will glow
//EVENT LISTENER 2
image.addEventListener("mouseover" , () => {
    image.style.filter = "grayscale(0%)"
})
//same as above 
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
releaseDate.innerText =  movie.release_date
let voteAverage = document.querySelector("#vote_average")
voteAverage.innerText = movie.vote_average
let description = document.querySelector("#overview")
description.innerText = movie.overview
console.log(movie.title)
let image = document.querySelector("#movieImage")
image.src = image.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
}

//button that toggle night and light mode 
const checkbox = document.getElementById("checkbox");
//EVENT LISTENER 3
checkbox.addEventListener("change", () =>{
    //change theme of website
    document.body.classList.toggle("dark")
})

//create the search bar 
const searchBar = document.querySelector('#myInput')
const movieList = document.querySelector('.genreButton')
console.log(searchBar)
//add event listener to thr search bar
// EVENT LISTENER EXTRA 
searchBar.addEventListener('input', (e) => {
    console.log('search', e.target.value)

    movieList.innerHTML = ''
// loops through each movie and filters 
    movies.forEach(movie => {
// the to lower case things prevents the search bar from being case sensative.
        if (movie.title.toLowerCase().includes(e.target.value.toLowerCase()) ) {
            renderMovies(movie)
        }

    })
    
})

