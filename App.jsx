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
import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from './src/components/AppBar';
import MemoList from './src/components/MemoList';
import CircleButton from './src/components/CircleButton';

export default function App() {
  return (
    <View style={styles.container}>

      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
