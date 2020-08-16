

export interface IActivity
{
    id : string;
    title : string;
    description : string;
    category : string ;
    date : Date ;
    venue : string;
    city : string;
    isHost : boolean;
    isGoing : boolean;
    attendees : IAttendee[];
}

export interface IActivityFormValues extends Partial<IActivity>{
   time? : Date 
}

export class ActivityFormValues implements IActivityFormValues{
    id?: string = undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string ="";
    venue: string ="";
    constructor(init?: IActivityFormValues)
    {
        if(init && init.date)
        {
            init.time = init.date
        }

        Object.assign(this,init);

    }
}

export interface IAttendee{
    displayName : string;
    username : string;
    image : string;
    isHost : boolean;
}