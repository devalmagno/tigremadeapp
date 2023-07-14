import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useAuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handlerAuth } from '../services/api';

export default function Login() {
    const {
        changeEmail,
        changePassword,
        email,
        handlerLogin,
        password,
        errorMessage,
        changeLoggedStatus,
        changeToken,
    } = useAuthContext();

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem('token');
    //             if (value !== null) {
    //                 const result = await handlerAuth(value);
    //                 changeLoggedStatus(result);
    //                 if (result) changeToken(value);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }

    //     getData();
    // }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />

            <View>
                <Text style={styles.title}>Faça login na sua conta Saco Cheio</Text>

                <View style={styles.form}>
                    <View style={styles.inputField}>
                        <Text style={styles.subtitle}>E-mail</Text>
                        <View style={styles.inputBox}>
                            <Feather name="user" size={24} color="white" />
                            <TextInput
                                value={email}
                                onChangeText={changeEmail}
                                style={styles.input}
                                placeholder='Digite seu e-mail...'
                                textContentType='emailAddress'
                            />
                        </View>
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.subtitle}>Senha</Text>
                        <View style={styles.inputBox}>
                            <Feather name="lock" size={24} color="white" />
                            <TextInput
                                value={password}
                                onChangeText={changePassword}
                                style={styles.input}
                                placeholder='Digite sua senha...'
                                textContentType='password'
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

                    {errorMessage !== '' && (
                        <Text style={styles.error}>
                            {errorMessage}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlerLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View></View>
            <View></View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#0E0E0E',
    },
    logo: {
        width: '100%',
        height: 56,
        resizeMode: 'contain',
    },
    title: {
        fontFamily: 'Poppins600',
        color: '#fff',
        fontSize: 16,
        marginLeft: 32,
    },
    subtitle: {
        fontFamily: 'Inter500',
        color: '#fff',
        fontSize: 15,
    },
    form: {
        marginTop: 20,
        paddingHorizontal: 32,
        gap: 20,
    },
    inputField: {
        gap: 10,
    },
    inputBox: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    input: {
        height: 42,
        width: Dimensions.get('window').width - 98,
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 16,
        color: "#0E0E0E",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 42,
        backgroundColor: "#FFC739",
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Inter600',
        letterSpacing: 0.5,
        color: "#0E0E0E"
    },
    error: {
        fontFamily: 'Inter500',
        color: '#f53c3c'
    }
});