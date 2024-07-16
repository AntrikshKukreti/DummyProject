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
import React, {useEffect, useState, useCallback} from 'react';
import data, {ItemData} from '../Constants/data';
import Item from '../Components/Item';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {AppDispatch, useAppSelector} from '../Redux/Store/store';
import {MainParallelogram} from '../Screens/parallelogram';
import Header from '../Components/Molecules/Header';
import {
  setSearch,
  fetchSearchResults,
  SearchResults,
} from '../Redux/Slice/slice';

const FlatListScreeen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const search = useAppSelector(state => state.user.Search);
  const status = useAppSelector(state => state.user.status);
  const error = useAppSelector(state => state.user.error);
  const searchResults = useAppSelector(state => state.user.searchResults);
  const [selectedId, setSelectedId] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState<ItemData[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchText(searchTerm);
      updateLocalVariable(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);
  useEffect(() => {
    if (searchResults) {
      console.log('Search Results:', searchResults);
    }
  }, [searchResults]);

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

  // const onPressFunction = (id: string) => {
  //   setSelectedId(id);
  // };

  const handleInputChange = async (text: string) => {
    setSearchTerm(text);
  };
  const updateLocalVariable = async (value: string) => {
    await EncryptedStorage.setItem(
      'searcedText',
      value,
      // JSON.stringify({
      //   age: 21,
      //   token: 'ACCESS_TOKEN',
      //   username: 'emeraldsanto',
      //   languages: ['fr', 'en', 'de'],
      // }),
    );

    dispatch(setSearch(value));
    dispatch(fetchSearchResults(value));
  };

  useEffect(() => {
    if (search) {
      dispatch(fetchSearchResults(search));
    }
  }, [dispatch, search]);

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

  const renderItem = ({item}: {item: SearchResults}) => {
    const backgroundColor =
      item.id.toString() === selectedId ? '#6e3b6e' : '#fff';
    return (
      <Item
        item={item}
        backgroundColor={backgroundColor}
        textColor={'#000'}
        categoryColor={'#7393B3'}
        borderColor={'#F0FFFF'}
        // onPress={() => onPressFunction(item.id?.toString())}
        details={item}
      />
    );
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: 130,
    offset: 130 * index,
    index,
  });

  return (
    <View style={[FlatListStyle.parentContainer]}>
      <Header title='Flat List'/>
      {/* <MainParallelogram /> */}
      <View style={[FlatListStyle.searchContainer]}>
        <AntDesign name="search1" size={20} color={'#7393B3'} />
        <TextInput
          style={[FlatListStyle.searchField]}
          placeholder="Type here to translate!"
          placeholderTextColor={'#7393B3'}
          onChangeText={e => handleInputChange(e)}
        />
      </View>
      {status === 'loading' ? (
        <ActivityIndicator />
      ) : searchResults.length ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
          extraData={selectedId}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={ListEndLoader}
          getItemLayout={getItemLayout}
        />
      ) : (
        <View style={[FlatListStyle.EmptyList]}>
          <Ionicons name="list" size={50} color={'#7393B3'} />
          <Text style={[FlatListStyle.nullItem]}>
            {error ? error : 'NO ITEM FOUND'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FlatListScreeen;

const FlatListStyle = StyleSheet.create({
  EmptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nullItem: {
    color: '#7393B3',
    fontSize: 18,
  },
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
  },
  searchField: {
    paddingHorizontal: 15,
    width: '85%',
    color: '#000',
  },
});
