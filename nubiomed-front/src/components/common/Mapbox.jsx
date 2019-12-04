import React, { useEffect, useRef, useState } from 'react';
//import MapGL, { GeolocateControl } from 'react-map-gl';
//import DeckGL, { GeoJsonLayer } from 'deck.gl';
//import Geocoder from "react-map-gl-geocoder";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';


const mapboxTOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ width = '60vw', height = '60vh', form }) => {

  const [map, setMap] = useState(null);

  const mapContainer = useRef(null);

  const styles = {
    width: width,
    height: height,
    position: 'absolute'
  };

  mapboxgl.accessToken = mapboxTOKEN;

  const initializeMap = ({ setMap, mapContainer }) => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [0, 0],
      zoom: 2
    });

    map.on( 'load', () => {
      setMap(map);
      map.resize();
    });

    

    
    map.addControl(geocoder);
    map.addControl(new mapboxgl.NavigationControl())

  };
  
  useEffect( () => {

    if ( !map ) initializeMap({ setMap, mapContainer });

    if ( map ) {

      map.on( 'move', () => { 
      
        setMap(map);
        //console.log(map);
        //map.resize();

      });

    }
  }, [map, form]);

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  });

  geocoder.on("result", res => {
    console.log(res.result)
    const { geometry: { coordinates }, place_name } = res.result

    //form.lng = coordinates[0]
    //form.lat = coordinates[1]
    form.coordinates = coordinates
    form.address = place_name

    console.log(form);
  });
  
  return <div ref={el => (mapContainer.current = el)} style={styles} />;

};

export default Map;