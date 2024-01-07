type skileType={
    date:string,
    character_class:string,
    character_skill_grade:string,
    character_skill:[{
        skill_name:string,//스킬이름
        skill_description:string,//스킬설명
        skill_level:number,//스킬레벨
        skill_effect:string,//스킬 레벨 별 효과 설명
        skill_icon:string//스킬 아이콘 url
    }],
}
type skileApiType={
    skileDataArr:skileType[],
    status:number
}