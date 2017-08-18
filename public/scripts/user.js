jQuery(document).ready(function() {

  var userProfileId = $("#user-profile-id").val();

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/saved-events",
  }).done((activities) => {
    activities.forEach(function(activity) {
      ($(".saved-events")
        .append($("<a class='activity-name'>").attr("href", "/BC/" + activity.region_slug + "/" + activity.place_slug + "/" + activity.activity_slug ).text(
          activity.activity_name))
        .append($("<div class='activity-start-date'>").text(
          "Start Date - " + activity.activity_start_date))
        .append($("<div class='activity-end-date'>").text(
          "End Date - " + activity.activity_end_date))
        .append($("<div class='activity-source'>").text(
          activity.activity_source))
        )
    })
  })

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/favourited-places",
  }).done((places) => {
    places.forEach(function(place) {

      ($(".favourited-places")
        .append($("<a class='place-name'>").attr("href", "/BC/" + place.region_slug + "/" + place.place_slug).text(
          place.place_name))
      )
  });

  })
})
