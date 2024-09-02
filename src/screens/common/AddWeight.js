import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View,StyleSheet } from "react-native";
import CalenderModal from "../../components/CalendarModal/CalendarModal";
import { TextInput } from "react-native-paper";

const AddWeight = () => {
  const [calendar, setCalender] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Kg");

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const handleDataSelection = (data) => {
    if (data && data.dateString) {
      const formattedDateString = formatDateString(data.dateString);
      console.log("Formatted Date:", formattedDateString);
      setDate(formattedDateString);
    }

    // Close the modal
    setCalender(false);
  };

  const handleBlur = () => {
    if (weight.trim() !== "" && !weight.endsWith("Kg")) {
      setWeight(`${weight} ${unit}`);
    }
  };

  const handleIconPress = () => {
    if (unit === "Kg") {
      setUnit("Lbs");
      if (weight.endsWith("Kg")) {
        // Remove "Kg" from the input
        const kgValue = parseFloat(weight.slice(0, -2));
        const lbsValue = (kgValue * 2.20462).toFixed(2); // Convert Kg to Lbs
        setWeight(`${lbsValue} Lbs`);
      }
    } else {
      setUnit("Kg");
      if (weight.endsWith("Lbs")) {
        // Remove "Lbs" from the input
        const lbsValue = parseFloat(weight.slice(0, -3));
        const kgValue = (lbsValue / 2.20462).toFixed(2); // Convert Lbs to Kg
        setWeight(`${kgValue} Kg`);
      }
    }
  };

  return (
    <>
      <CalenderModal
        visible={calendar}
        onSwipeComplete={() => setCalender(false)}
        Data={handleDataSelection}
        onBackdropPress
      />
      <View style={{ marginBottom: 20, backgroundColor: "#111828", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setCalender(true)}
            style={{ width: "47%" }}
          >
            <View
              style={{
                borderRadius: 4,
                height: 57,
                overflow: "hidden",
                marginBottom: 15,
              }}
            >
              <TextInput
                mode="flat"
                label="Date"
                style={{
                  borderRadius: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  height: 57,
                  overflow: "hidden",
                  backgroundColor: "#182130",
                  borderRadius: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                activeUnderlineColor={"#07B6D5"}
                textColor={"white"}
                editable={false}
                value={date}
                onChangeText={(text) => setDate(text)}
                right={
                  <TextInput.Icon
                    icon={"calendar-blank-outline"}
                    iconColor="white"
                  />
                }
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 4,
              height: 55,
              overflow: "hidden",
              marginBottom: 15,
              width: "47%",
            }}
          >
            <TextInput
              mode="flat"
              label="Weight"
              style={{
                borderRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                height: 57,
                overflow: "hidden",
                backgroundColor: "#182130",
                borderRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              activeUnderlineColor={"rgba(164, 164, 164, 1)"}
              textColor={"white"}
              value={weight}
              onChangeText={(text) => setWeight(text)}
              onBlur={handleBlur}
              right={
                <TextInput.Icon
                  icon={"menu-swap"}
                  iconColor="white"
                  onPress={handleIconPress}
                />
              }
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 40,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                height: 180,
                width: 110,
                backgroundColor: "#182130",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../constants/icons/EmptyImageIcon.png")}
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "400" }}>
              Front
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                height: 180,
                width: 110,
                backgroundColor: "#182130",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../constants/icons/EmptyImageIcon.png")}
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "400" }}>
              Side
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                height: 180,
                width: 110,
                backgroundColor: "#182130",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../constants/icons/EmptyImageIcon.png")}
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "400" }}>
              Back
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: "#07B6D5",
            height: 56,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => console.log("Save Pressed")}
        >
          <Text
            className="text-center text-gray-700 font-ibmBold text-xl"
            style={{ color: "white" }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default AddWeight;

const styles = StyleSheet.create({})