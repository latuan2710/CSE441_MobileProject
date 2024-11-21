import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import SwiperFlatList from 'react-native-swiper-flatlist';

const banners = [
  require('@assets/images/banner_1.jpg'),
  require('@assets/images/banner_2.jpg'),
  require('@assets/images/banner_3.jpg'),
  require('@assets/images/banner_4.jpg'),
];
const {width} = Dimensions.get('window');

export default function HomeSlide() {
  return (
    <SwiperFlatList
      style={styles.slideContainer}
      autoplay
      autoplayLoop
      autoplayDelay={2}
      showPagination>
      {banners.map((item, index) => (
        <View style={styles.child}>
          <Image
            key={index}
            source={item}
            resizeMode="stretch"
            style={{
              height:200,
              width:width
            }}
          />
        </View>
      ))}
    </SwiperFlatList>
  );
}

const styles = StyleSheet.create({
  slideContainer: {width, height: 200},
  child: {width, justifyContent: 'center', height: 200},
  text: {fontSize: 20, textAlign: 'center'},
});
