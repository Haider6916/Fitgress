import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, updateDocument } from "../../api/firebase/db";
import {
  fetchUserData,
  saveAllUsers,
} from "../../api/features/user/userDataSlice";
import { height, totalSize, width } from "react-native-dimension";
import UserAvatar from "@muhzi/react-native-user-avatar";
// import { useRouter } from "expo-router";
import { appImages } from "../../constants/images";

const SearchPage = () => {
  const { userData, allUsers } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  // const router = useRouter();
  const [users, setUsers] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isFollowLoading, setFollowLoading] = useState(null);

  useEffect(() => {
    getUser();
  }, [userData]);

  const getUser = async () => {
    setLoading(true);
    let user = await getAllUser(userData?.id);
    if (user?.length > 0) {
      //setUsers(user);
      setTempUsers(user);
      dispatch(saveAllUsers(user));
    }
    setLoading(false);
  };

  const filterUsers = (search) => {
    setSearch(search);
    if (search?.length > 0) {
      let filt = tempUsers?.filter((i) => {
        let name = i?.name?.toLowerCase();
        return name?.includes(search?.toLowerCase());
      });
      setUsers(filt);
    } else {
      setUsers([]);
    }
  };

  const checkFollow = (id) => {
    if (userData?.userData?.followings?.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const followUser = async (user) => {
    setFollowLoading(user);
    user["followers"] = [...user?.followers, userData?.id];
    // console.log("Updated User>>", user?.followers);

    let currentUser = userData?.userData;
    currentUser["followings"] = [...currentUser?.followings, user?.uid];
    // console.log("Updated Current User>>", currentUser?.followings);

    //Update the Selected User
    await updateDocument("users", user?.uid, user).catch(() =>
      setFollowLoading(null)
    );
    //Update the Current User
    await updateDocument("users", userData?.id, currentUser)
      .then(() => {
        dispatch(fetchUserData());
      })
      .catch(() => setFollowLoading(null));
    setFollowLoading(null);
  };

  const unFollowUser = async (user) => {
    setFollowLoading(user);
    let userFilt = user?.followers?.filter((i) => {
      return i !== userData?.id;
    });
    user["followers"] = userFilt;
    // console.log("Updated User>>", user?.followers);

    let currentUser = userData?.userData;
    let currentUserFilt = currentUser?.followings?.filter((i) => {
      return i !== user?.uid;
    });
    currentUser["followings"] = currentUserFilt;
    // console.log("Updated Current User>>", currentUser?.followings);

    await updateDocument("users", user?.uid, user).catch(() =>
      setFollowLoading(null)
    );
    await updateDocument("users", currentUser?.uid, currentUser)
      .then(() => {
        dispatch(fetchUserData());
      })
      .catch(() => setFollowLoading(null));
    setFollowLoading(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={(val) => filterUsers(val)}
        placeholder="Search User"
        placeholderTextColor={"#B0B0B0"}
      />
      <FlatList
        data={users}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={
              () => {}
              // router.push({
              //   pathname: "/pages/userProfile",
              //   params: { userID: item.uid },
              // })
            }
          >
            <View style={styles.rowBasic}>
              <UserAvatar
                src={
                  item?.profilePic !== ""
                    ? item?.profilePic
                    : appImages?.dummyUrl
                }
                size={totalSize(6)}
              />
              <Text style={styles.userName}>{item?.name}</Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: checkFollow(item?.uid) ? "#163041" : "#22d3ee",
              }}
              onPress={() => {
                checkFollow(item?.uid) ? unFollowUser(item) : followUser(item);
              }}
            >
              {isFollowLoading?.uid == item?.uid ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <Text
                  style={{
                    ...styles.btnTxt,
                    color: checkFollow(item?.uid) ? "#22d3ee" : "#fff",
                  }}
                >
                  {checkFollow(item?.uid) ? "Following" : "Follow"}
                </Text>
              )}
            </TouchableOpacity>
          </Pressable>
        )}
        ListFooterComponent={() => <View style={{ height: height(10) }} />}
      />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: "#B0B0B0",
    borderRadius: totalSize(1),
    height: height(5),
    paddingHorizontal: width(2),
    marginHorizontal: width(5),
    color: "#fff",
    marginTop: height(3),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: width(5),
    marginTop: height(2),
  },
  rowBasic: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: totalSize(2),
    fontWeight: "600",
    color: "#fff",
    paddingLeft: width(2),
  },
  btn: {
    width: width(25),
    paddingVertical: height(0.6),
    borderRadius: totalSize(0.5),
    marginRight: width(4),
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: totalSize(1.7),
    color: "#000",
  },
});
