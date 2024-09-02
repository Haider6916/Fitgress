 /**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
 import React, {useEffect, useState} from 'react';
 import {View} from 'react-native';
 import Modal from 'react-native-modal';
 import { Calendar } from 'react-native-calendars';
 
 const CalenderModal = props => {
   const {
     visible,
     onSwipeComplete,
     swipeDown = true,
     onBackdropPress = false,
     Data,
   } = props;


   const [selectedDate, setSelectedDate] = useState(null);

   return (
     <Modal
       isVisible={visible}
       {...(swipeDown ? {swipeDirection: 'down'} : {})}
       style={{
         justifyContent: 'center',
         marginHorizontal:20,
         margin: 0,
       }}
       backdropOpacity={0.5}
       onBackdropPress={() => {
         onBackdropPress && onSwipeComplete();
       }}
       onSwipeComplete={() => onSwipeComplete()}>
       <View
         style={{
           borderRadius: 6,
           borderTopLeftRadius: 24,
           borderTopRightRadius: 24,
         }}>
        <View style={{marginTop:15}}>
        <Calendar
                // markedDates={markedDates}
                // onDayPress={(day) => {
                //     if (workoutData[day.dateString]) {
                //         openModal(day.dateString);
                //     }
                // }}
                onDayPress={day => {
                    Data(day)
                  }}
                theme={{
                    backgroundColor: '#1f2937',
                    calendarBackground: '#1f2937',
                    textSectionTitleColor: '#f9fafb',
                    dayTextColor: 'white',
                    monthTextColor: 'white',
                }}
            />
         </View>
         {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 15,
        }}>
        <Button
          buttonStyle={{flex: 0.42}}
          title={`Back`}
          onPress={goBack}
        />
        <Button
          buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
          title={`Save`}
          textStyles={{color: colors.whiteBackground}}
            onPress={savePressed}
        />
      </View> */}
       </View>
     </Modal>
   );
 };
 
 export default CalenderModal;
 