import React from 'react';
import GoogleMapReact from 'google-map-react';
import markericon from "../assets/marker.png"

const APIKEY = "AIzaSyD5nj76yf6UkARehcTNWkpGPJtfgwYqOCU"

// Custom Marker component
const Marker = ({ text }) => (
  <div style={{ color: 'red', fontWeight: 'bold' }}>
    <img className='w-8' src={markericon} alt="" />
  </div>
);

function MapContainer({height}) {
  // const defaultProps = {
  //   center: {
  //     lat: 37.7749, // Latitude of your center point
  //     lng: -122.4194, // Longitude of your center point
  //   },
  //   zoom: 14,
  // };
  // const makerProps = {
  //   center: {
  //     lat: LocationMarker.lat, // Latitude of your center point
  //     lng: LocationMarker.lng, // Longitude of your center point
  //   },
  //   zoom: 14,
  // };

  const defaultProps = {
    center: {
      lat: 37.7749, // Latitude of your center point
      lng: -122.4194, // Longitude of your center point
    },
    zoom: 14,
  };
  const makerProps = {
    center: {
      lat: 37.7749, // Latitude of your center point
      lng: -122.4194, // Longitude of your center point
    },
    zoom: 14,
  };

  return (
    <div className="map-container" style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIKEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={makerProps.center}
        draggable={true}
      >
        {/* Add a Marker component at the specified location */}
        <Marker
          lat= {37.7749}
          lng= {-122.4194}
          text={"BridgeView"}
        />
      </GoogleMapReact>
    </div>
  );
}

export default MapContainer;
