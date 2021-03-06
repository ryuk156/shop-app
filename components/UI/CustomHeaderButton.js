import React from 'react'
import { Platform } from 'react-native'
import Colors from '../../constants/Colors'
import { HeaderButton } from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

const CustomHeaderButton = (props) =>{
    return(
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS==="android"?Colors.white:Colors.primary} />
    )
}

export default CustomHeaderButton