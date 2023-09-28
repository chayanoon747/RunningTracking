import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export const RunningAnimated = ({ images }) => {
  const [index, setIndex] = useState(0);
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const animateImage = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start(animateImage); // เมื่อ animation เสร็จสิ้นให้เริ่ม animation ใหม่
      });
    };

    animateImage(); // เริ่ม animation ตั้งต้น
  }, []); // ถ้ามีการเปลี่ยนแปลงใน dependencies ค่า animateImage จะถูกเรียกใหม่

  return (
    <View style={styles.container}>
      <Animated.Image
        source={images[index]}
        style={[styles.image, { opacity }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
