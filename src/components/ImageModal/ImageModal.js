 /**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
 import React, {useEffect, useState} from 'react';
 import {Image, View} from 'react-native';
 import Modal from 'react-native-modal';
 import { Calendar } from 'react-native-calendars';
import { appImages } from '../../constants/images';
 
 const ImageModal = props => {
   const {
     visible,
     onSwipeComplete,
     swipeDown = true,
     onBackdropPress = false,
   } = props;


   return (
     <Modal
       isVisible={visible}
       {...(swipeDown ? {swipeDirection: 'down'} : {})}
       style={{
         justifyContent: 'center',
         alignItems:'center',
       }}
       backdropOpacity={1}
       onBackdropPress={() => {
         onBackdropPress && onSwipeComplete();
       }}
       onSwipeComplete={() => onSwipeComplete()}>
        
        <View>
            <Image 
            source={appImages.backpose}
            style={{height:500,width:300}}/>
         </View>
     
     </Modal>
   );
 };
 
 export default ImageModal;
 