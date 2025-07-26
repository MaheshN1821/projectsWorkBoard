// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-xl">PW</span>
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//               ProjectsWorkboard
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="md:flex items-center space-x-8">
//             <Link
//               to="/projects"
//               className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
//             >
//               Projects
//             </Link>
//             <Link
//               to="/about"
//               className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
//             >
//               About Us
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
//             >
//               Contact Us
//             </Link>
//             <div className="relative">
//               <button
//                 className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center"
//                 onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//               >
//                 Profile
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 ml-1 transition-transform duration-300 ${
//                     showProfileDropdown ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>

//               {showProfileDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in-down">
//                   <Link
//                     to="/student/login"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
//                     onClick={() => setShowProfileDropdown(false)}
//                   >
//                     Student
//                   </Link>
//                   <Link
//                     to="/freelancer/login"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
//                     onClick={() => setShowProfileDropdown(false)}
//                   >
//                     Freelancer
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <Link
//               to="/post-project"
//               className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
//             >
//               Post a Project
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="py-4 border-t border-gray-100 animate-fade-in-down">
//             <Link
//               to="/projects"
//               className="block py-2 text-gray-700 hover:text-purple-600"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Projects
//             </Link>
//             <Link
//               to="/about"
//               className="block py-2 text-gray-700 hover:text-purple-600"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About Us
//             </Link>
//             <Link
//               to="/contact"
//               className="block py-2 text-gray-700 hover:text-purple-600"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact Us
//             </Link>
//             <div className="py-2">
//               <button
//                 className="flex items-center text-gray-700 hover:text-purple-600 w-full text-left"
//                 onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//               >
//                 Profile
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 ml-1 transition-transform duration-300 ${
//                     showProfileDropdown ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               {showProfileDropdown && (
//                 <div className="pl-4 mt-2 space-y-2">
//                   <Link
//                     to="/student/login"
//                     className="block text-gray-700 hover:text-purple-600"
//                     onClick={() => {
//                       setShowProfileDropdown(false);
//                       setIsMenuOpen(false);
//                     }}
//                   >
//                     Student
//                   </Link>
//                   <Link
//                     to="/freelancer/login"
//                     className="block text-gray-700 hover:text-purple-600"
//                     onClick={() => {
//                       setShowProfileDropdown(false);
//                       setIsMenuOpen(false);
//                     }}
//                   >
//                     Freelancer
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <Link
//               to="/post-project"
//               className="block mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium text-center"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Post a Project
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;
