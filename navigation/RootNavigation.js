import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./AuthStack";
import UserStack from './UserStack';
import AdminStack from './AdminStack';

import { useSelector } from 'react-redux';
import CustomUserBottomBar from '../component/CustomUserBottomBar';
import CustomGuestBottomBar from '../component/CustomGuestBottomBar';
import CustomAdminBottomBar from '../component/CustomAdminBottomBar'; // Admin için bar

const RootNavigation = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const isAdmin = useSelector(state => state.user.isAdmin); // isAdmin durumu

    console.log(isAuth, isAdmin);

    return (
        <NavigationContainer>
            {!isAuth ? (
                <>
                    <AuthStack />
                    <CustomGuestBottomBar />
                </>
            ) : isAdmin ? (
                <>
                    <AdminStack /> 
                    <CustomAdminBottomBar />
                </>
            ) : (
                <>
                    <UserStack />
                    <CustomUserBottomBar />
                </>
            )}
        </NavigationContainer>
    );
}

export default RootNavigation;
