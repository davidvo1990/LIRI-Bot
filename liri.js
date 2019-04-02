require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// Include the npm package
var axios = require("axios");
var moment = require('moment');

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding artist to search
var input = "";




// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
    }
    else {
        input += nodeArgs[i];

    }
}


// Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`

if (nodeArgs[2] === 'concert-this') {

    if (nodeArgs[3] === undefined) {
        return console.log("Are you sure? Please input artist name!!!!")
    } else {
        // `node liri.js concert-this <artist/band name here>`

        // * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
        //      * Name of the venue
        //      * Venue location
        //      * Date of the Event (use moment to format this as "MM/DD/YYYY")

        // var input = "bruno mars"
        var url = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

        axios.get(url).then(
            function (response) {
                // Then we print out the response
                // console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    console.log("-----------------------------")
                    console.log("Name of the venue: " + response.data[i].venue.name);
                    console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
                    var datetime = response.data[i].datetime
                    // var timeFormat = moment(datetime).isValid()
                    var timeFormat = moment(datetime).format("MM/DD/YYYY")
                    console.log("Date of the Event: " + timeFormat);
                    console.log("-----------------------------")
                }

            }
        );
    }
}

else if (nodeArgs[2] === 'spotify-this-song') {
    // `node liri.js spotify-this-song '<song name here>'`

    // * This will show the following information about the song in your terminal/bash window
    //      * Artist(s)
    //      * The song's name
    //      * A preview link of the song from Spotify
    //      * The album that the song is from
    //    * If no song is provided then your program will default to "The Sign" by Ace of Base.
    // * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
    //    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
    //    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
    //    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    //    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    //    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    // var spotify = new Spotify({
    //     id: "4d4f627d4d8b40f6bc6682440ab7645f",
    //     secret: "9f494962ef1744db9ab47501a4500e2f"
    // });

    spotify.search({ type: 'track', query: input })
        .then(function (response) {
            // console.log(response.tracks.items[0]);

            var songInfo = response.tracks.items[0];

            //The artist(s) name
            var artistArr = [];
            for (var i = 0; i < songInfo.artists.length; i++) {
                // console.log(songInfo.artists[i].name);
                artistArr.push(songInfo.artists[i].name)
            }
            console.log("The artist(s) name: "+artistArr.join(", "));

            // The song's name
            console.log("The song's name: " + songInfo.name);
            // A preview link of the song from Spotify
            console.log("A preview link of the song from Spotify: " + songInfo.preview_url);
            // The album that the song is from
            console.log("The album: " + songInfo.album.name);

        })
        .catch(function (err) {
            console.log(err);
        });



}

// `node liri.js movie-this '<movie name here>'`
// * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


// `node liri.js do-what-it-says`

