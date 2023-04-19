const restaurantTemplate = Handlebars.compile(document.getElementById("restaurant-template").innerHTML);
const restaurantContainer = document.getElementById("restaurant-container");

for (const restaurant of restaurants) {
    const restaurantHtml = restaurantTemplate(restaurant);

    // Create a new div element
    const restaurantElement = document.createElement("div");
    // Set the innerHTML of the div element to the generated HTML
    restaurantElement.innerHTML = restaurantHtml;
    // Append the new div element to the restaurant container
    restaurantContainer.appendChild(restaurantElement);

    // Add an event listener to the restaurant container
    restaurantElement.addEventListener("click", function(event) {
        // Prevent the default behavior of the anchor tag for child elements
        if (event.target.tagName !== "A") {
            window.location.href = "review.html"; // Navigate to review.html
        }
    });
}

//FILTER POPUP
var coll = document.getElementsByClassName("filter");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


//ADD A FOOD SPOT POPUP
var coll = document.getElementsByClassName("new-resto");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            content.style.display = "flex";
        }
    });
}

//ADD NEW RESTO
document.getElementById("publish-button").addEventListener("click", async function() {
    // Get the values from the input fields
    const newName = document.querySelector(".newname").value;
    const rating = document.querySelector('input[name="rate"]:checked').id.split("-")[1];
    const price = document.querySelector(".values:nth-of-type(1)").value;
    const waitTime = document.querySelector(".values:nth-of-type(2)").value;
    const cuisine = document.querySelector(".text-review").value;

    // Get the selected image files
    const stallImgFile = document.getElementById("stall-img").files[0];
    const foodImgFile = document.getElementById("food-img").files[0];
    const menuImgFile = document.getElementById("menu-img").files[0];
    const uploadedImgFile = document.getElementById("file-upload").files[0];

    // Create a new FormData object
    const formData = new FormData();

    // Append the values to the form data
    formData.append("name", newName);
    formData.append("rating", rating);
    formData.append("price", price);
    formData.append("waitTime", waitTime);
    formData.append("cuisine", cuisine);
    formData.append("stallImg", stallImgFile);
    formData.append("foodImg", foodImgFile);
    formData.append("menuImg", menuImgFile);
    formData.append("uploadedImg", uploadedImgFile);

    // Send the form data to the server using fetch
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        // Handle the response from the server
        if (response.ok) {
            // File uploaded successfully
            console.log('File uploaded successfully');
        } else {
            // File upload failed
            console.error('File upload failed');
        }
    } catch (error) {
        // Handle any errors that occurred during the file upload
        console.error('Error during file upload:', error);
    }
});

//ONLY ONE ACTIVE FILTER BUTTON
const btnsTip = document.getElementsByClassName('filter-button');
let activeBtn = null;

for (let i = 0; i < btnsTip.length; i++) {
    btnsTip[i].addEventListener("click", (e) => {
        if (activeBtn !== null && activeBtn !== e.currentTarget) {
            activeBtn.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        activeBtn = e.currentTarget;
    });
}

//SEARCH
// Add an event listener to the search button
// Add an event listener to the search button
document.getElementById("search-button").addEventListener("click", function () {
    filterSelection('search');
});



//FILTERING
function filterSelection(filterType) {
    var restaurants = document.getElementsByClassName("restaurant-container");

    // Convert the HTMLCollection to an array to make sorting easier
    var restaurantsArray = Array.from(restaurants);

    if (filterType === "time") {
        restaurantsArray.sort(function (a, b) {
            // Get the wait time value from each restaurant element
            var waitTimeA = parseInt(a.getElementsByClassName("wait_time_amount")[0].innerText);
            var waitTimeB = parseInt(b.getElementsByClassName("wait_time_amount")[0].innerText);

            // Compare the wait time values and return a value for sorting
            // If waitTimeA is lower, return -1 to place it before waitTimeB
            // If waitTimeB is lower, return 1 to place it before waitTimeA
            // If wait times are equal, return 0 to maintain their relative order
            if (waitTimeA < waitTimeB) {
                return -1;
            } else if (waitTimeA > waitTimeB) {
                return 1;
            } else {
                return 0;
            }
        });

        // Append the sorted restaurant elements back to the parent container
        var filterContainer = document.getElementsByClassName("all-restaurants")[0];
        for (var i = 0; i < restaurantsArray.length; i++) {
            filterContainer.appendChild(restaurantsArray[i]);
        }
    }
    else if (filterType === "price") {
        restaurantsArray.sort(function (a, b) {
            // Get the price strings from each restaurant element
            var priceA = a.getElementsByClassName("price")[0].innerText;
            var priceB = b.getElementsByClassName("price")[0].innerText;

            // Extract the numeric values from the price strings
            var numericPriceA = parseFloat(priceA.replace(/[^0-9.]/g, ''));
            var numericPriceB = parseFloat(priceB.replace(/[^0-9.]/g, ''));

            // Count the number of occurrences of '₱' in each price string
            var countA = priceA.match(/₱/g) ? priceA.match(/₱/g).length : 0;
            var countB = priceB.match(/₱/g) ? priceB.match(/₱/g).length : 0;

            // Compare the count of '₱' occurrences and return a value for sorting
            // If countA is lower, return -1 to place it before countB
            // If countB is lower, return 1 to place it before countA
            // If counts are equal, compare the numeric values of price strings
            if (countA < countB) {
                return -1;
            } else if (countA > countB) {
                return 1;
            } else {
                return numericPriceA - numericPriceB;
            }
        });




        // Append the sorted restaurant elements back to the parent container
        var filterContainer = document.getElementsByClassName("all-restaurants")[0];
        for (var i = 0; i < restaurantsArray.length; i++) {
            filterContainer.appendChild(restaurantsArray[i]);
        }
    } else if (filterType === "rating") {
        // Sort by rating
        restaurantsArray.sort(function (a, b) {
            // Get the rating value from each restaurant element and extract only the numerical value
            var ratingA = parseFloat(a.getElementsByClassName("rating")[0].innerText.match(/\d+(?:\.\d+)?/)[0]);
            var ratingB = parseFloat(b.getElementsByClassName("rating")[0].innerText.match(/\d+(?:\.\d+)?/)[0]);

            // Compare the rating values and return a value for sorting
            // If ratingA is lower, return 1 to place it before ratingB
            // If ratingB is lower, return -1 to place it before ratingA
            // If ratings are equal, return 0 to maintain their relative order
            if (ratingA < ratingB) {
                return 1;
            } else if (ratingA > ratingB) {
                return -1;
            } else {
                return 0;
            }
        });
    }


    // Append the sorted restaurant elements back to the parent container
    var filterContainer = document.getElementsByClassName("all-restaurants")[0];
    for (var i = 0; i < restaurantsArray.length; i++) {
        filterContainer.appendChild(restaurantsArray[i]);
    }
}

//SEARCH
document.getElementById('search-button').addEventListener('click', filterRestaurants);

function filterRestaurants() {
    var input, filter, restaurants, restaurantContainer, name, rating, price, cuisine, i;
    input = document.getElementsByClassName('search')[0];
    filter = input.value.toUpperCase();
    restaurants = document.getElementsByClassName('restaurant-container');

    for (i = 0; i < restaurants.length; i++) {
        restaurantContainer = restaurants[i];
        name = restaurantContainer.getElementsByClassName('name')[0].innerText.toUpperCase();
        rating = restaurantContainer.getElementsByClassName('rating')[0].innerText.toUpperCase();
        price = restaurantContainer.getElementsByClassName('price')[0].innerText.toUpperCase();
        cuisine = restaurantContainer.getElementsByClassName('cuisine')[0].innerText.toUpperCase();

        if (name.indexOf(filter) > -1 || rating.indexOf(filter) > -1 || price.indexOf(filter) > -1 || cuisine.indexOf(filter) > -1) {
            restaurantContainer.style.display = '';
        } else {
            restaurantContainer.style.display = 'none';
        }
    }
}
