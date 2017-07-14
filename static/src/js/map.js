var map;
var markers = [];
var infoWindow;
var infoWindowTemplate = "\
<h4>{title}</h4> \
<hr /> \
<h6>Related Wikipedia articles:</h6> \
<div>{wikipedia}</div>";

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
    removeMarkers();

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
    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds);
    });
}
// This function will loop through the listings and hide them all.
function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function refreshMarkersVisibility() {
    // close infowindow
    infoWindow.close();
    infoWindow.marker = null;
    // get bounds to readjust
    var bounds = new google.maps.LatLngBounds();
    // set markers visibility
    for (var i = 0; i < shownPlaces.length; i++) {
        markers[i].setVisible(Boolean(shownPlaces[i].isVisible()));
        if (markers[i].getVisible()) {
            bounds.extend(markers[i].getPosition());
        }
        // Bounce
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }

    // stop bouncing
    setTimeout(function() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setAnimation(null);
        }
    }, 750);
    // Adjust map bounds
    map.fitBounds(bounds);
}

function showInfoWindow(marker) {
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;

        // Show loading icon till wikipedia loads
        setInfoWindowTemplate(marker.title, '<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>');
        // Async Search wikipedia to get results of the place
        setWikiInfoWindow(marker);
        // Open infowindow
        infoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infoWindow.addListener('closeclick', function() {
            infoWindow.marker = null;
        });
        // Bounce once when clicked
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 750);
    }
}

function setWikiInfoWindow(marker) {
    // Async Search wikipedia to get results of the place
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response) {
            var articleList = response[1];
            var htmlList;
            if (articleList.length > 1) {
                htmlList = "<ul>";
                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    htmlList += '<li><a href="' + url + '" target="_blank">' + articleStr + '</a></li>';
                };
                htmlList += "</ul>";
            } else {
                htmlList = "There is no Wikipedia articles for this place."
            }

            setInfoWindowTemplate(marker.title, htmlList);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            setInfoWindowTemplate(marker.title, "Failed to get resources.");
        }
    });
}

function setInfoWindowTemplate(title, wikipedia) {
    var infoWindowContent = infoWindowTemplate;
    infoWindowContent = infoWindowContent.replace('{title}', title);
    infoWindowContent = infoWindowContent.replace('{wikipedia}', wikipedia);
    infoWindow.setContent(infoWindowContent);
}
