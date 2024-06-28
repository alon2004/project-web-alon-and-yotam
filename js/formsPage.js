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
    const fetchPetsData = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/pets');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPetsData(data);
        } catch (error) {
            console.error('Error fetching pets data:', error);
        }
    };

    const displayPetsData = (data) => {
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

    fetchPetsData();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());

        const validations = validateForm(formObj);

        if (validations.isValid) {
            console.log(`Form submitted with data:`, formObj);
        } else {
            console.log(`Validation failed:`, validations.errors);
        }
    };

    const validateForm = (data) => {
        let errors = [];
        let isValid = true;

        if (!data['pet-name']) {
            isValid = false;
            errors.push("Pet name is required.");
        }

        if (!data['pet-chip-num']) {
            isValid = false;
            errors.push("Pet chip number is required.");
        }

        if (!data['city']) {
            isValid = false;
            errors.push("City is required.");
        }

        if (!data['address']) {
            isValid = false;
            errors.push("Address is required.");
        }

        return { isValid, errors };
    };

    document.getElementById('lost-report-form').onsubmit = handleFormSubmit;
};
