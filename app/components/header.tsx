import Link from 'next/link'

export default function Header(){
    return(
      <header className='flex justify-center items-center border-b-2 h-20'>
          <div className='max-sm:space-x-16 space-x-32'>
            <Link className='max-sm:text-[18px] text-lg' href="/">캐릭터 검색</Link>
            <Link className='max-sm:text-[18px] text-lg' href="/ranking">랭킹</Link>
            {/* <Link className='max-sm:text-[18px] text-lg' href="/"></Link> */}
          </div>
      </header>
    );
}