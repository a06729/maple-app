const url=process.env.apiHostName;
const apiKey=process.env.apiKey;




export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    console.log(searchParams.get("id"));
    try{
        const res=await fetch(`${url}/v1/id?character_name=${searchParams.get("id")}`,{
            headers:{
                'accept': 'application/json',
                "x-nxopen-api-key":apiKey!
            }
        });
        if(!res.ok){
            throw res.status;
        }
        const {ocid}=await res.json();
        console.log(`ocid:${ocid}`)
        return Response.json({
            ocid:ocid,
            status:res.status
        });
    }catch(error){
        console.log(error);
        return Response.json({
            status:error
        });
    }


}