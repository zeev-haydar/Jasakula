import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CategoryElement = ({ source, title, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image source={source} style={styles.image} resizeMode='cover' />

      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    padding: 10,
    maxHeight: 100,

  },
  image_container: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'DM-Sans',
  },
  textContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row', 
  },
  description: {
    fontSize: 14,
    color: '#9F9F9F',
    fontFamily: 'DM-Sans',

  },

})

export default CategoryElement