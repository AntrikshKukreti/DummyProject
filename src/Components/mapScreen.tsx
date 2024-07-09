import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

type Props = {};

const MapScreen = (props: Props) => {
  const sourceLocation = {
    latitude: 18.576315,
    longitude: 73.739965,
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
