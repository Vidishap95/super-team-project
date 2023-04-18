console.log("Welcome to our page");

var posterURL = "https://image.tmdb.org/t/p/w342/1yDBZiMSVGS1IWWb7B2Rwjdz0Zj.jpg";
var title = "Sixteen Candles";
var imdbRating = 70/10;
var year = "1984";
var description = "A teenage girl deals with her parents forgetting her birthday and a crush on her high school's heartthrob.";
var youtubeTrailerVideoLink = "https://www.youtube.com/watch?v=FDQu9IiPbOM";
var movieStreaming = "Netflix";

var moviePosterEL = document.getElementById('movie-poster');
var movieTitleEl = document.getElementById('movie-title');
var movieDataEL = document.getElementById('movie-data');

moviePosterEL.src = posterURL;
movieTitleEl.textContent = title;
document.getElementById('movie-data').innerHTML = "Rating: " + imdbRating + "<br><br>" + year + "<br><br>" + description + "<br></br>" + youtubeTrailerVideoLink + "<br><br>" + movieStreaming;

