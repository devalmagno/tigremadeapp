import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EpisodeType } from '../types/PodcastType';

interface Props {
    episode: EpisodeType;
    image: string;
}

export default function EpisodeCard(props: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.column}>
                <Text style={styles.title}>{props.episode.title}</Text>
                <View style={styles.row}>
                    <Image
                        source={{
                            uri: props.image,
                        }}
                        style={styles.image}
                    />

                    <View style={styles.column}>
                        <Text style={styles.subtitle}>
                            {props.episode.content}
                        </Text>
                        <View style={styles.row}>
                            <Feather name="calendar" size={16} color="#fff" />
                            <Text style={styles.subtitle}>{props.episode.pubDate}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="arrow-down-circle" size={24} color="#717171" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#242424',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 2,
        marginBottom: 10,
        overflow: 'hidden',
    },
    info: {},
    column: {
        gap: 4,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontFamily: 'Poppins500',
        color: '#fff',
        fontSize: 13,
        maxHeight: 13,
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 12,
        color: '#f4f4f4',
        maxHeight: 40,
        maxWidth: 234,
    },
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