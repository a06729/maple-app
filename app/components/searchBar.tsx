'use client'
import {useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export default function SearchBar(){
    const router = useRouter();
    const { toast } = useToast();
    
    //서버 api 통신
    //검색한 유저 정보 가져오기 위한 api
    async function searchFetchApi() { 
        //현재 날짜 정보
        const curr = new Date();
        //utc 기준 정보
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
        //한국시간 계산하기 위한 변수
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        //현재 한국 시간
        const kr_curr = new Date(utc + (KR_TIME_DIFF));
        //년도
        const year=kr_curr.getFullYear();
        //월
        const month=('0' + (kr_curr.getMonth() + 1)).slice(-2);
        //일
        const day=('0' + (kr_curr.getDate()-2)).slice(-2);

   

        //한국 시간기준 하루전 날짜 계산 변수
        // const beforDay=new Date(year, month, day );


        //서버에서 캐릭터 고유아이디를 가져온다.
        const res= await fetch(`/api/searchid?id=${searchValue}`);
        //ocid 캐릭터 고유 키값
        //status 요청 상태값
        const {ocid,status}:{ocid:string,status:number}=await res.json();
        // console.log(`json:${ocid}`);
        if(status!=400){
            router.push(`/search?ocid=${ocid}&year=${year}&month=${month}&day=${day}`);
        }else{
            toast({
                variant: "destructive",
                description: "캐릭터 정보가 없습니다.",
            });
        }

    } 

    //인풋 값 변경시 변경해주는 함수
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        const {value,name} =e.target;
        setSearchValue(value);
    }
    
    //검색창 값을 state로 관리하기 위한 것
    const [searchValue, setSearchValue] = useState<string>();

    return (
        <div className="flex items-center space-x-2">
            <Card className="max-sm:w-[22rem] w-[30rem] ">
                <CardHeader>
                    <CardTitle>캐릭터 검색</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full  items-center gap-4">
                        <div className="flex items-center  flex-col space-y-1.5">
                            <Input  className='text-[18px]' onChange={onChange}  type="email" placeholder="닉네임" />  
                            <Button className='max-sm:w-[200px] w-[300px]' onClick={async ()=>{
                                searchFetchApi();
                            }}>검색</Button>              
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}