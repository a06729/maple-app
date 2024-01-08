type union_blockType={
    block_type:string,
    block_class:string,
    block_level:string,
    block_control_point:{
        x:number,
        y:number
    },
    block_position:{        
        x:number,
        y:number
    }[],

}

type UnionApiType={
    date:string,
    union_raider_stat:[],
    union_occupied_stat:[],
    union_block:union_blockType[]
}