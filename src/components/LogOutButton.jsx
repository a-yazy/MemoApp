import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

// コンポーネントの中でnavigationを利用するのに必要なHooks
// screenにはpropsに自動的にnavigationが渡されるがコンポーネントは渡されないので、このようにアクセス
import { useNavigation } from '@react-navigation/native';

/**
 * ログアウトボタン
 */
export default function LogOutButton() {
  // navigation取得
  // ※React HooksはコンポーネントFunctionの直下でしか宣言できない
  const navigation = useNavigation();

  // ログアウト押下時
  const handlePress = () => {
    // firebaseでログアウト
    firebase.auth().signOut()
      .then(() => {
        // --------------------
        // ログアウトＯＫ
        // --------------------
        // 画面遷移
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      })
      .catch(() => {
        // --------------------
        // ログアウトＮＧ
        // --------------------
        Alert.alert('ログアウトに失敗しました');
      });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
