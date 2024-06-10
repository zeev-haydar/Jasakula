// utils/imageUtils.js
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase';

export const handleSaveImage = async (image, userId, bucket='avatars') => {
    if (!image) {
        return "Mana gambarnya?";
        Alert.alert("Mana gambarnya?");
        
    } else {
        if (image.uri) {
            return null;
        }
    }

    try {
        const uri = image.assets[0].uri;
        const response = await fetch(uri);
        const imageBlob = await response.blob();

        const mimeType = image.assets[0].mimeType;
        const extension = mimeType.split('/')[1];
        const filePath = `${userId}.${extension}`;

        const metadata = {
            contentType: mimeType,
            upsert: true
        };

        const arrayBuffer = await new Response(imageBlob).arrayBuffer();

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, arrayBuffer, metadata);

        if (error) {
            return error.message
            Alert.alert("Error uploading image:", error.message);
            
        } else {
            return null
            Alert.alert("Image uploaded successfully:", data.path);
        }
    } catch (error) {
        Alert.alert("Error handling image:", error.message);
    }
};

export const handleSaveImageButReturnPublicUrl = async (image, userId, bucket='avatars') => {
    if (!image) {
        return "Mana gambarnya?";
        Alert.alert("Mana gambarnya?");
        
    } else {
        if (image.uri) {
            return null;
        }
    }

    try {
        const uri = image.assets[0].uri;
        const response = await fetch(uri);
        const imageBlob = await response.blob();

        const mimeType = image.assets[0].mimeType;
        const extension = mimeType.split('/')[1];
        const filePath = `${userId}.${extension}`;

        const metadata = {
            contentType: mimeType,
            upsert: true
        };

        const arrayBuffer = await new Response(imageBlob).arrayBuffer();

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, arrayBuffer, metadata);

        if (error) {
            throw Error(error.message)
            Alert.alert("Error uploading image:", error.message);
            
        } else {
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);



            return data.publicUrl;
            Alert.alert("Image uploaded successfully:");
        }
    } catch (error) {
        Alert.alert("Error handling image:", error.message);
    }
};

export const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result);
    }
};

export const loadImage = async (setImage, userId, bucket='avatars') => {
    try {
        // Mencoba mendapatkan URL publik untuk gambar PNG
        let { data, error } = await supabase
            .storage
            .from(bucket)
            .createSignedUrl(`${userId}.png`, 800000);

        if (error) {
            // Jika gambar PNG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPG
            ({ data, error } = await supabase
                .storage
                .from(bucket)
                .createSignedUrl(`${userId}.jpg`, 800000));

            if (error) {
                // Jika gambar JPG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPEG
                ({ data, error } = await supabase
                    .storage
                    .from(bucket)
                    .createSignedUrl(`${userId}.jpeg`, 8000000));

                if (error) {
                    console.log("Error: No image found");
                    return;
                }
            }
        }
        // Menggunakan URL publik yang diperoleh
        console.log("Public URL:", data.signedUrl);
        setImage({ uri: data.signedUrl });
    } catch (error) {
        console.log("Error fetching image:", error.message);
    }
};

export const getImage = async (id, bucket = 'avatars') => {
    try {
        // Mencoba mendapatkan URL publik untuk gambar PNG
        let { data, error } = await supabase
            .storage
            .from(bucket)
            .createSignedUrl(`${id}.png`, 8000);

        if (error) {
            // Jika gambar PNG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPG
            ({ data, error } = await supabase
                .storage
                .from(bucket)
                .createSignedUrl(`${id}.jpg`, 8000));

            if (error) {
                // Jika gambar JPG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPEG
                ({ data, error } = await supabase
                    .storage
                    .from(bucket)
                    .createSignedUrl(`${id}.jpeg`, 8000));

                if (error) {
                    console.log("Error: No image found");
                    return {uri: ''};
                }
            }
        }
        // Menggunakan URL publik yang diperoleh
        console.log("Public URL:", data.signedUrl);
        return { uri: data.signedUrl };
    } catch (error) {
        console.error("Error fetching image:", error.message);
        return {uri: ''};
    }
}

export const getUserAvatarURI = async (userId) => {
    try {
      // Try to get the public URL for the PNG image
      let { data, error } = await supabase
        .storage
        .from('avatars')
        .createSignedUrl(`${userId}.png`, 800000);
  
      if (error) {
        // If the PNG image is not found, try to get the public URL for the JPG image
        ({ data, error } = await supabase
          .storage
          .from('avatars')
          .createSignedUrl(`${userId}.jpg`, 800000));
  
        if (error) {
          // If the JPG image is not found, try to get the public URL for the JPEG image
          ({ data, error } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl(`${userId}.jpeg`, 8000000));
  
          if (error) {
            console.log("Error: No image found");
            return null;
          }
        }
      }
  
      // Return the obtained public URL
      console.log("Public URL:", data.signedUrl);
      return data.signedUrl;
    } catch (error) {
      console.error("Error fetching image:", error.message);
      return null;
    }
  };