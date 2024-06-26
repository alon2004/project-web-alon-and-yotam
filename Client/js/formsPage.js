function initMap() {
    const options = {
        zoom: 8,
        center: {lat: 32.28971894713777, lng: 34.850046204500295} // Sdeort HaAgamim 11, Netanya coordinates
    };
    let map = new google.maps.Map(document.getElementById('map'), options);
        // Add a marker at Sdeort HaAgamim 11
        const marker = new google.maps.Marker({
            position: {lat: 32.3107, lng: 34.8560}, // Sdeort HaAgamim 11 coordinates
            map: map,
            title: 'Sdeort HaAgamim 11, Netanya'
        });
    
}


initMap();




window.onload = () => {
    // Fetch data from the API and display it
    const fetchPetsData = async () => { // Added function to fetch data from API
        try {
            const response = await fetch('/api/pets'); // Updated API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPetsData(data); // Call function to display data
        } catch (error) {
            console.error('Error fetching pets data:', error);
        }
    };

    // Function to display data in the HTML
    const displayPetsData = (data) => { // Added function to display data
        const petsContainer = document.getElementById('pets-container');
        petsContainer.innerHTML = '';
        data.forEach(pet => {
            const petElement = document.createElement('div');
            petElement.innerHTML = `
                <h3>${pet.User_Name}</h3>
                <p>City: ${pet.city}</p>
                <p>Category: ${pet.category}</p>
                <p>Date: ${new Date(pet.Date).toLocaleString()}</p>
                <p>Address: ${pet.address}</p>
                <img src="${pet.userImage}" alt="${pet.User_Name}">
            `;
            petsContainer.appendChild(petElement);
        });
    };

    fetchPetsData(); // Call fetch function on load

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj)
            });

            if (response.ok) {
                fetchPetsData(); // Refresh data
            } else {
                console.error('Error creating report');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    document.getElementById('lost-report-form').onsubmit = handleFormSubmit;
};
