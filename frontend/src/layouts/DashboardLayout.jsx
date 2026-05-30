



// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "../components/Sidebar";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Mobile header with hamburger */}
//         <header className="lg:hidden flex items-center px-4 py-3 bg-white border-b border-gray-200">
//           <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
//             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <span className="ml-3 font-bold text-gray-900">ExpenseX</span>
//         </header>
//         <main className="flex-1 overflow-y-auto">
//           <Outlet />     {/* ← this renders Dashboard / Transactions / etc. */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";   // ← use your existing Navbar

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar always visible — passes toggle for mobile hamburger */}
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;