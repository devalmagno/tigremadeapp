import { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import EpisodeCard from '../components/EpisodeCard';
import { PodcastScreenProps, PodcastNavigationProp } from '../Router';
import { useNavigation } from '@react-navigation/native';
import { EpisodeType } from '../types/PodcastType';

export default function PodcastScreen({ route }: PodcastScreenProps) {
    const [fullScreenHeight, setFullScreenHeight] = useState(0);
    const { podcast } = route.params;
    const navigation = useNavigation<PodcastNavigationProp>();

    function handlerPageName(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const currentScroll = event.nativeEvent.contentOffset.y;
        if (fullScreenHeight === 0) setFullScreenHeight(currentScroll);

        const targetScroll = fullScreenHeight + 200;
        if (currentScroll > targetScroll)
            navigation.setOptions({
                title: podcast.title,
                headerStyle: { backgroundColor: '#0E0E0E' },
            })
        else {
            navigation.setOptions({
                title: 'Voltar para Meus Podcasts',
                headerStyle: { backgroundColor: 'transparent' },
            })
        }
    }

    const renderItem = ({ item }: { item: EpisodeType }) => (
        <EpisodeCard episode={item} image={podcast.image} />
    );

    return (
        <FlatList
            onScroll={handlerPageName}
            style={styles.container}
            ListHeaderComponentStyle={styles.header}
            ListHeaderComponent={() => (
                <View style={{ gap: 8 }}>
                    <Image
                        source={{
                            uri: podcast.image,
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{podcast.title}</Text>
                    <View style={styles.row}>
                        <Feather name="users" size={16} color="#fff" />
                        <Text style={styles.subtitle}>Apresentado por:</Text>
                        <Text style={{ ...styles.subtitle, fontFamily: 'Inter500' }}>
                            {podcast.copyright.slice(5).replaceAll('\n', '')}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Feather name="headphones" size={16} color="#fff" />
                        <Text style={styles.subtitle}>{podcast.episodes.length} episódios</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        {podcast.description}
                    </Text>
                </View>
            )}
            data={[...podcast.episodes.reverse()]}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.title}${index}`}
            initialNumToRender={7}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0E0E',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 64,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins600',
        fontSize: 18,
        color: '#fff',
    },
    image: {
        width: '100%',
        height: 164,
        borderRadius: 4,
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 15,
        color: '#f4f4f4'
    },
});