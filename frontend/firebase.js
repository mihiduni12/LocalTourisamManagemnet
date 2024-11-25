import firebase from 'firebase/app';
import 'firebase/storage';

const uploadImageToFirebase = async (file) => {
  try {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase config object goes here
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();

    // Create a storage reference
    const storageRef = storage.ref();

    // Generate a unique filename for the image (you can use your own logic here)
    const filename = `${Date.now()}_${file.name}`;

    // Create a child reference
    const imageRef = storageRef.child(`images/${filename}`);

    // Upload the file to Firebase Storage
    await imageRef.put(file);

    // Get the download URL for the image
    const downloadURL = await imageRef.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw new Error('Failed to upload image to Firebase');
  }
};

export default uploadImageToFirebase;
