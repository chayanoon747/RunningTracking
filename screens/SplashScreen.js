import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Roboto_100Thin, Roboto_500Medium, Roboto_700Bold, Roboto_900Black} from '@expo-google-fonts/roboto';

export const SplashScreen = ({ navigation }) => {
  const logo = require('../assets/splashlogo_1.png')
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen');
      navigation.reset({ index: 0, routes: [{ name: 'SignInScreen' }] });
    }, 2000);
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#F2F2F2']} style={styles.container}>
      <Animated.View style={styles.logoContainer}>
      <Image source={logo} style={styles.logoImage} />
      {/**<Text style={styles.logoText}>LOADING...</Text>*/}
      <Text style={styles.subtitle}>LOADING...</Text>
    
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    color: '#000000', 
    fontSize: 36,
    fontFamily: 'Roboto_900Black',
    marginTop: 10,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 36,
    fontFamily: 'Roboto_900Black',
    marginTop: 10,
  },
  logoImage: {
    width: 300, 
    height: 300, 
  }
});
