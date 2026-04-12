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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const Home = () =>{
    const navigation = useNavigation();
    console.log("NAV:", navigation);
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}> 
                <View style={styles.bgContainer}>
                    <LinearGradient colors={['#5ECDC5', '#3e5974']}
                                    style={styles.background}
                                    start={{x: 0, y: 0}} 
                                    end={{x: 1, y: 1}}>
                        <Text style={styles.welcomeText}>Welcome!</Text>
                        <Text style={styles.helpText}>How can we help your pet today?</Text>
                    </LinearGradient>
                </View>

                <View style={styles.quickActionContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={[styles.card, { backgroundColor: '#5ECDC5' }]}
                                          onPress={() => navigation.navigate('Vets')}>
                            <MaterialCommunityIcons name="map-marker-outline" size={32} color="white" />
                            <Text style={styles.cardText}>Find Vets</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.card, {backgroundColor: '#FF8383' }]}
                            onPress={() => navigation.navigate('Book')}>
                            <MaterialCommunityIcons name="calendar-check-outline" size={32} color="white" />
                            <Text style={styles.cardText}>Book Appointment</Text>    
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, {backgroundColor: '#37c4ba' }]}>
                            <MaterialCommunityIcons name="qrcode-scan" size={32} color="white" />
                            <Text style={styles.cardText}>Pet QR Code</Text>    
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, {backgroundColor: '#9be2dd' }]}>
                            <MaterialCommunityIcons name="paw-outline" size={32} color="white" />
                            <Text style={styles.cardText}>My Pets</Text>    
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.appointmentContainer}>
                    <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                    <View style={styles.aptmntRowCard}>
                        <View style={styles.apptLeft}>
                             <Text style={styles.doctorName}>Dr. Sarah Jhonson</Text>
                             <Text style={styles.apptType}>Checkup - Max</Text>
                        </View>
                        <View style={styles.aptRight}>
                            <Text style={styles.apptDate}>Apr 10</Text>
                            <Text style={styles.apptTime}>2:00 PM</Text>
                        </View>
                    </View>

                    <View style={styles.aptmntRowCard}>
                        <View style={styles.apptLeft}>
                             <Text style={styles.doctorName}>Dr. Mike Brillante</Text>
                             <Text style={styles.apptType}>Vaccination - Luna</Text>
                        </View>
                        <View style={styles.aptRight}>
                            <Text style={styles.apptDate}>Apr 15</Text>
                            <Text style={styles.apptTime}>10:30 AM</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.petContainer}>
                    <Text style={styles.sectionTitle}>Pets</Text>
                    <View style={styles.petCard}>
                       <View style={styles.petInfoLeft}>
                            <View style={[styles.circle, { backgroundColor: '#5ECDC5' }]}>
                                <Text style={styles.avatarLetter}>M</Text>
                            </View>

                            <View style={styles.petTextContainer}>
                                <Text style={styles.petName}>Max</Text>
                                <Text style={styles.petDetail}>Golden Retriever • 3 years</Text>
                            </View>
                       </View>

                       <View style={styles.petInfoRight}>
                            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#5ECDC5" />
                       </View>
                    </View>

                    <View style={styles.petCard}>
                       <View style={styles.petInfoLeft}>
                            <View style={[styles.circle, { backgroundColor: '#FF8383' }]}>
                                <Text style={styles.avatarLetter}>L</Text>
                            </View>

                            <View style={styles.petTextContainer}>
                                <Text style={styles.petName}>Luna</Text>
                                <Text style={styles.petDetail}>Persian Cat • 2 years</Text>
                            </View>
                       </View>

                       <View style={styles.petInfoRight}>
                            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#5ECDC5" />
                       </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        backgroundColor:'#F8F9FA',
    },

    bgContainer: {
        height: '250',
        
    },

    background: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 30, 
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
    },

    welcomeText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'montserrat-bold',
    },

    helpText:{
        color: '#fff',
        fontSize: 14,
        fontWeight: '320',
        fontFamily: 'montserrat-regular',
        marginTop: 5,
    },

    quickActionContainer:{
        marginTop: -120,
        padding: 20,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        
        // shadow ng box yang baba
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'montserrat-bold',
        marginBottom: 15,
        color: '#1F395F',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    card: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        padding: 20,
    },
    cardText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'montserrat-regular',
        marginTop: 10,
        textAlign: 'center',
    },

    appointmentContainer:{
        padding: 20,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        marginTop: 5,
        
        elevation: 3,
        boxShadow: '0px 2.2px 0.1px rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    
    aptmntRowCard: {
        backgroundColor: '#F8F9FA', 
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    aptLeft: {
        flex: 1,
    },
    aptRight: {
        alignItems: 'flex-end', 
    },

    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F395F',
        fontFamily: 'montserrat-bold',
    },
    apptType: {
        fontSize: 14,
        color: '#8a8787',
        marginTop: 4,
        fontFamily: 'montserrat-regular',
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5ECDC5',
        fontFamily: 'montserrat-bold',
    },
    timeText: {
        fontSize: 13,
        color: '#1F395F',
        marginTop: 2,
        fontFamily: 'montserrat-regular',
    },

    petContainer: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        marginTop: 5,

        elevation: 3,
        boxShadow: '0px 2.2px 0.1px rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    petCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    petInfoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarLetter: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    petTextContainer: {
         flex: 1,
    },
    petName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F395F',
    },
    petDetail: {
        fontSize: 13,
        color: '#8a8787',
        marginTop: 2,
    },
    petInfoRight: {
        paddingLeft: 10,
    },
});