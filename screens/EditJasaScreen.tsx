import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { supabase } from '../utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
import StackHeader from '@/components/StackHeader'
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { router } from 'expo-router';

const EditJasaScreen = () => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [id, setId] = useState("")
  const renderItem = ({ item }) => (


    <View style={styles.item}>
      <Image source={{ uri: item.url_gambar.length > 0 ? item.url_gambar : 'https://asset.kompas.com/crops/ZooJx7Zw6jqaVJeVsWEEVyOkor0=/27x0:863x558/750x500/data/photo/2023/02/18/63f02d9393e94.jpg' }} style={styles.image} />

      <View style={{ padding: 6 }}>
        <Text>{item.nama}</Text>
      </View>
    </View>

  );
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('penjual')
      .select(' id, pengguna_id, jasa (*)')
      .eq('pengguna_id',auth.session?.user?.id)
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setData(data[0].jasa);

    }
  };
  useEffect(() => {
    setId(auth.session?.user?.id);

    fetchData()
  }, []);
  useEffect(() => {
    console.log(id, "asd", data)
  }, [id, data]);


  const handleButtonPress = () => {
    router.replace('/profile/jasa/add')
  };
  return (
    <View style={{flex: 1}}>
      <StackHeader title={"Menu Tambahkan Jasa"} />
      <View style={{ flexDirection: 'row', marginVertical: 20, paddingHorizontal: 20, width: '100%', justifyContent: 'space-between'}}>
        <Text style={{ fontSize: 20, fontFamily: 'DM-Sans', paddingTop: 6 }}>
          Jasa Anda
        </Text>
        <View style={{ paddingLeft: 20}}>
          <TouchableOpacity style={styles.greenButton} onPress={handleButtonPress}>
            <Text style={{ color: 'white', fontFamily: 'DM-Sans', fontSize: 14 }}>Buat Jasa Baru</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line}>

      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};


export default EditJasaScreen
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    height: 160,
    width: '45%', // width - padding * 2 / numColumns
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    marginTop :20,
    elevation: 1,
  },
  line: {
    width: '90%',
    height: 1.5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: "center",
  },
  greenButton: {
    backgroundColor: '#71BFD1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: '66%', // 2/3 dari tinggi item
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});