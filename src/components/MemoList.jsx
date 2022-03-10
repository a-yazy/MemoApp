import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import {
  string, shape, instanceOf, arrayOf,
} from 'prop-types';
import { Feather } from '@expo/vector-icons';

// コンポーネントの中でnavigationを利用するのに必要なHooks
// ※screenにはpropsに自動的にnavigationが渡されるがコンポーネントは渡されないため
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

/**
 * メモリスト
 */
export default function MemoList(props) {
  const { memos } = props;
  // navigation取得
  // ※React HooksはコンポーネントFunctionの直下でしか宣言できない
  const navigation = useNavigation();
  // リスト描画関数
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memoListItem}
      onPress={() => { navigation.navigate('MemoDetail'); }}
    >
      <View>
        <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
        <Text style={styles.memoListItemDate}>{String(item.updatedAd)}</Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => { Alert.alert('Are you sure?'); }}
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
