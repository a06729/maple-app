"use client"
import Image from 'next/image'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { useState } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
const noto_Sans_KR = Noto_Sans_KR({
    weight: '600',
    subsets: ['latin'],
});

export default function LinkSkillCard({value}:{value:link_skill[]}){
    const [openList, setOpenList] = useState<boolean[]>(Array(value.length).fill(false));

    const handleOpenChange = (index: number) => {
        setOpenList((prevOpenList) => {
            const updatedOpenList = prevOpenList.map((_, i) => i === index ? !prevOpenList[i] : false);
            return updatedOpenList;
        });
    };

    const handleMouseEnter = (index: number) => {
        setOpenList((prevOpenList) => {
            const updatedOpenList = prevOpenList.map((_, i) => i === index ? true : false);
            return updatedOpenList;
        });
    };

    const handleMouseLeave = () => {
        setOpenList((prevOpenList) => prevOpenList.map(() => false));
    };

    return(
        <Card>
            <CardHeader>
                <h4 className={noto_Sans_KR.className} style={{fontSize:"20px"}}>링크스킬</h4>
            </CardHeader>
            <CardContent className='grid grid-cols-4 gap-4'>
                {value.map((value,index)=>{
                    return (
                        <div className='flex justify-center' key={index}>
                        <HoverCard open={openList[index]}>
                            <HoverCardTrigger  className='w-[32px]'asChild onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onTouchStart={() => handleOpenChange(index)}>
                                <div>
                                    <div className='w-[50px] flex justify-center items-center relative'>
                                        <Image className='' src={value.skill_icon} width={60} height={60} alt='스킬아이콘'></Image>
                                        <div className='text-center w-[24px] h-[12px] absolute  bottom-0 text-[11px] rounded-lg text-white bg-black font-[600] '>{value.skill_level}</div>
                                    </div>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className='w-[400px]'>
                                <div className='flex justify-center'>
                                    <div className='w=[10%] mr-3'>
                                        <Image src={value.skill_icon} width={100} height={100} alt='스킬아이콘'></Image>
                                    </div>
                                    <div className='w-[90%]'>
                                        <span>{value.skill_name}</span>
                                        <br />
                                        <span className='font-[12px]'>{value.skill_description}</span>
                                        <br />
                                    </div>
                                </div>
                                <div className='border-t-2 mt-1'>
                                <span className='font-[12px]'>{value.skill_effect}</span>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
        );

}