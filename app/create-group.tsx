import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRouter } from "expo-router";

const CreateGroupScreen = () => {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("Maths");
    const [grade, setGrade] = useState("No Grade");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync ({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name); 
            formData.append("subject", subject); 
            formData.append("grade", grade); 
            formData.append("description", description); 
            formData.append("userId", "USER_ID");
            
            if (image) {
                const fileName = image.split("/").pop();
                const fileType = fileName?.split(".").pop();
                formData.append("coverPhoto", {
                    uri: image,
                    name: fileName,
                    type: `image/${fileType}`,
                } as any);
            }

            await axios.post("http://10.0.2.2:5000/api/groups", formData, {
                headers: { "Content-Type": "multipart/form-data"},
            });
            router.back();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Group</Text>

            <TextInput
                placeholder="Enter group name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <Text style={styles.label}>Select Subject</Text>

            <Picker selectedValue={subject} onValueChange={setSubject} style={styles.picker}>
                <Picker.Item label="Maths" value="Maths"/>
                <Picker.Item label="Science" value="Science"/>
                <Picker.Item label="English" value="English"/>
                <Picker.Item label="Sinhala" value="Sinhala"/>
            </Picker>

            <Text style={styles.label}>Select Grade</Text>

            <Picker selectedValue={grade} onValueChange={setGrade} style={styles.picker}>
                <Picker.Item label="No Grade" value="No Grade"/>
                {Array.from ({ length: 13 }, (_, i) => (
                    <Picker.Item key={i + 1} label={`Grade ${i + 1}`} value={`Grade ${i + 1}`} />
                ))}
            </Picker>

            <TextInput
                placeholder="Enter group description"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, {height: 80}]}
                multiline
            />

            <TouchableOpacity style={styles.imgBtn} onPress={pickImage}>
                <Text style={styles.btnText}>Pick Cover Photo</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.preview}/>}

            <TouchableOpacity style={styles.btn} onPress={handleCreate}>
                <Text style={styles.btnText}>Create</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  imgBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  preview: { width: "100%", height: 150, borderRadius: 10, marginBottom: 15 },
  btn: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CreateGroupScreen;