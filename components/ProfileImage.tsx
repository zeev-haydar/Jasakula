import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileImage = ({image}) => {



    return (
        <>
            {image?.assets ? (
                <Image source={{ uri: image.assets[0].uri }} style={{ width: 160, height: 160, borderRadius: 80 }} />
            ) : (
                image ? (
                    <Image source={{ uri: image.uri }} style={{ width: 160, height: 160, borderRadius: 80 }} />
                ) : (
                    <View style={{ backgroundColor: '#000', padding: 20, borderRadius: 640, width: 160, height: 160, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faUser} size={80} color='#71BFD1' />
                    </View>
                )
            )}
        </>
    )
}

export default ProfileImage

const styles = StyleSheet.create({})