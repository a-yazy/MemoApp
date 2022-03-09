import React from 'react';
import {
  StyleSheet, View, TextInput, KeyboardAvoidingView,
} from 'react-native';

import CircleButton from '../components/CircleButton';

export default function MemoEditScreen(props) {
  const { navigation } = props;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="null">
      <View style={styles.inputContainer}>
        <TextInput value="買い物リスト" multiline style={styles.input} />
      </View>
      <CircleButton
        name="check"
        onPress={() => { navigation.goBack(); }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 27,
    paddingHorizontal: 32,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
  },
});
