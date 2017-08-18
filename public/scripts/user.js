jQuery(document).ready(function() {

  var userProfileId = $("#user-profile-id").val();

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/saved-events",
  }).done((activities) => {
    activities.forEach(function(activities) {
      ($(".saved-events")
        .append($("<a class='activity-name'>").attr("href", activities.source).text(
          activities.name))
        .append($("<div class='activity-start-date'>").text(
          "Start Date - " + activities.start_date))
        .append($("<div class='activity-end-date'>").text(
          "End Date - " + activities.end_date))
        .append($("<div class='activity-source'>").text(
          activities.source))
        )
    })
  })

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/favourited-places",
  }).done((places) => {
    places.forEach(function(places) {
      ($(".favourited-places")
        .append($("<div class='place-name'>").text(
          places.name))
        )
    })
  })

})
