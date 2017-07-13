// viewModel

function viewModel() {
    var self = this;
    self.shownPlaces = ko.observableArray(shownPlaces);

    self.showInfo = function(place, event) {
        /*get current place index*/
        var context = ko.contextFor(event.target);
        var index = context.$index();
        showInfoWindow(markers[index]);
    }

    self.filterPlaces = function() {
        // get search string
        var search = $("input#search").val().toLowerCase();
        // clear shownPlaces object
        shownPlaces = [];
        // Searching for the place
        for (var i = 0; i < places.length; i++) {
            if (places[i].title.toLowerCase().indexOf(search) != -1) {
                shownPlaces.push(places[i]);
            }
        }
        // update observable
        self.shownPlaces(shownPlaces);
        refreshMarkers();
    }

}

$(document).ready(function() {
    ko.applyBindings(new viewModel());
});
