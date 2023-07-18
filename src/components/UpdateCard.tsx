import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function UpdateCard() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/perfil.jpg')}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>Tarja Preta FM</Text>
                <Text style={styles.subtitle}>#52 - Tarja Preta FM</Text>
            </View>

            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <TouchableOpacity>
                <Feather name="arrow-down-circle" size={24} color="#717171" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderRadius: 8,
    },
    info: {},
    title: {
        fontFamily: 'Inter500',
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Inter400',
        color: '#fff',
        fontSize: 12,
    },
    image: {
        resizeMode: 'contain',
        width: 42,
        height: 42,
        borderRadius: 72,
    },
});