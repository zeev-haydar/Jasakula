import React, { useState ,useEffect} from 'react';
import { View, Button,TouchableOpacity, Text, StyleSheet , FlatList} from 'react-native';
import { supabase } from '../utils/supabase';


// Komponen utama
const App = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetchItems1();
      fetchItems2();
      fetchItems3();
      fetchItems4();
    }, []);
  
    const fetchItems1 = async () => {
      const { data, error } = await supabase
        .from('jasa')
        .select('*');
  
      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }
    };
    const fetchItems2 = async () => {
        const { data, error } = await supabase
          .from('jasa')
          .select('*');
    
        if (error) {
          console.error('Error fetching items:', error);
        } else {
          setItems(data);
        }
      };
      const fetchItems3 = async () => {
        const { data, error } = await supabase
          .from('jasa')
          .select('*');
    
        if (error) {
          console.error('Error fetching items:', error);
        } else {
          setItems(data);
        }
      };
      const fetchItems4 = async () => {
        const { data, error } = await supabase
          .from('jasa')
          .select('*');
    
        if (error) {
          console.error('Error fetching items:', error);
        } else {
          setItems(data);
        }
      };
  const [currentScreen, setCurrentScreen] = useState('ScreenOne');

  const navigateToScreenTwo = () => setCurrentScreen('ScreenTwo');
  const navigateToScreenOne = () => setCurrentScreen('ScreenOne');
  const lineColor1 = currentScreen == 'ScreenOne' ? '#71BFD1' : '#C4C4C4';
  const lineColor2 = currentScreen == 'ScreenTwo' ? '#71BFD1' : '#C4C4C4';
  const textColor1 = currentScreen == 'ScreenOne' ? '#71BFD1' : '#C4C4C4';
  const textColor2 = currentScreen == 'ScreenTwo' ? '#71BFD1' : '#C4C4C4';
  // Komponen layar pertama
const ScreenOne = ({ onPress }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[styles.container , {marginTop: 15,flexDirection: 'row'}]}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#71BFD1', marginHorizontal: 47.5  }]}>
          <Text style={[styles.buttonText, {fontSize: 10}]}>Aktif</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#71BFD1' , marginHorizontal: 47.5 }]}>
          <Text style={[styles.buttonText, {fontSize: 10}]}>Selesai</Text>
        </TouchableOpacity>
      </View>
      <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
                {item.nama}
            </View>
          )}
        />
    </View>
  );
  
  // Komponen layar kedua
  const ScreenTwo = ({ onPress }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
    </View>
  );
  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
      <Text style={styles.headerText }>Pesanan dan Permintaan</Text>
    </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 5 }}>
      <TouchableOpacity style={[styles.buttonContainer ]} onPress={navigateToScreenOne} disabled={currentScreen === 'ScreenOne'}>
        <Text style={[styles.buttonText, {color: textColor1}]}>Pesanan</Text>
        
        
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={navigateToScreenTwo} disabled={currentScreen === 'ScreenTwo'}>
        <Text style={[styles.buttonText, {color: textColor2}]}>Permintaan</Text>
      </TouchableOpacity>

      </View>
      <View style={styles.lineContainer}>
      <View style={[styles.line,  { backgroundColor: lineColor1 }]} />
      <View style={[styles.line,  { backgroundColor: lineColor2 }]} />
      </View>

      {currentScreen === 'ScreenOne' ? <ScreenOne onPress={navigateToScreenTwo} /> : <ScreenTwo onPress={navigateToScreenOne} />}

    </View>
  );
  
};


const styles = StyleSheet.create({
    container: {
        backgroundColor : "F9F9F9",
        

      },
    buttonContainer: {
      width: '50%', // lebar 50% dari layar
      height: 40, // tinggi 40px
      backgroundColor: 'transparent', // tombol transparan
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center', // Untuk mengatur teks ke tengah secara vertikal
      alignItems: 'center', // Untuk mengatur teks ke tengah secara horizontal
      borderRadius: 10, // ubah kecilnya angka ini untuk menghilangkan border
    },
    buttonText: {
      fontSize: 16,
      fontFamily: "DM-Sans",
      fontWeight: 'bold',
      color: '9F9F9F', // warna teks tombol
    },
    header: {
        backgroundColor: '#71BFD1',
        height: 50,
        justifyContent: 'center', // Vertically center the text
        alignItems: 'center', // Horizontally center the text
        paddingHorizontal: 20,
      },
      headerText: {
        fontFamily: "DM-Sans",
        color: 'white', // Text color
        fontSize: 20,
        fontWeight: 'bold',
      },
      lineContainer: {
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Mengatur arah tata letak agar horizontal
      },
      line: {
        width: '50%', // Sesuaikan dengan lebar yang diinginkan
        height: 1.5, // Tinggi garis
        shadowColor: '#000', // Warna bayangan
        shadowOffset: { width: 0, height: 2}, // Posisi bayangan
        shadowOpacity: 0.15, // Transparansi bayangan
        shadowRadius: 2, // Jarak blur bayangan
        elevation: 2, // Hanya untuk Android, menambah kedalaman bayangan
      },
      button: {
        height: 22,
        width: 88,
        borderRadius: 5,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

      },
  });
export default App;
