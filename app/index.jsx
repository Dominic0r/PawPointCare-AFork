import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import Logo from '../assets/img/ppcLogo.png'

const Home = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.img}></Image>

      <Text style={styles.title}>Home</Text>
      <Text>Welcome to Paw Point Care!</Text>
      <Button title='Go to Services' onPress={() => alert('Navigate to Services')}></Button>
    </View>
  )
}

export default Home  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title:{
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'montserrat-regular',
        color: '#1F395F '
    },

    img:{
        resizeMode: 'contain',
        width: 200,
        height: 200,
        marginBottom: 20
    },
})