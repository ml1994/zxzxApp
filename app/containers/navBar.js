import React, {Component} from 'react'
import {
    View,
    FlatList,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

class NavBar extends Component {

    _onPressItem(index) {
        const {dispatch} = this.props//connect后props里才有dispatch

        switch (index) {
            case 1:
                dispatch(NavigationActions.navigate({ routeName: 'KnowAll' }))//导航跳转
                break
            case 2:
                dispatch(NavigationActions.navigate({routeName:'Test'}))
                break
            case 3:
                dispatch(NavigationActions.navigate({routeName:'Ask'}))
                break
            case 4:
                dispatch(NavigationActions.navigate({routeName:'PeopleShow'}))
                break
            default:
                break
        }
    }

    render() {
        let tabArr = [
            {
                key: 1,
                img: require('../asset/fire_ext.png'),
                label: '消防百事通'
            }, {
                key: 2,
                img: require('../asset/pipe.png'),
                label: '物业培训'
            }, {
                key: 3,
                img: require('../asset/fire_hy.png'),
                label: '技术咨询'
            }, {
                key: 4,
                img: require('../asset/fire_engine.png'),
                label: '真人秀'
            }
        ]
        return (
            <FlatList
                horizontal={true}
                justifyContent='space-around'
                style={styles.list}
                data={tabArr}
                renderItem={({item}) => (
                <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => this._onPressItem(item.key)}>
                    <Image source={item.img} style={styles.img}/>
                    <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
            )}/>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 10
    },
    listItem: {
        width: 90,
        alignItems: 'center'
    },
    img: {
        width: 40,
        height: 40
    },
    text: {
        marginTop: 6,
        color: '#565555'
    }
})

const mapStateToProps=store=>{
    return {
        nav:store.nav
    }
}

export default connect(
    mapStateToProps
)(NavBar)