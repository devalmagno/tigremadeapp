import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Header from '../components/Header';
import Title from '../components/Title';
import React from 'react';
import SourceCard from '../components/SourceCard';
import { useDataContext } from '../contexts/DataContext';

export default function Podcasts() {
    const { podcastsSource } = useDataContext();

    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Podcasts'
                icon={
                    <FontAwesome5 name="podcast" size={20} color="#fff" />
                }
            />

            <FlatList
                data={podcastsSource.sort((a, b) => Number(!a.isActive) - Number(!b.isActive))}
                renderItem={({ item }) => <SourceCard source={item} />}
                keyExtractor={item => item.id}
            />
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
});