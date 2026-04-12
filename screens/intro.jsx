import React from 'react';
import { StyleSheet, 
        Text, 
        View, 
        Image, 
        TouchableOpacity, 
        SafeAreaView, 
        StatusBar 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Logo from '../assets/img/ppcLogo.png';
import { useNavigation } from '@react-navigation/native';


const Intro = () => {
  const navigation = useNavigation();
  console.log("NAV:", navigation);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.logoWrapper}>
        <Image source={Logo} style={styles.img} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to{"\n"}Paw Point Care</Text>
        <Text style={styles.subtitle}>Your complete pet care companion</Text>
      </View>

      <View style={styles.featuresList}>
        
        <View style={styles.featureRow}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="map-marker-radius-outline" size={26} color="#7ee7d9" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Find Nearby Vets</Text>
            <Text style={styles.featureDesc}>Locate veterinarians and pet clinics in your area</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#7ee7d9" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Pet QR Profiles</Text>
            <Text style={styles.featureDesc}>Generate QR codes for your pets with all their details</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="calendar-check-outline" size={26} color="#7ee7d9" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Easy Booking</Text>
            <Text style={styles.featureDesc}>Schedule appointments with just a few taps</Text>
          </View>
        </View>

      </View>

      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C4AB', 
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  logoWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 35,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  img: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 45,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: 'montserrat-regular',
  },

  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
    opacity: 0.9,
  },

  featuresList: {
    width: '100%',
    gap: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  featureText: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  featureDesc: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 2,
  },

  button: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 18,
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },

  buttonText: {
    color: '#00C4AB',
    fontSize: 18,
    fontWeight: 'bold',
  },
});