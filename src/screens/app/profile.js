import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { width, height, totalSize } from "react-native-dimension";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { useSelector } from "react-redux";
import { updateDocument, getDocumentById } from "../../api/firebase/db";
// import CreatePost from "../../components/createPostModal";
import { PostList } from "../../components/postList";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appImages } from "../../constants/images";
import {
  convertToInternationalCurrencySystem,
  getRandomNumber,
} from "../../utils/helpingMethods";
import { PostComments } from "../../components/postComments";
import moment from "moment";

const ProfileScreen = ({ navigation }) => {
  const [tab, setTab] = useState(1);
  const [userPosts, setUserPosts] = useState(null);
  const [showCreateModal, setCreateModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [postComments, setPostComments] = useState(null);

  const { userData } = useSelector((state) => state?.userData);
  // console.log("User>>", userData);

  useEffect(() => {
    if (userData) {
      getPost();
    }
    navigation.setOptions({
      headerShown: false,
      statusBarHidden: true,
      statusBarTranslucent: true,
    });
  }, [userData]);

  const getPost = async () => {
    setLoading(true);
    let doc = await getDocumentById("userPosts", userData?.id);
    setUserPosts(doc);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    let filtPost = userPosts?.post?.filter((i) => {
      return i?.id != id;
    });
    let data = { ...userPosts, post: filtPost };
    //console.log("Data after post delete>>", data);
    await updateDocument("userPosts", userPosts?.userID, data)
      .then(() => {
        getPost();
      })
      .catch(() => {
        Alert.alert("", "Something wrong, Please try again later!");
      });
  };

  const handleComments = (type, item) => {
    let posts = [];
    if (type == "add") {
      posts = userPosts?.post?.map((obj) => {
        let newComment = {
          msg: item?.msg,
          id: getRandomNumber(),
          userName: userData?.userData?.name,
          profilePic: userData?.userData?.profilePic,
          userID: userData?.id,
          createdAt: moment().valueOf(),
        };
        return obj.id === item?.postID
          ? { ...obj, comments: [...obj?.comments, newComment] }
          : obj;
      });
    } else {
      posts = userPosts?.post?.map((obj) => {
        if (obj.id === item?.postID) {
          let commentArr = obj?.comments.filter(
            (e) => e.id !== item?.comment?.id
          );
          return { ...obj, comments: commentArr };
        } else {
          return obj;
        }
      });
    }
    let data = { ...userPosts, post: posts };
    // console.log("Comment Post>>", data);
    updateDocument("userPosts", userPosts?.userID, data)
      .then(() => getPost())
      .catch((err) => console.log("Error while comment the post>>", err));
  };

  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tabsView}>
          <TouchableOpacity
            style={styles.tabBtn}
            // onPress={() => router.push("/pages/followingPosts")}
          >
            <Text
              style={tab == 0 ? styles.selectedTabBtnTxt : styles.tabBtnTxt}
            >
              Followings
            </Text>
            <View
              style={{
                width: width(10),
                height: 2,
                backgroundColor: tab == 0 ? "#fff" : "transparent",
                marginTop: height(1),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn} onPress={() => setTab(1)}>
            <Text
              style={tab == 1 ? styles.selectedTabBtnTxt : styles.tabBtnTxt}
            >
              For You
            </Text>
            <View
              style={{
                width: width(10),
                height: 2,
                backgroundColor: tab == 1 ? "#fff" : "transparent",
                marginTop: height(1),
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.userTopDetaiView, styles.row]}>
          <UserAvatar
            size={totalSize(10)}
            src={
              userData?.userData?.profilePic !== ""
                ? userData?.userData?.profilePic
                : appImages.dummyUrl
            }
          />
          <View style={{ width: width(60) }}>
            <View style={styles.row}>
              <Pressable
                style={{ alignItems: "center" }}
                onPress={
                  () => {}
                  // router.push({
                  //   pathname: "/pages/userList",
                  //   params: { type: "followers", userID: userData?.id },
                  // })
                }
              >
                <Text style={styles.profileValue}>
                  {convertToInternationalCurrencySystem(
                    userData?.userData?.followers?.length
                  )}
                </Text>
                <Text style={{ color: "#B0B0B0" }}>Followers</Text>
              </Pressable>
              <Pressable
                style={{ alignItems: "center" }}
                onPress={
                  () => {}
                  // router.push({
                  //   pathname: "/pages/userList",
                  //   params: { type: "followings", userID: userData?.id },
                  // })
                }
              >
                <Text style={styles.profileValue}>
                  {convertToInternationalCurrencySystem(
                    userData?.userData?.followings?.length
                  )}
                </Text>
                <Text style={{ color: "#B0B0B0" }}>Following</Text>
              </Pressable>
              <Pressable style={{ alignItems: "center" }}>
                <Text style={styles.profileValue}>
                  {convertToInternationalCurrencySystem(
                    userPosts?.post?.length  ?? 0
                  )}
                </Text>
                <Text style={{ color: "#B0B0B0" }}>Posts</Text>
              </Pressable>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
              <TouchableOpacity
                style={{ ...styles.profileBtn, backgroundColor: "#B0B0B0" }}
                // onPress={() => router.push("/pages/updateProfile")}
              >
                <Text style={styles.profileBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.profileBtn, backgroundColor: "#0891B3" }}
                onPress={() => setCreateModal(true)}
              >
                <Text style={styles.profileBtnTxt}>Create Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.userTopDetaiView,
            marginVertical: height(2),
          }}
        >
          <Text style={styles.profileName}>{userData?.userData?.name}</Text>
          <Text
            style={{ color: "#B0B0B0" }}
          >{`@${userData?.userData?.userName}`}</Text>
          <Text style={styles.profileBio}>{userData?.userData?.bio}</Text>
        </View>

        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons
            name="notifications-outline"
            color={"#22d3ee"}
            size={totalSize(3)}
          />
        </TouchableOpacity>
        {/* <PostList
          currentUser={userData}
          userPosts={userPosts}
          handleDelete={handleDelete}
          dummyUrl={appImages?.dummyUrl}
          onDone={getPost}
          setPostComments={setPostComments}
        /> */}
      </ScrollView>
      {/* <CreatePost
        isVisible={showCreateModal}
        onClose={() => setCreateModal(false)}
        onDone={getPost}
        userPosts={userPosts}
      /> */}
      {postComments !== null && (
        <PostComments
          isVisible={postComments ? true : false}
          onClose={() => setPostComments(null)}
          postData={postComments}
          onCommentSubmit={(item) => {
            handleComments("add", item);
          }}
          onCommentDelete={(item) => {
            handleComments("delete", item);
          }}
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  tabsView: {
    marginBottom: height(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: width(100),
    marginTop: Platform.OS == "ios" ? height(5) : height(1),
  },
  tabBtn: {
    width: width(30),
    marginHorizontal: width(1),
    paddingBottom: height(1),
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnTxt: {
    fontSize: totalSize(2),
    color: "grey",
  },
  selectedTabBtnTxt: {
    fontSize: totalSize(2),
    color: "#fff",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userTopDetaiView: {
    paddingHorizontal: width(5),
    width: width(100),
  },
  profileValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: totalSize(2),
  },
  profileBtn: {
    paddingHorizontal: width(5),
    paddingVertical: height(1.5),
    borderRadius: totalSize(1),
  },
  profileBtnTxt: {
    color: "#fff",
    fontWeight: "500",
    fontSize: totalSize(1.5),
  },
  profileName: {
    color: "#fff",
    fontSize: totalSize(2.4),
    fontWeight: "700",
  },
  profileBio: {
    color: "#fff",
    fontSize: totalSize(1.7),
    textAlign: "left",
    paddingTop: height(1.5),
  },
  shareBtn: {
    position: "absolute",
    top: height(3),
    right: width(0),
    padding: totalSize(2),
  },
});
