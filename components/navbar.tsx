import { StyleSheet, View, Animated, Image } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Tabs, Redirect, Link, router, useNavigation } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const [orderStatus, setOrderStatus] = useState('inactive');

    const navigation = useNavigation();
    
    // Listen for changes in the tab status

    const purchaseOrderImages = {
        '#71BFD1': require('../assets/icons/purchase-order-71BFD1.png'),
        '#434343': require('../assets/icons/purchase-order-434343.png')
    }

    const handleTabPressOrder = (tabName) => {
        if (tabName === 'orders') {
            setOrderStatus('active');
        } else {
            setOrderStatus('inactive');
        } 
    };

    return (
        <Tabs
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#71BFD1',
                tabBarInactiveTintColor: '#434343',
                tabBarLabelStyle: {fontFamily: 'DM-Sans'},
                tabBarShowLabel: false,
                headerShown: false
            }}

        >
            <Tabs.Screen
                name="home"
                options={{
                    href: "/home",
                    tabBarLabel: "Home",
                    title: "Home",
                    tabBarIcon: ({color}) => (
                        <FontAwesomeIcon icon={faHome}
                            style={[styles.icon, { color: color } as any]}

                        />
                    )
                }}
                listeners={{
                    tabPress: (e) => {
                        handleTabPressOrder('home');
                    }
                }}
            />
            <Tabs.Screen
                name='orders'
                options={{
                    href: "/orders",
                    tabBarLabel: "Orders",
                    title: "Orders",
                    tabBarIcon: ({color}) => (
                        <Image source={purchaseOrderImages[color]} style={styles.icon} />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        handleTabPressOrder('orders');
                    }
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    href: "/search",
                    tabBarLabel: "Search",
                    title: "Search",
                    tabBarIcon: ({color}) => (
                        <FontAwesomeIcon icon={faSearch}
                            style={[styles.icon, { color: color } as any]}

                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        handleTabPressOrder('search');
                    }
                }}
            />
            <Tabs.Screen
                name='chats'
                options={{
                    href: "/chats",
                    tabBarLabel: "Chats",
                    title: "Chats",
                    tabBarIcon: ({color}) => (
                        <FontAwesomeIcon icon={faMessage}
                            style={[styles.icon, { color: color } as any]}

                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        handleTabPressOrder('chats');
                    }
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    href: "/profile",
                    tabBarLabel: "Profile",
                    title: "Profile",
                    tabBarIcon: ({color}) => (
                        <FontAwesomeIcon icon={faUser}
                            style={[styles.icon, { color: color } as any]}

                        />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        handleTabPressOrder('profile');
                    }
                }}
            />
        </Tabs>
    );

}

const styles = StyleSheet.create({
    container: {

    },
    icon: {
        width: 24,
        height: 24,
    }
})