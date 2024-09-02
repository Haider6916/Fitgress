import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { appImages } from "../../constants/images";
import ImageModal from "../ImageModal/ImageModal";

const WeightDetails = ({}) => {
  const [open, setOpen] = useState(false);
  const [Images, setImage] = useState(false);
  return (
    <>
     <ImageModal
        visible={Images}
        onSwipeComplete={() => setImage(false)}
        onBackdropPress
      />
    <View style={{ paddingHorizontal: 8 }}>
      <View
        style={{
          height: 53,
          backgroundColor: `rgba(24, 33, 48, 1)`,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          justifyContent: "space-between",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: open ? 0 : 10,
          borderBottomRightRadius: open ? 0 : 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Date:</Text>
          <Text style={{ color: "rgba(164, 164, 164, 1)" }}>8/22/2023</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Weight:</Text>
          <Text style={{ color: "rgba(164, 164, 164, 1)" }}>52 Kg</Text>
        </View>
        {open ? (
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Image
              source={require("../../constants/icons/Close-Icon.png")}
              style={{ height: 16, width: 16, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Image
              source={require("../../constants/icons/expand-arrow-white.png")}
              style={{ height: 16, width: 16, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}
      </View>
      {open && (
        <View
          style={{
            backgroundColor: "rgba(24, 33, 48, 1)",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: 4,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity style={{ alignItems: "center", marginBottom: 10 }} onPress={()=>setImage(true)}>
            <Image
              source={appImages.fontpose}
              style={{ height: 170, width: 110, resizeMode: "contain" }}
            />
            <Text style={{ color: "white", fontSize: 14, fontWeight: 400 }}>
              Front
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}  onPress={()=>setImage(true)}>
            <Image
              source={appImages.sidepose}
              style={{ height: 170, width: 110, resizeMode: "contain" }}
            />
            <Text style={{ color: "white", fontSize: 14, fontWeight: 400 }}>
              Side
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}  onPress={()=>setImage(true)}>
            <Image
              source={appImages.backpose}
              style={{ height: 170, width: 110, resizeMode: "contain" }}
            />
            <Text style={{ color: "white", fontSize: 14, fontWeight: 400 }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </>
  );
};

export default WeightDetails;
