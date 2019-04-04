# LIRI Bot

### Overview

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


 LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

 To retrieve the data that will power this app, send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs.

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

* You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

### Video Demo

[![Watch the video](https://img.youtube.com/vi/T-D1KVIuvjA/maxresdefault.jpg)](https://github.com/davidvo1990/LIRI-Bot/blob/master/liri.webm)
https://drive.google.com/open?id=1UYXFkkwCIZaBZn7yB6vma-H1-_QvFexr

### What Each Command Should Do
1. `node liri.js concert-this <artist/band name here>`
* This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
```
            axios.get(url).then(
                function (response) {
                    // Then we print out the response
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("-----------------------------")
                        console.log(chalk.blue("Name of the venue: ") + response.data[i].venue.name);
                        console.log(chalk.blue("Venue location: ") + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
                        var datetime = response.data[i].datetime
                        var timeFormat = moment(datetime).format("MM/DD/YYYY")
                        console.log(chalk.blue("Date of the Event: ") + timeFormat);
                        console.log("-----------------------------")
                    }
```

![Image of Drake](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/drake.PNG)
![Image of nicki](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/nicki.PNG)

2. `node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in your terminal/bash window
    ```
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
    ```
    ```
            spotify.search({ type: 'track', query: input })
                .then(function (response) {
                    var songInfo = response.tracks.items[0];
                    //The artist(s) name
                    var artistArr = [];
                    for (var i = 0; i < songInfo.artists.length; i++) {
                        artistArr.push(songInfo.artists[i].name)
                    }
                    console.log(chalk.green("The artist(s) name: ") + artistArr.join(", "));
                    // The song's name
                    console.log(chalk.green("The song's name: ") + songInfo.name);
                    // A preview link of the song from Spotify
                    console.log(chalk.green("A preview link of the song from Spotify: ") + songInfo.preview_url);
                    // The album that the song is from
                    console.log(chalk.green("The album: ") + songInfo.album.name);
    ```
   * If no song is provided then your program will default to "The Sign" by Ace of Base.
![Image of spot](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/spot.PNG)
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
![Image of song](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/song.PNG)

3. `node liri.js movie-this '<movie name here>'`
   * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
     ```
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
     ```
![Image of movie1](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/movie1.PNG)

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
![Image of Movie](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/movie.PNG)

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
![Image of say](https://github.com/davidvo1990/LIRI-Bot/blob/master/image/say.PNG)

5. In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
