var shownPlaces = places;
for (var i = 0; i < shownPlaces.length; i++) {
    shownPlaces[i].isVisible = ko.observable(true);
}
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
            // Searching for the place
            for (var i = 0; i < shownPlaces.length; i++) {
                if (places[i].title.toLowerCase().indexOf(search) != -1) {
                    shownPlaces[i].isVisible(true);
                    self.shownPlaces()[i].isVisible(true);
                } else {
                    shownPlaces[i].isVisible(false);
                    self.shownPlaces()[i].isVisible(false);
                }
            }
            // update markers
            refreshMarkersVisibility();
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
