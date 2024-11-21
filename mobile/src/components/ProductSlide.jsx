import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import ProductCard from "./ProductCard";

export default function ProductSlide({data,title}) {
  return (
    <View style={{marginBottom: 25, paddingHorizontal: 10}}>
      <Text variant="titleLarge">{title}</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 10}}
        renderItem={({item}) => <ProductCard data={item} />}
      />
    </View>
  );
}
