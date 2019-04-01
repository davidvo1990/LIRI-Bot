require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// `node liri.js concert-this <artist/band name here>`

// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"




















// `node liri.js spotify-this-song '<song name here>'`
// `node liri.js movie-this '<movie name here>'`
// `node liri.js do-what-it-says`