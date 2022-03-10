import React, { useState } from 'react';
import {
  StyleSheet, View, TextInput, KeyboardAvoidingView, Alert,
} from 'react-native';
import { string, shape } from 'prop-types';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;

  // 遷移元からのパラメータ
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  // --------------------
  // Checkボタン押下時の処理
  // --------------------
  const handlePress = () => {
    // ログインユーザー取得
    const { currentUser } = firebase.auth();

    // ログインユーザーが取得できる（ログイン状態）場合
    if (currentUser) {
      // firestore取得
      const db = firebase.firestore();
      // collection(ユーザーごとmemos)への参照を取得
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // ドキュメント更新（キー＝"bodyText"、値＝bodyText）
      ref.set({
        bodyText: body,
        updatedAd: new Date(),
      }, { marge: true })
        .then(() => {
          // 画面遷移（遷移元に戻る）
          navigation.goBack();
        })
        .catch((error) => {
          // ドキュメント更新ＮＧ
          const errorMsg = translateErrors(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="null">
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={body}
          onChangeText={(text) => { setBody(text); }}
          style={styles.input}
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

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
});
