import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, Text, View, Alert,
} from 'react-native';
import { string, shape } from 'prop-types';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

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
      // ドキュメントへの参照を取得
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // memoの内容を監視（戻り値＝監視をキャンセルする関数）
      unsubscribe = ref.onSnapshot((doc) => {
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAd: data.updatedAd.toDate(),
        });
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
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAd)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: 'auto' }}
        name="edit-2"
        onPress={() => { navigation.navigate('MemoEdit'); }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
  },
});
