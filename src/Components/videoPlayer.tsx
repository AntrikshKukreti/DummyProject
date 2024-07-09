import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Video, {OnLoadData, OnProgressData, VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ReactVideoSourceProperties} from 'react-native-video';

interface VideoPlayerProps {
  source: ReactVideoSourceProperties;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({source}) => {
  const [paused, setPaused] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1);
  const [showCenterControls, setShowCenterControls] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const videoRef = useRef<VideoRef>(null);

  const onProgress = (data: OnProgressData) => {
    setProgress(data.currentTime / duration);
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
  };

  const onSliderValueChange = (value: number) => {
    const newPosition = value * duration;
    if (videoRef.current) {
      videoRef.current.seek(newPosition);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (videoRef.current) {
      if (!isFullScreen) {
        videoRef.current.presentFullscreenPlayer();
      } else {
        videoRef.current.dismissFullscreenPlayer();
      }
    }
  };

  const togglePlayPause = () => {
    setPaused(!paused);
    setShowCenterControls(true); // Show center controls when bottom play/pause button is pressed
    startHideCenterControlsTimeout();
  };

  const toggleSpeed = () => {
    setRate(rate === 1 ? 2 : 1);
  };

  const startHideCenterControlsTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setShowCenterControls(false);
    }, 2000);
    setTimeoutId(id);
  };

  const toggleCenterControls = () => {
    setShowCenterControls(!showCenterControls);
    if (!showCenterControls) {
      startHideCenterControlsTimeout();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const remainingTime = duration - progress * duration;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={() => setShowCenterControls(true)}
        onPressOut={startHideCenterControlsTimeout}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={source}
            style={styles.video}
            paused={paused}
            muted={muted}
            rate={rate}
            onProgress={onProgress}
            onLoad={onLoad}
            resizeMode="contain"
          />
          {showCenterControls && (
            <TouchableOpacity
              style={styles.centerButton}
              onPress={togglePlayPause}>
              <Icon
                name={paused ? 'play-arrow' : 'pause'}
                size={50}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.controlButton}>
            <Icon
              name={paused ? 'play-arrow' : 'pause'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSpeed} style={styles.controlButton}>
            <Text style={styles.speedText}>{rate}x</Text>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            value={progress}
            onValueChange={onSliderValueChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          <TouchableOpacity
            onPress={() => setMuted(!muted)}
            style={styles.controlButton}>
            <Icon
              name={muted ? 'volume-off' : 'volume-up'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFullScreen}
            style={styles.controlButton}>
            <Icon
              name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  videoContainer: {
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 200,
  },
  centerButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  controlButton: {
    padding: 5,
  },
  speedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default VideoPlayer;
