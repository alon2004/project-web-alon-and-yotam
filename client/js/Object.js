document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-image');
    
    carouselImages.forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('zoomed');
        });
    });
    initMap();
    fetch("http://127.0.0.1:8080/api/pets/innerJoinUsers")
        .then((response) => response.json())
        .then((data) => initReportPage(data));

    addListeners();
});

function addListeners() {
    let addReport = document.getElementById("addReport");
    addReport.addEventListener("click", () => {
        window.location.href = "../client/forms.html";
    });
    let mapButton = document.getElementById("homeMap");
    mapButton.addEventListener("click", () => {
        window.location.href = "../client/index.html";
    });
    let scanButton = document.getElementById("scanPet");
    scanButton.addEventListener("click", () => {
        window.location.href = "#";
    });
}

// Map initialization
let map;
let markers = [];
async function initMap() {
    const position = { lat: 32.4764688287259, lng: 34.97601741898383 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    map = new Map(document.getElementById("map-object"), {
        zoom: 17,
        center: position,
        mapId: 'fa16877c291d0875',
    });
}

function initReportPage(data) {
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get("reportId");
    const userId = params.get("userId");
    console.log(myParam);
    const report = data.find((report) => report.id == myParam);
    if (report) {
        if (userId == report.user_id) {
            document.getElementById("Edit").style.display = "block";
            document.getElementById("EditButton").addEventListener("click", () => {
                window.location.href = `../client/Edit.html?reportId=${report.id}`;
            });
        }
        document.getElementById("PetNameP").innerText = report.pet_name;
        document.getElementById("LastSeenP").innerText = report.last_seen_address + ", " + report.city;
        let BarkingIcon = document.getElementById("Barking");
        let BitingIcon = document.getElementById("Biting");
        let AfraidIcon = document.getElementById("Afraid");
        let barking = report.pet_behavior.split(",")[0];
        let biting = report.pet_behavior.split(",")[1];
        let afraid = report.pet_behavior.split(",")[2];

        if (barking == "barking") {
            BarkingIcon.style.backgroundImage = "url('http://localhost:8080/imges/vIcon.png')";
        } else {
            BarkingIcon.style.backgroundImage = "url('http://localhost:8080/imges/xIcon.png')";
        }
        if (biting == "biting") {
            BitingIcon.style.backgroundImage = "url('http://localhost:8080/imges/vIcon.png')";
        } else {
            BitingIcon.style.backgroundImage = "url('http://localhost:8080/imges/xIcon.png')";
        }
        if (afraid == "afraid") {
            AfraidIcon.style.backgroundImage = "url('http://localhost:8080/imges/vIcon.png')";
        } else {
            AfraidIcon.style.backgroundImage = "url('http://localhost:8080/imges/xIcon.png')";
        }
        PutMarkerOnMap(report.last_seen_address + ", " + report.city);
    }
}

function PutMarkerOnMap(address) {
    const geocoder = new google.maps.Geocoder(); 
    const iconMap = {
        path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "orange",
        fillOpacity: 0.8,
        strokeWeight: 0,
        rotation: 0,
        scale: 2
    };
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                icon: iconMap,
                animation: google.maps.Animation.DROP,
            });
            map.setCenter(results[0].geometry.location);
            map.setZoom(17);
            markers.push(marker);
        }
    });
}
