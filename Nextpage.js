import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function Nextpage() {
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const WelcomePage = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={srmLogo}
        style={{ width: 120, height: 120, resizeMode: 'contain' }}
      />
      <Text>Welcome!</Text>
    </View>
  );
};


const sendOtp = async () => {
  try {
    const response = await fetch('https://www.srmimthostel.net/olms/check_student_record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36'
      },
      body: `reg_and_studid=${encodeURIComponent(userId)}&subval=submit`
    });

    console.log('Response headers:', response.headers);
    const setCookie = response.headers.get('set-cookie');
    console.log('Set-Cookie:', setCookie);

    // Wait for the cookie to be set
    setTimeout(async () => {
      const cookieData = await Cookies.get('https://www.srmimthostel.net');
      console.log('Cookies:', cookieData);

      if (cookieData && cookieData.PSESSIONID?.value) {
        setSessionId(cookieData.PSESSIONID.value);
        setShowOtpInput(true);
        alert('OTP sent! Please enter it.');
      } else {
        alert('Failed to get session ID. Cannot proceed.');
      }
    }, 1000); // 1 second wait
  } catch (error) {
    console.error('OTP Error:', error);
    alert('Something went wrong while sending OTP');
  }
};



  const verifyOtp = async () => {
    try {
      const response = await fetch('https://www.srmimthostel.net/olms/check_student_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': `PSESSIONID=${sessionId}`,
        },
        body: `reg_number=${encodeURIComponent(userId)}&otp=${encodeURIComponent(otp)}`
      });

      const result = await response.text();
      console.log(result);

      if (result.includes('Login Successful')) {
        alert('✅ Login successful!');
      } else {
        alert('❌ Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Error verifying OTP');
    }
  };

  return (
    <View className="flex-1 bg-[#1a1a2e] items-center justify-center px-6">
      {/* SRM Logo */}
      <Image
        source={require('../assets/srm_logo.png')}
        style={{ width: 300, height: 100, resizeMode: 'contain', marginBottom: 40 }}
      />

      {/* Login Card */}
      <View className="bg-white w-full rounded-3xl p-6 shadow-lg space-y-4">

        {/* Reg Number Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-3">
          <Ionicons name="person-outline" size={24} color="#333" />
          <TextInput
            placeholder="Enter Registration Number"
            placeholderTextColor="#888"
            value={userId}
            onChangeText={setUserId}
            className="ml-3 flex-1 text-black"
          />
        </View>

        {/* OTP Input (conditionally shown) */}
        {showOtpInput && (
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-3">
            <Ionicons name="lock-closed-outline" size={24} color="#333" />
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor="#888"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              className="ml-3 flex-1 text-black"
            />
          </View>
        )}

        {/* Send or Verify Button */}
        <TouchableOpacity
          onPress={showOtpInput ? verifyOtp : sendOtp}
          className="bg-[#1a1a2e] rounded-xl py-3 items-center mt-2"
        >
          <Text className="text-white text-lg font-semibold">
            {showOtpInput ? "Verify OTP" : "Send OTP"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
