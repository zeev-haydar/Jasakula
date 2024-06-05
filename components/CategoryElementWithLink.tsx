import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useCategory } from '@/providers/CategoryProvider'
import { Link } from 'expo-router';
import CategoryElement from './CategoryElement';

const CategoryElementWithLink = ({ source, title, description }) => {

    const catProvider = useCategory();
    return (
        <Link href={
            {
                pathname: "/search/search_result",
                params: {
                    query: title,
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
            style={{ width: '100%', flexWrap: 'wrap', }}
            asChild
        >
            <Pressable>
                <CategoryElement
                    source={source}
                    title={title}
                    description={description}
                />
            </Pressable>

        </Link>
    )
}

export default CategoryElementWithLink

const styles = StyleSheet.create({})