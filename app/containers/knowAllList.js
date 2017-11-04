import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'

class KnowAllList extends Component {

	_toDetailPage(link) {
		const {dispatch} = this.props
		dispatch(NavigationActions.navigate({routeName: 'KnowAllDetail', params: {link:`http://www.zxzx119.com${link}`, title: this.props.title}}))
	}

	render() {
		let list = this.props.newsList
		if (list) {   //判断list,不然会出现Invalid index 1 size is 0报错
			for (let i = 0; i < list.length; i++) {
				if (list[i].style != 'min') {
					if (i) {
						//[list[0],list[i]] = [list[i],list[0]]
						let value = list[i]
						list.splice(i, 1)
						list.unshift(value)
					}
					break
				}
			}
		}
		list.map((item, index) => {
			item.key = index
		})

		return (
			<FlatList
				{...this.props}
				style={styles.list}
				data={this.props.newsList}
				renderItem={({item, index}) => {
					switch (index) {
						case 0:  //第一张带图新闻只显示大图
							return <TouchableOpacity onPress={() => this._toDetailPage(item.link_to)}>
								<Image source={{uri: item.thumbnail}} resizeMode="cover" style={styles.topImg}/>
							</TouchableOpacity>
						case 1:  //title
							return <View style={styles.titleView}>
								<Text style={styles.titleText}>{this.props.title}</Text>
							</View>

						default:
							return <TouchableOpacity style={styles.touchView}
													 onPress={() => this._toDetailPage(item.link_to)}>
								<View
									style={[styles.listView, index == this.props.newsList.length - 1 ? styles.lastViewNoBorder : '']}>
									{item.style != 'min' ? <Image source={{uri: item.thumbnail}} resizeMode="stretch"
																  style={styles.listImg}/> : null}
									<View style={styles.textView}>
										<Text style={styles.title} numberOfLines={2}>{item.title}</Text>
										<Text style={styles.text} numberOfLines={2}>{item.remarks}</Text>
									</View>
								</View>
							</TouchableOpacity>
					}
				}
				}/>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		backgroundColor: '#fff',
	},
	touchView: {
		paddingHorizontal: 10,
	},
	listView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#dddee1'
	},
	topImg: {
		width: '100%',
		height: 200
	},
	titleView: {
		justifyContent: 'center',
		marginHorizontal: 10,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#dddee1'
	},
	titleText: {
		color: '#575757',
		fontSize: 20
	},
	lastViewNoBorder: {
		borderBottomWidth: 0
	},
	listImg: {
		flex: 1,
		height: 80
	},
	textView: {
		flex: 2,
		marginLeft: 10
	},
	title: {
		fontSize: 16,
		color: '#575757'
	},
	text: {
		marginTop: 10,
		fontSize: 12,
		color: '#9f9f9f',
		//flexWrap:'wrap'
	}
})

const mapStateToProps = store => ({
	nav: store.nav,
	news: store.news
})

export default connect(mapStateToProps)(KnowAllList)