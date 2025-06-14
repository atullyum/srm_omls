
import CookieManager from '@react-native-cookies/cookies';
import React, { useEffect } from 'react'; // If you use useEffect, keep it here
import {
  View,
  Text,
  StatusBar,
  Alert, // If you use Alert, keep it here
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // If you use axios, keep it here

// ... rest of your code


export default function WelcomePage() {
const navigation = useNavigation();


const WelcomePage = () => {
  const userId = 'RA2411028030035';

  const getSession = async () => {
    try {
      const response = await axios.post(
        'https://srmhostel.site/olms/check_student_record',
        `reg_and_studid=${encodeURIComponent(userId)}&subval=submit`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      // ✅ Get cookies
      const cookies = await CookieManager.get('https://srmhostel.site');
      console.log('Cookies:', cookies);

      if (!cookies || !cookies.PHPSESSID) {
        Alert.alert('Failed to get session ID. Cannot proceed.');
      } else {
        console.log('Session ID:', cookies.PHPSESSID.value);
        // Continue navigation or logic here
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Failed to login. Try again.');
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return null; // replace with your real JSX
};



  
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <LinearGradient
        colors={['#0f0f0f', '#000000', '#050505']}
        className="flex-1"
      >
   
        <View className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500 opacity-10" 
              style={{ transform: [{ translateX: 40 }, { translateY: -20 }] }} />
        <View className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-500 opacity-10" 
              style={{ transform: [{ translateX: -40 }, { translateY: 40 }] }} />
              

        <View className="flex-1 justify-center items-center p-8">
     
          <View className="items-center mb-16">
            <View className="h-20 w-20 bg-white rounded-2xl items-center justify-center mb-4">
              <View className="h-12 w-12 bg-black rounded-lg items-center justify-center">
                <Text className="text-white font-bold text-lg">SRM </Text>
              </View>
            </View>
            <Text className="text-white font-bold text-3xl tracking-wider">SRM <Text className="text-gray-400">OLMS</Text></Text>
          </View>
          
        
          <View className="items-center mb-12">
            <Text className="text-white font-bold text-5xl mb-2 text-center">QUICK </Text>
            <Text className="text-white font-bold text-5xl mb-8 text-center">Experiences</Text>
            <Text className="text-gray-400 text-center text-lg leading-7 max-w-xs">
              LOGIN IN OUR SYSTEM FOR QUICK OUT/LEAVE PASS 
            </Text>
          </View>
          
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Nextpage')} 
              className="bg-white h-16 w-64 rounded-full items-center justify-center mb-16"
              >
          < Text className="font-bold text-black text-lg">Get Started</Text>
              </TouchableOpacity>

          
          
          <View className="flex-row mb-8">
            <View className="h-1 w-1 bg-gray-600 rounded-full mx-1" />
            <View className="h-1 w-1 bg-gray-600 rounded-full mx-1" />
            <View className="h-1 w-12 bg-white rounded-full mx-1" />
            <View className="h-1 w-1 bg-gray-600 rounded-full mx-1" />
            <View className="h-1 w-1 bg-gray-600 rounded-full mx-1" />
          </View>
          
          
          <View className="flex-row">
            <View className="h-8 w-8 bg-purple-500 rounded-md opacity-60 mr-3" />
            <View className="h-8 w-8 bg-blue-500 rounded-md opacity-60 mr-3" />
            <View className="h-8 w-8 bg-teal-500 rounded-md opacity-60" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}