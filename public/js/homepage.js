
function changePageTitle(locationName) {
    // Get the location object from locations.js based on locationName
    const location = window.locationData.find(loc => loc.pageTitle === locationName);
    
    // Set the pageTitle in restaurant.html based on the location object
    if (location) {
        // Open restaurant.html in a new window
        const restaurantWindow = window.open('restaurant.html');
        
        // Wait for the restaurant.html window to load
        restaurantWindow.onload = function() {
            // Update the pageTitle element in restaurant.html with the new title
            const pageTitleElement = restaurantWindow.document.getElementById('pageTitle');
            if (pageTitleElement) {
                pageTitleElement.innerHTML = `<img src="graphics/pin.png" height="40px"> ${location.pageTitle}`.toUpperCase();;
            }
        };
    } else {
        console.error(`Location with pageTitle "${locationName}" not found in locations.js`);
    }
}