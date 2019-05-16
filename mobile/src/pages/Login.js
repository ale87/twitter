import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: ''
    }

    handleEmail = email => this.setState({ email })
    handlePassword = password => this.setState({ password })
    handleSubmit = async () => {
        const { email, password } = this.state
        try {
            const result = await (await fetch('http://192.168.0.2:3001/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })).json()
            if (result.msg) return this.setState({ msg: result.msg })
            this.props.navigation.navigate('Home')
        }
        catch (msg) {
            return
        }
    }

    render() {
        return (
            <View
                behavior='padding'
                style={styles.loginWrapper}>
                <View
                    style={styles.loginWrapperForm}>
                    <View>
                        <Icon
                            name='twitter'
                            size={60}
                            color='#1dcaff' />
                    </View>
                    <TextInput
                        style={styles.loginWrapperInput}
                        onChangeText={this.handleEmail}
                        placeholder='Email' />
                    <TextInput
                        style={styles.loginWrapperInput}
                        onChangeText={this.handlePassword}
                        secureTextEntry
                        placeholder='Senha' />
                    {!!this.state.msg &&
                        <Text style={styles.loginWrapperError}>{this.state.msg}</Text>
                    }
                    <TouchableOpacity
                        style={styles.loginWrapperButton}
                        onPress={this.handleSubmit}>
                        <Text style={styles.loginWrapperButtonText}>ACESSAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginWrapper: {
        flex: 1
    },
    loginWrapperForm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    loginWrapperInput: {
        borderBottomWidth: 0.4,
        borderColor: '#1dcaff',
        marginBottom: 20,
        alignSelf: 'stretch'
    },
    loginWrapperButton: {
        backgroundColor: '#4bb0ee',
        borderRadius: 5,
        padding: 15,        
        alignSelf: 'stretch'
    },
    loginWrapperButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginWrapperError: {
        color: '#f16d6d',
        alignSelf: 'stretch'
    }
})