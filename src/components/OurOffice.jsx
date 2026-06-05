

import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function OurOffice() {
  return (
    <section className="bg-brand-yellow py-28 px-6 md:px-20">
        <div className="container mx-auto">
      
      {/* Section Header */}
      <div className="mb-20">
        <p className="text-blue-500 font-medium tracking-wide mb-2">
          Our Locations
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Our Office
        </h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-12">

        <LocationCard
          title="India"
          image="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          address="Tajmahal Show room, Netaji Market, Jogbani"
        />

        <LocationCard
          title="NEPAL"
          image="https://cdn-icons-png.flaticon.com/512/197/197545.png"
          address="Behind Bhat-Bhateni Supermarket, Biratnagar-06, Morang, Nepal."
        />

        <LocationCard
          title="Dubai"
          image="https://cdn-icons-png.flaticon.com/512/197/197463.png"
          address="Way To Success FZC LLC Ajman Dubai"
        />

      </div>
      </div>
    </section>
  );
}

function LocationCard({ title, image, address }) {
  return (
    <div className="group">

      {/* Image Box */}
      <div className="bg-[#eae7e5] rounded-3xl p-10 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-contain"
        />
      </div>

      {/* Text */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {address}
        </p>

        {/* Icons */}
        <div className="flex space-x-4">
          <IconCircle><MapPin size={18} /></IconCircle>
          <IconCircle><Phone size={18} /></IconCircle>
          <IconCircle><Mail size={18} /></IconCircle>
          <IconCircle><MessageCircle size={18} /></IconCircle>
        </div>
      </div>
    </div>
  );
}

function IconCircle({ children }) {
  return (
    <div className="
      w-12 h-12
      bg-white
      rounded-full
      flex items-center justify-center
      shadow-md
      transition-all duration-300
      hover:bg-yellow
      text-black
      hover:scale-110
      cursor-pointer
    ">
      {children}
    </div>
  );
}