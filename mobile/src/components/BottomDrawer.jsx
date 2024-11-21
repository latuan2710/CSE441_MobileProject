import {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function BottomDrawer({visible, onClose, children}) {
  const translateY = useSharedValue(300);

  const rBottomSheetStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
    } else {
      translateY.value = withSpring(300);
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <TouchableOpacity
          activeOpacity={0}
          onPress={onClose}
          style={styles.overlay}
        />
      )}
      <Animated.View style={[styles.container, rBottomSheetStyles]}>
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    bottom: 0,
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  overlay: {
    height: 300,
    backgroundColor: '#000',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
});
