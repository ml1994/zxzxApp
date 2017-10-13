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

	_onPressItem(routeName) {
		const {dispatch} = this.props//connect后props里才有dispatch
		dispatch(NavigationActions.navigate({routeName}))//导航跳转	
	}

	render() {
		let tabArr = [
			{
				key: 1,
				img: require('../asset/fire_ext.png'),
				label: '热点新闻',
				routeName:'KnowAll'
			}, 
			{
				key: 2,
				img: require('../asset/fire_helmet.png'),
				label: '物业培训',
				routeName: 'Test'
			}, 
			{
				key: 3,
				img: require('../asset/fire_hy.png'),
				label: '技术咨询',
				routeName: 'Asks'
			}, 
			{
				key: 4,
				img: require('../asset/fire_engine.png'),
				label: '真人秀',
				routeName: 'PeopleShow'
			},
			{
				key: 5,
				img: require('../asset/fire_ext.png'),
				label: '消防百事通',
				routeName:'KnowAll'
			}, 
			{
				key: 6,
				img: require('../asset/fire_helmet.png'),
				label: '消防百科',
				routeName: 'Test'
			}, 
			{
				key: 7,
				img: require('../asset/fire_hy.png'),
				label: '技术咨询',
				routeName: 'Asks'
			}, 
			{
				key: 8,
				img: require('../asset/fire_engine.png'),
				label: '真人秀',
				routeName: 'PeopleShow'
			}
		]
		return (
			<View style={styles.rootView}>
				<View style={styles.list}>
					{tabArr.map((item,index) => {
						return (<TouchableOpacity
							style={[styles.listItem,(index<tabArr.length-4)?{marginBottom:20}:{}]}
							onPress={() => this._onPressItem(item.routeName)}>
							<Image source={item.img} style={styles.img}/>
							<Text style={styles.text}>{item.label}</Text>
						</TouchableOpacity>)
					})}
				</View>
				{/*  <FlatList
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
					)}/>*/}
			</View>

		)
	}
}

const styles = StyleSheet.create({
	rootView:{
		height:'50%',
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	list: {
		flexDirection: 'row',
		flexWrap:'wrap',
		justifyContent: 'space-around',
	},
	listItem: {
		width: 90,
		alignItems: 'center',
	},
	img: {
		width: 50,
		height: 50
	},
	text: {
		fontSize:12,
		marginTop: 10,
		color: '#565555'
	}
})

const mapStateToProps = store => {
	return {
		nav: store.nav
	}
}

export default connect(
	mapStateToProps
)(NavBar)