import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Card from '../components/Card';
import Header from '../components/Header';
import Title from '../components/Title';

export default function MyPodcasts() {
    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Meus Podcasts'
                icon={
                    <Feather name="headphones" size={20} color="#fff" />
                }
            />
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
    list: {},
});