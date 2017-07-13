$(document).ready(function() {

    // Toggle Sidebar
    $("#sidebar-toggle").click(function() {
        $("#wrapper").toggleClass("toggled");
    });

    // Press search button when press Enter on input
    $('input#search').keyup(function(e) {
        if (e.keyCode == 13) // Pressed Enter
        {
            $("#search-btn").click();
        }
    });
});
