import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { supabase } from '../utils/supabase';
import { Button } from 'react-native-paper';
import { useAuth } from '@/providers/AuthProvider';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

const App = () => {
  const auth = useAuth();
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [menu1, setMenu1] = useState("Pesanan");
  const [menu2, setMenu2] = useState("Aktif");
  const [id, setId] = useState("")
  useEffect(() => {
    fetchItems1();
    fetchItems2();
    fetchItems3();
    fetchItems4();
    setId(auth.session?.user.id);
  }, []);

  useEffect(() => {
    console.log(id)
  }, [id]);


  const fetchItems1 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select(' id,tanggal, cost, waktu, jasa (id, nama, deskripsi, url_gambar)')
      .eq('pengguna_id', 'id')
      .eq("waktu", "Aktif");
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems1(data);

    }
  };

  const fetchItems2 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select(' id,tanggal, cost, waktu, jasa (id, nama, deskripsi, url_gambar)')
      .eq('pengguna_id', id)
      .eq("waktu", "Selesai");
    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems2(data)

    }
  };

  const fetchItems3 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select(' id,tanggal, cost, waktu, jasa (id, nama, deskripsi, url_gambar)')
      .eq('penjual_pengguna_id', id)
      .eq('waktu','Aktif')


    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems3(data);


    }
  };

  const fetchItems4 = async () => {
    const { data, error } = await supabase
      .from('order')
      .select(' id,tanggal, cost, waktu, jasa (id, nama, deskripsi, url_gambar)')
      .eq('penjual_pengguna_id', id)
      .eq('waktu','Selesai')


    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems4(data);

    }
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

  const formatToRupiah = (number) => {

    const reversed = String(number).replace(/\D/g, '').split('').reverse();
    

    const formatted = reversed.reduce((acc, digit, index) => {
      return digit + (index && index % 3 === 0 ? '.' : '') + acc;
    }, '');
  

    return 'Rp ' + formatted;
  };

  
  const renderItem = ({ item }) => (
    <View style={{ alignSelf: "center" }}>
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item?.jasa.url_gambar }} 
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 10, fontFamily: 'DMSans_700Bold'}}>{truncateText(item.jasa.nama,10)}</Text>
        <Text style={{ fontSize: 10, fontFamily: 'DMSans_400Regular', marginTop: 7}}>{truncateText(item.jasa.deskripsi,10)}</Text>
        <View style={styles.alignBottomContainer}>
          <Text style={[styles.alignBottomText,{color : '#71BFD1'}]}>{formatToRupiah(item.cost)}</Text>
        </View>
      </View>
    </View>
  </View>
  );




  const checkCondition = () => {
    if (menu1=='Pesanan' && menu2 == 'Aktif') {
      return items1;
    } else if (menu1=='Pesanan' && menu2 == 'Selesai') {
      return items2;
    } else if (menu1=='Permintaan' && menu2 == 'Aktif') {
      return items3;
    }  else {
      return items4;
    }
  }
 


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pesanan dan Permintaan</Text>
      </View>
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
      <View style={[styles.container, { marginTop: 15, flexDirection: 'row', alignSelf: "center" }]} >
        <Button style={[styles.button, { backgroundColor: buttonColor1, marginHorizontal: 47.5 }]} onPress={() => { setMenu2("Aktif") }}>
          <Text style={[styles.buttonText, { fontSize: 10, color: textColor1 }]}>Aktif</Text>
        </Button>
        <Button style={[styles.button, { backgroundColor: buttonColor2, marginHorizontal: 47.5 }]} onPress={() => { setMenu2("Selesai") }}>
          <Text style={[styles.buttonText, { fontSize: 10, color: textColor2 }]}>Selesai</Text>
        </Button>
      </View>
      <View>
      <FlatList
        data={checkCondition()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFFF",
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
    fontFamily: "DM-Sans",
    fontWeight: 'bold',
    color: '#9F9F9F',
  },
  header: {
    backgroundColor: '#71BFD1',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "DM-Sans",
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lineContainer: {
    paddingTop: 0,
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
    height: 22,
    width: 88,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    height: 95,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 25,
    
  },
  imageContainer: {
    width: '33.33%',
    height: '100%',
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
    paddingVertical : 10,
  },
  alignBottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  alignBottomText: {
    fontSize: 10,
    fontFamily: 'DMSans_500Medium',
    alignSelf: 'flex-end', // Align text to the right
  },
});

export default App;
