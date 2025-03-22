import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactInfo } from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-white">
          <main className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
