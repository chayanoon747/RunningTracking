import { View, Text, ScrollView } from "react-native"
import { fetchUserStats } from '../firebase/UserModel'
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"

export const StatScreen = ()=>{
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid
    const [objectUserStats, setObjectUserStats] = useState([]);
   

    useEffect(()=>{
        const fetchData = async () => {
            const arrayUserStats = await fetchUserStats(userUID);
            console.log(arrayUserStats)
            if(arrayUserStats.length){
                const userStats = arrayUserStats[0].statistic;
                setObjectUserStats(userStats);
            }else{
                console.log("User stats no data");
            }
            
        };
        
        fetchData();
    }, [])

    const convertTimeStampToDate = (timestamp)=>{
        const date = new Date(timestamp.seconds * 1000); // คูณ 1000 เพื่อเปลี่ยนเวลาเป็นมิลลิวินาที

        // สร้างอาร์เรย์ของเดือนที่มีชื่อเต็ม
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // สร้างอาร์เรย์ของวันในสัปดาห์ที่มีชื่อเต็ม
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // ใช้เมธอดของ Date object เพื่อดึงวันที่ (day), เดือน (month), และปี (year)
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        // ใช้เมธอดเพิ่มเติมเพื่อดึงชื่อวันในสัปดาห์ (day of the week)
        const dayOfWeek = dayNames[date.getDay()];
        return <Text style={{flex:1}}>{dayOfWeek}, {month} {day} {year}</Text> 
    }

    const convertTimeStamToTime = (timestamp)=>{
        const date = new Date(timestamp.seconds * 1000); // คูณ 1000 เพื่อเปลี่ยนเวลาเป็นมิลลิวินาที
        const hour = date.getHours();
        const minute = date.getMinutes();

        // กำหนดค่า AM หรือ PM โดยใช้เงื่อนไข
        const ampm = hour >= 12 ? 'PM' : 'AM';

        // แปลงรูปแบบของชั่วโมงให้อยู่ในรูปแบบ 12 ชั่วโมง
        const formattedHour = hour % 12 || 12;

        return <Text>{formattedHour}:{minute} {ampm}</Text>
    }

    const convertTimeStampMinute = (timeStamp)=> {
        const seconds = Math.floor(timeStamp / 1000);

        // คำนวณนาทีและวินาที
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // สร้างรูปแบบ "นาที:วินาที" ในรูปของสตริง
        const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

        return formattedTime;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
        {objectUserStats && objectUserStats.length > 0 ? (
            objectUserStats.map((userStat, index) => (
                <View key={index} style={{ height: 150, width: '100%', padding: 20, backgroundColor: 'white', marginBottom: 5 }}>
                <View style={{ flex: 0.2, flexDirection: 'row' }}>
                    {convertTimeStampToDate(userStat.timestamp)}
                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                        {convertTimeStamToTime(userStat.timestamp)}
                    </View>
                </View>
    
                <View style={{ flex: 1, borderWidth: 3, borderColor: 'black' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 3, borderColor: 'black' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto_700Bold' }}>{convertTimeStampMinute(userStat.time)}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: 'gray' }}>DURATION</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto_700Bold' }}>{userStat.distance}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: 'gray' }}>DISTANCE</Text>
                    </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 3, borderColor: 'black' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 3, borderColor: 'black' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto_700Bold' }}>{userStat.caloriesBurned}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: 'gray' }}>CALORIES</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto_700Bold' }}>{userStat.pace}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Roboto_500Medium', color: 'gray' }}>AVG. PACE</Text>
                    </View>
                    </View>
                </View>
                </View>
            ))
        ) : (
            <View></View>
        )}
        </ScrollView>
    );
}