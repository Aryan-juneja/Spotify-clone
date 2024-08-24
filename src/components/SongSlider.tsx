import Slider from '@react-native-community/slider';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useProgress } from 'react-native-track-player';

interface SongSliderProps {
  currentPosition: number;
  onValueChange: (value: number) => void;
}

const SongSlider: React.FC<SongSliderProps> = ({ currentPosition, onValueChange }) => {
  const { position, duration } = useProgress();

  // Update slider value to reflect current position
  const sliderValue = position || currentPosition;

  // Format time as MM:SS
  const formatTime = (time: number) => new Date(time * 1000).toISOString().substring(14, 19);

  return (
    <View>
      <Slider
        value={sliderValue}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor='#FFF'
        maximumTrackTintColor='#FFF'
        minimumTrackTintColor='#FF0000' // Optional: set a color for the active track
        style={styles.sliderContainer}
        onValueChange={onValueChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {formatTime(position)}
        </Text>
        <Text style={styles.time}>
          {formatTime(duration - position)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
  },
  timeContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default SongSlider;
