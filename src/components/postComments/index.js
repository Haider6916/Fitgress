import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { width, height, totalSize } from "react-native-dimension";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import UserAvatar from "@muhzi/react-native-user-avatar";
import { appImages } from "../../constants/images";
import moment from "moment";
import { getDocumentById } from "../../api/firebase/db";
import { useSelector } from "react-redux";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export const PostComments = ({
  isVisible,
  onClose,
  onCommentSubmit,
  onCommentDelete,
  postData,
}) => {
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);

  const { userData } = useSelector((state) => state?.userData);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["67%", "90%"], []);

  useEffect(() => {
    if (isVisible == true) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, [isVisible]);

  const handleClose = () => {
    bottomSheetRef.current.close();
    onClose();
  };

  const handleSubmit = () => {
    setCommentLoading(true);
    onCommentSubmit({
      msg: comment,
      postID: postData?.id,
    });

    setTimeout(() => {
      setComment("");
      setCommentLoading(false);
      getPostComments();
    }, 4000);
  };

  const handleDelete = (comment) => {
    onCommentDelete({
      postID: postData?.id,
      comment: comment,
    });

    setTimeout(() => {
      getPostComments();
    }, 4000);
  };

  useEffect(() => {
    getPostComments();
  }, [postData]);

  const getPostComments = async () => {
    setLoading(true);
    let data = await getDocumentById("userPosts", postData?.userID);
    let arr = data?.post?.filter((i) => {
      return i?.id == postData?.id;
    });
    // console.log(arr[0]?.comments);
    setPostComments(arr[0]?.comments);
    setLoading(false);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onClose={handleClose}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#182130" }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
    >
      <View style={styles.bottomNavigationView}>
        <View style={[styles.row, styles.headingView]}>
          <View style={{ width: 30 }} />
          <Text style={styles.heading}>Comments</Text>
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={totalSize(3)} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View style={styles.flatlistView}>
          {isLoading ? (
            <ActivityIndicator
              color={"#22d3ee"}
              size={"large"}
              style={{ alignSelf: "center", marginTop: height(5) }}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={postComments}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={[styles.row, styles.commentView]}>
                    <View style={styles.rowBasic}>
                      <UserAvatar
                        src={
                          item?.profilePic !== ""
                            ? item?.profilePic
                            : appImages.dummyUrl
                        }
                        size={totalSize(5)}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.userName}>
                          {item?.userName}
                          <Text style={styles.commentTime}>
                            {" - "}
                            {moment(item?.createdAt).fromNow()}
                          </Text>
                        </Text>
                        <Text style={styles.msg}>{item?.msg}</Text>
                      </View>
                    </View>
                    {userData.id == item?.userID && (
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
                          <MenuOption onSelect={() => handleDelete(item)}>
                            <Text style={styles.menuOptionText}>Delete</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    )}
                  </View>
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.emptyMsg}>No Comment Yet!</Text>
              )}
              ListFooterComponent={() => <View style={{ height: height(5) }} />}
            />
          )}
        </View>
        <View style={[styles.inputContainer, styles.row]}>
          <BottomSheetTextInput
            value={comment}
            placeholder="Add a comment...."
            placeholderTextColor={"#B0B0B0"}
            onChangeText={(val) => setComment(val)}
            style={styles.input}
            onBlur={() => bottomSheetRef?.current?.snapToIndex(0)}
          />
          <TouchableOpacity
            disabled={comment?.length > 0 ? false : true}
            onPress={() => handleSubmit()}
          >
            {commentLoading ? (
              <ActivityIndicator color={"#22d3ee"} size={"small"} />
            ) : (
              <Feather name="send" color={"#22d3ee"} size={totalSize(2.5)} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#111828",
    width: width(100),
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
  headingView: {
    width: width(100),
    paddingHorizontal: width(5),
  },
  heading: {
    color: "#fff",
    fontSize: totalSize(2),
    textAlign: "center",
    fontWeight: "700",
  },
  flatlistView: {
    height: height(45),
    width: width(100),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#B0B0B0",
    width: width(90),
    alignSelf: "center",
    borderRadius: totalSize(0.5),
    paddingHorizontal: width(2),
    backgroundColor: "#182130",
  },
  input: {
    backgroundColor: "#fff",
    fontSize: totalSize(1.5),
    color: "#000",
    paddingVertical: height(1.5),
    backgroundColor: "#182130",
  },
  emptyMsg: {
    marginTop: height(10),
    textAlign: "center",
    color: "lightgrey",
  },
  commentView: {
    marginHorizontal: width(2),
    marginVertical: height(1),
  },
  userName: {
    fontSize: totalSize(2),
    fontWeight: "600",
    color: "#fff",
  },
  commentTime: {
    fontSize: totalSize(1.5),
    color: "#B0B0B0",
  },
  msg: {
    width: width(70),
    color: "#B0B0B0",
  },
});
