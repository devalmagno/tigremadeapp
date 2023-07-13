import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Card from '../components/Card';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.titleContainer}>
                <Feather name="headphones" size={24} color="#fff" />
                <Text style={styles.title}>Podcasts</Text>
            </View>

            <Card />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: '#0E0E0E',
        paddingHorizontal: 24,
    },
    header: {
        justifyContent: 'center',
        height: 88,
    },
    logo: {
        width: 110,
        height: 56,
        resizeMode: 'contain',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    title: {
        fontFamily: 'Poppins600',
        color: '#fff',
        fontSize: 18,
    },
    list: {},
})