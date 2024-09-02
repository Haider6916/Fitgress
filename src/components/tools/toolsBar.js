import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ToolsBar = ({weightPress}) => {
    // const router = useRouter()


    return (
        <ScrollView horizontal={true} className=''>
            <TouchableOpacity
                // onPress={() => router.push('/tools/intervalTimer/selectIntervalWorkout')}
            >
                <View className='bg-gray-800 rounded-2xl mx-1 p-2 items-center w-32'>
                    <Image
                        source={require('../../constants/icons/timer-white.png')}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                        className='mb-1'
                    />
                    <Text className='text-white'>Interval Timer</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={weightPress}
            >
                <View className='bg-gray-800 rounded-2xl mx-1 p-2 items-center w-32'>
                    <Image
                        source={require('../../constants/icons/scale-white.png')}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                        className='mb-1'
                    />
                    <Text className='text-white'>Weight Tracker</Text>
                </View>
            </TouchableOpacity>
            <View className='bg-gray-800 rounded-2xl mx-1 p-2 items-center w-32'>
                <Image
                    source={require('../../constants/icons/calculator-white.png')}
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                    }}
                    className='mb-1'
                />
                <Text className='text-white'>Macro Calculator</Text>
            </View>
            <View className='bg-gray-800 rounded-2xl mx-1 p-2 items-center w-32'>
                <Image
                    source={require('../../constants/icons/calculator-white.png')}
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                    }}
                    className='mb-1'
                />
                <Text className='text-white'>Maco Tracker</Text>
            </View>
        </ScrollView>
    )
}

export default ToolsBar