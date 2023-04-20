//API Key for "Streaming Availabilty API"  ** only 100 calls/day **
var apiKey = 'c57e08632cmshdf60e809c2ea152p100330jsn3e0a705522cf';
var apiKeyM = 'd6f6f25352msh9dd6753ebd9249ep1e97c8jsnb8f2487ea3cd';

//data from the API used to fetch the data
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKeyM,
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
   var imdbRating = dataObject.imdbRating/10;
   var year = dataObject.year;
   var description = dataObject.overview;
   var youtubeTrailerVideoLink = dataObject.youtubeTrailerVideoLink
   var movieStreaming = dataObject.streamingInfo.us;
   var streamingObjectKeys = Object.keys(movieStreaming);

   var moviePosterEL = document.getElementById('movie-poster');
   var movieTitleEl = document.getElementById('movie-title');
   var movieInfoEL = document.getElementById('movie-info');
   var streamListEL = document.getElementById('movie-streaming');

   moviePosterEL.src = posterURL;
   movieTitleEl.textContent = title;
   movieInfoEL.children[1].textContent = (year);
   movieInfoEL.children[2].textContent = ("IDMb "+ imdbRating);
   movieInfoEL.children[3].textContent = (description);
   movieInfoEL.children[4].textContent = ("youTube Trailer");
   movieInfoEL.children[4].href = (youtubeTrailerVideoLink);

   for (var i=0; i < streamingObjectKeys.length; i++){
      var platformKey = streamingObjectKeys[i];
      var platformLink = movieStreaming[platformKey][0].link;

      var list = document.createElement("li");
      var listAnchor = document.createElement("a");

      listAnchor.textContent = platformKey;
      listAnchor.setAttribute("href", platformLink);
      listAnchor.setAttribute("target", "_blank");

      streamListEL.appendChild(list);
      list.appendChild(listAnchor);
   }
}