# Neighborhood Map Project
A map based website for the "Neighborhood Map" Project in [Udacity](https://www.udacity.com).

The website lists some places in NYC. User can filtering places by their names. Wikipedia articles are shown if available for the places selected.

## User Guide
* Download the app via Github.
* Open `index.html` file with your favorite browser.
* Enjoy using the app!

## Developers Guide

### Installing required dependencies
This template uses [Grunt](http://gruntjs.com/), the Javascript Task Runner. To use Grunt with this App, mainly to edit any static file, do the following:

* Install grunt: ```npm install -g grunt-cli```
* In your App directory, run: ```npm install```. This installs Grunt plugins needed to use this App.
* In your App directory, run: ```grunt``` or ```grunt watch``` to start watching static files for changes.

### Add your own places
To add a place, the following data is required :
- Place Title
- Place Location: latitude and longitude

if any of these data are missing, the app won't work correctly.

Places are added to the `places` object in `statc/src/js/model.js` file with the following structure :
```
{
    title: 'Example place',
    location: {
        lat: 40.7444883,
        lng: -73.9949465
    }
}
```
#### Static places Vs. Dynamic places
All places served by this app is hardcoded in the `statc/src/js/model.js`. To dynamically load places, create your own `places` object with the minimum required information from your data source using the method you prefer.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
