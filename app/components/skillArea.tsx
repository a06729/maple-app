import LinkSkillCard from './linkSkillCard';
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
    async function linkSkileApi():Promise<linkSkileApi> {
        const res = await fetch(`${process.env.hostName}/api/characterInfo/linkSkill?ocid=${ocid}`);
        return res.json();
    }
    const baseSkile:skileApiType=await skileApi();
    const linkSkile=await linkSkileApi();

    return (
        <div>
            {baseSkile.skileDataArr.map((value,index)=>{
                return(
                    <div className='mt-[15px]' key={index}>
                        <div>
                            <SkillCard value={value}></SkillCard>
                        </div>
                    </div>
                );
            })}
            {
                <div className='mt-[15px] mb-[15px]'>
                    <LinkSkillCard value={linkSkile.character_link_skill}></LinkSkillCard>
                </div>
            }
        </div>
    );
}
