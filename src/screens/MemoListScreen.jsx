import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);

  // --------------------
  // 初期表示：ナビゲーションにログアウトボタンを追加
  // --------------------
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  // --------------------
  // メモ監視
  // --------------------
  useEffect(() => {
    // ログインユーザー取得
    const { currentUser } = firebase.auth();

    // 監視をキャンセルする関数（ダミー）
    let unsubscribe = () => {};

    // ログインユーザーが取得できる（ログイン状態）場合
    if (currentUser) {
      // firestore取得
      const db = firebase.firestore();

      // collection(ユーザーごとのmemos)への参照を取得（updatedAtの降順）
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAd', 'desc');

      // memosの内容を監視（戻り値＝監視をキャンセルする関数）
      unsubscribe = ref.onSnapshot((shapshot) => {
        // memosの内容を格納する配列
        const userMemos = [];
        // memosの内容を１件ずつループ
        shapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          const data = doc.data();
          // 配列にmemoのオブジェクトを追加
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAd: data.updatedAd.toDate(),
          });
        });
        // useStateにmemosの内容を格納する配列をセット
        setMemos(userMemos);
      }, (error) => {
        console.log(error);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }

    // 監視をキャンセルする関数を返す
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
