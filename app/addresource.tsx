import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter } from "expo-router";

const AddResourceScreen = () => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("Maths");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            await axios.post("http://10.0.2.2:5000/api/resources", {
                title,
                subject,
                description,
                userId: "USER_ID",
            });
            router.back();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/>

            <Text style={styles.label}>Subject</Text>
            <Picker selectedValue={subject} onValueChange={setSubject} style={styles.picker}>
                <Picker.Item label="Maths" value="Maths"/>
                <Picker.Item label="Science" value="Science"/>
                <Picker.Item label="English" value="English"/>
                <Picker.Item label="Sinhala" value="Sinhala"/>
            </Picker>

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, {height: 100}]}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Add Resource</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#1E3A8A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});

export default AddResourceScreen;