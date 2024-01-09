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
              }}></div>
          );
        });
    }
    return(
        <div className="">            
                <div className=" relative flex flex-wrap w-[308px] h-[280px] " style={{
                  background:"linear-gradient(rgb(76, 79, 93) 0%, rgb(39, 40, 46) 100%)"
                }}>
                <Image className="top-0 left-0 absolute z-[1] w-full h-full" src="/images/outline-union-board.png" width={308} height={280} alt="유니온"></Image>
                {cellRender()}
                <div className=" absolute text-red-50 text-[10px] top-[80px] left-[170px]">INT</div>
                <div className=" absolute text-red-50 text-[10px] top-[80px] left-[114px]">HP</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"108px",
                  left:"200px"
                }}>MP</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"108px",
                  left:"80px"
                }}>마력</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"157px",
                  left:"80px"
                }}>STR</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"157px",
                  left:"200px"
                }}>DEX</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"180px",
                  left:"160px"
                }}>공격력</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"180px",
                  left:"100px"
                }}>LUK</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"238px",
                  left:"83px"
                }}>버프지속시간</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"238px",
                  left:"181px"
                }}>일반데미지</div>
                <div className=" absolute text-red-50 text-[10px]" style={{
                  top:"188px",
                  left:"253px"
                }}>보스데미지</div>
                <div className="text-center absolute text-red-50 text-[10px]" style={{
                  top:"78px",
                  left:"257px"
                }}>크리트컬<br/>확률</div>
                <div className="absolute text-red-50 text-[10px]" style={{
                  top:"25px",
                  left:"186px"
                }}>획득경험치</div>
                <div className="absolute text-red-50 text-[10px]" style={{
                  top:"25px",
                  left:"69px"
                }}>상태이상 내성</div>
                <div className="text-center absolute text-red-50 text-[10px]" style={{
                  top:"70px",
                  left:"13px"
                }}>크리티컬<br/>데미지</div>
                <div className="absolute text-red-50 text-[10px]" style={{
                  top:"189px",
                  left:"4px"
                }}>방어율무시</div>
            </div>

        </div>
    );
}