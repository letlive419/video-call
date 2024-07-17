import {findOrCreateRoom} from "@/server"
import { joinVideoRoom } from "@/server";
import { configDotenv } from "dotenv";
import {getAccessToken} from "@/server"



async function videoRoom(formData:FormData) {
    
        // This code will only run in the browser
        
            const roomName = formData.get('roomName');
            
            if (!roomName) {
                throw new Error("Room name is required");
            }
            
            const roomNameString = roomName.toString();
            
            // await findOrCreateRoom(roomName)

            // const token = getAccessToken(roomNameString);
            // console.log(token)

            
            
            // await joinVideoRoom(roomName, token)
        
        }
    


export default videoRoom;
