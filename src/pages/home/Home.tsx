import { useLoaderData } from "react-router";


export default function Home(){
    const { data } = useLoaderData();


    return <div>Home</div>
    
}