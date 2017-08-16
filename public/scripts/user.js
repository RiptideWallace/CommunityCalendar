jQuery(document).ready(function() {

  var userProfileId = $("#user-profile-id").val();

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/saved-events",
  }).done((activities) => {
    activities.forEach(function(activities) {
      ($("body")
        .append($("<a class='activity-name'>").attr("href", activities.source).text(
          activities.name))
        .append($("<div class='activity-start-date'>").text(
          "Start Date - " + activities.start_date))
        .append($("<div class='activity-end-date'>").text(
          "End Date - " + activities.end_date))
        .append($("<div class='activity-price-range'>").text(
          "Cost - " + activities.price_range))
        .append($("<div class='activity-source'>").text(
          activities.source))
        .appendTo($("body"))
        )
    })
  })

  $.ajax({
    method: 'GET',
    url: "/user/" + userProfileId + "/favourited-places",
  }).done((places) => {
    places.forEach(function(places) {
      ($("body")
        .append($("<div class='place-name'>").text(
          places.name))
        .appendTo($("body"))
        )
    })
  })

})
