import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Alert,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // --------------------
  // 初期表示：ナビゲーションにログアウトボタンを追加
  // --------------------
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { <LogOutButton />; },
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
      // Loading開始
      setLoading(true);
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
        // Loading終了
        setLoading(false);
      }, () => {
        // Loading終了
        setLoading(false);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }

    // 監視をキャンセルする関数を返す
    return unsubscribe;
  }, []);

  // ０件の場合
  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }

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

// --------------------
// スタイル
// --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});
