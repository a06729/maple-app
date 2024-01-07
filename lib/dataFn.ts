export function nowDataFn(){
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

    return {
        year:year,
        month:month,
        day:day
    }
}