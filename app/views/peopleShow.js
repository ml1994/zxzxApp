import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player'

class PeopleShow extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <View style={styles.rootView}>
                <VideoPlayer video={{
                    uri: 'http://cdn.zxzx119.com/720p.mp4'
                }} // Can be a URL or a local file.
                    ref={(ref) => {
                    this.player = ref
                }} // Store reference
                    style={styles.backgroundVideo}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    backgroundVideo: {
        width: '100%',
        height: 240
    }
});


export default PeopleShow