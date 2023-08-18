import { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Switch
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { PodcastSourceType } from '../types/PodcastSourceType';
import { useDataContext } from '../contexts/DataContext';
import { useAuthContext } from '../contexts/AuthContext';

interface Props {
    source: PodcastSourceType;
}

export default function SourceCard(props: Props) {
    const { podcastsSource, setPodcastsSource, getPodcastData, removePodcast } = useDataContext();
    const { token } = useAuthContext();

    function handlerSwitch(value: boolean) {
        const source = {
            ...props.source,
            isActive: value,
        }

        const sourceList = [...podcastsSource];

        const index = sourceList.indexOf(props.source);
        sourceList.splice(index, 1);
        sourceList.push(source);
        sourceList.sort((a, b) => {
            return Number(!a.isActive) - Number(!b.isActive);
        })

        setPodcastsSource([...sourceList]);

        if (value)
            getPodcastData(source.rss, token);
        else 
            removePodcast(source.rss);
    }

    return (
        <View style={styles.container}>
            {props.source.image !== '' ? (
                <Image
                    source={{
                        uri: props.source.image,
                    }}
                    style={styles.image}
                />

            ) : (
                <View style={styles.image}>
                    <MaterialIcons name="image" size={24} color="#717171" />
                </View>
            )}
            <Text style={styles.title}>{props.source.name}</Text>
            <View></View>
            <View></View>
            <View></View>
            <Switch
                value={props.source.isActive}
                onValueChange={handlerSwitch}
                trackColor={{ true: "#FFC739" }}
                thumbColor="#FFC739"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#242424',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    info: {},
    title: {
        fontFamily: 'Poppins500',
        color: '#fff',
    },
    subtitle: {},
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        width: 72,
        height: 72,
        borderRadius: 4,
        backgroundColor: '#F0F0F0',
    },
})