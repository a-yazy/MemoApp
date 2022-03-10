import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import {
  string, shape, instanceOf, arrayOf,
} from 'prop-types';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase';

// コンポーネントの中でnavigationを利用するのに必要なHooks
// ※screenにはpropsに自動的にnavigationが渡されるがコンポーネントは渡されないため
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { dateToString } from '../utils';

/**
 * メモリスト
 */
export default function MemoList(props) {
  const { memos } = props;

  // navigation取得
  // ※React HooksはコンポーネントFunctionの直下でしか宣言できない
  const navigation = useNavigation();

  // --------------------
  // 削除ボタン押下時の処理
  // --------------------
  const deleteMemo = (id) => {
    // ログインユーザー取得
    const { currentUser } = firebase.auth();

    // ログインユーザーが取得できる（ログイン状態）場合
    if (currentUser) {
      // firestore取得
      const db = firebase.firestore();
      // collection(ユーザーごとmemos)への参照を取得
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      // 確認メッセージ
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            // ドキュメント削除
            ref.delete().catch(() => {
              // ドキュメント削除ＮＧ
              Alert.alert('削除に失敗しました');
            });
          },
        },
      ]);
    }
  };
  // リスト描画関数
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memoListItem}
      onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
    >
      <View>
        <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
        <Text style={styles.memoListItemDate}>{dateToString(item.updatedAd)}</Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => { deleteMemo(item.id); }}
      >
        <Feather name="x" size={16} color="#B0B0B0" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,

  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
