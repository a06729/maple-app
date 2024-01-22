'use client'
import {useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import loadingSvg from '../../public/svg/Ellipsis-1.8s-200px.svg';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { nowDataFn } from '@/lib/dataFn'




export default function SearchBar(){
    const router = useRouter();
    const { toast } = useToast();
    
    //서버 api 통신
    //검색한 유저 정보 가져오기 위한 api
    async function searchFetchApi(searchValue:string) { 
        setLoading(true);
        //현재 날짜 정보
        // const curr = new Date();
        // //utc 기준 정보
        // const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
        // //한국시간 계산하기 위한 변수
        // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        // //현재 한국 시간
        // const kr_curr = new Date(utc + (KR_TIME_DIFF));
        // //년도
        // const year=kr_curr.getFullYear();
        // //월
        // const month=('0' + (kr_curr.getMonth() + 1)).slice(-2);
        // //일
        // const day=('0' + (kr_curr.getDate()-2)).slice(-2);
        const {year,month,day}=nowDataFn();
   

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
            setLoading(false);
            toast({
                variant: "destructive",
                description: "캐릭터 정보가 없습니다.",
            });
        }

    } 

    //인풋 값 변경시 변경해주는 함수
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        const {value,name} =e.target;
        inputRef.current!.value=value;
    }

    async function onKeyDownHandler(e: React.KeyboardEvent){
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            inputRef.current?.blur();
            const keyword=inputRef.current!.value;
            await searchFetchApi(keyword); // 작성한 댓글 post 요청하는 함수 
        }
    }

    
    //검색창 값을 state로 관리하기 위한 것
    // const [searchValue, setSearchValue] = useState<string>();
    const [loading,setLoading]=useState<boolean>(false);
    const inputRef=useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center space-x-2">
            <Card className="max-sm:w-[22rem] w-[31rem] h-[15rem] ">
                <CardHeader>
                    <CardTitle>캐릭터 검색</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full  items-center gap-4">
                        <div className="flex items-center  flex-col ">
                            <Input  className='text-[18px]' ref={inputRef}  onChange={onChange} onKeyDown={onKeyDownHandler}  type="email" placeholder="닉네임" />  
                            <Button className='max-sm:w-[200px] w-[300px] mt-4' onClick={async ()=>{
                                const keyword=inputRef.current!.value;
                                await searchFetchApi(keyword);
                            }}>{loading ? <Image src={'/svg/loading.svg'} width={32} height={32} alt={''}></Image>:<div>검색</div>}</Button>
                            <p className='mt-[18px]'>2023년 12월 21일 점검 이후 접속한 캐릭터만 조회할 수 있습니다.</p>              
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}