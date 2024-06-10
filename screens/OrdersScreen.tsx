import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image, RefreshControl } from 'react-native';
import { supabase } from '../utils/supabase';
import { Button, TouchableRipple } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { formatPrice, printAllElements } from '@/utils/formatting';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '@/components/StackHeader';
import { useRouter } from 'expo-router';
import { useOrder } from '@/providers/order_provider';

const App = () => {
  const router = useRouter();
  const auth = useAuth();
  const order = useOrder();

  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [menu1, setMenu1] = useState("Pesanan");
  const [menu2, setMenu2] = useState("Aktif");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchItems1();
    fetchItems2();
    fetchItems3();
    fetchItems4();
  }, []);

  useEffect(() => {
    console.log(auth.session?.user.id)
  }, [auth.session?.user.id]);


  const fetchItems1 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select('*, jasa: jasa_id(id, nama, deskripsi, url_gambar)')
      .eq('pengguna_id', auth.session?.user.id)
      .eq("waktu", "Aktif");
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems1(data);
      console.log("Data 1:\n");
      // printAllElements(data);

    }
  };

  const fetchItems2 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select('*, jasa: jasa_id(id, nama, deskripsi, url_gambar)')
      .eq('pengguna_id', auth.session?.user.id)
      .eq("waktu", "Selesai");
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems2(data)
      console.log("Data 2:\n");
      // printAllElements(data);

    }
  };

  const fetchItems3 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select('* jasa: jasa_id(id, nama, deskripsi, url_gambar)')
      .eq('penjual_pengguna_id', auth.session?.user.id)
      .eq('waktu', 'Aktif')


    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems3(data);
      console.log("Data 3:\n");
      // printAllElements(data);


    }
  };

  const fetchItems4 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select('*, jasa: jasa_id(id, nama, deskripsi, url_gambar)')
      .eq('penjual_pengguna_id', auth.session?.user.id)
      .eq('waktu', 'Selesai')


    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems4(data);
      console.log("Data 4:\n");
      // printAllElements(data);

    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchItems1();
    await fetchItems2();
    await fetchItems3();
    await fetchItems4();
    setRefreshing(false);
  };

  const lineColor1 = menu1 === 'Pesanan' ? '#71BFD1' : '#C4C4C4';
  const lineColor2 = menu1 === 'Permintaan' ? '#71BFD1' : '#C4C4C4';
  const textColor1 = menu2 === 'Aktif' ? '#F9F9F9' : '#71BFD1';
  const textColor2 = menu2 === 'Selesai' ? '#F9F9F9' : '#71BFD1';
  const buttonColor1 = menu2 === 'Aktif' ? '#71BFD1' : '#F9F9F9';
  const buttonColor2 = menu2 === 'Selesai' ? '#71BFD1' : '#F9F9F9';
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const handlePressOrder = (item) => {
    order.changeOrder(item)
    router.navigate("/orders/" + item.id)
  }


  const renderItem = ({ item }) => (
    <TouchableRipple style={styles.card} onPress={()=>handlePressOrder(item)} rippleColor={'#71bfd122'}>
      <>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.jasa?.url_gambar?.length > 0 ? item?.jasa?.url_gambar : 'https://www.youngontop.com/wp-content/uploads/2023/10/elephant-amboseli-national-park-kenya-africa.jpg' }}
            style={styles.image} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 10, fontFamily: 'DMSans_700Bold' }}>{truncateText(item.jasa.nama, 10)}</Text>
          <Text style={{ fontSize: 10, fontFamily: 'DMSans_400Regular', marginTop: 7 }}>{truncateText(item.jasa.deskripsi, 10)}</Text>
          <View style={styles.alignBottomContainer}>
            <Text style={[styles.alignBottomText, { color: '#71BFD1' }]}>Rp{formatPrice(item.cost)}</Text>
          </View>
        </View>
      </>

    </TouchableRipple>
  );




  const checkCondition = () => {
    if (menu1 == 'Pesanan' && menu2 == 'Aktif') {
      return items1;
    } else if (menu1 == 'Pesanan' && menu2 == 'Selesai') {
      return items2;
    } else if (menu1 == 'Permintaan' && menu2 == 'Aktif') {
      return items3;
    } else {
      return items4;
    }
  }



  return (
    <View style={styles.container}>
      <StackHeader title={"Pesanan dan Permintaan"} />
      <View style={{ backgroundColor: '#fff', flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 5 }}>
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => { setMenu1("Pesanan") }}>
            <Text style={[styles.buttonText, { color: lineColor1 }]}>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { setMenu1("Permintaan") }}>
            <Text style={[styles.buttonText, { color: lineColor2 }]}>Permintaan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: lineColor1 }]} />
          <View style={[styles.line, { backgroundColor: lineColor2 }]} />
        </View>
        <View style={[{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-around', }]} >
          <Button style={[styles.button, { backgroundColor: buttonColor1, }]}
            contentStyle={{ alignItems: 'center' }}
            labelStyle={[styles.buttonText, { fontSize: 15, color: textColor1, width: '100%' }]}
            onPress={() => { setMenu2("Aktif") }}>
            <Text>Aktif</Text>
          </Button>
          <Button style={[styles.button, { backgroundColor: buttonColor2, }]}
            contentStyle={{ alignItems: 'center' }}
            labelStyle={[styles.buttonText, { fontSize: 15, color: textColor2, width: '100%' }]}
            onPress={() => { setMenu2("Selesai") }}>
            <Text >Selesai</Text>
          </Button>
        </View>

        <FlatList
          data={checkCondition()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.orderList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#71bfd1",
    width: '100%',
    flex: 1,
  },
  buttonContainer: {
    width: '50%',
    height: 40,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: '#9F9F9F',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    backgroundColor: '#71BFD1',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "DMSans_700Bold",
    color: 'white',
    fontSize: 20,
  },
  lineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    width: '50%',
    height: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    height: '35%',
    width: '40%',
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    height: '55%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 1,

  },
  imageContainer: {
    width: '33.33%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentContainer: {
    width: '66.67%',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  alignBottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  alignBottomText: {
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
    alignSelf: 'flex-end', // Align text to the right
  },
  orderList: {
    flex: 1,
    paddingHorizontal: 10
  }
});

export default App;
