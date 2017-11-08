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

	onPressItem(routeName,sign) {
		const {dispatch} = this.props//connect后props里才有dispatch
		if(sign=='undefined'){
			dispatch(NavigationActions.navigate({routeName}))//导航跳转	
		}else{
			dispatch(NavigationActions.navigate({routeName,params:{sign}}))//导航跳转	
		}
	}

	render() {
		let tabArr = [
			{
				key: 1,
				img: require('../asset/nav_news.png'),
				label: '热点新闻',
				routeName:'KnowAll',
				sign:5
			}, 
			{
				key: 2,
				img: require('../asset/nav_edu.png'),
				label: '教育培训',
				routeName: 'Test'
			}, 
			{
				key: 3,
				img: require('../asset/nav_directory.png'),
				label: '企业名录',
				routeName: 'Directory'
			}, 
			{
				key: 4,
				img: require('../asset/nav_trial.png'),
				label: '审图服务',
				routeName: 'Tech'
			},
			{
				key: 5,
				img: require('../asset/nav_report.png'),
				label: '监督举报',
				routeName:'Report'
			}, 
			{
				key: 6,
				img: require('../asset/nav_ency.png'),
				label: '消防百科',
				routeName: 'KnowAll',
				sign:14
			}, 
			{
				key: 7,
				img: require('../asset/nav_rescue.png'),
				label: '中消救援',
				routeName: 'Rescue'
			}, 
			{
				key: 8,
				img: require('../asset/nav_show.png'),
				label: '紧急呼叫',
				routeName: 'PeopleShow'
			}
		]
		return (
			<View style={styles.rootView}>
				<View style={styles.list}>
					{tabArr.map((item,index) => {
						return (<TouchableOpacity key={index}
							style={[styles.listItem,(index<tabArr.length-4)?{marginBottom:20}:{}]}
							onPress={() => this.onPressItem(item.routeName,item.sign)}>
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
                            onPress={() => this.onPressItem(item.key)}>
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
		width: '25%',
		alignItems: 'center',
	},
	img: {
		width: 51,
		height: 51
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