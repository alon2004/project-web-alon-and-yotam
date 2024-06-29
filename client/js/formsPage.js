
window.onload = () => {
    initMap();

}
let map;
let marker;

// Initialize the map
function initMap() {
    const options = {
        zoom: 8,
        center: { lat: 32.28971894713777, lng: 34.850046204500295 } // Initial center at Sdeort HaAgamim 11, Netanya coordinates
    };

    // Create a new map instance
    map = new google.maps.Map(document.getElementById('map'), options);

    // Add click event listener to the map
    map.addListener('click', function (event) {
        placeMarker(event.latLng); // Call placeMarker function when map is clicked
        reverseGeocode(event.latLng); // Call reverseGeocode function to get address
    });
}

// Function to place a marker at a specific location
function placeMarker(location) {
    // Remove existing marker if it exists
    if (marker) {
        marker.setMap(null); // Remove the marker from the map
    }

    // Create a new marker at the clicked location
    marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Flag Title' // Optional: Add a title to the marker
    });

    // Optional: You can add additional functionality here, such as displaying an info window or saving the marker location
}

// Function to perform reverse geocoding
function reverseGeocode(location) {
    // Create a geocoder object
    const geocoder = new google.maps.Geocoder();

    // Make a geocoding request
    geocoder.geocode({ location: location }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                const address = results[0].formatted_address;
                console.log('Reverse Geocoded Address:', address);

                // Optionally, you can send the address to your database or display it on your page
                // Example: Send address to database via AJAX request
                sendToDatabase(address);
            } else {
                console.error('No results found');
            }
        } else {
            console.error('Geocoder failed due to:', status);
        }
    });
}





async function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    console.log('Form submission initiated'); // Log form submission start

    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Validate form fields
    const petNameElement = document.getElementById('pet-name');
    const petChipElement = document.getElementById('pet-chip-num');
    const cityElement = document.getElementById('city');
    const addressElement = document.getElementById('last-seen-address');
    const flagLocationElement = document.getElementById('flag-location');
    const moreInformationElement = document.getElementById('more-information');
    const photosElement = document.getElementById('photos');

    if (!petNameElement || !petChipElement || !cityElement || !addressElement || !flagLocationElement || !moreInformationElement || !photosElement) {
        console.error('One or more form elements are missing in the DOM');
        return false;
    }

    // Gather checked values for pet behavior
    const petBehavior = Array.from(document.querySelectorAll('input[name="pet_behavior"]:checked')).map(cb => cb.value).join(',');

    if (!petBehavior) {
        isValid = false;
        alert('Please select at least one pet behavior');
    }

    const petName = petNameElement.value.trim();
    const petChip = petChipElement.value.trim();
    const city = cityElement.value.trim();
    const address = addressElement.value.trim();
    const flagLocation = flagLocationElement.value.trim();
    const moreInformation = moreInformationElement.value.trim();
    const photos = Array.from(photosElement.files).map(file => file.name).join(',');

    // Validate Pet Name
    if (!petName) {
        document.getElementById('pet-name-error').textContent = 'Pet Name is required';
        isValid = false;
    }

    // Validate Pet Chip Number
    if (!petChip) {
        document.getElementById('pet-chip-num-error').textContent = 'Pet Chip Number is required';
        isValid = false;
    }

    // Validate Photos (at least 1 photo required)
    if (photos.length < 1) {
        document.getElementById('photos-error').textContent = 'At least one photo is required';
        isValid = false;
    }

    // Validate City
    if (!city) {
        document.getElementById('city-error').textContent = 'City is required';
        isValid = false;
    }

    // Validate Last Seen Address
    if (!address) {
        document.getElementById('last-seen-address-error').textContent = 'Last Seen Address is required';
        isValid = false;
    }

    // Validate Flag Location
    if (!flagLocation) {
        document.getElementById('flag-location-error').textContent = 'Flag Location is required';
        isValid = false;
    }

    // Validate More Information
    if (!moreInformation) {
        document.getElementById('more-information-error').textContent = 'More Information is required';
        isValid = false;
    }

    if (isValid) {

        const data = {
            pet_name: petName,
            pet_chip_number: petChip,
            pet_behavior: petBehavior,
            photos: photos,
            city: city,
            last_seen_address: address,
            flag_location: flagLocation,
            more_information: moreInformation,
            unique_id: Date.now() // Add a unique identifier
        };

        console.log("Data to be sent:", data); // Log the data being sent

        try {
            const response = await fetch('http://127.0.0.1:8080/api/lostpetform/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
        }
    }

    return false; // Prevent form from submitting the traditional way
}
