import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import VideoPlayer from '../Components/videoPlayer';
import MapScreen from '../Components/mapScreen';
import EncryptedStorage from 'react-native-encrypted-storage';

const MainScreen = () => {
  useEffect(() => {
    consoleFunction();
    const backAction = () => true;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const consoleFunction = async () => {
    console.log("LLLL")
    const text = await EncryptedStorage.getItem('searcedText');
    console.log(text, 'CHECKING DATA');
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        }}
      />
      <MapScreen />
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
