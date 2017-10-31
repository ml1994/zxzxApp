import React, {Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from './icon'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import storage from '../gStorage'

class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total: this.props.total
		};
	}

	checkView = (option) => {
		if (this.props.que_type == 2) {
			let flag = this.props.result.split(',').indexOf(option);
			if (flag == -1) {
				return <View style={styles.optionNoCheck}></View>
			} else {
				return <View style={styles.optionCheck}><Icon name='check' size={14} color='#fff'/></View>

			}
		} else {
			if (this.props.result == option) {
				return <View style={styles.optionCheck}><Icon name='check' size={14} color='#fff'/></View>
			} else {
				return <View style={styles.optionNoCheck}></View>
			}
		}
	}

	render() {
		//console.log(this.state.checks)
		const {index, total} = this.props
		const {que_type, stem, options, answer} = this.props.tails.que
		console.log(que_type)
		const queType = ['单选题', '多选题', '判断题']
		let jsonOption = JSON.parse(options)
		jsonOption.map((item, index) => {
			item.key = index
		})
		return (
			<View style={styles.rootView}>
				<View style={styles.titleView}>
					<View style={styles.typeView}>
						<View style={styles.typeTextView}>
							<Text style={styles.typeText}>{queType[que_type - 1]}</Text>
						</View>
						<View style={styles.typeArrow}></View>
					</View>
					<Text style={styles.num}>
						共
						<Text style={styles.nowNum}>{index + 1}</Text>
						/{total}题
					</Text>
				</View>
				<Text style={styles.question}>{index + 1}.{stem}</Text>
				<FlatList
					style={styles.optionList}
					data={jsonOption}
					renderItem={({item, index}) => (
						((item.value) ?
							<View key={index} style={styles.optionView}>
								{this.checkView(item.name)}
								<Text style={styles.optionText}>{item.value}</Text>
							</View> : null)
					)}/>
				<Text style={styles.answer}>正确答案：{answer}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	rootView: {
		alignItems: 'center'
	},
	titleView: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		marginTop: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#e6e6e6',
	},
	typeView: {
		flexDirection: 'row'
	},
	typeTextView: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#faab00',
		height: 30,
		paddingHorizontal: 10
	},
	typeText: {
		fontWeight: 'bold',
		color: '#fff',
	},
	typeArrow: {
		borderWidth: 15,
		borderLeftColor: '#faab00',
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
		height: 0
	},
	num: {
		marginRight: 12,
		color: '#3d3d3d'
	},
	nowNum: {
		color: '#ce2626'
	},
	question: {
		marginTop: 18,
		fontSize: 16,
		lineHeight: 24,
		width: '90%',
		color: '#3d3d3d'
	},
	optionList: {
		marginTop: 30,
		width: '90%',
	},
	optionView: {
		flexDirection: 'row',
		marginTop: 10,
		width: '100%',
		height: 40,
		alignItems: 'center'
	},
	optionCheckView: {
		backgroundColor: '#eee'
	},
	optionCheck: {
		marginHorizontal: 10,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#dd4b4b',
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionNoCheck: {
		marginHorizontal: 10,
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#bababa'
	},
	optionText: {
		fontSize: 14
	},
	answer: {
		width: '100%',
		textAlign: 'right',
		paddingRight: 40,

	}
})
const mapStateToProps = store => {
	return {
		nav: store.nav,
		userinfo: store.userinfo,
		test: store.test
	}
}

export default connect(mapStateToProps)(Question)