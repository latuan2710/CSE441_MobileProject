import MyView from '@components/MyView';
import OrderItem from '@components/OrderItem';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, IconButton, Text, TextInput } from 'react-native-paper';

export default function Review({navigation}) {
  const [order, setOrder] = useState({
    id: 1,
    name: 'Brown Jacket',
    quantity: 10,
    price: 83.71,
    imageUrl:
      'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/pack3loUntitled-2_copy_86.jpg',
  });

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Leave Review" titleStyle={styles.title} />
      </Appbar.Header>
      <View>
        <OrderItem
          orderDetail={order}
          buttonTitle={'Re-Order'}
          onPress={() => console.log('Re-Order')}
        />
      </View>
      <MyView style={styles.container}>
        <Text style={styles.questionText}>How is your order?</Text>
        <Text style={styles.ratingLabel}>Your overall rating</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <IconButton
              key={index}
              icon={rating > index ? 'star' : 'star-outline'}
              iconColor="#F2C94C"
              size={30}
              onPress={() => setRating(index + 1)}
            />
          ))}
        </View>
        <Text variant="titleMedium">Add detailed review</Text>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          placeholder="Enter here"
          value={review}
          onChangeText={setReview}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button mode="outlined" style={styles.button} onPress={() => {}}>
            Cancel
          </Button>
          <Button mode="contained" style={styles.button} onPress={() => {}}>
            Submit
          </Button>
        </View>
      </MyView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  ratingLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
});
