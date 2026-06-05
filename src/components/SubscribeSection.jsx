

export default function SubscribeSection() {
  return (
    <section className="bg-brand-yellow py-24 px-6 md:px-20">
      <div className="grid md:grid-cols-2 items-center gap-12 container mx-auto">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            Subscribe Now
          </h2>

          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest news and blog updates.
          </p>

          {/* Input + Button */}
          <div className="flex items-center bg-[#dce3ea] rounded-full overflow-hidden max-w-md">

            <input
              type="email"
              placeholder="Email Address..."
              className="flex-1 px-6 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />

            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-full
                font-medium
                transition-all
                duration-300
              "
            >
              Subscribe Now
            </button>

          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/astronaut.png" 
            alt="Subscribe Illustration"
            className="max-w-md w-full"
          />
        </div>

      </div>
    </section>
  );
}