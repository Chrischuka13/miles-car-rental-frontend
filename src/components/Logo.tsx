import { Link } from "react-router";


export default function Logo() {
  return (
    <Link to="/" className="flex justify-center" >
       <img src="/Frame 40367.svg" alt="logo" className="w-full h-full object-cover lg:pl-14"  />
    </Link>
  )
}
