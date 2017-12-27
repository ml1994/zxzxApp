import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Header from '../components/header'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class Apply extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            job: '',
            phone: '',
            city: '',
            sex: '',
            remark: ''
        }
    }

    onInput(name, value){
        switch (name) {
            case '姓名':
                this.setState({
                    name: value
                })
                break
            case '职业':
                this.setState({
                    job: value
                })
                break
            case '电话':
                this.setState({
                    phone: value
                })
                break
            case '城市':
                this.setState({
                    city: value
                })
                break
            case '备注':
                this.setState({
                    remark: value
                })
                break
        
            default:
                break
        }
    }

    onSexSelect(index, value){
        this.setState({
            sex: value
        })
    }

    applyFun(){
        const {dispatch} = this.props

        if(this.state.name==''){
            Alert.alert('提示','请输入姓名')
        }else if(this.state.job==''){
            Alert.alert('提示','请输入职业')
        }else if(this.state.phone==''){
            Alert.alert('提示','请输入电话号码')
        }else if(this.state.city==''){
            Alert.alert('提示','请输入所在城市')
        }else if(this.state.sex==''){
            Alert.alert('提示','请选择性别')
        }else{
            fetch('http://www.zxzx119.com/api?method=querysave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${this.state.name}&sex=${this.state.sex}&job=${this.state.job}&city=${this.state.city}&phone=${this.state.phone}&remark=${this.state.remark}`
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.errorCode == 0){
                    Alert.alert('提示',responseJson.message,
                        [
                            {
                                text: '好的', 
                                onPress: () => {
                                    dispatch(NavigationActions.back())
                                }
                            },
                            {
                                text: '取消', 
                                onPress: () => {}, 
                                style: 'cancel'
                            }
                        ]
                    )
                    
                }else{
                    Alert.alert('提示',responseJson.message)
                }
            })
            .catch((error) => {
              console.error(error)
            })
        }
    }

    /**
     * 
     * 
     * @param {string} [label=''] label标签名
     * @param {string} [type=''] input类型，参数是字符串为text，数组为单选
     * @param {boolean} [isMultiline=false] 是否是多行textinput
     * @param {any} [style={}] 修改input容器样式
     * @returns 
     * @memberof Apply
     */
    
    renderInput(label='', type='', isMultiline=false, style={}){
        let myInput = <View style={[styles.inputView,style]}></View>
        if(typeof type === 'string'){
            myInput = (
                <View style={[styles.inputView,style]}>
                    <Text style={styles.inputLabel}>{label}</Text>
                    <TextInput style={styles.inputStyle}
                        placeholder={type}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#b3b3b3'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(text) => this.onInput(label, text)}
                        multiline={isMultiline}
                        numberOfLines={isMultiline?4:1}
                        textAlignVertical={isMultiline?'top':'center'}
                    />
                </View>
            )
        }else if(type instanceof Array){
            myInput = (
                <View style={[styles.inputView,style]}>
                    <Text style={styles.inputLabel}>{label}</Text>
                    <RadioGroup
                        style={styles.radioGroup}
                        onSelect = {(index, value) => this.onSexSelect(index, value)}
                        size={12}
                        color='#ce2626'
                    >
                        {
                            type.map(item=>{
                                return (
                                    <RadioButton value={item} style={styles.radioButton}>
                                        <Text style={styles.radioButtonText}>{item}</Text>
                                    </RadioButton>
                                )
                            })
                        }

                    </RadioGroup>
                </View>
            )
        }
        return myInput
    }

    render() {
        return (
            <View style={styles.rootView}>
                <Header type='title' title='我要报名'/>
                {this.renderInput('姓名','请输入姓名')}
                {this.renderInput('职业','请输入职业')}
                {this.renderInput('电话','请输入电话号码')}
                {this.renderInput('城市','请输入所在城市')}
                {this.renderInput('性别',['男','女'])}     
                {this.renderInput('备注','例如：周末双休，可以参与拍摄', true, styles.remarkView)} 
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{this.applyFun()}}>
                        <Text style={styles.btnText}>我要报名</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tipView}>
                    <Text style={styles.tip}>* 我们将在三个工作日内，对你的信息进行反馈，请保存电话畅通。</Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    rootView:{
        flex:1,
        backgroundColor:'#fff'
    },
    inputView:{
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#e5e5e5'
    },
    remarkView:{
        paddingVertical:10,
        height: 110, 
        alignItems: 'flex-start'
    },
    inputLabel:{
        flex:1,
        textAlign: 'right',
        fontSize: 16,
        color: '#000'
    },
    inputStyle:{
        flex:3,
		paddingVertical: 0,
		paddingHorizontal: 20,
		fontSize: 16
    },
    radioGroup:{
        flex:3,
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    radioButton:{
        alignItems: 'center'
    },
    radioButtonText:{
        color: '#000',
        fontSize: 16
    },
    btnView:{
        alignItems: 'center'
    },
    btn:{
        marginTop: 32,
        width:292,
        height:40,
        backgroundColor: '#ce2626',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText:{
        color: '#fff'
    },
    tipView:{
        marginTop: 12,
        alignItems: 'center'
    },
    tip:{
        color: '#b3b3b3',
        fontSize: 12,
        width: 228
    }
})


const mapStateToProps = store=>({
	nav:store.nav
})

export default connect(mapStateToProps)(Apply)