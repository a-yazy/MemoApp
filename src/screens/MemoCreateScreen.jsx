import React, { useState } from 'react';
import {
  StyleSheet, View, TextInput, KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props) {
  const { navigation } = props;

  // --------------------
  // 画面の値を保持：useState(React Hooks)
  // --------------------
  // [保持したい値, 値を更新する関数] = useState('初期値');
  const [bodyText, setBodyText] = useState('');

  // --------------------
  // Checkボタン押下時の処理
  // --------------------
  const handlePress = () => {
    // ログインユーザー取得
    const { currentUser } = firebase.auth();
    // firestore取得
    const db = firebase.firestore();
    // collection(ユーザーごとmemos)への参照を取得
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    // ドキュメント追加（キー＝"bodyText"、値＝bodyText）
    ref.add({
      bodyText,
      updatedAd: new Date(),
    })
      .then((docRef) => {
        // ドキュメント追加ＯＫ
        console.log('Created!', docRef.id);
        // 画面遷移（遷移元に戻る）
        navigation.goBack();
      })
      .catch((error) => {
        // ドキュメント追加ＮＧ
        console.log('Error!', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="null">
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
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
