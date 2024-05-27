import { StyleSheet, View, Animated, Image } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Tabs, Redirect, Link, router, useNavigation } from "expo-router";
import { supabase } from '../utils/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Session } from '@supabase/supabase-js'
export default function NavBar() {
    const [orderStatus, setOrderStatus] = useState('inactive');
    const [session, setSession] = useState<Session | null>(null)

    const navigation = useNavigation();
    
    // Listen for changes in the tab status

    const purchaseOrderImages = {
        '#71BFD1': require('../assets/icons/purchase-order-71BFD1.png'),
        '#434343': require('../assets/icons/purchase-order-434343.png')
    }
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        console.log(session)

      }, [])
    
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
                    
                    href: session ? "/orders" : "/login",
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
                    
                    href: session ? {pathname: `/chats`, params: {user_id: session.user.id}} : "/login",
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
                    href: session ? "/profile" : "/login",
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