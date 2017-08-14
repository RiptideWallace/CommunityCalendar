jQuery(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: '/search/seeds',
  }).done((activities) => {
    activities.forEach(function(activities) {
      ($("main")
        .append($("<div class='activity-name'>").text(
          activities.name))
        .append($("<div class='activity-start-date'>").text(
          "Start Date - " + activities.start_date))
        .append($("<div class='activity-end-date'>").text(
          "End Date - " + activities.end_date))
        .append($("<div class='activity-price-range'>").text(
          "Cost - " + activities.price_range))
        .append($("<div class='activity-source'>").text(
          activities.source))
        .append($("<a class='event-link' href='event'>").text(
          "Click Here For More Information"))
        .appendTo($("main"))
        )
    })
  })
})
