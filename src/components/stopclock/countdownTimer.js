import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const CountdownTimerDisplay = ({ duration }) => {
    let MM = parseInt((duration / 60) % 60)
    let SS = parseInt(duration % 60)

    MM = (MM < 10) ? '0' + MM : MM
    SS = (SS < 10) ? '0' + SS : SS

    const convertDuration = ({ remainingTime }) => {
      let minutes = parseInt((duration / 60) % 60)
      let seconds = parseInt(duration % 60)

      minutes = (minutes < 10) ? '0' + minutes : minutes
      seconds = (seconds < 10) ? '0' + seconds : seconds
    
      return `${minutes}:${seconds}`
    }
  
    return (
      <View  className='flex-row h-12 justify-between items-center'>
        {/* <CountdownCircleTimer
        isPlaying={true}
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>
            {convertDuration({remainingTime})}
          </Text>
      )}
        </CountdownCircleTimer> */}
          <Text className='text-white font-ibmBold text-lg w-48 text-center'>{MM}:{SS}</Text>
      </View>
    )
  }


const CounterdownTimer = () => {
  const [ticker, setTicker] = useState(null)
  const [duration, setDuration] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState();


  useEffect(() => () => 
    clearInterval(ticker), [])

  const handleNewTimer = (minutes, seconds) => {

    const MM = parseInt(minutes || 0)
    const SS = parseInt(seconds || 0)
    
    const duration = SS + (MM * 60)
    
    if (duration > 0) { 
      resetTimer()
      startTimer(duration)
    }
  }

  const startTimer = (duration) => {
    const newTicker = setInterval(() => {
      setDuration((prev) => {
          if (prev <= 1) {
            alert('Hit your set bitch!')
            clearInterval(newTicker)
            resetTimer()
          }
          return Math.max(prev - 1, 0)
        })
      }, 1000)

      if (duration) setDuration(duration)
      setTicker(newTicker)
      setIsPaused(false)
  }

  const pauseTimer = () => {
    clearInterval(ticker)
    setIsPaused(true)
  }
  
  const resetTimer = () => {
    clearInterval(ticker)
    setDuration(0)
    setIsPaused(false)
    setTicker(null)
  }
  
  const toggleTimer = () => {
    if (!isPaused) pauseTimer()
    else startTimer()
  }


  return (
    <View className="rounded-2xl overflow-hidden">
      {(ticker != null) ? (
        <View className='flex-row h-12 justify-between'>
          <TouchableOpacity 
          onPress={() => resetTimer()} 
          className='justify-center items-center w-20 rounded border-r-2 border-gray-700'>
            <Text className='text-white'>Cancel</Text>
          </TouchableOpacity>
          <CountdownTimerDisplay duration={duration}/> 
          <TouchableOpacity onPress={() => toggleTimer()} className='justify-center items-center w-20 rounded'>
              {(isPaused) ? 
              <View className='bg-green-900 flex-1 w-full items-center justify-center'><Text className='text-white'>Start</Text></View> : 
              <View className='bg-orange-800 flex-1 w-full items-center justify-center'><Text className='text-white'>Pause</Text></View>}
          </TouchableOpacity>
        </View>
      ) : (
        <View className='flex-row h-12 justify-between'>
          <TouchableOpacity className='justify-center items-center w-20 rounded border-r-2 border-gray-700'>
              <Text className='text-white'>Cancel</Text>
          </TouchableOpacity>
          <View className='flex-row divide-x-2 divide-gray-800'>
            <TextInput className="p-4  text-white rounded-2x1 font-ibmRegular w-24" 
                placeholderTextColor={'gray'} 
                textAlign='center'
                keyboardType='numeric'
                value={minutes} 
                onChangeText={text => setMinutes(text)}
                placeholder='minutes'/>
            <TextInput className="p-4  text-white rounded-2x1 font-ibmRegular w-24" 
                placeholderTextColor={'gray'} 
                textAlign='center'
                keyboardType='numeric'
                value={seconds} 
                onChangeText={text => setSeconds(text)}
                placeholder='seconds'/>
            </View>
          <TouchableOpacity 
          onPress={() => handleNewTimer(minutes, seconds)} 
          className=' justify-center items-center w-20 rounded bg-green-900'>
              <Text className='text-white'>Start</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}


export default CounterdownTimer