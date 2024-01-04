type ItemApi_Type={
    date:string
    character_gender:string
    character_class:string
    item_equipment:Item_equipmentType[]
}

type Item_equipmentType={
    item_equipment_part:string
    item_name:string
    item_icon:string
    item_shape_name:string
    item_shape_icon:string
    starforce:number
    item_total_option:{
        str:number,
        dex:number,
        int:number,
        luk:number,
        max_hp:number,
        max_mp:number,
        attack_power:number,
        magic_power:number,
        armor:number,
        speed:number,
        jump:number,
        boss_damage:number,
        ignore_monster_armor:number,
        all_stat:number,
        damage:number,
        equipment_level_decrease:number,
        max_hp_rate:number,
        max_mp_rate:number
    },
    potential_option_grade:string,
    potential_option_1:string,
    potential_option_2:string,
    potential_option_3:string,
    additional_potential_option_1:string,
    additional_potential_option_2:string,
    additional_potential_option_3:string,
    status:number//api 요청 성공 실패 숫자 값
}

export default ItemApi_Type;