import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const SelectExercise = ({updateExercise, index, exercise}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(exercise);
    const [items, setItems] = useState([
        // Chest Exercises
        { label: 'Chest Exercises', value: 'chest'},
        { label: 'Bar Dip', value: 'bar_dip', parent: 'chest' },
        { label: 'Bench Press', value: 'bench_press', parent: 'chest' },
        { label: 'Cable Chest Press', value: 'cable_chest_press', parent: 'chest' },
        { label: 'Close-Grip Bench Press', value: 'close_grip_bench_press', parent: 'chest' },
        { label: 'Close-Grip Feet-Up Bench Press', value: 'close_grip_feet_up_bench_press', parent: 'chest' },
        { label: 'Decline Bench Press', value: 'decline_bench_press', parent: 'chest' },
        // ... other chest exercises

        // Shoulder Exercises
        { label: 'Shoulder Exercises', value: 'shoulder'},
        { label: 'Band External Shoulder Rotation', value: 'band_external_shoulder_rotation', parent: 'shoulder' },
        { label: 'Band Internal Shoulder Rotation', value: 'band_internal_shoulder_rotation', parent: 'shoulder' },
        { label: 'Band Pull-Apart', value: 'band_pull_apart', parent: 'shoulder' },
        { label: 'Barbell Front Raise', value: 'barbell_front_raise', parent: 'shoulder' },
        { label: 'Barbell Rear Delt Row', value: 'barbell_rear_delt_row', parent: 'shoulder' },
        { label: 'Barbell Upright Row', value: 'barbell_upright_row', parent: 'shoulder' },
        // ... other shoulder exercises

        // Bicep Exercises
        { label: 'Bicep Exercises', value: 'bicep'},
        { label: 'Barbell Curl', value: 'barbell_curl', parent: 'bicep' },
        { label: 'Barbell Preacher Curl', value: 'barbell_preacher_curl', parent: 'bicep' },
        { label: 'Bodyweight Curl', value: 'bodyweight_curl', parent: 'bicep' },
        { label: 'Cable Curl With Bar', value: 'cable_curl_with_bar', parent: 'bicep' },
        { label: 'Cable Curl With Rope', value: 'cable_curl_with_rope', parent: 'bicep' },
        // ... other bicep exercises

        // Triceps Exercises
        { label: 'Tricep Exercises', value: 'triceps'},
        { label: 'Barbell Standing Triceps Extension', value: 'barbell_standing_triceps_extension', parent: 'triceps' },
        { label: 'Barbell Lying Triceps Extension', value: 'barbell_lying_triceps_extension', parent: 'triceps' },
        { label: 'Bench Dip', value: 'bench_dip', parent: 'triceps' },
        { label: 'Close-Grip Push-Up', value: 'close_grip_push_up', parent: 'triceps' },
        { label: 'Dumbbell Lying Triceps Extension', value: 'dumbbell_lying_triceps_extension', parent: 'triceps' },
        // ... other triceps exercises

        // ... continue adding exercises for other categories
    ]);

    return (
            <View className=''>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(value) => {
                     updateExercise(value, index)
                }}
                searchable={true}
                categorySelectable={false}
                placeholder='Select an exercise'
                theme="DARK"
                style={{backgroundColor: '#1f2937'}}
                listMode='MODAL'
                modalProps={{ animationType: "fade", width: "100%", height: '50%'}}
                modalContentContainerStyle={{ backgroundColor:'#111827',width:'100%', height:'50%'}}
                
            />
            </View>
    );
}

export default SelectExercise