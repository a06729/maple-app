"use client"
import Image from 'next/image'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { useState } from 'react';

export default function SkillCard({value}:{value:skileType}){
    const [openList, setOpenList] = useState<boolean[]>(Array(value.character_skill.length).fill(false));

    // const handleOpenChange = (index: number) => {
    //     setOpenList((prevOpenList) => {
    //         const updatedOpenList = [...prevOpenList];
    //         updatedOpenList[index] = !updatedOpenList[index];
    //         return updatedOpenList;
    //     });
    // };
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
        <>
        {value.character_skill.map((value,index)=>{
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
                            <div className='mr-3'>
                                <Image src={value.skill_icon} width={200} height={200} alt='스킬아이콘'></Image>
                            </div>
                            <div>
                                <span>{value.skill_name}</span>
                                <br />
                                <span className='font-[12px]'>{value.skill_description}</span>
                                <br />
                            </div>
                        </div>
                        <div>
                        <span className='font-[12px]'>{value.skill_effect}</span>

                        </div>
                    </HoverCardContent>
                </HoverCard>
                </div>
            );
        })}
        </>
    );
}