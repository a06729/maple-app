import { NextResponse } from "next/server";

//최종 스텟 정보 타입
type Final_stateType={
    "stat_name":string,
    "stat_value":string,
}


//스텟정보 응답 타입
type statResponse={
    date:string,
    character_class:string,
    final_stat:Final_stateType[]
}

const url=process.env.apiHostName;
const apiKey=process.env.apiKey;



export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const ocid=searchParams.get("ocid");
    const year:string|null=searchParams.get("year");
    const month:string|null=searchParams.get("month");
    const day:string|null=searchParams.get("day");

    try{
        const res=await fetch(`${url}/v1/character/stat?ocid=${ocid}&date=${year}-${month}-${day}`,{
            headers:{
                "accept": "application/json",
                "x-nxopen-api-key":apiKey!
            }
        });
        if(!res.ok){
            throw Error(await res.text());
        }
        const {date,character_class,final_stat}:statResponse=await res.json();
        
        return NextResponse.json({
            date:date,
            character_class:character_class,
            final_stat:final_stat,
            status:res.status
        });
        
    }catch(e){
        console.log(`스텟api 에러:${e}`);
        
    }
}