import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import AppTabNav from './appTabNav'
import Search from './views/search'
import KnowAll from './views/knowAll'
import KnowAllDetail from './views/knowAllDetail'
import PeopleShow from './views/peopleShow'
import Apply from './views/apply'
import Login from './views/login'
import Register from './views/register'
import MySetting from './views/mySetting'
import Message from './views/message'
import MessageDetail from './views/messageDetail'
import AboutUs from './views/aboutUs'
import AddAsk from './views/addAsk'
import AddOnAsk from './views/addOnAsk'
import AskDetail from './views/askDetail'
import Subject from './views/subject'
import AboutDetail from './views/aboutDetail'
import ChangePassword from './views/changePassword'
import ForgetPassword from './views/forgetPassword'
import Test from './views/test'
import Rescue from './views/rescue'
import Tech from './views/tech'
import Report from './views/report'
import News from './views/news'
import Directory from './views/directory'
import TestVideo from './views/testVideo'
import DirectoryDetail from './views/directoryDetail'
import TestTip from './views/testTip'
import WrongSubject from './views/wrongSubject'
import Ad from './views/ad'

const appRootStackNav = StackNavigator({
	Ad: {//启动广告页
		screen: Ad
	},
	TabNav: {
		screen: AppTabNav
	},
	Login: {//登录
		screen: Login
	},
	Register: {//注册
		screen: Register
	},
	ChangePassword: {//修改密码
		screen: ChangePassword
	},
	ForgetPassword: {//忘记密码
		screen: ForgetPassword
	},
	Search: {//搜索页
		screen: Search
	},
	Test: {//教育培训
		screen: Test
	},
	KnowAll: {//消防百事通
		screen: KnowAll
	},
	KnowAllDetail: {//消防百事通详情页
		screen: KnowAllDetail
	},
	PeopleShow: {//真人秀
		screen: PeopleShow
	},
	Apply: {//报名页
		screen: Apply
	},
	Message: {//消息中心
		screen: Message
	},
	MessageDetail: {//消息中心详情页
		screen: MessageDetail
	},
	MySetting: {//个人设置
		screen: MySetting
	},
	AboutUs: {//关于我们
		screen: AboutUs
	},
	AddAsk: {//添加问题
		screen: AddAsk
	},
	AddOnAsk: {//追加问题
		screen: AddOnAsk
	},
	AskDetail: {//咨询详情页
		screen: AskDetail
	},
	Subject: {//答题
		screen: Subject
	},
	AboutDetail: {//关于详情页
		screen: AboutDetail
	},
	Rescue: {//救援
		screen: Rescue
	},
	Tech: {//审图
		screen: Tech
	},
	Report: {//监督举报
		screen: Report
	},
	News: {//新闻详情
		screen: News
	},
	Directory: {//企业名录
		screen: Directory
	},
	TestVideo: {//培训视频
		screen: TestVideo
	},
	DirectoryDetail: {//企业信息
		screen: DirectoryDetail
	},
	TestTip: {//消防小贴士
		screen: TestTip
	},
	WrongSubject: {//查看错题
		screen: WrongSubject
	}
}, {
	headerMode: 'none'
})

export default appRootStackNav
