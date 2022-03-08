import React from 'react';
import {
  StyleSheet, View, Text, TextInput, KeyboardAvoidingView,
} from 'react-native';

import AppBar from '../components/AppBar';
import Button from '../components/Button';

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="null">
      <AppBar />
      <View style={styles.inner}>

        <Text style={styles.title}>Sign Up</Text>
        <TextInput value="Email Address" style={styles.input} />
        <TextInput value="Password Address" style={styles.input} />

        <Button label="Submit" />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd?</Text>
          <Text style={styles.footerLink}>Log In.</Text>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    color: '#dddddd',
    fontSize: 16,
    height: 48,
    backgroundColor: '#ffffff',
    borderColor: '#dddddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
});
