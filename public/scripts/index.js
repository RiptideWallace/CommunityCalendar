// Stop propagation on mobile touchscreens to allow dropdown links to work
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
