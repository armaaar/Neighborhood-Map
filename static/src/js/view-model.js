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
}

$(document).ready(function(){
    ko.applyBindings(new viewModel());
});
