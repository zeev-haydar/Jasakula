import { ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
      style={{marginBottom: 15,}}
    >
      <TouchableOpacity style={{flex: 1,  width: '100%'}} activeOpacity={0.6} >
        <SearchResultCard id={id} nama={nama} harga={harga} rating={rating} source={source} />
      </TouchableOpacity>
    </Link>
  )
}

export default SearchResultCardWithLink

const styles = StyleSheet.create({})