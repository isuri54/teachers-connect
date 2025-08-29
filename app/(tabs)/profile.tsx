import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

interface Profile {
    profilePicture: string;
    name: string;
    email: string;
    subject: string;
    school: string;
}

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile | null> (null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://10.0.2.2:5000/api/users/USER_ID");
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <Text style={styles.loading}>Loading...</Text>

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: profile.profilePicture || "https://via.placeholder.com/150" }}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <Text style={styles.info}><Text style={styles.label}>Name:</Text>{profile.name}</Text>
                <Text style={styles.info}><Text style={styles.label}>Email:</Text>{profile.email}</Text>
                <Text style={styles.info}><Text style={styles.label}>Subject:</Text>{profile.subject}</Text>
                <Text style={styles.info}><Text style={styles.label}>School:</Text>{profile.school}</Text>
            </View>

            <TouchableOpacity style={styles.item} onPress={() => router.push("/")}>
                <Text>⚙️ Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => router.push("/")}>
                <Text style={styles.itemText}>🔒 Privacy Policy</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  loading: { 
    textAlign: "center", 
    marginTop: 20 
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2, 
    borderColor: "#1E3A8A" 
  },
  section: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderColor: "#eee" 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#1E3A8A" 
  },
  info: { 
    fontSize: 16, 
    marginBottom: 8 
  },
  label: { 
    fontWeight: "bold" 
  },
  item: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  itemText: { 
    fontSize: 16 
  },
});

export default ProfileScreen;