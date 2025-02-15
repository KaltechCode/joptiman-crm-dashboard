import { storage } from '../firebase'
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";

export const UploadImagetoFb = async (e) => {
    let url, status = false;

    
    let image = e.target.files[0]
    if(e.target.files[0]){
        var name = e.target.files[0]['name']
    }
   
    let uid = "tyweyey"
    // this needed to be changed with user info and file name
    const imageRef = storageRef(storage, `products/${name}+${uid}`);

    return await uploadBytes(imageRef, image)
        .then(async (snapshot) => {
            return await getDownloadURL(snapshot.ref)
                .then((url) => {
                    console.log(url, "in then")
                    url = url
                    status = true
                    return { url, status }
                    // saveData(url);
                })
                .catch((error) => {

                    console.log(error.message);
                    return { url, status }

                });
        })
        .catch((error) => {
            console.log(error.message);
            return { url, status }
        });
}