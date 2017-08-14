jQuery(document).ready(function() {
  var activityId = $("#activity-id").val();
})

function initMap() {
  var victoria = {
    lat: 48.4284,
    lng: -123.3656
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: victoria
  });
}



