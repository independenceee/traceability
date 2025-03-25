import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";

export default function Trending({ trendings }: { trendings: number[] }) {
    const { width, height } = Dimensions.get("window");

    return (
        <View style={styles.wrapper}>
            <Carousel
                style={styles.container}
                autoPlayInterval={2000}
                loop
                pagingEnabled={true}
                snapEnabled={true}
                width={width}
                mode="parallax"
                height={height * 0.4}
                data={trendings}
                containerStyle={styles.container}
                autoPlay
                renderItem={({ item }) => (
                    <Image
                        source={{
                            uri: "https://avatars.githubusercontent.com/u/108068667?v=4",
                        }}
                        style={styles.image}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 10 },
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },
});
