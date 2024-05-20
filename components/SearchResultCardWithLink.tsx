import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchResultCard from './SearchResultCard'
import Jasa from '@/models/Jasa'
import { Link } from 'expo-router'
import { useJasa } from '@/providers/JasaProvider'

const SearchResultCardWithLink: React.FC<{ jasa: Jasa, source: ImageSourcePropType }> = ({ jasa, source }) => {
  const jasaProvider = useJasa();

  const handleJasa = () => {
    jasaProvider.changeJasa(jasa);
  }

  return (
    <Link push href={
      {
        pathname: `/search/works/[slug]`,
        params: {slug: jasa.id}
      }
    }
    onPress={()=>handleJasa()}
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