import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const TotalRecordedWorkouts = () => {
    const totalRecordedWorkouts = useSelector((state) => state.userData.totalRecordedWorkouts)

    return (
        <View className='bg-gray-800 w-1/3 rounded-lg items-center justify-center mx-1'>
            <Text className='text-white text-base'>Total Workouts</Text>
            <Text className='text-white text-base'>💎{totalRecordedWorkouts}</Text>
        </View>
    )
}

export default TotalRecordedWorkouts