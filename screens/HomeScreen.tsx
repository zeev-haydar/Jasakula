import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Dimensions, FlatList, } from 'react-native';
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { Stack, useRouter } from 'expo-router';
import Vector1 from '../assets/styling/vector_1.svg';
import { SearchBar } from '../components/search_bar';
import HomeCard from '../components/home_card';
import { useCategory } from '@/providers/CategoryProvider';
import { Tabs, Redirect, useFocusEffect, useRootNavigationState, useNavigationContainerRef } from "expo-router";
import { BackHandler } from "react-native";
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@/providers/AuthProvider';


/**
 * The Home Screen
 * @returns 
 */
export default function HomeScreen() {
  const catProvider = useCategory()
  const [session, setSession] = useState<Session | null>(null)
  const [text, setText] = React.useState("")
  const [nama, setNama] = React.useState("")
  const auth = useAuth();

  const router = useRouter();
  const handleSearch = () => {
    console.log("dienter");
    catProvider.changeCategory(null);
    router.navigate(`/search/search_result?query=${text}&category=false`);

  };

  useEffect(()=> {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        if (!session || !session.user) {
          // router.replace('/login');
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        // router.replace('/login');
      }
    };

    // console.log(auth.session)

    fetchSession();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (router.canDismiss()) router.dismissAll()
        BackHandler.exitApp();
        return true;
      };

      const onSwipeDown = () => {
        // refresh the page
      }

      // console.log(session)
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const itemData = [
    { id: 1, title: 'Web Dev' },
    { id: 2, title: 'UI/UX' },
    { id: 3, title: 'Frontend Dev' },
    { id: 4, title: 'Backend Dev' },
    { id: 5, title: 'Software Engineering' },
    { id: 6, title: 'ML Engineer' },
  ]

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <HomeCard title={item.title} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: true, headerTransparent: true, title: `Selamat Datang, ${session?.user?.user_metadata?.username ?? 'Pengguna'}.`,
        headerTitleStyle: { fontFamily: 'DMSans_700Bold', fontSize: 25 }
      }} />
      <View style={styles.background_vector}>
        <Vector1 />
      </View>
      <View style={styles.content}>
        <Text style={styles.welcome_text}>Layanan Jasa Terpopuler</Text>
        <View style={styles.card_grid}>
          <FlatList
            data={itemData}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />

        </View>
      </View>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // zIndex: -2,
    // position: 'absolute',
    // left: 0,
    // top: 0,


  },
  background_vector: {
    zIndex: -1,
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-start',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    aspectRatio: undefined
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 70,
    marginLeft: 17,
    marginRight: 17,
    // alignItems: 'center'

  },
  welcome_text: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },

  card_grid: {
    flex: 1,
    width: '100%',

  },
  item: {
    flex: 1,
    maxWidth: "33%", // 100% devided by the number of rows you want
    alignItems: "center",
    paddingLeft: 8,
    paddingVertical: 16

  },
  flatListContent: {
    flexGrow: 1,
  },
});