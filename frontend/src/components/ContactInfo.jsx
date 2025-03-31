import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Globe } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export const ContactInfo = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#011C2A] to-[#023B50] text-white p-8 rounded-xl shadow-lg h-full flex flex-col overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0f374d] to-transparent opacity-40 blur-2xl pointer-events-none"></div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-white"  >Contact Information</h2>
      <p className="text-gray-300 mb-6">We’d love to hear from you!</p>

      {/* Contact Details */}
      <div className="space-y-6 flex-1">
        <ContactItem icon={<Phone size={22} />} text="+94 775434 344" />
        <ContactItem icon={<Mail size={22} />} text="furnionline@gmail.com" />
        <ContactItem 
          icon={<MapPin size={22} />} 
          text={
            <>
              132 Colombo Street, <br />
              Colombo
            </>
          } 
        />
      </div>

      {/* Social Media Icons */}
      <div className="mt-6 flex justify-center space-x-6">
        <SocialIcon href="#" icon={<Facebook size={24} />} />
        <SocialIcon href="#" icon={<Instagram size={24} />} />
        <SocialIcon href="#" icon={<FcGoogle  size={24}/>} />
      </div>

      {/* Round Bubbles with Borders */}
      <div className="absolute bottom-4 left-10 w-16 h-16 rounded-full border-4 border-[#4dd0e1] opacity-60 blur-xl animate-pulse"></div>
      <div className="absolute bottom-6 left-1/4 w-12 h-12 rounded-full border-4 border-[#38b5c1] opacity-70 blur-xl animate-pulse delay-200"></div>
      <div className="absolute bottom-8 left-1/2 w-14 h-14 rounded-full border-4 border-[#0f374d] opacity-50 blur-xl animate-pulse delay-400"></div>
      <div className="absolute bottom-6 right-10 w-16 h-16 rounded-full border-4 border-[#4dd0e1] opacity-60 blur-xl animate-pulse delay-600"></div>
      <div className="absolute bottom-8 right-1/4 w-12 h-12 rounded-full border-4 border-[#38b5c1] opacity-70 blur-xl animate-pulse delay-800"></div>
    </div>
  );
};

// Contact Item Component
const ContactItem = ({ icon, text }) => (
  <div className="flex items-start gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
    <div className="text-[#4dd0e1]">{icon}</div>
    <span className="text-white">{text}</span>
  </div>
);

// Social Media Icon Component
const SocialIcon = ({ href, icon }) => (
  <a 
    href={href} 
    className="text-[#4dd0e1] hover:text-white transition-all duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);
