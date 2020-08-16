import { IAttendee } from "../../../Models/Activity";
import {IUser} from "../../../Models/User"

export const CombineDateAndTime = (date : Date,time : Date) => {

    const timeString = time.getHours() +":"+time.getMinutes()+":00";
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1 is added to get the actual month number . Currently It returns from 0 - 11
    const day = date.getDate();

    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString+" "+timeString);

}

export const createAttendee = (user : IUser) : IAttendee => {
    return{
        displayName : user.displayName,
        username : user.username,
        isHost : false,
        image : user.image!
    }
} 