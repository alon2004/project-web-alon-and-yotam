function initMap()
{
    const options = {
        zoom: 8,
        center:{lat: 32.28967359860627, lng: -34.850024746828495}

    }
        let map = new google.maps.Map(document.getElementById('map'),options);
}

initMap();