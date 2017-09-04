import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import AppTabNav from './appTabNav'

const appRootStackNav = StackNavigator({
    TabNav:{
        screen:AppTabNav
    }
})

export default appRootStackNav