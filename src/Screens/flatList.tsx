import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useDeferredValue,
} from 'react';
import data, {ItemData} from '../Constants/data';
import Item from '../Components/Item';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EncryptedStorage from 'react-native-encrypted-storage';

const FlatListScreeen = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState<ItemData[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchText(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // on scrollDown loading
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onPressFunction = (id: string) => {
    setSelectedId(id);
  };

  const handleInputChange = async (text: string) => {
    setSearchTerm(text);
    await EncryptedStorage.setItem(
      'searcedText',
      searchText,
      // JSON.stringify({
      //   age: 21,
      //   token: 'ACCESS_TOKEN',
      //   username: 'emeraldsanto',
      //   languages: ['fr', 'en', 'de'],
      // }),
    );

    // setInputValue(input);
  };

  // For showing Loader while pagination
  const ListEndLoader = () => {
    if (isLoading) {
      return <ActivityIndicator size={'large'} />;
    }
  };

  const newData = () => {
    let newData = dataList.map((item, idx) => ({
      ...item,
      id: `${dataList.length + idx + 1}`,
    }));
    return newData;
  };

  // function call for Infinite Scrolling.
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newDataResponse = newData();
      setDataList([...dataList, ...newDataResponse]);
      // setDataList(prevData => [...prevData, ...newDataResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#fff';
    return (
      <Item
        item={item}
        backgroundColor={backgroundColor}
        textColor={'#000'}
        borderColor={'#F0FFFF'}
        onPress={() => onPressFunction(item.id)}
      />
    );
  };

  return (
    <View style={[FlatListStyle.parentContainer]}>
      <View style={[FlatListStyle.searchContainer]}>
        <AntDesign name="search1" size={20} color={'#7393B3'} />
        <TextInput
          style={[FlatListStyle.searchField]}
          placeholder="Type here to translate!"
          placeholderTextColor={'#7393B3'}
          onChangeText={e => handleInputChange(e)}
        />
      </View>
      {searchText ? (
        <Text style={[FlatListStyle.serchResponse]}>{searchText}</Text>
      ) : null}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={dataList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ListEndLoader}
      />
    </View>
  );
};

export default FlatListScreeen;

const FlatListStyle = StyleSheet.create({
  serchResponse: {
    color: '#000',
    alignSelf: 'center',
  },
  searchContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0FFFF',
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 15,
  },
  parentContainer: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  searchField: {
    paddingHorizontal: 15,
    width: '85%',
    color: '#000',
  },
});
