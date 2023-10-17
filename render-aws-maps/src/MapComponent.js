import React, { useEffect } from "react";
import maplibregl from "maplibre-gl";

const MapComponent = () => {
  useEffect(() => {
    //.paris test
    const latitude = 48.8566;
    const longitude = 2.3522;
    const apiKey = "awsmapssecretkey HERE";
    const mapName = "arjun-dev";
    const region = "ap-south-1";
    const map = new maplibregl.Map({
      container: "map",
      style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
      center: [longitude, latitude],
      zoom: 13,
    });
    return () => map.remove();
  }, []);
  return <div id="map" style={{ height: "400px" }}></div>;
};

export default MapComponent;
