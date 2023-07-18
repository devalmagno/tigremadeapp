import { ActivityIndicator, StyleSheet } from "react-native";

import { useDataContext } from "../contexts/DataContext";

export default function Loading() {
    const { isFetching } = useDataContext();

    return (
        <ActivityIndicator
            style={isFetching ? { ...StyleSheet.absoluteFillObject, ...styles.loading } : styles.hide}
            color="#FFC739"
            size="large"
            animating={isFetching}
        />
    )
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: '#0E0E0E',
        opacity: 0.8,
    },
    hide: {
        display: 'none',
    }
});