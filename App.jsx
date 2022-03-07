/*
  *** 実行方法 ***
  @PowerShell-1
  #エミュレータ一覧表示
  emulator -list-avds

  #エミュレータ起動（with ネット）
  emulator -avd Pixel_5_API_30 -dns-server 8.8.8.8

  @PowerShell-2
  #expo起動（ワークディレクトリで）
  expo start
*/
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Hello from './src/components/Hello';

export default function App() {
  return (
    <View style={styles.container}>
      <Hello bang>World</Hello>
      <Hello style={{ fontSize: 16 }}>Small World</Hello>
      <Text>Open up App.js to start working on your app!</Text>
      {/* eslint-disable-next-line */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
