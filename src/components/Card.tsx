import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Card() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
            >
                <View style={styles.banner}>
                    <Image
                        source={require('../../assets/images/banner.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.subtitle}>
                        52 episódios • Quinzenalmente aos sábados
                    </Text>
                    <Text style={styles.title}>Tarja Preta FM</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Pressable
                    style={styles.link}
                >
                    <FontAwesome5 name="rss" size={20} color="black" />
                    <Text style={styles.linkTitle}>RSS Feed</Text>
                </Pressable>

                <Pressable
                    style={styles.link}
                >
                    <FontAwesome5 name="telegram" size={20} color="black" />
                    <Text style={styles.linkTitle}>Grupo do Telegram</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: '#242424',
    },
    banner: {
        backgroundColor: 'yellow',
    },
    image: {
        width: '100%',
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