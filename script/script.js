//pull html buttons
var playBtn = document.getElementById("playBtn");
var pauseBtn = document.getElementById("pauseBtn");

var index = 0;



SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

SC.get("/tracks/316493713").then(function(response) {
  console.log(response);

  var art = response.artwork_url;
  var maker = response.user.permalink;
  var link = response.user.permalink_url;
  var t = response.title;
  var songInfo = response.description;
  var release = "Release: " + response.created_at;
  var genre = "Genre: " + response.genre;
  
  

  // HTML elements stored in variables
  var artwork = document.getElementById("artwork");
  var artworkurl = document.getElementById("artworkUrl")
  var artist = document.getElementById("artist");
  var trackName = document.getElementById("songname");
  var info = document.getElementById("info");
  var rel = document.getElementById("rel");
  var gen = document.getElementById("gen");
  

  artwork.src = art;
  artworkurl.href = link;
  artist.textContent = maker;
  songname.textContent = t;
  info.textContent = songInfo;
  rel.textContent = release;
  gen.textContent = genre;

});
// counter
var index = 0;

//Jukebox object constructor function: Jukebox object structure & methods
function Jukebox() {
  this.music = [];
  this.stream = SC.stream("/tracks/316493713");
}

//addSong method adds MP3s to Jukebox object
Jukebox.prototype.addTrack = function(songs) {
  this.music.push(songs);
}

//instantiation: jukebox object created, songs pushed into jukebox array
var jukebox = new Jukebox();

// adding tracks to new jukebox
jukebox.addTrack("/tracks/316493713");

// Jukebox object methods
Jukebox.prototype.play = function() {
  this.stream.then(function(player){
    player.play();
    // player.on("finish", function() {
    //   index++
    //   player.play();
    // })
  });
}

Jukebox.prototype.pause = function() {
  this.stream.then(function(player){
    player.pause();
  });
}



//add event listeners to the the buttons I pulled earlier.
playBtn.addEventListener("click", function(event) {
 event.preventDefault();
 jukebox.play();
})

pauseBtn.addEventListener("click", function(event) {
 event.preventDefault();
 jukebox.pause();
})

