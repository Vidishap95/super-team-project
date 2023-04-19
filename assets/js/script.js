//API Key for "Streaming Availabilty API"  ** only 100 calls/day **
var apiKey = 'c57e08632cmshdf60e809c2ea152p100330jsn3e0a705522cf';
var apiKeyM = 'd6f6f25352msh9dd6753ebd9249ep1e97c8jsnb8f2487ea3cd';
var apiKeyC = 'ea2834bc81msh2d97ced269ee288p19940ejsnff1f27caaa7d';

//data from the API used to fetch the data
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKeyC,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};

// variables for the search button
var movieInputBox = document.getElementById('movie-search');
var movieButton = document.getElementById('search-btn');

// calling fetch call for the search tab 
movieButton.addEventListener('click', function(event){
      event.preventDefault();
      var value = movieInputBox.value;
      var searchURL = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + value + "&country=us&show_type=movie&output_language=en";
      console.log(searchURL);

      fetch(searchURL,options)
       .then(function(response){
          return response.json();
       })
       .then(function(data){
          var movieData = data.result[0];
          console.log(movieData);
          getMovieDetails(movieData); //call getMovieDetails function to get all movie details
       })
       .catch(err => console.error(err)); //code created by the API developers
      });


//function gets the movie details from the fetch object and writes them to the page
function getMovieDetails(dataObject){
   var posterURL = dataObject.posterURLs['342'];
   var title = dataObject.title;
   var imdbRating = dataObject.imdbRating;
   var year = dataObject.year;
   var description = dataObject.overview;
   var youtubeTrailerVideoLink = dataObject.youtubeTrailerVideoLink
 

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


   
   
   var movieStreaming = dataObject.streamingInfo.us;//still working on this!
   console.log(movieStreaming);
   var streamingObjectKeys = Object.keys(movieStreaming);
   console.log(streamingObjectKeys);

   for (var i=0; i < streamingObjectKeys.length; i++){
      movieInfoEL.children[5].textContent = streamingObjectKeys[i]; //needs work - will break code as of right now!!
      // movieInfoEL.children[5].href = (movieStreaming.prime[0].link); //needs work - will break code as of right now!!
      var businessKey = streamingObjectKeys[i]; //prime
      var businessValue = movieStreaming[businessKey];
      var businessLink = businessValue[0].link;
      console.log(businessKey);
      console.log(businessLink);
   }
}
// + movieStreaming.hulu[0].link
//console.log("Welcome to our page");


