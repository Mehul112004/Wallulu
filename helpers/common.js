import { useWindowDimensions } from "react-native";

const { width, height } = useWindowDimensions();

export const wp = percentage =>{
    return (width * percentage)/100;
}
export const hp = percentage =>{
    return (height*percentage)/100;
}
export const getColumnCount=()=>{
    if(width>1024){ //desktop
        return 4;
    }
    if(width>768){ //tablet
        return 3;
    }
    else{ //mobiles
        return 2;
    }
}
export const getImageSize=(height,width)=>{
    if(height>width){
        return 300
    }
    else if(width>height){
        return 250
    }
    else{
        return 200
    }
}