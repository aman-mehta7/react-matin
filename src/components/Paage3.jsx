import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "We build many types of applications and provides many services like Android App, IOS App, App Templates, Web view App, Web to App",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    size: "small",
  },
  {
    title: "App Development",
    description:
      "We build many types of applications and provides many services like Android App, IOS App, App Templates, Web view App, Web to App",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920349.png",
    size: "small",
  },
  {
    title: "E-commerce Development",
    description:
      "Design and develop a creative website with our microscopic detailing and scrupulous strategies.",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    size: "small",
  },
  {
    title: "Digital Marketing",
    description:
      "We do campaigns for corporate clients through social media, pay-per-click advertising, videos, and websites.",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920323.png",
    size: "small",
  },
  {
    title: "Graphics Design",
    description:
      "Branding, Website & Logo Design , Exhibition & Environment Design , Report Design , Brochure Design etc",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    bullets: [
      "Creates unique visual identity for brand distinction.",
      "Ensures consistent application across platforms.",
    ],
    size: "large",
  },
  {
    title: "Integrated Services",
    description:
      "We specialize in web and mobile design, e-commerce, and intranets using the latest tech.",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920257.png",
    bullets: [
      "Implements tech for intuitive UX across devices, platforms.",
      "Tailors e-commerce, intranets for seamless transactions",
    ],
    size: "large",
  },
];

const SmallCard = ({ service }) => (
  <div className="service-card relative flex flex-col bg-[#e8f0fa] rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/30">
    {/* Liquid sweep overlay */}
    <span className="card-sweep" />

    <div className="relative z-10 flex items-center justify-center h-44 mb-4 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-full object-contain transition-transform duration-700 group-hover:scale-110 card-img"
      />
    </div>

    <h3 className="relative z-10 text-xl font-semibold text-gray-700 mb-3 card-title">
      {service.title}
    </h3>

    <p className="relative z-10 text-gray-600 text-sm leading-6 pr-12 card-desc">
      {service.description}
    </p>

    <button className="card-arrow absolute bottom-6 right-6 w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-white transition-all duration-500 z-10">
      <ArrowUpRight size={18} />
    </button>
  </div>
);

const LargeCard = ({ service }) => (
  <div className="service-card relative flex flex-col md:flex-row items-center gap-6 bg-[#e8f0fa] rounded-2xl p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/30">
    <span className="card-sweep" />

    <div className="relative z-10 flex-shrink-0 w-full md:w-1/3 flex items-center justify-center overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="max-h-60 object-contain transition-transform duration-700 card-img"
      />
    </div>

    <div className="relative z-10 flex-1">
      <h3 className="text-xl font-semibold text-gray-700 mb-3 card-title">
        {service.title}
      </h3>

      <p className="text-gray-600 text-sm leading-6 mb-4 card-desc">
        {service.description}
      </p>

      <ul className="space-y-3">
        {service.bullets?.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-gray-600 text-sm card-desc"
          >
            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center bullet-check transition-colors duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-brand check-icon transition-colors duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <button className="card-arrow absolute bottom-0 right-0 w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-white transition-all duration-500">
        <ArrowUpRight size={18} />
      </button>
    </div>
  </div>
);

const Page3 = () => {
  const smallCards = services.filter((s) => s.size === "small");
  const largeCards = services.filter((s) => s.size === "large");

  return (
    <section className="w-full bg-brand px-6 md:px-16 xl:px-24 py-20">
      {/* Heading */}
      <div className="max-w-3xl mb-14">
        <p className="text-brand-yellow font-medium mb-3 uppercase tracking-wider text-sm">
          Our Services
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why provide best services
        </h2>
        <p className="text-white/80 text-base max-w-xl">
          We think big and have hands in all leading technology platforms to
          provide you wide array of services.
        </p>
      </div>

      {/* Small cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {smallCards.map((s, i) => (
          <SmallCard key={i} service={s} />
        ))}
      </div>

      {/* Large cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {largeCards.map((s, i) => (
          <LargeCard key={i} service={s} />
        ))}
      </div>
    </section>
  );
};

export default Page3;