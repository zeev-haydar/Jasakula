import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchResultCard from './SearchResultCard'
import Jasa from '@/models/Jasa'
import { Link } from 'expo-router'
import { useJasa } from '@/providers/JasaProvider'

const SearchResultCardWithLink: React.FC<{id:string, nama: string, rating: number, harga: number, source: ImageSourcePropType }> = ({id, nama, rating, harga, source }) => {

  return (
    <Link href={
      {
        pathname: `/search/works/[slug]`,
        params: {slug: id}
      }
    }
      asChild
    >
      <Pressable>
        <SearchResultCard nama={nama} harga={harga} rating={rating} source={source} />
      </Pressable>
    </Link>
  )
}

export default SearchResultCardWithLink

const styles = StyleSheet.create({})