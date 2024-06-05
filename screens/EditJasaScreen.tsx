import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
import StackHeader from '@/components/StackHeader'
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { router } from 'expo-router';
import { getImage, loadImage } from '@/utils/images';

const EditJasaScreen = () => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [id, setId] = useState("")

  const fetchUri = async (itemId) => {
    const { uri } = await getImage(itemId, 'images');
    return uri;
  }
  

  const ImageLoader = ({ item }) => {
    const [uriImage, setUriImage] = useState('');

    useEffect(() => {
      const loadUri = async () => {
        const uri = await fetchUri(item.id);
        setUriImage(uri);
      }
      loadUri();
    }, [item.id]);

    return (
      <Image source={{ uri: uriImage || 'https://asset.kompas.com/crops/ZooJx7Zw6jqaVJeVsWEEVyOkor0=/27x0:863x558/750x500/data/photo/2023/02/18/63f02d9393e94.jpg' }} style={styles.image} />
    );
  };
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('penjual')
      .select('id, pengguna_id, jasa (*)')
      .eq('pengguna_id', auth.session?.user?.id).single()
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setData(data.jasa);

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
    router.navigate('/profile/jasa/add')
  };

  const handleDelete = async (itemId) => {
    const { error } = await supabase
      .from('jasa')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete the item.');
    } else {
      setData(prevData => prevData.filter(item => item.id !== itemId));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}
      onLongPress={() => {
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete this item?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => handleDelete(item.id),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      }}
      >

        <ImageLoader item={item} />
        <View style={{ padding: 6 }}>
          <Text>{item.nama}</Text>
        </View>
      </TouchableOpacity>

    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StackHeader title={"Menu Tambahkan Jasa"} />
      <View style={{ flexDirection: 'row', marginVertical: 20, paddingHorizontal: 20, width: '100%', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, fontFamily: 'DM-Sans', paddingTop: 6 }}>
          Jasa Anda
        </Text>
        <View style={{ paddingLeft: 20 }}>
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
    marginTop: 20,
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
    resizeMode: 'stretch'
  },
});