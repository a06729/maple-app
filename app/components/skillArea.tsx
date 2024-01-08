import SkillCard from './skillCard';


export default async function SkillArea({ocid,character_class_classname,character_class_level}:{
    ocid:string|string[]|undefined;
    character_class_classname:string,
    character_class_level:string
}){
    //스킬정보 api 호출
    async function skileApi(){
        const res =await fetch(`${process.env.hostName}/api/characterInfo/skill?ocid=${ocid}&character_class_classname=${character_class_classname}&character_class_level=${character_class_level}`);
        if(!res.ok){
            console.log("에러발생");
        }
        return res.json();
    }
    const baseSkile:skileApiType=await skileApi();
    // console.log(baseSkile.skileDataArr);
    return (
        <div>
            {baseSkile.skileDataArr.map((value,index)=>{
                return(
                    <div className='mt-[15px]' key={index}>
                        <h4 className='mb-[10px]'>{value.character_skill_grade}차 스킬</h4>
                        <div className='grid grid-cols-4 gap-4'>
                            <SkillCard value={value}></SkillCard>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
