function initMap() {
    const options = {
        zoom: 8,
        center: {lat: 32.28971894713777, lng: 34.850046204500295} // Sdeort HaAgamim 11, Netanya coordinates
    };
    let map = new google.maps.Map(document.getElementById('map'), options);
}


initMap();

32.28971894713777, 34.850046204500295