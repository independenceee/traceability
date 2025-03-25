import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
} from "react-native";

export default function Viewer({
    title,
    data,
}: {
    title: string;
    // data: Array<{
    //     title: string;
    //     image: string;
    // }>;
    data: Array<any>;
}) {
    const { width, height } = Dimensions.get("window");

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map(function (
                    // item: { title: string; image: string },
                    item: any,
                    index: number
                ) {
                    return (
                        <TouchableOpacity key={index}>
                            <View style={styles.item}>
                                <Image
                                    source={{
                                        uri: "https://avatars.githubusercontent.com/u/108068667?v=4",
                                    }}
                                    style={{
                                        width: width * 0.33,
                                        height: height * 0.22,
                                        borderRadius: 12,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        marginLeft: 4,
                                        textAlign: "center",
                                    }}
                                >
                                    {"Nguyễn Duy Khánh".length > 16
                                        ? "Nguyễn Duy Khánh".slice(0, 14) +
                                          "..."
                                        : "Nguyễn Duy Khánh"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        gap: 4,
    },

    header: {
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: "white",
        fontSize: 20,
    },
    link: {
        color: "white",
        fontSize: 20,
    },

    item: {
        gap: 4,
        marginRight: 16,
    },
});
