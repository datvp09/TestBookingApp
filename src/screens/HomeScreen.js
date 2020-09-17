import React, {useEffect} from 'react';
import {Text, View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import ActionButton from '@logvinme/react-native-action-button';
import {getBookings} from 'redux/actions';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {bookings} = useSelector((state) => state.booking);
  const {username} = useSelector((state) => state.auth);
  const {isFetching} = useSelector((state) => state.data);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    if (!username || username == '') {
      return navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    }
    dispatch(getBookings({user: username}));
  };

  const onFABPress = () => {
    navigation.navigate('CreateBookingScreen');
  };

  const renderItem = ({item, index}) => {
    const {
      confirmed_datetime,
      created_at,
      created_by,
      event_location,
      event_title,
    } = item;

    return (
      <View style={styles.item}>
        <View style={styles.fieldGroup}>
          <Text style={styles.field}>{'Title:'}</Text>
          <Text style={styles.field}>{'Location:'}</Text>
          <Text style={styles.field}>{'Created at:'}</Text>
          <Text style={styles.field}>{'Created by:'}</Text>
          <Text style={styles.field}>{'Confirmed at:'}</Text>
        </View>
        <View>
          <Text>{event_title || '-'}</Text>
          <Text>{event_location || '-'}</Text>
          <Text>{moment(created_at).format('DD/MM/YYYY hh:mm:ss A')}</Text>
          <Text>{created_by || '-'}</Text>
          <Text>
            {moment(confirmed_datetime).format('DD/MM/YYYY hh:mm:ss A')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        offsetY={50}
        onPress={onFABPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  fieldGroup: {marginRight: 10},
  field: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
});

export default HomeScreen;
