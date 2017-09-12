import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

import Header from '../components/header'


class Test extends Component {
    render() {
        const {dispatch} = this.props
        const icons = ['bell-o','search']
        return (
            <View style={styles.rootView}>
                <Header type='title' title='物业培训' icons={icons}/>
                <ImageBackground source={require('../asset/test_bg.png')} style={styles.imgBg} resizeMode='contain'>
                    {/* <Text onPress={()=>dispatch(NavigationActions.navigate({routeName:'Subject'}))}>123</Text> */}
                    <TouchableOpacity style={styles.societyView}>
                        <Text style={[styles.type,styles.right]}>
                            <Text style={styles.bigSize}>社会</Text>
                            消防科普
                        </Text>
                        <Text style={[styles.score,styles.right]}>最佳:87分</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.propertyView}>
                        <Text style={[styles.type,styles.right]}>
                            <Text style={styles.bigSize}>物业</Text>
                            消控人员
                        </Text>
                        <Text style={[styles.score,styles.right]}>最佳:87分</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fireView}>
                        <Text style={styles.type}>
                            消防
                            <Text style={styles.bigSize}>从业</Text>
                            人员
                        </Text>
                        <Text style={styles.score}>最佳:87分</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.programerView}>
                        <Text style={styles.type}>
                            消防
                            <Text style={styles.bigSize}>工程师</Text>
                        </Text>
                        <Text style={styles.score}>最佳:87分</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    imgBg:{
        flex:1,
        marginVertical:10,
        width:'80%'
    },
    societyView:{
        paddingVertical:10,
        paddingHorizontal:10,
        width:'100%',
        alignSelf:'flex-end',
        justifyContent:'center',
        
    },
    propertyView:{
        marginTop:'24%',
        height:'20%',
        paddingVertical:10,
        paddingHorizontal:10,
        width:'60%',
        alignSelf:'flex-end',
        justifyContent:'center',
        
    },
    fireView:{
        marginTop:'10%',
        height:'24%',
        paddingVertical:10,
        paddingHorizontal:10,
        width:'52%',
        justifyContent:'flex-end',
        
    },
    programerView:{
        marginTop:'20%',
        paddingVertical:5,
        paddingHorizontal:10,
        width:'100%',
        justifyContent:'center',
    },
    type:{
        color:'#fff',
        fontSize:20,
        backgroundColor:'transparent',
    },
    bigSize:{
        fontSize:24
    },
    score:{
        marginTop:6,    
        fontWeight:'bold',
        color:'#fff',
        backgroundColor:'transparent'
    },
    right:{
        textAlign:'right',
    }

})

const mapStateToProps = store=>({
    nav:store.nav
})

export default connect(mapStateToProps)(Test)