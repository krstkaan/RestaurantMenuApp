import { StyleSheet, View, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faHome, faUser, faHandHoldingDroplet, faCartShopping, faDoorOpen, faBaby, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useNavigationState } from '@react-navigation/native'; // useNavigationState hook'u eklendi
import BarItem from './BarItem';



const CustomAdminBottomBar = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const navigationState = useNavigationState((state) => state); // navigationState ile mevcut state alınıyor
    const currentRouteName = navigationState?.routes[navigationState.index]?.name; // Aktif olan route'u alıyoruz

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Belirli sayfalarda gizlemek için kontrol
    const hideBottomBarRoutes = ['İşlemlerim', 'ProductDetails']; // Gizlemek istediğiniz sayfa isimlerini buraya ekleyin (Örnek: ['İşlemlerim', 'Profilim'])

    if (isKeyboardVisible || hideBottomBarRoutes.includes(currentRouteName)) {
        return null;
    }

    return (
        <View style={styles.container}>
            <BarItem
                itemText="Home"
                itemLink="HomePage"
                itemIcon={faHome}
                iconSize={20}
                iconColor="black"
                isActive={currentRouteName === 'HomePage'} // Aktif rota kontrolü
            />
            <BarItem
                itemText="Card"
                itemLink="MyCartPage"
                itemIcon={faCartShopping}
                iconSize={20}
                iconColor="black"
                isActive={currentRouteName === 'MyCartPage'} // Aktif rota kontrolü
            />
            <BarItem
                itemText="Admin"
                itemLink="AdminAccountPage"
                itemIcon={faBaby}
                iconSize={25}
                iconColor="black"
                isActive={currentRouteName === 'AdminAccountPage'}
            />
            <BarItem
                itemText="Account"
                itemLink="MyAccountPage"
                itemIcon={faUser}
                iconSize={25}
                iconColor="black"
                isActive={currentRouteName === 'MyAccountPage'}
            />

        </View>
    );
};

export default CustomAdminBottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
});