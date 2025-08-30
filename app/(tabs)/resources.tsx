import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

interface Resource {
    _id: string;
    title: string;
    subject: string;
    description: string;
}

const subjects = ["Maths", "Science", "English", "Sinhala"];

const ResourcesScreen = () => {
    const [selectedSubject, setSelectedSubject] = useState("Maths");
    const [resources, setResources] = useState<Resource[]>([]);
    const router = useRouter();

    const fetchResources = async (subject: string) => {
        try {
            const res = await axios.get(`http://10.0.2.2:5000/api/resources?subject=${subject}`);
            setResources(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchResources(selectedSubject);
    }, [selectedSubject]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.tabs}>
                {subjects.map((subj) => (
                    <TouchableOpacity
                        key={subj}
                        style={[
                            styles.tab,
                            selectedSubject === subj && styles.activeTab,
                        ]}
                        onPress={() => setSelectedSubject(subj)}
                    >
                        <Text style={[
                            styles.tabText,
                            selectedSubject === subj && styles.activeTabText,
                        ]}
                        >
                            {subj}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={resources}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.resourceCard}>
                        <Text style={styles.resourceTitle}>{item.title}</Text>
                        <Text style={styles.resourceDesc}>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No resources found</Text>
                }
            />

            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => router.push("/")}
            >
                <Text style={styles.addBtnText}>Add Resource</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20
    },
    activeTab: {
        backgroundColor: "#1E3A8A"
    },
    tabText: {
        fontSize: 16,
        color: "#555"
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "bold"
    },
    resourceCard: {
        padding: 16,
        margin: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    resourceTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 6 
    },
    resourceDesc: { 
        fontSize: 14, 
        color: "#666" 
    },
    emptyText: { 
        textAlign: "center", 
        marginTop: 20, 
        fontSize: 16 
    },
    addBtn: {
        backgroundColor: "#1E3A8A",
        padding: 16,
        borderRadius: 30,
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "60%",
        alignItems: "center",
    },
    addBtnText: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold" 
    },

});

export default ResourcesScreen;