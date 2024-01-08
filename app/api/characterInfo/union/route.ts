import { nowDataFn } from "@/lib/dataFn";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const ocid:string|null=searchParams.get("ocid");
    const {year,month,day}=nowDataFn();

    const res=await fetch(`${process.env.apiHostName}/v1/user/union-raider?ocid=${ocid}&date=${year}-${month}-${day}`,{
        headers:{
            "accept": "application/json",
            "x-nxopen-api-key":process.env.apiKey!
        }
    });
    const data:UnionApiType=await res.json()

    return NextResponse.json({
        ...data
    })
}