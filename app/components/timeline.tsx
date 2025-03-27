import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Timeline({ data = [] }) {
    const [height, setHeight] = useState<number>(0);

    const Dash = function () {
        const numberDashed = height / 7;

        return (
            <View
                style={{
                    height: "auto",
                    width: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: 10,
                    left: 50,
                }}
            >
                {Array.from({ length: numberDashed }).map(function (_, index) {
                    return (
                        <View
                            key={index}
                            style={{
                                height: 7,
                                width: 2,
                                backgroundColor: "#adadad",
                                marginBottom: 10,
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.wrapper}>
            {data.map(function (content, index) {
                return (
                    <View
                        key={index}
                        style={{
                            height: "auto",
                            alignSelf: "stretch",
                            marginBottom: 20,
                            overflow: "hidden",
                        }}
                    >
                        <Dash />

                        <View
                            style={styles.container}
                            onLayout={function (event) {
                                return setHeight(
                                    event.nativeEvent.layout.height
                                );
                            }}
                        >
                            <View style={styles.timeline}>
                                <Text>30</Text>
                                <Text>June</Text>
                            </View>
                            <View style={styles.content}>
                                {[1, 2, 3].map(function (metadata, index) {
                                    return (
                                        <View
                                            key={index}
                                            style={styles.metadata}
                                        >
                                            <Text>Name</Text>
                                            <Text>Nguyễn Duy Khánh</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden",
    },

    container: {
        height: "auto",
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#dadada",
        marginBottom: 40,
    },

    timeline: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: 50,
        height: 50,
    },

    content: {
        flex: 1,
    },

    metadata: {
        height: "auto",
        alignSelf: "stretch",
        backgroundColor: "#f1f1f1",
    },
});
