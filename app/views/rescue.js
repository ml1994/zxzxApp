import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import Header from '../components/header'

export default class rescue extends Component {
	componentDidMount() {

	}

	render() {
		const rescueList = [
			{
				key: 1,
				title: '海上救援',
				img: require('../asset/rescue_pic01.png'),
				text: "海上救援是指针对海上事故发起的搜寻、救援工作，通常由经" +
				"过专业培训的人员进行操作实施。除了船类交通工具外，最常" +
				"被使用到的工具有绳索和机械设备，用以帮助施救人员在水中" +
				"营救时克服水流带来的阻力。救援人员会根据水域不同、落水" +
				"人员情况采取不同的营救手段，因此相比于陆地救援有更多的" +
				"不可预测性，难度也更大。"
			},
			{
				key: 2,
				title: '陆地救援',
				img: require('../asset/rescue_pic02.png'),
				text: "陆地救援是最原始、也是最常用到的一种搜救方式。它可以用" +
				"在各种灾害救险行动中，包括地震、台风、龙卷风、洪水、溃" +
				"坝、人为事故、恐怖活动和有害物质释放等。陆地搜救通常由" +
				"训练有素的消防队员组成。救援内容包括因自然灾害、矿山坑" +
				"道坍塌而被困的遇难者的搜寻和初步医疗救治。一次正确的救" +
				"援行动就是在最短的时间内解救出最多的人，同时尽量减少救" +
				"援人员的风险。"
			},
			{
				key: 3,
				title: '空中救援',
				img: require('../asset/rescue_pic03.png'),
				text: "陆地救援是最原始、也是最常用到的一种搜救方式。它可以用" +
				"在各种灾害救险行动中，包括地震、台风、龙卷风、洪水、溃" +
				"坝、人为事故、恐怖活动和有害物质释放等。陆地搜救通常由" +
				"训练有素的消防队员组成。救援内容包括因自然灾害、矿山坑" +
				"道坍塌而被困的遇难者的搜寻和初步医疗救治。一次正确的救" +
				"援行动就是在最短的时间内解救出最多的人，同时尽量减少救" +
				"援人员的风险。"
			},
			{
				key: 4,
				title: '机器人救援',
				img: require('../asset/rescue_pic04.png'),
				text: "救援机器人专指被设计用来解救人类的机器人，最常被使用于" +
				"矿难、人质解救、拆除炸弹，以及在大规模城市灾害时寻找受" +
				"难者和幸存者。使用机器人救援的益处在于减少人员需求，且" +
				"不会因长时间的持续搜救产生疲劳，并能够到达其他方式无法" +
				"到达的区域。人们正在开发救援机器人更多的能力，如侦察制" +
				"图，移除或夯实废墟、运送物资、急救医疗和人员疏散等。"
			},
			{
				key: 5,
				title: '水域救援贴士',
				img: null,
				text: "水域救援是指人员在水域中生命受到严重威胁或重要场所、建" +
				"筑物受到水流破坏，不可抗力造成的意外灾害等，如不及时施" +
				"救将会造成人员伤亡或重大财产损失所采取的救援行动。消防" +
				"人员执行抢救水域灾害时，必须先行熟悉了解各种水域情形，" +
				"依据水域特性、水流状况、待救者受溺受困情形、现场救援能" +
				"量及运用携带必要的装备、器材，在安全快速且有效率的考量" +
				"下，尽速进行救援工作。水域救援人员平时应扎实训练，培养" +
				"好的体能以及各式救援技能，平时落实器材整备，任何救援行" +
				"动切勿单独行动，并应先评估现场环境后拟定救援策略，才能" +
				"有效快速完成救援任务。相比于陆地救援有更多的不可预测性。" +
				"水域救援难度也更大。"
			},
			{
				key: 6,
				title: '关于我们',
				img: null,
				text: "中消救援以服务社会、服务大众为宗旨，联结全国多支专业紧" +
				"急救援队，涵盖生命救援、人道救助、灾害预防、应急反应、" +
				"灾后恢复和减灾等各个领域。收集并反映有关紧急救援信息和" +
				"情况，配合有关重大紧急救援事项的处置以及国内国际紧急救" +
				"援事业的合作与交流等。通过协调救援资源，研究救援产业，" +
				"促进中国紧急救援体系及相关产业的建设。依靠整合国内外救" +
				"援技术、资讯及相关服务，促进中国紧急救援事业产业化、市" +
				"场化、国际化。"
			},
			{
				key: 7,
				title: '紧急求助',
				img: null,
				text:"无论是台风、地震、雪崩、洪水、泥石流等自然灾害，还是山" +
				"林火灾、大型意外事故或其他户外安全事故，都属于紧急救援" +
				"应对范围内。其目的是在出现求救信息时，能够及时派出相应" +
				"人员前往救助，减少乃至避免遇险人员的生命财产损失。主要" +
				"任务为SAR搜救、救援、赈灾，包括陆地上和近海搜救、警务" +
				"救援、海岸线救援、高山救援，以及在自然灾害、恐怖袭击后" +
				"人员的医疗疏散、人道主义救援和运送。"
			},
		]
		return (
			<View style={styles.rootView}>
				<Header type='title' title='中消救援'/>
				<ScrollView style={styles.rootView} showsVerticalScrollIndicator={false}>
					<Image source={require('../asset/rescue_banner.png')} style={styles.img}/>
					<View style={styles.list}>
						{rescueList.map((item,index) => {
							let titleContainerStyle={
								width: (item.title.length+2) * 20,
								marginBottom: (item.img) ? null : 20
							}
							return (
								<View key={index}>
									<View style={[styles.titleContainer,titleContainerStyle]}>
										<View style={styles.titleSubContainer}>
											<Text style={styles.itemTitle}>{item.title}</Text>
										</View>
									</View>
									{(item.img) ?
										<Image source={item.img} resizeMode='contain' style={styles.img}/> : null}
									<Text style={styles.itemText}>{item.text}</Text>
								</View>)
						})}
					</View>
				</ScrollView>
			</View>
		)

	}
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	img: {
		width: '100%',
		height: 208
	},
	list: {
		padding: 20
	},
	titleContainer:{
		flexDirection:'row',
		borderBottomColor:'#ccc',
		borderBottomWidth:1
	},
	titleSubContainer:{
		borderBottomWidth: 1,
		borderBottomColor: '#e71e18',
		paddingBottom: 10,
		marginBottom:-1
	},
	itemTitle: {
		color: '#e71e18',
		fontSize: 20,	
	},
	itemText: {
		fontWeight: 'bold',
		lineHeight: 24,
		marginBottom: 50
	}
})