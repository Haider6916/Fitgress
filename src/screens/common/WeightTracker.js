import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { appImages } from "../../constants/images";
import CalenderModal from "../../components/CalendarModal/CalendarModal";
import { TextInput } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import WeightDetails from "../../components/WeightDetails/WeightDetails";

const WeightTracker = () => {
  const [calendar, setCalender] = useState(false);
  const [endCalendar, setEndCalender] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weight, setWeight] = useState("");

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
    setCalender(false);
  };

  const handleEndDataSelection = (data) => {
    if (data && data.dateString) {
      const formattedDateString = formatDateString(data.dateString);
      console.log("Formatted Date:", formattedDateString);
      setEndDate(formattedDateString);
    }
    setEndCalender(false);
  };

  const data = {
    labels: [
      "24/10/2023",
      "25/10/2023",
      "26/10/2023",
      "27/10/2023",
      "28/10/2023",
    ],
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 50, 40, 20, 0],
      },
    ],
  };

  const customYLabels = [10, 20, 30, 40, 50, 60];

  const chartConfig = {
    backgroundGradientFrom: "rgba(24, 33, 48, 1)",
    backgroundGradientTo: "rgba(24, 33, 48, 1)",
    color: (opacity = 1) => `rgba(7, 182, 213, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(164, 164, 164, ${opacity})`,
    yAxisSuffix: "",
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 2,
      stroke: "rgba(164, 164, 164, 1)",
      strokeDasharray: "0",
    },
  };

  return (
    <>
      <CalenderModal
        visible={calendar}
        onSwipeComplete={() => setCalender(false)}
        Data={handleDataSelection}
        onBackdropPress
      />
      <CalenderModal
        visible={endCalendar}
        onSwipeComplete={() => setEndCalender(false)}
        Data={handleEndDataSelection}
        onBackdropPress
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "rgba(17, 24, 40, 1)",
        }}
      >
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
                label="Start Date"
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
          <TouchableOpacity
            style={{
              borderRadius: 4,
              height: 56,
              overflow: "hidden",
              marginBottom: 15,
              width: "47%",
            }}
            onPress={() => setEndCalender(true)}
          >
            <TextInput
              mode="flat"
              label="End Date"
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
              value={endDate}
              editable={false}
              onChangeText={(text) => setEndDate(text)}
              right={
                <TextInput.Icon
                  icon={"calendar-blank-outline"}
                  iconColor="white"
                />
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LineChart
            data={data}
            width={340}
            height={370}
            chartConfig={chartConfig}
            withShadow={false}
            withInnerLines={false}
            segments={10}
            fromZero
            yLabels={customYLabels}
            verticalLabelRotation={40}
            xLabelsOffset={5}
            yLabelsOffset={15}
            style={{ borderRadius: 10 }}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: "white",
              marginTop: 20,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            Weight details
          </Text>
          <WeightDetails />
        </View>
      </ScrollView>
    </>
  );
};

export default WeightTracker;

const styles = StyleSheet.create({});
