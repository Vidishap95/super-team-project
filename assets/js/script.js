console.log("Hello!");

var posterURL = "https://image.tmdb.org/t/p/w342/1yDBZiMSVGS1IWWb7B2Rwjdz0Zj.jpg";
var title = "Sixteen Candles";
var imdbRating = "7.0";
var year = "1984";
var description = "A teenage girl deals with her parents forgetting her birthday and a crush on her high school's heartthrob.";
var youtubeTrailerVideoLink = "https://www.youtube.com/watch?v=FDQu9IiPbOM";
var movieStreaming = "Netflix";

var moviePosterEL = document.getElementById('movie-poster');
var movieTitleEl = document.getElementById('movie-title');
var movieInfoEL = document.getElementById('movie-info');

moviePosterEL.src = posterURL;
movieTitleEl.textContent = title;

movieInfoEL.children[1].textContent = (year);
movieInfoEL.children[2].textContent = ("IDMb "+ imdbRating);
movieInfoEL.children[3].textContent = (description);
movieInfoEL.children[4].textContent = ("youtube trailer for " + title);
movieInfoEL.children[4].href = (youtubeTrailerVideoLink);