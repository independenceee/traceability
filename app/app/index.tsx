import Trending from "@/components/trending";
import Viewer from "@/components/viewer";
import { StatusBar } from "expo-status-bar";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.content}>
                    <TouchableOpacity>
                        <Bars3CenterLeftIcon
                            size={30}
                            strokeWidth={2}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.logo}>Traceability</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon
                            size={30}
                            strokeWidth={2}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.trending}
                showsVerticalScrollIndicator={false}
            >
                <Trending trendings={[1, 2, 3, 4, 5, 6]} />

                <Viewer title="Upcoming" data={[1, 2, 3, 4, 5, 6]} />
                <Viewer title="Upcoming" data={[1, 2, 3, 4, 5, 6]} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#262626",
    },
    container: {
        marginBottom: 0,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    logo: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: "bold",
    },
    trending: {},
});
