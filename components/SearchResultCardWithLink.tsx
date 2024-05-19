import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchResultCard from './SearchResultCard'
import Jasa from '@/models/Jasa'
import { Link } from 'expo-router'

const SearchResultCardWithLink: React.FC<{ jasa: Jasa, source: ImageSourcePropType }> = ({ jasa, source }) => {
  return (
    <Link push href={
      {
        pathname: `/works/${jasa.id}`,
      }
    }
      asChild
    >
      <Pressable>
        <SearchResultCard jasa={jasa} source={source} />
      </Pressable>
    </Link>
  )
}

export default SearchResultCardWithLink

const styles = StyleSheet.create({})