import { nowDataFn } from "@/lib/dataFn";
import { NextResponse } from "next/server";


export async function GET(request:Request) {
    let res_array=[];
    const { searchParams } = new URL(request.url);
    const ocid:string|null=searchParams.get("ocid");
    //전직이름
    const character_class_classname:string|null=searchParams.get("character_class_classname");
    //전직 차수
    const character_class_level:string|null=searchParams.get("character_class_level");

    
    //현재 년도 월 일을 계산해서 리턴해주는 함수
    const {year,month,day}=nowDataFn();

    if(character_class_classname==="제로"){
        const res=await fetch(`${process.env.apiHostName}/v1/character/skill?ocid=${ocid}&date=${year}-${month}-${day}&character_skill_grade=0`,{
            headers:{
                'accept': 'application/json',
                "x-nxopen-api-key":process.env.apiKey!
            }
        });
        const responseData:skileType=await res.json();
        res_array.push(responseData);
        return NextResponse.json({
            skileDataArr:res_array,
            status:201
        });
    }else{
        for (let class_level = 5; class_level < parseInt(character_class_level!)+1; class_level++) {
            const res=await fetch(`${process.env.apiHostName}/v1/character/skill?ocid=${ocid}&date=${year}-${month}-${day}&character_skill_grade=${class_level}`,{
                headers:{
                    'accept': 'application/json',
                    "x-nxopen-api-key":process.env.apiKey!
                }
            });
            if(!res.ok){
                return NextResponse.json({
                    status:400
                });
            }
            const responseData:skileType=await res.json();
            res_array.push(responseData);
        }
        return NextResponse.json({
            skileDataArr:res_array,
            status:201
        });
    }

}