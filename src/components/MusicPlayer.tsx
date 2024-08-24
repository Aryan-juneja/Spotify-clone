import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player';
import { playListData } from '../constants';
import SongInfo from './songInfo';
import SongSlider from './SongSlider';
import ControlCenter from './ControlCenter';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [trackImage, setTrackImage] = useState<string>('');
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack !== undefined) {
      const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(playingTrack || null);
      setTrackImage(playingTrack?.artwork!)
    }
  });

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack !== null) {
        const trackDetails = await TrackPlayer.getTrack(currentTrack);
        setTrack(trackDetails || null);
        setTrackImage(trackDetails?.artwork || '')
      }
    };

    fetchCurrentTrack();
  }, []);

  const renderArtWork = ({ item }: { item: Track }) => (
    <View style={styles.listArtWrapper}>
      <View style={styles.albumContainer}>
        {item.artwork && (
          <Image
            style={styles.albumArtImg}
            source={{ uri: trackImage }}
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={playListData} // Filter data to ensure current track is displayed
        renderItem={renderArtWork}
        keyExtractor={(song) => song.id.toString()}
        style={styles.flatList}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001d23',
  },
  flatList: {
    flexGrow: 0,
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    marginTop:50,
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    width: '100%', // Ensure the image covers the entire container
    borderRadius: 4,
  },
});

export default MusicPlayer;
