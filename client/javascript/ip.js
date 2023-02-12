
$(document).ready(function() {
  $.getJSON("https://api.ipify.org/?format=json", function(e) {
    $('.ip').text(e.ip);
  });
});
