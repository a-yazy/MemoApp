import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';
import Loading from '../components/Loading';

export default function LogInScreen(props) {
  // --------------------
  // 画面遷移用のオブジェクト(react-navigation)
  // ※Stack.Screen で定義されたscreenには自動的に渡される
  // --------------------
  const { navigation } = props;

  // --------------------
  // 画面の値を保持：useState(React Hooks)
  // --------------------
  // [保持したい値, 値を更新する関数] = useState('初期値');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);

  // --------------------
  // 画面を開いた時の処理：useEffect(React Hooks)
  // --------------------
  // 第２引数の配列に指定した値を監視し、変更される度にcallbackを実行する
  // 空の配列を指定：コンポーネントがマウントされた時に１度だけ実行
  // 省略：propsが変更されるなどして画面がアップデートされる度に実行
  useEffect(() => {
    // ログイン状態を監視（戻り値＝監視をキャンセルする関数）
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログインしている場合：自動的に画面遷移
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      } else {
        // ログインしていない場合：ローディング解除
        setLoading(false);
      }
    });
    // 画面が消える直前に実行する関数（監視をキャンセルする関数）を返す
    return unsubscribe;
  }, []);

  // --------------------
  // Submitボタン押下時の処理
  // --------------------
  const handlePress = () => {
    // Loading開始
    setLoading(true);
    // firebaseでログイン
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // ログインＯＫ
        const { user } = userCredential;
        console.log(user.uid);
        // 画面遷移（遷移履歴をリセットして遷移後にBackできなくする）
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        // ログインＮＧ
        Alert.alert(error.code);
        console.log(error.code, error.message);
      })
      .then(() => {
        // ＯＫ時もＮＧ時もここを通る
        // Loading終了
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="null">
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registerd?</Text>
          <TouchableOpacity
            onPress={() => {
              // 遷移履歴をリセット（遷移後にBackできなくする）
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
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
    color: '#000000',
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
