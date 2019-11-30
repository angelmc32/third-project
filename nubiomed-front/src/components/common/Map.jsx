import React, { useState } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import mapboxgl from 'mapbox-gl';
import MapboxDirections from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';


const mapboxTOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = ({ width = '60vw', height = '60vh' }) => {

  const [viewport, setViewport] = useState({
    width: width,
    height: height,
    lat: 0,
    lng: 0,
    zoom: 2
  });

  const [searchLayer, setSearchLayer] = useState(null);

  let mapRef = React.createRef();

  const _onViewportChange = (viewport) => setViewport({...viewport, transitionDuration: 1000 });

  const onGeocoderViewportChange = (viewport) => {

    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return _onViewportChange({...viewport, ...geocoderDefaultOverrides});

  }

  const handleSearch = (event) => {

    searchLayer = new GeoJsonLayer({
      id: "search-result",
      data: event.result.geometry,
      getFillColor: [255, 0, 0, 128],
      getRadius: 1000,
      pointRadiusMinPixels: 10,
      pointRadiusMaxPixels: 10
    });

    setSearchLayer(searchLayer);

  }

  return (
    <div style={{ margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>
        Use the search bar to find a location or click <a href="/">here</a> to find your location
      </h1>
      <MapGL 
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={mapboxTOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />

        <Geocoder 
          mapRef={mapRef}
          onResult={handleSearch}
          onViewportChange={onGeocoderViewportChange}
          mapboxApiAccessToken={mapboxTOKEN}
          position='top-left'
        />
      </MapGL>
      <DeckGL {...viewport} layers={[searchLayer]} />
    </div>
  )

  /*
  const mapContainer = useRef(null);

  const styles = {
    width: width,
    height: height,
    position: 'absolute'
  };
  
  useEffect( () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxtYzMyIiwiYSI6ImNrMThrNDJ3YjAwMTYzZG84ZjRmeHV5bzgifQ.sb4-T3JiHGqP5S1Dz0pl_A'

    const initializeMap = ({ setMap, mapContainer }) => {

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0, 0],
        zoom: 5
      });

      map.on( 'load', () => {
        setMap(map);
        map.resize();
      });

      map.addControl(new mapboxgl.NavigationControl())
      
      
      map.addControl(new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }), 'top-left')
      

    };

    if ( !map ) initializeMap({ setMap, mapContainer });

    map.on( 'move', () => {
      setMap(map);
      //map.resize();
    });
    
  }, [map]);

  console.log(map);

  
  
  return <div ref={el => (mapContainer.current = el)} style={styles} />;

  */


};

export default Map;