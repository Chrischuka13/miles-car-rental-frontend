import { useLoaderData } from "react-router";

export default function Home(){
    const { data } = useLoaderData();
    console.log(data);

    return <div>Home</div>
    
}