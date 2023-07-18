import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SettingsCard from './SettingsCard';

export default function SettingsContainer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conta</Text>
            <SettingsCard />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontFamily: 'Inter600',
        color: '#F4F4F4',
        fontSize: 13,
    },
});