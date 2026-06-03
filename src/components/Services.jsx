

const services = [
  {
    description:
      "School Silo – Multi-School Management System",
    image: "./images/tts.jpeg",
    size: "small",
  },
  {
    description:
      "CourseWays – Udemy Clone – Online Courses and Learning Management System",
    image: "./images/banner.jpg",
    size: "small",
  },
  {
    description:
      "Indie News – Newspaper, Blog Multilingual News Portal (with AI Writer, Content Generator)",
    image: "./images/news.jpg",
    size: "small",
  },
  {
    title: "Digital Marketing",
    description:
      "SonicVox – Text to Speech as SaaS (Machine learning, Deep learning)",
    image: "./images/Home.jpg",
    size: "small",
  },
  {
    description:
      "portfolio websitec",
    image: "./images/portfolio website.jpg",
    bullets: [
      "Creates unique visual identity for brand distinction.",
      "Ensures consistent application across platforms.",
    ],
    size: "small",
  },
];

const SmallCard = ({ service }) => (
  <div data-cursor="view" className=" service-card relative flex flex-col border border-brand  rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/30">
    {/* Liquid sweep overlay */}
    <span className="card-sweep" />

    <div className="relative z-10 flex items-center justify-center h-55 mb-4 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-full object-contain transition-transform duration-700 group-hover:scale-110 card-img"
      />
    </div>


    <p className="relative z-10 text-gray-600 text-sm leading-6 pr-20 card-desc">
      {service.description}
    </p>

  </div>
);

const Services = () => {
  const smallCards = services.filter((s) => s.size === "small");
//   const largeCards = services.filter((s) => s.size === "large");

  return (
    <section className="">
    <div className=" relative w-full container mx-auto py-20 ">
    

      {/* Heading */}
      <div className="max-w-3xl mb-14">
        <p className="text-brand-yellow font-medium mb-3 uppercase tracking-wider text-sm">
          Our Services
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why provide best services
        </h2>
        <p className="text-white/80 text-base max-w-xl data-cursor-text">
          We think big and have hands in all leading technology platforms to
          provide you wide array of services.
        </p>
      </div>

      {/* Small cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3   gap-6 mb-6">
        {smallCards.map((s, i) => (
          <SmallCard key={i} service={s} />
        ))}
      </div>
    </div>
    </section>
  );
};

export default Services;