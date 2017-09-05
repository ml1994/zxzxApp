import React, {Component} from 'react'
import FAIcon from 'react-native-vector-icons/FontAwesome'

//封装去除字体图标在ios下的默认背景色，防止背景色遮挡父组件背景图
export default class Icon extends Component {
    render() {
        return (<FAIcon
            {...this.props}
            style={{
            backgroundColor: 'transparent',
            //lineHeight:this.props.lineheight
        }}/>)
    }
}