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

// variables for the search button and the about button
var aboutInfoBox = document.querySelector('about-btn');
var movieInputBox = document.getElementById('movie-search');
var movieButton = document.getElementById('search-btn');

//variables for third-row elements
var moviePosterEL = document.getElementById('movie-poster');
var movieTitleEl = document.getElementById('movie-title');
var movieYearEL = document.getElementById('movie-year');
var movieRatingEL = document.getElementById('movie-rating');
var movieDescriptionEL = document.getElementById('movie-description');
var movieTrailerEL = document.getElementById('movie-trailer');
var streamListEL = document.getElementById('movie-streaming');

{
fetch('/About.html')
.then (response=>response.text(){);
.then(data=>
   aboutInfoBox.innerHTML=data
 });

aboutInfoBox.addEventListener('click', () => {
      aboutInfoSection.classList.toggle('hidden');
});

//when the search button is clicked - the fetch is initiated for the Streaming Availability API to return the searched movie data
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

// cointainer 2 for rating between 8-5 stars

//function gets the movie details from the fetch object and writes them to the page and writes the info to local storage
function getMovieDetails(dataObject){
   var posterURL = dataObject.posterURLs['342'];
   var title = dataObject.title;
   var year = dataObject.year;
   var imdbRating = dataObject.imdbRating/10;
   var description = dataObject.overview;
   var youtubeTrailerVideoLink = dataObject.youtubeTrailerVideoLink
   var movieStreaming = dataObject.streamingInfo.us;
   var streamingObjectKeys = Object.keys(movieStreaming);

   moviePosterEL.src = posterURL;
   movieTitleEl.textContent = title;
   movieYearEL.textContent = year;
   movieRatingEL.textContent = ("IDMb "+ imdbRating);
   movieDescriptionEL.textContent = (description);
   movieTrailerEL.textContent = ("youTube Trailer");
   movieTrailerEL.href = (youtubeTrailerVideoLink);

   localStorage.setItem("movie-poster", JSON.stringify(posterURL));
   localStorage.setItem("movie-title", JSON.stringify(title));
   localStorage.setItem("movie-year", JSON.stringify(year));
   localStorage.setItem("movie-rating", JSON.stringify("IDMb "+ imdbRating));
   localStorage.setItem("movie-description", JSON.stringify(description));
   localStorage.setItem("movie-trailer", JSON.stringify(youtubeTrailerVideoLink));


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

   //appends data from local storage to the page
   function renderLastEvent(){
      var lastPosterURL = JSON.parse(localStorage.getItem("movie-poster"));
      var lastTitle = JSON.parse(localStorage.getItem("movie-title"));
      var lastYear = JSON.parse(localStorage.getItem("movie-year"));
      var lastRating = JSON.parse(localStorage.getItem("movie-rating"));
      var lastDescription = JSON.parse(localStorage.getItem("movie-description"));
      var lastTrailer = JSON.parse(localStorage.getItem("movie-trailer"));
   
      if(lastTitle !== null){
         moviePosterEL.src = lastPosterURL;
         movieTitleEl.textContent = lastTitle;
         movieYearEL.textContent = lastYear;
         movieRatingEL.textContent = lastRating;
         movieDescriptionEL.textContent = lastDescription;
         movieTrailerEL.textContent = ("youTube Trailer");
         movieTrailerEL.href = (lastTrailer);

      } else {
        return;
      }
   }

      //function initial() populates the page with the last saved data from local storage
   function initial(){
   renderLastEvent();
   }

      //calls function initial() upon browser page load and/or browser refresh
   initial();