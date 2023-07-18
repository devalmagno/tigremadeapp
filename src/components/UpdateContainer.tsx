import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import UpdateCard from './UpdateCard';

export default function UpdateContainer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hoje</Text>
            <UpdateCard />
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