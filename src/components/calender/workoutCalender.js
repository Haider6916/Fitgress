// WorkoutCalendar.js

import React, { useState } from 'react';
import { Text, View, Modal, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecordedWorkoutDay } from '../../api/features/workoutCalendar/workoutCalendarSlice';
// import { useRouter } from 'expo-router';

export default function WorkoutCalendar({ workouts }) {
    const recordedWorkoutDates = useSelector((state) => state.userData.recordedWorkoutsDates)
    const recordedWorkoutDays = useSelector((state) => state.workoutCalendar.recordedWorkoutDays)
    const dispatch = useDispatch()
    // const router = useRouter()

    const markedDates = recordedWorkoutDates?.reduce((acc, date) => {
        const utcDate = new Date(date); // Convert the ISO string to a Date object
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000); // Convert to local time
        const formattedDate = localDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"

        acc[formattedDate] = { selected: true, marked: true };
        return acc;
    }, {});

    const goToRecordedDay = (date) => {
        dispatch(fetchRecordedWorkoutDay(date));
        console.log(date)
        // router.push('/recordedWorkoutDay');
    };

    // custom day components
    const CustomDay = ({ state, marking, onPress, date, onMarkedPress }) => {
        const isMarked = marking?.marked;

        if (state === 'disabled') {
            return <Text className='text-center text-gray-500'>{date.day}</Text>;
        }

        return (
            <TouchableOpacity
                onPress={() => isMarked ? onMarkedPress(date) : {}}
                activeOpacity={isMarked ? 0.5 : 1}
            >
                <View style={{
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 16,
                    backgroundColor: isMarked ? '#06b6d4' : 'transparent'
                }}>
                    <Text style={{ textAlign: 'center', color: isMarked ? 'black' : 'white' }}>
                        {date.day}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className='flex-1 w-11/12 mx-2 mt-2'>
            <Calendar
                markedDates={markedDates}
                dayComponent={({ date, state, marking, onPress }) => (
                    <CustomDay
                        date={date}
                        state={state}
                        marking={marking}
                        onPress={onPress}
                        onMarkedPress={() => goToRecordedDay(date.dateString)}
                    />
                )}
                theme={{
                    backgroundColor: '#1f2937',
                    calendarBackground: '#1f2937',
                    textSectionTitleColor: '#f9fafb',
                    dayTextColor: 'white',
                    monthTextColor: 'white',
                }}
            />
        </View>
    );
}
