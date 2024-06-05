import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { getImage } from '@/utils/images';

const ImageLoader = ({ id, style=null, resizeMode=' cover' }) => {
  const [uriImage, setUriImage] = useState('');

  useEffect(() => {
    const loadUri = async () => {
      const {uri} = await getImage(id, 'images');
      setUriImage(uri);
    }
    loadUri();
  }, [id]);

  return (
    <Image
      source={{ uri: uriImage || 'https://asset.kompas.com/crops/ZooJx7Zw6jqaVJeVsWEEVyOkor0=/27x0:863x558/750x500/data/photo/2023/02/18/63f02d9393e94.jpg' }}
      style={style || styles.image}
      resizeMode='stretch'
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '66%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover'
  },
});

export default ImageLoader;
