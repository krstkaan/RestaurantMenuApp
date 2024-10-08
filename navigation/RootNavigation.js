import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./AuthStack";
import UserStack from './UserStack';
import { useSelector } from 'react-redux';
import CustomUserBottomBar from '../component/CustomUserBottomBar';
import CustomGuestBottomBar from '../component/CustomGuestBottomBar';

const RootNavigation = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    console.log(isAuth)
    return (
        <NavigationContainer>

            {!isAuth ? <><AuthStack /><CustomGuestBottomBar/></> : <><UserStack /><CustomUserBottomBar /></>}
        </NavigationContainer>

    )
}

export default RootNavigation