import React, {useState} from 'react';
import {Text, View, StyleSheet, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Input, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {width, isiOS} from 'utils';
import moment from 'moment';
import {createBooking, showNotification, getBookings} from 'redux/actions';

const EVENT_TYPE = ['Health Talk', 'Wellness Event', 'Fitness Activities'];

const CreateBookingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {username} = useSelector((state) => state.auth);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [selectedEventTypeIndex, setSelectedEventTypeIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('-');
  const isButtonDisabled = locationText == '' || selectedDate == '-';
  const selectedDateText =
    selectedDate == '-'
      ? '-'
      : moment(selectedDate).format('DD/MM/YYYY hh:mm:ss A');

  const hideDatePicker = () => setIsDatePickerShow(false);

  const showDatePicker = () => setIsDatePickerShow(true);

  const onItemSelect = (index, value) => {
    setSelectedEventTypeIndex(index);
  };

  const handleDatePicked = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const onCreateSuccess = (data) => {
    dispatch(
      showNotification({
        notiMessage: 'Booking created successfully',
        notiType: 'success',
        notiTitle: 'Success',
        showNotiCallback: () => {
          navigation.goBack();
          setTimeout(() => dispatch(getBookings({user: username})), 1000);
        },
      }),
    );
  };

  const onCreateBooking = () => {
    dispatch(
      createBooking(
        {
          event_title: EVENT_TYPE[selectedEventTypeIndex],
          event_location: locationText,
          confirmed_datetime: moment(selectedDate).format(
            'YYYY-MM-DDTHH:mm:ss',
          ),
          created_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
          created_by: username,
        },
        onCreateSuccess,
      ),
    );
  };

  const renderDropDownItem = (option, index, isSelected) => (
    <Text
      key={index}
      style={[
        styles.modalRow,
        isSelected
          ? {fontWeight: 'bold', color: 'black'}
          : {color: 'rgba(0,0,0,0.7)'},
      ]}>
      {option}
    </Text>
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
      onStartShouldSetResponder={() => true}
      onResponderRelease={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          padding: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          <Text>{'Type of Event:'}</Text>
          <ModalDropdown
            dropdownStyle={styles.dropDownModal}
            options={EVENT_TYPE}
            defaultIndex={Number(selectedEventTypeIndex)}
            renderRow={renderDropDownItem}
            onSelect={onItemSelect}
            style={styles.dropDownModalContainer}>
            <View style={styles.dropDownButton}>
              <Text style={styles.dropDownButtonText} numberOfLines={1}>
                {EVENT_TYPE[selectedEventTypeIndex]}
              </Text>
              <Icon
                name={'arrow-drop-down'}
                size={22}
                style={styles.iconDropdown}
              />
            </View>
          </ModalDropdown>
        </View>
        <Text>{'Location of Event:'}</Text>
        <Input value={locationText} onChangeText={setLocationText} />
        <Text>{'Confirmed Date & Time:'}</Text>
        <Button
          title={selectedDateText}
          titleStyle={styles.datePickerButtonTitle}
          onPress={showDatePicker}
          containerStyle={styles.datePickerButtonContainer}
          buttonStyle={styles.datePickerButton}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerShow}
        mode="datetime"
        headerTextIOS={'Select date & time'}
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
      />
      <View style={styles.bottomButtonContainer}>
        <Button
          title="Create"
          onPress={onCreateBooking}
          buttonStyle={styles.buttonStyle}
          disabledTitleStyle={{color: 'white'}}
          disabledStyle={{backgroundColor: '#F05A22'}}
          containerStyle={{opacity: isButtonDisabled ? 0.7 : 1}}
          disabled={isButtonDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  modalRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  dropDownModal: {
    width: (width - 40) / 1.65,
    marginLeft: 10,
    marginTop: isiOS ? 1 : -22,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 3.5,
      height: 3.5,
    },
    shadowRadius: 42,
    shadowOpacity: 1,
    elevation: 5,
  },
  dropDownModalContainer: {
    width: (width - 40) / 1.5,
  },
  dropDownButton: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 38,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  dropDownButtonText: {
    fontSize: 14,
    marginRight: 12,
  },
  buttonStyle: {
    borderRadius: 24,
    height: 48,
    backgroundColor: '#F05A22',
  },
  bottomButtonContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  iconDropdown: {
    width: 18,
  },
  datePickerButtonTitle: {
    color: '#2E2E2E',
  },
  datePickerButtonContainer: {
    marginTop: 10,
  },
  datePickerButton: {
    backgroundColor: 'white',
  },
});

export default CreateBookingScreen;
