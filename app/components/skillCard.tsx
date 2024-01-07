"use client"
import Image from 'next/image'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { useState,useCallback } from 'react';

export default function SkillCard({value}:{value:skileType}){

    return(
        <>
        {value.character_skill.map((value,index)=>{
            return (
                <div className='flex justify-center' key={index}>
                <HoverCard >
                    <HoverCardTrigger  className='w-[32px]'  asChild={true}>
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