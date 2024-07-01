window.onload = () => {
    addListeners();
    fetch("https://project-web-alon-and-yotam.onrender.com/api/pets/innerJoinUsers")
        .then(response => response.json())
        .then(data => initEditPageWithReport(data));
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
    const nowDate = new Date();

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

        const data = {
            pet_name: petName,
            pet_chip_number: petChip,
            pet_behavior: petBehavior,
            city: city,
            last_seen_address: address,
            more_information: moreInformation,
            date: nowDate,
            unique_id: Date.now() // Add a unique identifier
        };

        console.log("Data to be sent:", data); // Log the data being sent
        const reportid = new URLSearchParams(window.location.search).get('reportId');

        try {
            const response = await fetch(`https://project-web-alon-and-yotam.onrender.com/api/pets/${reportid}`, {
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
            window.location.href = "../client/index.html";
        } catch (error) {
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
        }
    }

    return false; // Prevent form from submitting the traditional way
}


function addListeners() {
    let addReport = document.getElementById("addReport");
    addReport.addEventListener("click", () => {
        window.location.href = "../client/reportType.html";
    });
    let mapButton = document.getElementById("homeMap");
    mapButton.addEventListener("click", () => {
        window.location.href = "../client/index.html"
    });
    let scanButton = document.getElementById("scanPet");
    scanButton.addEventListener("click", () => {
        window.location.href = "#";
    });
}

function initEditPageWithReport(data) {
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get("reportId");
    const userId = params.get("userId");
    const report = data.find((report) => report.id == myParam);
    if (report) {
        let inputPetName = document.getElementById("pet-name");
        let inputPetChip = document.getElementById("pet-chip-num");
        let inputCity = document.getElementById("city");
        let inputAddress = document.getElementById("last-seen-address");
        let inputMoreInformation = document.getElementById("more-information");
        let InputBarking = document.getElementById("barking");
        let InputBiting = document.getElementById("biting");
        let InputAfraid = document.getElementById("afraid");
        inputPetName.value = report.pet_name;
        inputPetChip.value = report.pet_chip_number;
        inputCity.value = report.city;
        inputAddress.value = report.last_seen_address;
        inputMoreInformation.value = report.more_information;
        if (report.pet_behavior.includes("barking")) {
            InputBarking.checked = true;
        }
        if (report.pet_behavior.includes("biting")) {
            InputBiting.checked = true;
        }
        if (report.pet_behavior.includes("afraid")) {
            InputAfraid.checked = true;
        }
        
    }

}
