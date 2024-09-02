import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../utils/features/counter/counterSlice'
import workoutReducer from './features/workout/workoutSlice'
import workoutProgramReducer from './features/workout/workoutProgramSlice'
import selectWorkoutProgramReducer from './features/workout/selectWorkoutProgramSlice'
import userDataReducer from './features/user/userDataSlice'
import currentProgramReducer from './features/workout/currentProgramSlice'
import userCreatedProgramsReducer  from './features/user/userCreatedPrograms'
import intervalTimerReducer from './features/tools/intervalTimerSlice'
import intervalTemplatesReducer from './features/tools/intervalTemplatesSlice'
import workoutCalendarReducer from './features/workoutCalendar/workoutCalendarSlice'




export default configureStore({
  reducer: {
    counter: counterReducer,
    workout: workoutReducer,
    workoutProgram: workoutProgramReducer,
    selectWorkoutProgram: selectWorkoutProgramReducer,
    userData: userDataReducer,
    currentProgram: currentProgramReducer,
    userCreatedPrograms: userCreatedProgramsReducer,
    intervalTimer: intervalTimerReducer,
    intervalTemplates: intervalTemplatesReducer,
    workoutCalendar: workoutCalendarReducer,

  },

})