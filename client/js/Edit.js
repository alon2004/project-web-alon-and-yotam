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
    const moreInformationElement = document.getElementById('more-information');

    if (!petNameElement || !petChipElement || !cityElement || !addressElement || !moreInformationElement) {
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
    const moreInformation = moreInformationElement.value.trim();

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

    // Validate More Information
    if (!moreInformation) {
        document.getElementById('more-information-error').textContent = 'More Information is required';
        isValid = false;
    }

    if (isValid) {
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const data = {
            pet_name: petName,
            pet_chip_number: petChip,
            pet_behavior: petBehavior,
            city: city,
            last_seen_address: address,
            more_information: moreInformation,
            unique_id: Date.now() // Add a unique identifier
        };

        console.log("Data to be sent:", data); // Log the data being sent
        const reportid=new URLSearchParams(window.location.search).get('reportId');

        try {
            const response = await fetch(`http://127.0.0.1:8080/api/pets/${reportid}`, {
                method: 'PUT',
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
