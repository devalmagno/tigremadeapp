import { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { usePlayerContext } from '../contexts/PlayerContext';

import AudioPlayer from '../components/AudioPlayer';

export default function Player() {
    const { episode, image, title } = usePlayerContext();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ title: episode!.title, });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image
                    source={{
                        uri: image,
                    }}
                    style={styles.image}
                />
            </View>
            <View style={{ ...styles.row, justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={styles.column}>
                    <Text style={styles.title}>{episode!.title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.subtitle}>{title}</Text>
                        <View style={{ ...styles.row, marginLeft: 10, }}>
                            <Feather name="calendar" size={16} color="#F4F4F4" />
                            <Text style={styles.subtitle}>{episode!.pubDate}</Text>
                        </View>
                    </View>
                </View>
                <Feather name="arrow-down-circle" size={24} color="#717171" />
            </View>

            <AudioPlayer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#0E0E0E",
        padding: 24,
    },
    banner: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 256,
        height: 256,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    column: {},
    row: {
        flexDirection: 'row',
        gap: 4,
    },
    title: {
        fontFamily: 'Poppins600',
        color: "#fff",
    },
    subtitle: {
        fontFamily: 'Inter400',
        color: "#F4F4F4",
        fontSize: 13,
    },
});