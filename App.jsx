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

import MemoDetailScreen from './src/screens/MemoDetailScreen';

export default function App() {
  return (
    <MemoDetailScreen />
  );
}
