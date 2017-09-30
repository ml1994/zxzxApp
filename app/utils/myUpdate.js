import {Platform, Alert, Linking} from 'react-native'
import {isFirstTime, isRolledBack, packageVersion, currentVersion, checkUpdate, downloadUpdate, switchVersion, switchVersionLater, markSuccess } from 'react-native-update'
import _updateConfig from '../../update.json'

const {appKey} = _updateConfig[Platform.OS]

export default class myUpdate{

    static firstTime(){
        if(isFirstTime) {
            markSuccess() //标记新版本成功运行
        }else if(isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.')
        }
    }

    static doUpdate(info){
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
            {text: '是', onPress: ()=>{switchVersion(hash)}},
            {text: '否',},
            {text: '下次启动时', onPress: ()=>{switchVersionLater(hash)}},
            ])
        }).catch(err => { 
            Alert.alert('提示', '更新失败.')
        })
    }

    static checkUpdate(){
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '应用已发布新版本,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ])
            } else if (info.upToDate) {
                //Alert.alert('提示', '您的应用版本已是最新.')
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ])
            }
        }).catch(err => { 
            Alert.alert('提示', '更新失败.')
        })
    }
}