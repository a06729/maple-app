'use client'

import Lottie from 'react-lottie-player';
import animation from '../../public/lottie/404animation.json';


export default function Animation404(){
    return <Lottie animationData={animation} play className='w-full h-[500px]'/>;
}