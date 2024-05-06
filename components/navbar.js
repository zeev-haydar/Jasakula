import { StyleSheet, View, Animated, Image } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Text, BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs, Redirect, Link, router } from "expo-router";
import {Icon} from '@iconify/react';

export default function NavBar() {
    return (
        <Tabs
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#71BFD1',
                tabBarInactiveTintColor: '#434343',
            }}

        >
        <Tabs.Screen
            name='home'
            options={{
                href: "/home",
                tabBarLabel: "Home",
                title: "Home",
                tabBarIcon: ({color,size}) => (
                    <Image
                    source={require('./assets/icons/home_icon.png')} // Change path to your PNG icon
                    style={{ tintColor: color, width: size, height: size }}
                />
                ),
            }}
        />
        <Tabs.Screen
            name='orders'
            options={{
                href: "/orders",
                tabBarLabel: "Orders",
                title: "Orders",
                tabBarIcon: ({color,size}) => (
                    <Icon icon={"icons8:order"} color={color} size={size} />
                ),
            }}
        />
        </Tabs>
    );

}

const styles = StyleSheet.create({
    container: {

    }
})