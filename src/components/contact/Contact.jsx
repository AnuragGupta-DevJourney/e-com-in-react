import React from "react";

function Contact() {
  return (
    <div className="bg-slate-100 p-8 max-sm:p-4">
      <div className="rounded-2xl bg-white p-8 max-w-5xl mx-auto max-sm:p-3">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-center font-bold text-4xl max-sm:text-3xl">
            Get in Touch with
            <span className="text-red-600"> Jhepto</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-5 p-4 mt-8 max-sm:grid-cols-1 max-sm:mt-4">
          {/* left section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold">Contact Info</h2>
              <p className="text-slate-800">
                Have a question or need support? We're here to help you with
                your electronics journey.
              </p>
            </div>
            <div>
              <ul className="text-slate-800">
                <li className="space-x-1">
                  <span className="font-medium">Address:</span>
                  <span>123 Web Lane, Laptop Location,Near by Me, India</span>
                </li>
                <li className="space-x-1">
                  <span className="font-medium">Email:</span>
                  <span>support@Jhepto.com</span>
                </li>
                <li className="space-x-1">
                  <span className="font-medium">Phone:</span>
                  <span>+91 9876543210</span>
                </li>
              </ul>
            </div>
          </div>
          {/* right section */}
          <div>
            <form className="space-y-4" action="">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="name">
                  Your Name:
                </label>
                <input
                  className="rounded-md px-2 py-1 outline-none border border-slate-600/40"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="email">
                  Your Email:
                </label>
                <input
                  className="rounded-md px-2 py-1 outline-none border border-slate-600/40"
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="name">
                  Your Message:
                </label>
                <textarea className="rounded-md px-2 py-1 outline-none border border-slate-600/40 max-h-32" name="message" rows={5} id=""></textarea>
              </div>

              <button className="px-6 w-full py-2 text-white font-medium bg-red-600 rounded-md">
                Send Message
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
