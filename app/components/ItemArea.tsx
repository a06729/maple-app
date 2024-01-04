import ItemApi_Type from "@/types/ItemApiType";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";

export default async function ItemArea({ocid,year,month,day}:{ocid:string|string[]|undefined,year:string|string[]|undefined,month:string|string[]|undefined,day:string|string[]|undefined}){
    async function ItemInfoFetch() {
        const res=await fetch(`${process.env.hostName}/api/characterInfo/characterItem?ocid=${ocid}&year=${year}&month=${month}&day=${day}`);
        return res.json();
    }
    const ItemData:ItemApi_Type=await ItemInfoFetch();
    return(
        <div>
            <p className="ml-2 text-[20px]">아이템 정보</p>
            <div className="ml-2 mr-2 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
            {ItemData.item_equipment.map((value,index)=>{
                return(
                    <div key={index}>
                        <Card className="h-full mb-3">
                            <CardContent className="p-4">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center justify-center mr-3">
                                        <Image className="" src={value.item_shape_icon} alt="" width={32} height={26}></Image>
                                        <p>{value.item_equipment_part}</p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p>아이템명:{value.item_name}</p>
                                        <p>스타포스:{value.starforce}성</p>
                                    </div>  
                                </div>
                                <div className="mt-2">
                                    <div>
                                        <p>에디셔널</p>
                                    </div>
                                    <p>{value.additional_potential_option_1}</p>
                                    <p>{value.additional_potential_option_2}</p>
                                    <p>{value.additional_potential_option_3}</p>
                                </div>
                                <div className="mt-2">
                                    <p>잠재옵션</p>
                                    <p>{value.potential_option_1}</p>
                                    <p>{value.potential_option_2}</p>
                                    <p>{value.potential_option_3}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
            </div>

        </div>
    );
}