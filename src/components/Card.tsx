import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { PodcastType } from '../types/PodcastType';
import { PodcastNavigationProp } from '../Router';

interface Props {
    podcast: PodcastType;
}

export default function Card(props: Props) {
    const navigation = useNavigation<PodcastNavigationProp>();

    function handlerNavigation() {
        navigation.navigate('PodcastScreen', {
            podcast: props.podcast,
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={handlerNavigation}
            >
                <View style={styles.banner}>
                    {props.podcast.image !== '' ? (
                        <Image
                            source={{
                                uri: props.podcast.image,
                            }}
                            style={styles.image}
                        />

                    ) : (
                        <View style={styles.image}>
                            <MaterialIcons name="image" size={24} color="#717171" />
                        </View>
                    )}
                </View>
                <View style={styles.info}>
                    <Text style={styles.subtitle}>
                        {props.podcast.episodes.length} episódios • {props.podcast.copyright}
                    </Text>
                    <Text style={styles.title}>{props.podcast.title}</Text>
                </View>
            </TouchableOpacity >
            <View style={styles.linkContainer}>
                <Pressable
                    style={styles.link}
                >
                    <FontAwesome5 name="rss" size={16} color="black" />
                    <Text style={styles.linkTitle}>RSS Feed</Text>
                </Pressable>

                <Pressable
                    style={styles.link}
                >
                    <FontAwesome5 name="telegram" size={16} color="black" />
                    <Text style={styles.linkTitle}>Grupo do Telegram</Text>
                </Pressable>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#242424',
    },
    banner: {
        backgroundColor: 'yellow',
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        height: 164,
        backgroundColor: '#F0F0F0',
    },
    info: {
        gap: 10,
        paddingTop: 12,
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: 'Poppins600',
        fontSize: 16,
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Inter500',
        fontSize: 14,
        color: '#fff',
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    linkTitle: {
        fontFamily: 'Inter500',
    },
})