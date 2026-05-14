

const Banner = () => {
    const image = [
        "/simple-icons_bmw.png",
        "/simple-icons_volkswagen.png",
        "/simple-icons_suzuki.png",
        "/simple-icons_ford.png",
        "/simple-icons_hyundai.png",
        "/cbi_peugeot.png",
        "/cbi_toyota.png",
        "/fontisto_tesla.png",
        "/simple-icons_iveco.png",
        "/lineicons_nissan.png"
    ]

  return (
    <main className="w-full overflow-hidden bg-gray-100 group">
        <div className="w-11/12 container mx-auto py-12 flex gap-6 items-center justify-center animate-marquee group-hover:paused">
            {image.map((images, index)=>(
                <div key={index} className='group flex items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:bg-gray-50 '>
                <img src={images} alt="" className="w-20  opacity-80 transition-all duration-300 group-hover:opacity-100"/>
                </div>
            ))}
        </div>
    </main>
  )
}

export default Banner