

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
  <div data-cursor="view" className=" service-card relative flex flex-col bg-brand  rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/30">
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

// const LargeCard = ({ service }) => (
//   <div data-cursor="view" className="service-card relative flex flex-col md:flex-row items-center gap-6 bg-brandarc border border-brand rounded-2xl p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 ">
//     <span className="card-sweep" />

//     <div className="relative z-10 flex-shrink-0 w-full md:w-1/3 flex items-center justify-center overflow-hidden ">
//       <img
//         src={service.image}
//         alt={service.title}
//         className="max-h-60 object-contain transition-transform duration-700 card-img"
//       />
//     </div>

//     <div className="relative z-10 flex-1">
//       <h3 className="text-xl font-semibold text-gray-700 mb-3 card-title">
//         {service.title}
//       </h3>

//       <p className="text-gray-600 text-sm leading-6 mb-4 card-desc">
//         {service.description}
//       </p>

//       <ul className="space-y-3">
//         {service.bullets?.map((b, i) => (
//           <li
//             key={i}
//             className="flex items-start gap-3 text-gray-600 text-sm card-desc"
//           >
//             <span className="mt-1 shrink-0 w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center bullet-check transition-colors duration-500">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-3 h-3 text-brand check-icon transition-colors duration-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="3"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//             </span>
//             <span>{b}</span>
//           </li>
//         ))}
//       </ul>

//         <div className="flex justify-end">
//       <button data-cursor="link" className="card-arrow mt-5  w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center transition-all duration-500">
//         <ArrowUpRight size={18} />
//       </button>
//       </div>
//     </div>
//   </div>
// );

const Services = () => {
  const smallCards = services.filter((s) => s.size === "small");
//   const largeCards = services.filter((s) => s.size === "large");

  return (
    // <section className="w-full bg-brandarc px-6 md:px-16 xl:px-24 py-20">
    <section className=" relative w-full bg-brandarc container py-20 ">

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
    </section>
  );
};

export default Services;