import { NextResponse } from "next/server";


type baseCharcterInfo = {
    date:string,//조회시간
    character_name:string,//캐릭터명
    world_name:string,//월드 이름
    character_gender:string,//캐릭터 성별
    character_class:string,//캐릭터 직업
    character_class_level:string,//캐릭터 전직 차수
    character_level:number,//캐릭터 레벨
    character_exp:number,//현재 레벨에서 보유한 경험치
    character_exp_rate:string,//현재 레벨에서 경험치 퍼센트
    character_guild_name:string,//캐릭터 소속 길드 명
    character_image:string//캐릭터 이미지 url
}

const url=process.env.apiHostName;
const apiKey=process.env.apiKey;

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const ocid:string|null=searchParams.get("ocid");
    const year:string|null=searchParams.get("year");
    const month:string|null=searchParams.get("month");
    const day:string|null=searchParams.get("day");


    // console.log(searchParams.get("ocid"));

    try{
       const res=await fetch(`${url}/v1/character/basic?ocid=${ocid}&date=${year}-${month}-${day}`,{
            headers:{
                "accept": "application/json",
                "x-nxopen-api-key":apiKey!
            }
        });
        const {
            date,character_name,world_name,
            character_gender,character_class,character_class_level,
            character_level,character_exp,character_exp_rate,
            character_guild_name,character_image,
        }:baseCharcterInfo=await res.json();
        return NextResponse.json({
            date:date,
            character_name:character_name,
            world_name:world_name,
            character_gender:character_gender,
            character_class:character_class,
            character_class_level:character_class_level,
            character_level:character_level,
            character_exp:character_exp,
            character_exp_rate:character_exp_rate,
            character_guild_name:character_guild_name,
            character_image:character_image,
            status:res.status
        });
    }catch(error){
        
    }

}