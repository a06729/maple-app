import { NextResponse } from "next/server";
import ItemApi_Type from "@/types/ItemApiType";
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const ocid:string|null=searchParams.get("ocid");
    const year:string|null=searchParams.get("year");
    const month:string|null=searchParams.get("month");
    const day:string|null=searchParams.get("day");
    console.log(ocid);
    console.log(year);
    console.log(month);
    console.log(day);

    try{
        const res=await fetch(`${process.env.apiHostName}/v1/character/item-equipment?ocid=${ocid}&date=${year}-${month}-${day}`,{
            headers:{
                'accept': 'application/json',
                "x-nxopen-api-key":process.env.apiKey!
            }
        });
        if(!res.ok){
            throw Error("아이템 정보 api 요청 실패");
        }
        const responseData:ItemApi_Type=await res.json();
        return NextResponse.json({
            ...responseData
        });
    }catch(e){
        console.log(e);
        return NextResponse.json({message:e,status:400},{status:400})
    }
}