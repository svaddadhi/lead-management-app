import LeadForm from "@/app/components/public/LeadForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left Brand Section */}
        <div className="brand-bg p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">almā</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-8 leading-tight">
              Get An Assessment <br />
              Of Your Immigration Case
            </h2>

            <div className="relative h-40 w-40">
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full brand-bg-dark"></div>
              <div className="absolute top-12 left-12 h-24 w-24 rounded-full brand-bg-dark opacity-80"></div>
              <div className="absolute top-24 left-24 h-24 w-24 rounded-full brand-bg-dark opacity-60"></div>
            </div>
          </div>
        </div>

        <div className="bg-white md:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <LeadForm />
          </div>
        </div>
      </main>
    </div>
  );
}
