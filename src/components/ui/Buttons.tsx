type ButtonsProps = {
  text: string;
};

const Buttons = ({
  text,
}: ButtonsProps) => {
  return (
    <div className="flex relative bg-DarkBlue items-center justify-center gap-2 p-1 px-5 rounded-[25px] overflow-hidden font-medium hover:text-white group hover:bg-gray-50">
        <span className="absolute left-0 block w-full h-0 transition-all bg-DeepOrange opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    
        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg className="w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <div className="relative flex justify-center items-center text-white">{text}<img src="/arrow.png" alt="" className="inset-0  object-cover transition-opacity duration-300 group-hover:opacity-0"/></div>
    </div>
  )
}

export default Buttons