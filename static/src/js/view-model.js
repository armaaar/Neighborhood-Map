// viewModel
function ViewModel() {
    var self = this;
    self.shownPlaces = ko.observableArray(shownPlaces);

    this.filterPlaces = ko.pureComputed({
        read: function () {
            return "";
        },
        write: function (value) {
            // get search string
            var search = value.toLowerCase();
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
        },
        owner: this
    });

    self.showInfo = function(place, event) {
        /*get current place index*/
        var context = ko.contextFor(event.target);
        var index = context.$index();
        showInfoWindow(markers[index]);
    }

}

$(document).ready(function() {
    ko.applyBindings(new ViewModel());
});
