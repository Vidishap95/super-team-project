//API Key for "Streaming Availabilty API"  ** only 100 calls/day **
// we can add more keys to be able to switch through them and always have a working key
var apiKeyMeghan = "d6f6f25352msh9dd6753ebd9249ep1e97c8jsnb8f2487ea3cd";

//data from the API used to fetch the data
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKeyMeghan,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};

// variable 'title' is inserted into the url for the fetch 
// variable 'title' info will come from the user entered text in the navbar
var title = "finding nemo" 
var searchURL = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + title + "&country=us&show_type=movie&output_language=en";


//change this number to 5 to run the fetch and the function getMovieDetails. NOTE: only setup like this to save API calls (only 100/day!)
var userMovie = 1; 
if (userMovie === 5){
fetch(searchURL,options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var movieData = data.result[0];
        getMovieDetails(movieData); //call getMovieDetails function to get all movie details
    })
    .catch(err => console.error(err)); //code created by the API developers
}

//function gets the movie details from the fetch object and writes them to the page
function getMovieDetails(dataObject){
    var posterURL = dataObject.posterURLs['342'];
    var title = dataObject.title;
    var imdbRating = dataObject.imdbRating;
    var year = dataObject.year;
    var description = dataObject.overview;
    var youtubeTrailerVideoLink = dataObject.youtubeTrailerVideoLink
    var movieStreaming = dataObject.streamingInfo.us //still working on this!

    var moviePosterEL = document.getElementById('movie-poster');
    var movieTitleEl = document.getElementById('movie-title');
    var movieInfoEL = document.getElementById('movie-info');

    moviePosterEL.src = posterURL;
    movieTitleEl.textContent = title;

    movieInfoEL.children[1].textContent = (year);
    movieInfoEL.children[2].textContent = ("IDMb "+ imdbRating);
    movieInfoEL.children[3].textContent = (description);
    movieInfoEL.children[4].textContent = ("Watch the youTube trailer");
    movieInfoEL.children[4].href = (youtubeTrailerVideoLink);
}