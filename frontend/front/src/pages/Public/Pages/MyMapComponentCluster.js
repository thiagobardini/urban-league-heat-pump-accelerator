import React, { useEffect } from "react";
import { MarkerClusterer } from "@react-google-maps/api";

const MyMapComponentCluster = ({ location }) => {
  console.log(location, "center in MyMapComponent");
  const containerStyle = {
    height: "300px",
    width: "500px",
  };

  useEffect(() => {
    if (window.google) {
      // Se a API do Google Maps já estiver carregada
      initMap();
    } else {
      // Se a API do Google Maps ainda não tiver sido carregada
      loadGoogleMapsScript();
    }
  }, [location]);

  const loadGoogleMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCl-R7lSkzQVqb0FwCJE-sDMrQpNqCMVTc&callback=initMap`;
    script.defer = true;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: { lat: location.lat, lng: location.lng },
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const locations = [
      { lat: -31.56391, lng: 147.154312 },
      // ...
      { lat: -43.999792, lng: 170.463352 },
    ];

    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new window.google.maps.Marker({
        position,
        label,
        map,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });

      return marker;
    });

    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
  };

  return (
    <div>
      <div id="map" style={containerStyle}></div>
    </div>
  );
};

export default MyMapComponentCluster;
