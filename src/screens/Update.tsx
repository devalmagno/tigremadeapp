import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import Title from '../components/Title';

export default function Update() {
    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Atualizações'
                icon={
                    <MaterialCommunityIcons name="update" size={24} color="#fff" />
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