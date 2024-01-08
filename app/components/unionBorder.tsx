import Image from "next/image";

export default async function UnionBorder({ocid}:{ocid:string|string[]|undefined}){

    async function unionFetch(){
      const res=await fetch(`${process.env.hostName}/api/characterInfo/union?ocid=${ocid}`);
      const data:UnionApiType=await res.json();
      return data;
    }

    async function cellRender(){
        const base_x=11
        const base_y=9
        const center = { x: 14*base_x, y: 14*base_y }; // 중앙 4칸 중 오른쪽 아래 칸
        const unionJson=await unionFetch();
        const targetCoordinate:{x:number,y:number,class_name:string}[]=[];
        unionJson.union_block.map((value,index)=>{
          value.block_position.map((position,index)=>{
            const position_X=center.x+position.x*14
            const position_Y=center.y+position.y*14
            //겹치는 경우 제외
            if(position_X<308){
              targetCoordinate.push({
                x:position_X,
                y:position_Y,
                class_name:value.block_class
              });
            }
          });
        });

        return targetCoordinate.map((value,index)=>{
          return(
              <div key={index} className="text-[1px] absolute w-[14px] h-[14px] bg-[rgb(210,183,153)] box-border" style={{
                left:value.x,  
                bottom:value.y,
              }}>{value.class_name}</div>
          );
        });
    }
    return(
        <div className="flex justify-center items-center">            
            <div className=" relative flex flex-wrap w-[308px] h-[280px] bg-black">
                <Image className="top-0 left-0 absolute z-[1] w-full h-full" src="/images/outline-union-board.png" width={308} height={280} alt="유니온"></Image>
                <div style={{}}>
                  {cellRender()}
                </div>
            </div>

        </div>
    );
}