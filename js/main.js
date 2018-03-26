let audio;

// Hide Pause button
$('#pause').hide();

// Initialize Audio
initAudio($('#playlist li:first-child'));

// Initialize function
function initAudio(e) {
  var song = e.attr('song');
  var title = e.text();
  var cover = e.attr('cover');
  var artist = e.attr('artist');

  // Create Audio Object
  audio = new Audio('media/' + song);

  if(!audio.currentTime) {
    $('#duration').html('0:00');
  }

  $('#audio-player .title').text(title);
  $('#audio-player .artist').text(artist);

  // Insert cover
  $('img.cover').attr('src', 'img/cover/' + cover);

  $('#playlist li').removeClass('active');
  e.addClass('active');
}

// Play Button
$('#play').click( function(){
  audio.play();
  $('#play').hide();
  $('#pause').show();
  $('#duration').fadeIn(400);
  showDuration();
});

// Pause Button
$('#pause').click( function(){
  audio.pause();
  $('#pause').hide();
  $('#play').show();
});

// Stop Button
$('#stop').click( function() {
  audio.pause();
  audio.currentTime = 0;
  $('#pause').hide();
  $('#play').show();
  $('#duration').fadeOut(400);
});

// Next Button
$('#next').click(function() {
  audio.pause();
  let next = $('#playlist li.active').next();
  if(next.length == 0) {
    next = $('#playlist li:first-child');
  }
  initAudio(next);
  audio.play();
  showDuration();
});

// Previous Button
$('#prev').click(function() {
  audio.pause();
  let prev = $('#playlist li.active').prev();
  if(prev.length == 0) {
    prev = $('#playlist li:last-child');
  }
  initAudio(prev);
  audio.play();
  showDuration();
});

// Volume Control
$('#volume').change(function() {
  audio.volume = parseFloat(this.value / 10);
});

// Duration
function showDuration() {
  $(audio).bind('timeupdate', function() {

    // Get Hours and Minutes
    let s = parseInt(audio.currentTime % 60);
    let m = parseInt((audio.currentTime / 60) % 60);

    // Add 0 if less than 10
    if(s < 10) {
      s = '0' + s;
    }
    $('#duration').html(m + ':' + s);

    let value = 0;
    if(audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    $('#progress').css('width', value + '%');

  });
}
