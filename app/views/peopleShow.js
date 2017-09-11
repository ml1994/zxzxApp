import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {StackNavigator} from 'react-navigation'
//import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player'
import Header from '../components/header'
import Icon from '../components/icon'

class PeopleShow extends Component {

    componentDidMount() {}

    render() {

        return (
            <ScrollView style={styles.rootView}>
                <Header type='title' title='真人秀'/>
                <VideoPlayer video={{
                    //uri: 'http://cdn.zxzx119.com/720p.mp4'
                    uri:'http://video.zxzx119.com/e3dfa82b70fa4ec79825290019ff6e7f/baa86439bb414e638f895fd0fd37b74a-23ed88f2a1a26984ec60a497bcc1d316.m3u8'
                }} // Can be a URL or a local file.
                    ref={(ref) => {
                    this.player = ref
                }} // Store reference
                    style={styles.backgroundVideo}/>
            </ScrollView>
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