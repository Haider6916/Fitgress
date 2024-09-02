import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateWeightSets, addSet, deleteSet, handleInputChange } from '../../api/features/workout/workoutSlice'


const ExerciseCard = ({ show, cardIndex, sets }) => {
  const [myTextInput, setMyTextInput] = useState([{ weight: '', rep: '' }])

  const exercises = useSelector((state) => state.workout.exercises)
  const dispatch = useDispatch()

   const addSetLocal = () => {
     let cloneArray = [...myTextInput]
     cloneArray.push({ weight: '', rep: '' })
     setMyTextInput(cloneArray)
     dispatch(addSet(cardIndex))
   }

  const deleteSetLocal = (index) => {
    let cloneArray = [...myTextInput]

    let filterArray = cloneArray.filter((val, i) => {
      if (i !== index) {
        return val
      }
    })
    setMyTextInput(filterArray)
    dispatch(deleteSet({cardIndex, index}))
  }

  const consoleArray = (array) => {
    array.map((element) => {
      console.log(element)
    })
    console.log(exercise)
  }


  return (
    <View className=' rounded my-2 bg-gray-800 items-center w-11/12'>
      {show ? (
        sets.map((val, i) => {
          return (
            <View className='flex-row items-center justify-center mr-12' key={i}>
              <TouchableOpacity
                onPress={() => deleteSetLocal(i)}
              >
                <Image source={require('../../constants/icons/subtract-white.png')}
                  className='object-cover h-6 w-6 mr-7' />
              </TouchableOpacity>
              <TextInput className="p-4  text-white rounded-2x1 font-ibmRegular w-24 bg-gray-800"
                placeholderTextColor={'gray'}
                keyboardType='numeric'
                textAlign='center'
                value={val.weight}
                onChangeText={text => dispatch(handleInputChange({cardIndex, i, field: "weight", text }))}
                placeholder='weight' />
              <TextInput className="p-4  text-white rounded-2x1 font-ibmRegular w-24 bg-gray-800"
                placeholderTextColor={'gray'}
                keyboardType='numeric'
                textAlign='center'
                value={val.rep}
                onChangeText={text => dispatch(handleInputChange({cardIndex, i, field: "rep", text }))}
                placeholder='reps' />
            </View>
          )
        })
      ) : null}
      {show ? (<TouchableOpacity
        onPress={() => addSetLocal()}
        className='justify-center py-1 my-1 border-solid border-2 border-gray-700 h-10 items-center rounded-lg'
      >
          <View className='flex-row items-center px-4'>
                        <Image
                            source={require('../../constants/icons/add-white.png')}
                            resizeMode="contain"
                            style={{
                                width: 14,
                                height: 14,
                            }}
                            className='mr-1'
                        />
                        <Text className='text-white'>Set</Text>
                    </View>
      </TouchableOpacity>) : null}
      {/* <TouchableOpacity
        onPress={() => consoleArray(myTextInput)}
      >
        <Text className='text-white'>Log Data</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default ExerciseCard