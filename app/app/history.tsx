import Timeline from "@/components/timeline";
import { StyleSheet, View } from "react-native";

export default function History() {
    return (
        <View style={styles.container}>
            <Timeline />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20,
    },
});
