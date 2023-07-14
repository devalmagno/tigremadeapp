import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from '../components/Card';
import Header from '../components/Header';
import Title from '../components/Title';
import React from 'react';

export default function Podcasts() {
    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Podcasts'
                icon={
                    <FontAwesome5 name="podcast" size={20} color="#fff" />
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