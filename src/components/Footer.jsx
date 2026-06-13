

import Footer3D from "./Footer3D";
import { Globe, Mail, MessageCircle, Play } from "lucide-react";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className="relative z-30 bg-brand border-t border-black overflow-hidden text-black py-5">
      <div className=" container mx-auto">

      {/* ✅ Animated Dot Background */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="wave-bg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-yellow-400">MS</span> MATIN SOFTECH
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The #1 IT Company providing services like app development,
              website development, and custom software at affordable prices.
            </p>

            <div className="flex space-x-4">
              <IconWrap><Globe size={18} /></IconWrap>
              <IconWrap><Mail size={18} /></IconWrap>
              <IconWrap><MessageCircle size={18} /></IconWrap>
              <IconWrap><Play size={18} /></IconWrap>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support Link</h3>
            <FooterLink>Contact</FooterLink>
            <FooterLink>Customer's FAQ</FooterLink>
            <FooterLink>Refund Policy</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms and Conditions</FooterLink>
            <FooterLink>License & Copyright</FooterLink>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Locations</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Biratnagar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-40"
              ></iframe>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Behind Bhat-Bhateni Supermarket, Biratnagar-06, Nepal
            </p>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Like us on Facebook
            </h3>
            <div className="bg-white text-black rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold">MATIN SOFTECH</h4>
              <p className="text-sm text-gray-600">1,813 followers</p>
              <Button className="mt-4 border border-black text-black px-4 py-2 rounded-md text-sm">
                Follow Page
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Section */}
        <div className="w-full h-full absolute top-0 left-0 -z-10">
          <Footer3D />
        </div>

        {/* Bottom */}
        <div className=" text-center text-gray-500 text-sm mt-50">
          ©2026 Matinsoftech. All rights reserved.
        </div>
      </div>
      </div>
    </footer>
  );
}

function FooterLink({ children }) {
  return (
    <p className="text-gray-400 hover:text-yellow-400 transition cursor-pointer mb-3">
      {children}
    </p>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-9 h-9 bg-white hover:bg-yellow-400 text-black flex items-center justify-center rounded-full transition cursor-pointer">
      {children}
    </div>
  );
}