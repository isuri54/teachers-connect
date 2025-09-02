import React, { useState} from "react";
import { Switch, View, Text, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
    const router = useRouter();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.settingRow}>
                    <Text style={styles.label}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>

                <View style={styles.settingRow}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.settingRow} onPress={() => router.push("/profile")}>
                    <Text style={styles.label}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingRow} onPress={() => router.push("/")}>
                    <Text style={styles.label}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingRow} onPress={() => router.push("/")}>
                    <Text style={styles.label}>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  section: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});