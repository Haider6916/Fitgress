import { View, Text, SectionList, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ExerciseList = () => {

    const exercises = [
        {
            title: 'Chest Exercises',
            data: [
                'Bar Dip',
                'Bench Press',
                'Cable Chest Press',
                'Close-Grip Bench Press',
                'Close-Grip Feet-Up Bench Press',
                'Decline Bench Press',
                // ... other chest exercises
            ]
        },
        {
            title: 'Shoulder Exercises',
            data: [
                'Band External Shoulder Rotation',
                'Band Internal Shoulder Rotation',
                'Band Pull-Apart',
                'Barbell Front Raise',
                'Barbell Rear Delt Row',
                'Barbell Upright Row',
                // ... other shoulder exercises
            ]
        },
        {
            title: 'Bicep Exercises',
            data: [
                'Barbell Curl',
                'Barbell Preacher Curl',
                'Bodyweight Curl',
                'Cable Curl With Bar',
                'Cable Curl With Rope',
                // ... other bicep exercises
            ]
        },
        {
            title: 'Tricep Exercises',
            data: [
                'Barbell Standing Triceps Extension',
                'Barbell Lying Triceps Extension',
                'Bench Dip',
                'Close-Grip Push-Up',
                'Dumbbell Lying Triceps Extension',
                // ... other triceps exercises
            ]
        }
    ]

    return (
        <SafeAreaView>
            <SectionList
                sections={exercises}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
    },
  });

export default ExerciseList