import React from 'react';
import { StyleSheet, 
        Text, 
        View, 
        Image, 
        TouchableOpacity, 
        SafeAreaView, 
        StatusBar} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import Logo from '../assets/img/ppcLogo.png';
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const SignUp = () =>{
     const [emailText, setemailText] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
     const [nameText, setnameText] = React.useState('');
     const navigation = useNavigation();
     console.log("NAV:", navigation);
    return(
         <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" />
              <LinearGradient
                colors={['#5ECDC5', '#3e5974']}
                style={styles.background}
              >
                <View style={styles.centerChild}>
                    <View style={styles.signUpBox}> 
                        <Image source={Logo} style={styles.logo} />
                        <Text style={styles.Title}>Paw Point Care</Text>
                        <Text style={styles.subtitle}>Your pet's health companion</Text>

                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput style={styles.textInput} 
                                    placeholder="Enter your name"
                                    onChangeText={newText => setnameText(newText)} 
                                    value={nameText}/>
        
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput style={styles.textInput} 
                                    placeholder="Enter your email"
                                    onChangeText={newText => setemailText(newText)} 
                                    value={emailText}/>
                        
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput style={styles.textInput} 
                                    placeholder="Enter your password"
                                    onChangeText={setPassword} 
                                    value={password}
                                    secureTextEntry={!isPasswordVisible}
                                    autoCapitalize="none"
                                    autoCorrect={false}/>
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    style={styles.iconPosition}>
                            <MaterialCommunityIcons 
                                    name={isPasswordVisible ? "eye-off" : "eye"} 
                                    size={24} 
                                    color="#ccc"/>
                        </TouchableOpacity>
                        </View>
        
                        <TouchableOpacity style={styles.signUpBtn}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("Home")}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
        
                        <Text style={styles.logInReference}
                           activeOpacity={0.8} 
                           onPress={() => navigation.navigate("Login")}>
                           Already have an account? Login
                        </Text>
                    </View>            
                </View>
              </LinearGradient>
            </SafeAreaView>
    );
};

export default SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    background: {
        flex: 1,
    },

    centerChild:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    signUpBox: 
    {
        width: '85%',
        minHeight: 595,
        margin: 20,
        borderRadius: 10,
        padding: 20,
        maxHeight: 500,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'relative',
    },

    logo:{
        resizeMode: 'contain',
        width: 125,
        height: 125,
    },

    Title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1F395F',
        fontFamily: 'montserrat-regular',
    },

    subtitle: {
        fontSize: 13,
        color: '#8a8787',
        fontFamily: 'montserrat-regular',
    },

    inputLabel: {
        marginTop: 20,
        alignSelf: 'flex-start',
        fontFamily: 'montserrat-regular',
        color: '#1F395F',
    },

    textInput: {
        fontFamily: 'montserrat-regular',
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        color: '#000',
        paddingRight: 50,
    },

    iconPosition: {
        position: 'absolute',
        right: 15,
        top: 20,    
    },

    passwordContainer: {
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        position: 'relative', 
    },

    signUpBtn: {
        marginTop: 20,
        backgroundColor: '#5ECDC5',
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 15,  
    },

    signUpText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    logInReference: {
        color: '#5ECDC5',
        marginTop: 15,
        fontFamily: 'montserrat-regular',
    }
});