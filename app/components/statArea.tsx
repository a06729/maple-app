import localFont from 'next/font/local'



const SpoqaHanSansNeo = localFont({
    src: '../font/SpoqaHanSansNeo-Regular.ttf',
});
//스텟 정보 표시 하기 위한 컴포넌트
export default function StatArea(index:number,state_value:string,stat_name:string){
    return(
        <div className="flex items-center" key={index}>
            <div className={SpoqaHanSansNeo.className}>
                <p  className='text-[18px] text-center'>{stat_name}:</p>
            </div>
            <div className={SpoqaHanSansNeo.className}>
                <p className="text-[18px] text-center">{state_value}</p>
            </div>
        </div>
    );
}