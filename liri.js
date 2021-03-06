require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// Include the npm package
var axios = require("axios");
var moment = require('moment');
var chalk = require('chalk');
// fs is a core Node package for reading and writing files
var fs = require("fs");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding artist to search
var input = "";

liri();
function liri() {


    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            input = input + " " + nodeArgs[i];
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
            return console.log(chalk.red("Are you sure? Please input artist name!!!!"))
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
                        console.log(chalk.blue("Name of the venue: ") + response.data[i].venue.name);
                        console.log(chalk.blue("Venue location: ") + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
                        var datetime = response.data[i].datetime
                        // var timeFormat = moment(datetime).isValid()
                        var timeFormat = moment(datetime).format("MM/DD/YYYY")
                        console.log(chalk.blue("Date of the Event: ") + timeFormat);
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
        //     id: "",
        //     secret: ""
        // });

        if (nodeArgs[3] === undefined) {
            // return console.log("Are you sure? Please input artist name!!!!")
            return spotdefault();
        } else {

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
                    console.log(chalk.green("The artist(s) name: ") + artistArr.join(", "));

                    // The song's name
                    console.log(chalk.green("The song's name: ") + songInfo.name);
                    // A preview link of the song from Spotify
                    console.log(chalk.green("A preview link of the song from Spotify: ") + songInfo.preview_url);
                    // The album that the song is from
                    console.log(chalk.green("The album: ") + songInfo.album.name);

                })
                .catch(function (err) {
                    // console.log(err);
                    spotdefault();
                });
        }
        // If no song is provided then your program will default to "The Sign" by Ace of Base.        
        function spotdefault() {
            spotify.search({ type: 'track', query: "Ace of Base" })
                .then(function (response) {
                    // console.log(response.tracks.items[0]);

                    var songInfo = response.tracks.items[0];

                    //The artist(s) name
                    var artistArr = [];
                    for (var i = 0; i < songInfo.artists.length; i++) {
                        // console.log(songInfo.artists[i].name);
                        artistArr.push(songInfo.artists[i].name)
                    }
                    console.log(chalk.green("The artist(s) name: ") + artistArr.join(", "));

                    // The song's name
                    console.log(chalk.green("The song's name: ") + songInfo.name);
                    // A preview link of the song from Spotify
                    console.log(chalk.green("A preview link of the song from Spotify: ") + songInfo.preview_url);
                    // The album that the song is from
                    console.log(chalk.green("The album: ") + songInfo.album.name);

                })
                .catch(function (err) {
                    console.log(err);
                });
        };

    }


    else if (nodeArgs[2] === 'movie-this') {
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

        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);

        function getmovie(response) {
            // console.log(response)

            //        * Title of the movie.
            console.log(chalk.red("Title of the movie: ") + response.data.Title)
            //        * Year the movie came out.
            console.log(chalk.red("Year the movie came out: ") + response.data.Year)
            //        * IMDB Rating of the movie.
            console.log(chalk.red("IMDB Rating of the movie: ") + response.data.imdbRating)
            //        * Rotten Tomatoes Rating of the movie.
            console.log(chalk.red(response.data.Ratings[1].Source + " Rating of the movie: ") + response.data.Ratings[1].Value)
            //        * Country where the movie was produced.
            console.log(chalk.red("Country where the movie was produced: ") + response.data.Country)
            //        * Language of the movie.
            console.log(chalk.red("Language of the movie: ") + response.data.Language)
            //        * Plot of the movie.
            console.log(chalk.red("Plot of the movie: ") + response.data.Plot)
            //        * Actors in the movie.
            console.log(chalk.red("Actors in the movie: ") + response.data.Actors)
        };


        if (nodeArgs[3] === undefined) {
            // return console.log("Are you sure? Please input movie name!!!!")
            // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            //      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
            //      * It's on Netflix!
            queryUrl = "http://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl).then(
                function (response) {
                    // console.log(response)
                    getmovie(response);
                    console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
                    console.log("It's on Netflix!");
                }
            );
        } else {
            axios.get(queryUrl).then(
                function (response) {
                    // console.log(response)
                    getmovie(response);
                }
            );
        }

    }

    else if (nodeArgs[2] === 'do-what-it-says') {
        // `node liri.js do-what-it-says`

        // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        // * Edit the text in random.txt to test out the feature for movie-this and concert-this.

        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            // console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split("\r\n");
            var random = Math.floor(Math.random() * dataArr.length)
            var arr = dataArr[random].split(',')
            // We will then re-display the content as an array for later use.
            // console.log(dataArr);
            // console.log(arr);
            process.argv[2] = arr[0];
            process.argv[3] = arr[1].replace(/['"]+/g, '').replace(";", "");
            // console.log(process.argv[3]);
            liri();
        });
    }

    // Next, we store the text given to us from the command line.
    var command = process.argv[2];
    var statement = input;
    var log;
    if (statement !== "") {
        log = command + ',"' + statement + '";\r\n'
    } else {
        log = command + ';\r\n'
    }

    function addlog() {
        fs.appendFile("log.txt", log, function (err) {

            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                // console.log("Content Added!");
                console.log(chalk.yellow("New log add: ") + log);
            }

        });
    }
    if (nodeArgs[2] === 'do-what-it-says' ||
        nodeArgs[2] === 'concert-this' ||
        nodeArgs[2] === 'spotify-this-song' ||
        nodeArgs[2] === 'movie-this') {
        addlog();
    }

}

