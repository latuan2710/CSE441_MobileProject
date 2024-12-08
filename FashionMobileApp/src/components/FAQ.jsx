import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const FAQ = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = index => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const FAQ_ITEMS = [
    {
      question: "Can I track my order's delivery status?",
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      question: 'Is there a return policy?',
      answer: 'Yes, you can return items within 30 days.',
    },
    {
      question: 'Can I save my favorite items for later?',
      answer: 'Use the Wishlist feature to save items.',
    },
    {
      question: 'Can I share products with my friends?',
      answer: 'You can share via social media or email.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'Visit the Contact Us section.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept Visa, MasterCard, and PayPal.',
    },
    {
      question: 'How to add review?',
      answer: 'Go to the product page and click "Write a Review."',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {FAQ_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleItem(index)}
          style={styles.item}>
          <View>
            <Text style={styles.question}>{item.question}</Text>
            {expandedItem === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default FAQ;
