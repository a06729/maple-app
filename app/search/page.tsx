import Image from 'next/image';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Noto_Sans_KR} from 'next/font/google'
import localFont from 'next/font/local'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import StatArea from '../components/statArea';

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

//최종 스텟 정보 타입
type Final_stateType={
    "stat_name":string,
    "stat_value":string,
}

//스텟정보 응답 타입
type statResponse={
    date:string,
    character_class:string,
    final_stat:Final_stateType[],
    status:number
}
const noto_Sans_KR = Noto_Sans_KR({
    weight: '600',
    subsets: ['latin'],
});
const SpoqaHanSansNeo = localFont({
    src: '../font/SpoqaHanSansNeo-Regular.ttf',
});
export default async function searchPage({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){

    //기본정보 가져오는 api 함수
    async function getUserData() {
        
        //캐릭터 기본정보를 가져오기 위한 api
        const res = await fetch(`${process.env.hostName}/api/characterInfo?ocid=${searchParams.ocid}&year=${searchParams.year}&month=${searchParams.month}&day=${searchParams.day}`);    
        
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json();
      }

    //스텟 정보를 가져오는 함수
    async function staeUserData() {
        const res=await fetch(`${process.env.hostName}/api/characterInfo/stae?ocid=${searchParams.ocid}&year=${searchParams.year}&month=${searchParams.month}&day=${searchParams.day}`);
        if(!res.ok){
            throw new Error('Failed to fetch data');
        }
        return await res.json();
    }
    //캐릭터 기본정보를 가져오는 변수
    const data:baseCharcterInfo = await getUserData();
    //모든스텟 정보를 가져오는 변수
    const staeDate:statResponse=await staeUserData();
    //전투력 정보 필터해서 가져오는 변수
    const powerDate=staeDate.final_stat.filter((value,index)=>{
        if(value.stat_name=="전투력"){
            return {
                stat_name:value.stat_name,
                stat_value:value.stat_value
            }
        }
    });
    //캐릭터 이미지가 없다는것은 api에 캐릭정보가 업데이트가 안됬다는 것
    //즉 이미지가 있는 캐릭터만 화면에 노출
    if(data.character_image!=null){
        return(
            <div className='flex flex-col'>
                <Card>
                    <CardHeader className={noto_Sans_KR.className}>
                        <p className='text-[30px]'>캐릭터 정보</p>
                    </CardHeader>
                    <CardContent className={SpoqaHanSansNeo.className}>
                        <div className='flex items-center max-sm:flex-col'>
                            <div className='flex mr-12 max-sm:mr-0'>
                                <Suspense fallback={<Skeleton className="h-[300px] w-[300px]"/>}>
                                    <Image src={data.character_image} alt={''} width={300} height={300}/>
                                </Suspense>
                            </div>
                            <div className='flex justify-center flex-col w-[300px] max-sm:justify-normal'>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>닉네임:</p>
                                    <p className='text-[25px]'>{data.character_name}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>서버:</p>
                                    <p className='text-[25px]'>{data.world_name}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>길드명:</p>
                                    <p className='text-[25px]'>{data.character_guild_name}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>직업:</p>
                                    <p className='text-[25px]'>{data.character_class}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>전직차수:</p>
                                    <p className='text-[25px]'>{data.character_class_level}차 전직</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>레벨:</p>
                                    <p className='text-[25px]'>{data.character_level}레벨</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>경험치:</p>
                                    <p className='text-[25px]'>{data.character_exp}</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[25px]'>경험치 퍼센트:</p>
                                    <p className='text-[25px]'>{data.character_exp_rate}%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className='mt-5'>
                <CardHeader className={noto_Sans_KR.className}>
                    <p className='text-[30px]'>스텟정보</p>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-center items-center'>
                        <div className={noto_Sans_KR.className}>
                            <p className='text-[30px]'>{powerDate[0].stat_name}:{powerDate[0].stat_value}</p>
                        </div>
                    </div>
                    <div className='mt-11 grid grid-cols-3 gap-4 content-center max-md:grid-cols-2 max-sm:grid-cols-1'>
		            {staeDate.final_stat?.map((value:Final_stateType, index:number) =>{
                        if(value.stat_name!="전투력"){
                            return(
                                StatArea(index,value.stat_value,value.stat_name)
                            );
                        }
                    } )}
                    </div>
                </CardContent>
                </Card>
            </div>
        );
    }else{
        const Ani404 = dynamic(async () => (await import('../components/animation404')));
        //캐릭터 못찾을때 띄워주는 화면 리턴
        return(
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-[500px]'>
                    <Ani404></Ani404>
                </div>
                <p className='text-[45px]'>캐릭터를 찾을수 없습니다.</p>
            </div>
        )
    }


}