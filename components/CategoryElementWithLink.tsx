import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCategory } from '@/providers/CategoryProvider'
import { Link } from 'expo-router';
import CategoryElement from './CategoryElement';

const CategoryElementWithLink = ({source, title,description}) => {

    const catProvider = useCategory();
    return (
        <Link push href={
            {
                pathname: "/search_result",
                params: {
                    query: title.toLowerCase().replace(/\s/g, ''),
                    category: true,
                }
            }
        }
            onPress={() => catProvider.changeCategory(
                title,
                description,
                source
            )
            }
        >
            <CategoryElement
                source={source}
                title={title}
                description={description}
            />
        </Link>
    )
}

export default CategoryElementWithLink

const styles = StyleSheet.create({})