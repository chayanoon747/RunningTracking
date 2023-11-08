import app from './Connect'
import {getFirestore, collection, doc, setDoc, query, getDocs, where, updateDoc, getDoc, addDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

const db = getFirestore(app)
const usersColl = collection(db, "users")
const statisticsColl = collection(db, "statistics")



export const addUser = (user, profile, success, unsuccess)=>{
  console.log(`addUser in UserModel user id: ${user.uid} fullname: ${profile.fullname}`)

  setDoc(doc(usersColl, user.uid),{
    email: user.email,
    fullname: profile.fullname,
    weight: 50
  })
  .then(()=>{
    success({fullname: profile.fullname})
  })
  .catch((error)=>{
    console.error(`addUser in users collection error: ${error}`)
    console.error(msg)
    unsuccess(msg)
  })
}

export const getUserData = async(userUID)=>{
  try{
    const userRef = doc(usersColl, userUID);
    const userSnapshot = await getDoc(userRef);

    if(userSnapshot.exists){
      const userData = userSnapshot.data();
      return userData;
    }else {
      console.log('ไม่มีผู้ใช้นี้')
      return null;
    }
  }catch (error) {
    console.error('getUserData Error :', error);
  }
}

export const updateFullName = async(userUID, fullname)=>{
  try{
    const userRef = doc(usersColl, userUID);
    const userSnapshot = await getDoc(userRef);

    if(userSnapshot.exists){
      const updatedData = {
        fullname: fullname
      };

      await setDoc(userRef, updatedData, { merge: true });

    }else {
      console.log('ไม่มีผู้ใช้นี้')
      return null;
    }
  }catch (error) {
    console.error('updateFullName Error :', error);
  }
}

export const updateWeight = async(userUID, weight)=>{
  
  try{
    const userRef = doc(usersColl, userUID);
    const userSnapshot = await getDoc(userRef);

    if(userSnapshot.exists){
      const updatedData = {
        weight: weight
      };

      await setDoc(userRef, updatedData, { merge: true });
      

    }else {
      console.log('ไม่มีผู้ใช้นี้')
      return null;
    }
  }catch (error) {
    console.error('updateWeight Error :', error);
  }
}

export const uploadImageToFirestore = async (userUID, photoURL) => {
  try {
    // สร้างการอ้างอิงเอกสารของผู้ใช้ใน Firestore โดยใช้ UID
    const userRef = doc(usersColl, userUID);

    // สร้างข้อมูลที่คุณต้องการอัปโหลด
    const userData = {
      photoURL: photoURL, // เก็บลิงก์รูปในฟิลด์ "photoURL"
    };

    // อัปโหลดข้อมูลไปยัง Firestore
    await setDoc(userRef, userData, { merge: true });

    console.log('Image uploaded to Firestore successfully.');
  } catch (error) {
    console.error('Error uploading image to Firestore:', error);
  }
};

export const updateStatistics = async (userUID, time, distance, caloriesBurned, pace) => {

  try {
      // ดึงข้อมูลปัจจุบันจากเอกสาร statistics ของผู้ใช้
      const qry = query(statisticsColl, where("userUID", "==", userUID));
      const querySnapshot = await getDocs(qry);
      
      if (!querySnapshot.empty) {
        console.log('updated');
          // ถ้ามีเอกสารที่ตรงกับ userUID
        const docRef = querySnapshot.docs[0].ref; // ใช้อ้างอิงเอกสาร

        // ดึงข้อมูลปัจจุบัน
        const currentData = querySnapshot.docs[0].data();
        const currentStatistic = currentData.statistic || [];

        // สร้าง timestamp ใหม่
        const timestamp = new Date();

        // เพิ่มข้อมูลใหม่เข้าไปในฟิลด์ statistic
        currentStatistic.push({ time, distance, caloriesBurned, pace, timestamp });

        // อัปเดตข้อมูลในเอกสาร
        await updateDoc(docRef, { statistic: currentStatistic });
        
      } else {
        const timestamp = new Date();
          // ถ้าเอกสารยังไม่มีอยู่

          // สร้างเอกสารใหม่
          await addDoc(statisticsColl, { userUID, statistic: [{ time, distance, caloriesBurned, pace, timestamp }] });
          console.log('added');
      }
  } catch (error) {
      console.error(`updateStatistics Error: ${error}`);
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลจาก Firestore
export const fetchUserStats = async (userUID) => {
  try {
    const qry = query(statisticsColl, where('userUID', '==', userUID));
    const querySnapshot = await getDocs(qry);

    const statsData = [];
    querySnapshot.forEach((doc) => {
      statsData.push(doc.data());
    });

    return statsData;
  } catch (error) {
    console.error(`Error fetching user statistics: ${error}`);
    return null;
  }
};




