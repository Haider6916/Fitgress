import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { width, height, totalSize } from "react-native-dimension";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import VideoPlayer from "react-native-video-player";
import { updateDocument } from "../../api/firebase/db";
import { convertToInternationalCurrencySystem } from "../../utils/helpingMethods";
import ViewMoreText from "react-native-view-more-text";

export const PostList = ({
  userPosts,
  currentUser,
  dummyUrl,
  handleDelete,
  onDone,
  setPostComments,
}) => {
  const handleLike = (type, item) => {
    let posts = [];
    if (type == "like") {
      posts = userPosts?.post?.map((obj) => {
        return obj.id === item?.id
          ? { ...obj, likes: [...obj?.likes, currentUser?.id] }
          : obj;
      });
    } else {
      posts = userPosts?.post?.map((obj) => {
        if (obj.id === item?.id) {
          let likeArr = obj?.likes.filter((e) => e !== currentUser?.id);
          return { ...obj, likes: likeArr };
        } else {
          return obj;
        }
      });
    }
    let data = { ...userPosts, post: posts };
    updateDocument("userPosts", userPosts?.userID, data)
      .then(() => onDone())
      .catch((err) => console.log("Error while like the post>>", err));
  };

  const renderViewMore = (onPress) => {
    return (
      <Text onPress={onPress} style={{ color: "#fff", fontWeight: "700" }}>
        ... more
      </Text>
    );
  };
  const renderViewLess = (onPress) => {
    return (
      <Text onPress={onPress} style={{ color: "#fff", fontWeight: "700" }}>
        Show less
      </Text>
    );
  };

  let userpost = userPosts?.post?.sort(
    (a, b) => moment(b.createdAt) - moment(a.createdAt)
  );
  return (
    <FlatList
      data={userpost}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        let liked = item?.likes?.includes(currentUser.id);
        return (
          <View style={styles.cardMainView}>
            <View style={styles.cardInnerView}>
              <View style={styles.row}>
                <View style={styles.rowBasic}>
                  <Image
                    source={{
                      uri:
                        userPosts?.profilePic !== ""
                          ? userPosts?.profilePic
                          : dummyUrl,
                    }}
                    resizeMode="contain"
                    style={styles.profilePic}
                  />
                  <View style={{ paddingLeft: width(1.5) }}>
                    <Text style={styles.profileName}>
                      {userPosts?.userName ?? "Unknown"}
                    </Text>
                    <View style={styles.rowBasic}>
                      <Text style={{ color: "#B0B0B0" }}>
                        {`@${userPosts?.userName}`}
                      </Text>
                      <Text style={styles.postTime}>
                        {moment(item?.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
                {currentUser.id == userPosts?.userID && (
                  <Menu>
                    <MenuTrigger>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="#fff"
                      />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsContainer: { marginTop: height(4) },
                      }}
                    >
                      <MenuOption onSelect={() => handleDelete(item?.id)}>
                        <Text style={styles.menuOptionText}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                )}
              </View>
              <View style={{ marginVertical: height(1) }}>
                <ViewMoreText
                  numberOfLines={2}
                  renderViewMore={renderViewMore}
                  renderViewLess={renderViewLess}
                >
                  <Text style={styles.postDesc}>{item?.description}</Text>
                </ViewMoreText>
              </View>
              <View style={{ marginVertical: height(1) }}>
                {item?.postImage !== null && (
                  <>
                    {item?.fileType == "video" ? (
                      <VideoPlayer
                        // videoProps={{
                        //   shouldPlay: false,
                        //   resizeMode: ResizeMode.COVER,
                        //   source: {
                        //     uri: item?.postImage,
                        //   },
                        // }}
                        // style={styles.postImg}
                        video={{ uri: item?.postImage }}
                        videoWidth={width(90)}
                        videoHeight={height(25)}
                        autoplay={false}
                        disableFullscreen={true}
                      />
                    ) : (
                      <Image
                        source={{ uri: item?.postImage }}
                        style={styles.postImg}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                ...styles.rowBasic,
                paddingHorizontal: width(5),
                paddingTop: height(2),
              }}
            >
              <TouchableOpacity
                style={{ paddingRight: width(4), alignItems: "center" }}
                onPress={() => {
                  handleLike(liked ? "disLike" : "like", item);
                }}
              >
                <AntDesign
                  name={liked ? "heart" : "hearto"}
                  color={liked ? "#22d3ee" : "#fff"}
                  size={totalSize(2.5)}
                />
                <Text style={styles.socialTxt}>
                  {convertToInternationalCurrencySystem(item?.likes?.length)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setPostComments({ id: item?.id, userID: userPosts?.userID })
                }
                style={{ paddingRight: width(4), alignItems: "center" }}
              >
                <Ionicons
                  name="chatbox-outline"
                  color={"#fff"}
                  size={totalSize(2.5)}
                />
                <Text style={styles.socialTxt}>
                  {convertToInternationalCurrencySystem(item?.comments?.length)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{ alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  name="share-outline"
                  color={"#fff"}
                  size={totalSize(2.5)}
                />

                <Text style={styles.socialTxt}>
                  {item?.shares?.length > 0
                    ? convertToInternationalCurrencySystem(item?.shares?.length)
                    : 0}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      ListFooterComponent={() => <View style={{ height: height(30) }} />}
      ListEmptyComponent={() => (
        <Text style={styles.emptyTxt}>No Post Yet!</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardMainView: {
    marginVertical: height(1),
    width: width(100),
  },
  cardInnerView: {
    backgroundColor: "#182130",
    paddingHorizontal: width(5),
    paddingVertical: height(1),
    // borderTopLeftRadius: totalSize(2),
    // borderTopRightRadius: totalSize(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowBasic: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptionText: {
    fontSize: totalSize(2),
    color: "red",
  },
  profilePic: {
    height: totalSize(4),
    width: totalSize(4),
    borderRadius: totalSize(3),
  },
  profileName: {
    color: "#fff",
    fontSize: totalSize(1.8),
    fontWeight: "700",
  },
  postDesc: {
    color: "#fff",
    fontSize: totalSize(1.7),
    fontWeight: "500",
  },
  postImg: {
    height: height(25),
    width: width(90),
  },
  socialTxt: {
    color: "#fff",
    fontSize: totalSize(1.5),
    paddingVertical: height(1),
    fontWeight: "600",
  },
  postTime: {
    color: "lightgrey",
    fontSize: totalSize(1.2),
    paddingLeft: width(2),
  },
  emptyTxt: {
    color: "grey",
    textAlign: "center",
    fontSize: totalSize(2),
    marginTop: height(20),
  },
});
