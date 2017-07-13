// model
var places = [
    {
        title : "Place1",
    },
    {
        title : "Place2",
    },
    {
        title : "Place3",
    },
];

// viewModel

function viewModel() {
    var self = this;
    self.places = ko.observableArray([
        {
            title : "Place1",
        },
        {
            title : "Place2",
        },
        {
            title : "Place3",
        },
    ]);

}
$(document).ready(function(){
    ko.applyBindings(new viewModel());
});
