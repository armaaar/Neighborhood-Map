var map;
var markers = [];
var infoWindow;

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        mapTypeControl: false
    });
    infoWindow = new google.maps.InfoWindow();
    refreshMarkers();
}

function refreshMarkers() {
    hideMarkers();

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < shownPlaces.length; i++) {
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: shownPlaces[i].location,
            title: shownPlaces[i].title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            showInfoWindow(this);
        });

        // Extend the boundaries of the map for each marker and display the marker
        marker.setMap(map);
        bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function showInfoWindow(marker) {
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');
        infoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infoWindow.addListener('closeclick', function() {
            infoWindow.marker = null;
        });
        // Bounce once when clicked
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){
            marker.setAnimation(null);
        }, 750);
    }
}

// Load gmaps
$.getScript("http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBTuuVQJpSapovC0alJNf8WrW6gcrVUIbs&v=3&callback=initMap")
    .fail(function(jqxhr, settings, exception) {
        alert("Couldn't load the map. Please reload the page.")
    })
