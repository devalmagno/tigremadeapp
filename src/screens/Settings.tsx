import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Title from '../components/Title';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Configurações'
                icon={
                    <Ionicons name="ios-settings-outline" size={20} color="#fff" />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: '#0E0E0E',
        paddingHorizontal: 24,
    },
});