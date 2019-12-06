var musics = [
  { name: "十年", url: "musics/十年.mp3" },
  { name: "K歌之王", url: "musics/K歌之王.mp3" },
  { name: "兄妹", url: "musics/兄妹.mp3" },
  { name: "好就不見", url: "musics/好久不見.mp3" },
  { name: "我們都寂寞", url: "musics/我們都寂寞.mp3" }];
var index = 0;


//like & shuffle button
$('.heart').click(function () {
  $(this).toggleClass('clicked');
});

$('.shuffle').click(function () {
  $(this).toggleClass('clicked');
});

//show info box on hover
$('#player').hover(function () {
  $('.info').toggleClass('up');
});

//music player settings

var audio = new Audio();
audio.volume=0.5;

let timecurrent = $('.time--current');
let timetotal = $('.time--total');
let fill = $('.fill');
let bar = $('.progress-bar');
let fillTotal = bar.width();
let m;
$('.pause').hide(); //hide pause button until clicked

//play button
$('.play').click(function () {
  $('.play').hide();
  $('.pause').show();
  audio.setAttribute('src', musics[index]['url']);
  audio.play();
  $('.song-name').text(`${musics[index]['name']}`)



});

//pause button
$('.pause').click(function () {  
  $('.play').show();
  $('.pause').hide();
  
  audio.pause();
});
$('.next').click(function(){
  if($('.shuffle').hasClass('clicked')){
    index+=parseInt(Math.random()*4)
  }else{index++;}
  
  if(index>=musics.length){
    index=0;
  }
 

  audio.setAttribute('src', musics[index]['url']);
  audio.play();
  $('.song-name').text(`${musics[index]['name']}`)
})

$('.previous').click(function(){
  if($('.shuffle').hasClass('clicked')){
    index-=parseInt(Math.random()*4)
  }else{index--;}
  if(index<0){
    index=musics.length-1;
  }
  
  audio.setAttribute('src', musics[index]['url']);
  audio.play();
  $('.song-name').text(`${musics[index]['name']}`)
})

audio.addEventListener('loadedmetadata',function() {//loademetadata等歌曲資訊載入之後
  //console.log(audio.duration)
  m = formatTime(audio.duration);
});


audio.addEventListener("timeupdate", function () {           

  timetotal.text(m)
  timecurrent.text(formatTime(audio.currentTime)) 

}, false);


  audio.addEventListener("ended", function(){
  index++;
  if(index>=musics.length){
    index=0;
  }
 

  audio.setAttribute('src', musics[index]['url']);
  audio.play();
  $('.song-name').text(`${musics[index]['name']}`)
}, false);


function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  var seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}