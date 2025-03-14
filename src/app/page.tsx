import Image from "next/image";
import LeadForm from "@/app/components/public/LeadForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Immigration Visa Services
                </h2>
                <p className="text-gray-600 mb-6">
                  Looking for expert guidance on visa applications? Our team
                  specializes in helping individuals and businesses navigate the
                  complex immigration process.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    We offer expertise in:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>H-1B Visas for Specialized Workers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>L-1 Visas for Intracompany Transfers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>
                        O-1 Visas for Individuals with Extraordinary Ability
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>
                        EB-1, EB-2, and EB-3 Employment-Based Green Cards
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span>EB-5 Investor Visas</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Fill out the form to get in touch with our expert team. We'll
                  help you determine the best visa options for your specific
                  situation.
                </p>
              </div>

              <div className="flex-1 w-full max-w-md">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between text-gray-400">
            <div className="mb-8 md:mb-0">
              <h3 className="text-white text-lg font-medium mb-4">
                Lead Management
              </h3>
              <p className="max-w-md">
                Professional visa and immigration services for individuals and
                businesses.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-3">
                Contact Us
              </h4>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@leadmanagement.example
                </p>
                <p className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Lead Management. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
