import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import uriToBlob from "../../utils/blobConvert";
import moment from "moment";

// Create a new document
export const createDocument = async (collectionName, data) => {
  try {
    await firestore().collection(collectionName)?.doc(data.uid).set(data);
    return true; // Return the ID of the newly created document
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

//uploadFiletoStorage
export const uploadFile = async (file) => {
  try {
    let image = "";
    // Create a reference to 'mountains.jpg'
    const storageRef = storage().ref("postImages/" + moment().valueOf());
    const metadata = {
      contentType: file?.type == "video" ? "video/mp4" : "image/jpeg",
    };
    let blob = await uriToBlob(file?.url).catch((err) => {
      console.log("Blob Error>", err);
    });
    const task = await storageRef.putFile(blob, metadata);
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });
    task.then(async () => {
      image = await storageRef.getDownloadURL();
    });
    return image;
  } catch (error) {
    throw error;
  }
};

// create post
export const createPost = async (collectionName, data) => {
  try {
    await firestore().collection(collectionName).doc(data.userID).set(data);
    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Create a new document in sub collection
export const createDocumentInSubCollection = async (
  collectionName,
  subCollectionName,
  docId,
  data
) => {
  try {
    await firestore()
      .collection(collectionName)
      .doc(docId)
      .collection(subCollectionName)
      .add(data);
    console.log("document added to sub collection");
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

// Read a single document by ID
export const getDocumentById = async (collectionName, documentId) => {
  try {
    const docSnap = await firestore()
      .collection(collectionName)
      .doc(documentId)
      .get();

    if (docSnap.exists) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName, documentId, newData) => {
  try {
    await firestore()
      .collection(collectionName)
      .doc(documentId)
      .update(newData);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName, documentId) => {
  try {
    await firestore().collection(collectionName).doc(documentId).delete();
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const getPosts = async (userID) => {
  try {
    const querySnapshot = await firestore().collection("userPosts").get();
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  } catch (error) {
    console.error("Error getting Posts:", error);
    throw error;
  }
};

export const getUserPosts = async (userID) => {
  try {
    const querySnapshot = await firestore()
      .collection("userPosts")
      .where("userID", "==", userID)
      .get();
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  } catch (error) {
    console.error("Error getting Posts:", error);
    throw error;
  }
};

export const getAllUser = async (userID) => {
  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("uid", "!=", userID)
      .get();
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (error) {
    console.error("Error getting Users:", error);
    throw error;
  }
};
