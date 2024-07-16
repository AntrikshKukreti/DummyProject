import Geolocation from '@react-native-community/geolocation';
import React, {useState, useMemo, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

type Props = {};

type locationProp = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const MapScreen = (props: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>();

  useEffect(() => {
    // if required only current location

    // const interval = setInterval(() => {
    //   Geolocation.getCurrentPosition(info => setCurrentLocation(info));
    // }, 5000);

    // if required your coordinated dynamically when it changes in every 5 sec.
    const watchingLocation = Geolocation.watchPosition(
      info => {
        setCurrentLocation(info);
        console.log(info, ' INFORMATION');
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0, // Update whenever the position changes
        interval: 5000, // Update every 5 seconds
      },
    );

    // chearing the watchPosition dynamic call when screen is unMounted.
    return () => {
      Geolocation.clearWatch(watchingLocation);
    };
  }, []);

  const sourceLocation = {
    latitude: currentLocation?.coords.latitude || 18.580957,
    // 18.576315
    longitude: currentLocation?.coords.longitude || 73.722874,
    // 73.739965
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const destinationLocation = {
    latitude: 18.591232,
    longitude: 73.738938,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        initialRegion={sourceLocation}>
        <Marker
          title={'Hello'}
          description={'Antriksh'}
          coordinate={sourceLocation}>
          <Image
            source={require('../Assets/Icons/flag.png')}
            style={{width: 50, height: 50}}
          />
        </Marker>

        <Marker coordinate={destinationLocation} />
        <Polyline
          coordinates={[sourceLocation, destinationLocation]}
          strokeColor={'#000'}
          strokeWidth={3}
          lineDashPattern={[1]}
        />
      </MapView>
      <View style={{height: 50, width: '100%', backgroundColor: 'red'}}>
        <Text
          style={{
            color: '#000',
          }}>{`Latitude: ${currentLocation?.coords.latitude}`}</Text>
        <Text
          style={{
            color: '#000',
          }}>{`Longitude: ${currentLocation?.coords.longitude}`}</Text>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
