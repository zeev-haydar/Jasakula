import { View, Text } from 'react-native'
import React, { useState, useContext, createContext } from 'react'
import Category from '../models/Category';

const CategoryContext = createContext(null);

const CategoryProvider = ({children}) => {
    const [category, setCategory] = useState(null);

    const changeCategory = (title: string, description: string, image: any) => {
        const newCategory = new Category(title, description, image);
        setCategory(newCategory);
    }
    const value = {
        category,
        changeCategory,
      };
    
      return (
        <CategoryContext.Provider value={value}>
          {children}
        </CategoryContext.Provider>
      );
}

const useCategory = () => {
    const context = React.useContext(CategoryContext);
    if (!context) {
      throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
  };

export {CategoryProvider, useCategory}