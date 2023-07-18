import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuthContext } from '../contexts/AuthContext';

export default function SettingsCard() {
    const { handlerLogout } = useAuthContext();

    return (
        <TouchableOpacity style={styles.container} onPress={handlerLogout}>
            <View style={styles.button}>
                <MaterialIcons name="logout" size={24} color="#FFC739" />
                <Text style={styles.title}>Fazer Logout</Text>
            </View>
        </TouchableOpacity>
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
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },
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