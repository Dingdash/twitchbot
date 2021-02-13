import  tmi from 'tmi.js';
import {BOT_PASSWORD,BOT_USERNAME} from "./credentials.js";
const opts = {
options:{
    debug:true,
},
identity:{
    username:BOT_USERNAME,
    password:BOT_PASSWORD,
},
connection:{
    reconnect:true,
    secure:true
},
channels:["kitedash"]
};

const client  = new tmi.client(opts);

const ModeEnum = {
    EVERYONE:0,
    FOLLOWERS:1,
    SUBSCRIBERS:2,
}
let queues = {
    open:false,
    mode:ModeEnum.EVERYONE
    ,list:[]
}
client.on("resub",(channel,userstate,message,self)=>{

});
client.on('chat',(channel,userstate,message,self)=>{

    if(message=="!join")
    {
        if(queues.open)
        {
            
            if(queues.mode==ModeEnum.EVERYONE)
            {
                let vipbadge = userstate.badges;
                console.log(vipbadge);
                if(queues.list.indexOf(userstate['username'])==-1)
                {
                    queues.list.push(userstate['username']);
                    client.say(channel,"@"+userstate['display-name'] + " just joined the queue");
                }

            }else if (queues.mode==ModeEnum.FOLLOWERS){
                // if(userstate['user-type'])
            }else if(queues.mode == ModeEnum.SUBSCRIBERS)
            {
                let isSub = false;
                isSub = 'subscriber' in userstate.badges || 'founder' in userstate.badges;
                if(isSub)
                {
                    if(queues.list.indexOf(userstate['username'])==-1)
                    {
                        queues.list.push(userstate['username']);
                        client.say(channel,"@"+userstate['display-name'] + " just joined the queue");
                    }
                    
                }else{
                    client.say(channel,"Sorry @"+userstate['display-name'] + " the queue is subscribers only");
                }
            }
        }else{
            
            client.say(channel,"Sorry @"+userstate['display-name'] + " the queue is closed");
        }
    }
    if(message == "!list")
    {
        if(queues.open)
        {
            if(queues.list.length>0)
            {
                client.say(channel,"Queue: "+queues.list.join(", "));
            }else{
                client.say(channel,"The Queue is Empty.");
            }
        }else{
            client.say(channel,"Sorry @"+userstate['display-name'] + " the queue is closed");
        }
    }
    if(message=="!leave")
    {
        const index = queues.list.indexOf(userstate['username']);
        if (index > -1) {
            queues.list.splice(index, 1);
            client.say(channel,"@"+userstate['display-name']+ " has left the queue :(");
        }
    }
    if(message=="!clear")
    {
        queues.list = [];
    }
    if(message=="!openqueue")
    {
        queues.open = true;
        client.say(channel,"The Queue is Now Open, type !join to enter the queue");
    }
    if(message == "!close")
    {
        queues.open = false;
        client.say(channel,"The Queue is Now Closed");
    }
    if(message=="!whois")
    {
        console.log(userstate.subscriber);
    }
if(message=="hello")
{
    client.say(channel,"Hello");
}

});
client.on("connected",(address,port)=>{
    console.log("Connected");
});
client.on("message",(channel,userstate,message,self)=>{
    if(self){return;}
    if(message=="!emoteY")
    {
        client.emoteonly("kitedash");
    }
    if(message=="!emoteN")
    {
        client.emoteonlyoff("kitedash");
    }
    if(message=="!followerY")
    {
        client.followersonly("kitedash");
    }
    if(message=="!followerN")
    {
        client.followersonlyoff("kitedash");
    }
});

client.connect();