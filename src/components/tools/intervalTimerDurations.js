import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
// import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux'
import { setWarmUpDuration, updateRounds } from '../../api/features/tools/intervalTimerSlice';

const IntervalTimerDurations = () => {
    const intervalData = useSelector((state) => state.intervalTimer)
    const workDuration = intervalData.activeDuration
    const restDuration = intervalData.restDuration
    const warmUpDuration = intervalData.warmUpDuration
    const rounds = intervalData.rounds
    const coolDownDuration = intervalData.coolDownDuration

    const dispatch = useDispatch()
    // const router = useRouter()

    const handleSelectField = (field) => {
        // router.push({ pathname: '/tools/selectTimerModal', params: { field } })
    }

    const timeSelectionComponent = ({ field, data, title }) => {
        return <View className='flex-row items-center mx-4'>
            <Text className='text-white mr-4 w-1/4'>{title}:</Text>
            <TouchableOpacity
                onPress={() => handleSelectField(field)}
                className='border-solid border-2 border-gray-700 rounded-xl p-3 bg-gray-800 my-2 w-1/4'
            >
                <Text className='text-white text-center'>{data.minutes}m : {data.seconds}s </Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View className=''>
            {/* <View className='items-center'>
                <View className='my-4 justify-items-start w-11/12'>
                    <Text className='text-white font-ibmRegular text-lg'>🔥Template Name</Text>
                </View>
                <TextInput className="p-4 bg-gray-800 text-white rounded-2x1 font-ibmRegular w-11/12 rounded-xl"
                    placeholderTextColor={'gray'}
                    placeholder='Enter workout name'
                />
            </View> */}
            <View className='ml-4'>
                <Text className='text-white text-lg my-2 mt-8'>⏳Set durations</Text>
                {timeSelectionComponent({ field: 'warmUpDuration', data: warmUpDuration, title: 'Warm Up' })}
                {timeSelectionComponent({ field: 'activeDuration', data: workDuration, title: 'High Intensity' })}
                {timeSelectionComponent({ field: 'restDuration', data: restDuration, title: 'Rest' })}
                {timeSelectionComponent({ field: 'coolDownDuration', data: coolDownDuration, title: 'Cooldown' })}
                <View className='flex-row items-center mx-4'>
                    <Text className='text-white mr-4 w-1/4'>Rounds:</Text>
                    <TextInput className="border-solid border-2 border-gray-700 rounded-xl p-3 bg-gray-800 my-2 w-1/4 text-white"
                        placeholderTextColor={'gray'}
                        value={rounds}
                        onChangeText={text => dispatch(updateRounds(text))}
                        placeholder='# rounds'
                        keyboardType='number-pad'
                    />
                </View>
            </View>
            {/* <View className='items-center justify-center mt-6'>
                <TouchableOpacity
                    className='items-center px-4 h-10 rounded-xl justify-center border-solid border-2 border-gray-700 mt-4 w-1/3'
                    onPress={() => router.push('/tools/useIntervalTimer')}
                >
                    <View className='flex-row items-center'>
                        <Text className='text-white'>Start</Text>
                    </View>
                </TouchableOpacity>
            </View> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
});

export default IntervalTimerDurations;
