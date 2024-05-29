// utils/imageUtils.js
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/utils/supabase';

export const handleSaveImage = async (image, userId) => {
    if (!image) {
        Alert.alert("Mana gambarnya?");
        return;
    } else {
        if (image.uri) {
            return;
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
            .from("avatars")
            .upload(filePath, arrayBuffer, metadata);

        if (error) {
            Alert.alert("Error uploading image:", error.message);
        } else {
            Alert.alert("Image uploaded successfully:", data.path);
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

export const loadImage = async (setImage, userId) => {
    try {
        // Mencoba mendapatkan URL publik untuk gambar PNG
        let { data, error } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl(`${userId}.png`, 800000);

        if (error) {
            // Jika gambar PNG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPG
            ({ data, error } = await supabase
                .storage
                .from('avatars')
                .createSignedUrl(`${userId}.jpg`, 800000));

            if (error) {
                // Jika gambar JPG tidak ditemukan, mencoba mendapatkan URL publik untuk gambar JPEG
                ({ data, error } = await supabase
                    .storage
                    .from('avatars')
                    .createSignedUrl(`${userId}.jpeg`, 8000000));

                if (error) {
                    console.error("Error: No image found");
                    return;
                }
            }
        }
        // Menggunakan URL publik yang diperoleh
        console.log("Public URL:", data.signedUrl);
        setImage({ uri: data.signedUrl });
    } catch (error) {
        console.error("Error fetching image:", error.message);
    }
};
