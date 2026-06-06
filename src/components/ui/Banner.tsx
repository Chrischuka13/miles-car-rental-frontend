const Banner = () => {
  const images = [
    "/simple-icons_bmw.png",
    "/simple-icons_volkswagen.png",
    "/simple-icons_suzuki.png",
    "/simple-icons_ford.png",
    "/simple-icons_hyundai.png",
    "/cbi_peugeot.png",
    "/cbi_toyota.png",
    "/fontisto_tesla.png",
    "/simple-icons_iveco.png",
    "/lineicons_nissan.png",
  ];

  return (
    <section className="relative overflow-hidden bg-gray-100 py-6 md:py-10">
      {/* Left fade */}
      <div className="absolute left-0 top-0 z-10 h-full w-12 md:w-24 bg-linear-to-r from-gray-100 to-transparent" />

      {/* Right fade */}
      <div className="absolute right-0 top-0 z-10 h-full w-12 md:w-24 bg-linear-to-l from-gray-100 to-transparent" />

      <div className="flex w-max animate-marquee gap-6 md:gap-10">
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="shrink-0 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <img
              src={image}
              alt="Car brand"
              className="h-8 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-12"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;