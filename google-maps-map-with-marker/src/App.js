import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
function App() {
  const mapDivId = "map";

  useEffect(() => {
    async function initMap() {
      var loader = new Loader({
        apiKey: "", //API KEY HERE
        version: "weekly",
        libraries: ["maps"],
      });
      const mapOptions = {
        center: {
          lat: 33.895847,
          lng: -118.22007,
        },
        zoom: 12,
      };
      loader
        .importLibrary("maps")
        .then(({ Map }) => {
          const map = new Map(document.getElementById(mapDivId), mapOptions);
          new window.google.maps.Marker({
            position: {
              lat: 33.895847,
              lng: -118.22007,
            },
            map: map,
            title: "Marker Title",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    initMap();
  }, []);

  return (
    <div>
      <h1>Google Maps in React</h1>
      <div id={mapDivId} style={{ height: "800px", width: "100%" }} />
    </div>
  );
}

export default App;
