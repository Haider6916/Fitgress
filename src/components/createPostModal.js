import React, { useState } from "react";
import {
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Platform,
  ScrollView,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { createPost, updateDocument, uploadFile } from "../api/firebase/db";
import { width, height, totalSize } from "react-native-dimension";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getRandomNumber } from "../utils/helpingMethods";
import VideoPlayer from "react-native-video-player";

const CreatePost = ({ isVisible, onClose, onDone, userPosts }) => {
  const [description, setDescription] = useState("");
  const [postImageFile, setPostImageFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state?.userData);

  //console.log(userPosts);

  const handleImagePick = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: "any",
      cropping: true,
      height: height(30),
      width: width(100),
      compressImageQuality: 0.6,
    });
    //console.log(result?.assets[0]);
    let data = {
      name: result?.filename,
      url:
        Platform.OS === "android"
          ? result.path
          : result.path.replace("file://", ""),
      type: result?.mime,
    };
    console.log("File>>", data);
    setPostImageFile(data);
  };

  const handlePost = async () => {
    setLoading(true);
    // Implement the logic to upload the post with the specified fields.
    if (postImageFile !== null) {
      await uploadFile(postImageFile)
        .then(async (url) => {
          uploadPost(url);
        })
        .catch((err) => {
          console.log("UploadImage Error>>", err);
          setLoading(false);
        });
    } else {
      uploadPost(null);
    }
  };

  const uploadPost = async (url) => {
    if (userPosts !== null) {
      let arr = [...userPosts?.post];
      arr.push({
        createdAt: new Date().toISOString(),
        description: description.toString(),
        postImage: url,
        id: getRandomNumber(),
        fileType: url !== null ? postImageFile?.type : null,
        likes: [],
        comments: [],
      });
      let data = { ...userPosts, post: arr };
      console.log("Update Post Data>>", data);
      await updateDocument("userPosts", userData?.id, data)
        .then(() => {
          alert("Post sucessfully uploaded!");
          onDone();
          setTimeout(() => {
            setLoading(false);
            onClose();
          }, 1000);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
    } else {
      let data = {
        userName: userData?.userData?.name,
        profilePic: userData?.userData?.profilePic,
        userID: userData?.id,
        post: [
          {
            createdAt: new Date().toISOString(),
            description: description.toString(),
            postImage: url,
            id: getRandomNumber(),
            fileType: url !== null ? postImageFile?.type : null,
            likes: [],
            comments: [],
          },
        ],
      };
      console.log("Create Post Data>>", data);
      await createPost("userPosts", data)
        .then(() => {
          alert("Post sucessfully uploaded!");
          onDone();
          setTimeout(() => {
            setLoading(false);
            onClose();
          }, 1000);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
    }

    // Reset the input fields.
    setDescription("");
    setPostImageFile(null);
  };
  return (
    <Modal
      visible={isVisible}
      statusBarTranslucent
      style={styles.container}
      animationType="slide"
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            marginTop: height(5),
            alignSelf: "flex-end",
            marginRight: width(5),
          }}
          onPress={() => {
            setPostImageFile(null);
            setDescription("");
            onClose();
          }}
        >
          <AntDesign
            name="close"
            color={"#000"}
            size={totalSize(2)}
            style={{ padding: 10 }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter your description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
        />
        {postImageFile && (
          <>
            {postImageFile?.type == "video" ? (
              <View style={{ width: width(100), alignItems: "center" }}>
                <VideoPlayer
                  // videoProps={{
                  //   shouldPlay: false,
                  //   resizeMode: ResizeMode.COVER,
                  //   source: {
                  //     uri: postImageFile?.url,
                  //   },
                  // }}
                  // style={styles.videoPlayer}
                  video={{ uri: postImageFile?.url }}
                  videoWidth={width(90)}
                  videoHeight={height(30)}
                  autoplay={false}
                  disableFullscreen={true}
                />
              </View>
            ) : (
              <Image
                source={{ uri: postImageFile?.url }}
                style={styles.image}
              />
            )}
          </>
        )}
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Choose an Image/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={handlePost}>
          {isLoading ? (
            <ActivityIndicator color={"#fff"} size={"small"} />
          ) : (
            <Text style={styles.buttonText}>Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "lightgrey",
    borderRadius: 8,
    paddingHorizontal: width(2),
    marginBottom: 16,
    marginTop: height(5),
    marginHorizontal: width(5),
    paddingVertical: height(2),
    height: height(10),
    fontSize: totalSize(1.7),
    textAlignVertical: "top",
  },
  image: {
    width: width(80),
    height: height(30),
    marginBottom: 16,
    alignSelf: "center",
    borderRadius: 16,
  },
  videoPlayer: {
    width: width(90),
    height: height(30),
  },
  imageButton: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: "5%",
    alignItems: "center",
    marginTop: height(5),
    backgroundColor: "gray",
    marginHorizontal: width(5),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreatePost;
