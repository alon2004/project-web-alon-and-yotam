



window.onload = () => {

    fetch("http://localhost:8080/api/pets")
        .then((response) => response.json())
        .then((data) => initReportPage(data));

initMap();
  
  
  }
  
  // מפה
  
  let map;
  let markers = [];
  async function initMap() {
    const position = { lat: 32.4764688287259, lng: 34.97601741898383 };
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map-object"), {
      zoom: 17,
      center: position,
      mapId: 'fa16877c291d0875',
    });
    
  
  }

  function initReportPage(data) {
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get('reportId');
    const report = data.find((report) => report.ReportId === myParam);
    if (report) {
        document.getElementById("PetName").getElementsByTagName("p").innerText = report.PetName;
        document.getElementById("LastSeen").getElementsByTagName("p").innerText = report.LastSeen;
        let BarkingIcon=document.getElementById("Barking");
        let BitingIcon=document.getElementById("Biting");
        let AfraidIcon=document.getElementById("Afraid");
        if(report.Barking==1){
            BarkingIcon.style.backgroundImage=url("http://localhost:8080/imges/v.jpg");
        }
        if(report.Biting==1){
            BitingIcon.style.backgroundImage=url("http://localhost:8080/imges/v.jpg");
        }
        if(report.Afraid==1){
            AfraidIcon.style.backgroundImage=url("http://localhost:8080/imges/v.jpg");
        }
        let ClassImges=document.getElementsByClassName("carousel-item")
        for (let i = 0; i < ClassImges.length; i++) {
            ClassImges[i].getElementsByTagName("img") = report.PetImages[i];
        }
        PutMarkerOnMap(report.last_seen_address);
      
    }

}

function PutMarkerOnMap(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: address,
            });
            markers.push(marker);
        }
    });
}
  
  

  
  
    