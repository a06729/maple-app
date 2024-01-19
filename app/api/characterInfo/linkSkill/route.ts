import { nowDataFn } from "@/lib/dataFn";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const ocid:string|null=searchParams.get("ocid");
    const {year,month,day}=nowDataFn();

    try{
        const res=await fetch(`${process.env.apiHostName}/v1/character/link-skill?ocid=${ocid}&date=${year}-${month}-${day}`,{
            headers:{
                'accept': 'application/json',
                "x-nxopen-api-key":process.env.apiKey!
            }
        });
        if(!res.ok){
            throw new Error(`${res.status}에러 발생`);
        }
        const resData=await res.json();
        return NextResponse.json({
            ...resData
        },{status:200});
    }catch(e:any){
        return NextResponse.json({
            mssage:e.message,
            state:400
        },{status:400});
    }
    
}