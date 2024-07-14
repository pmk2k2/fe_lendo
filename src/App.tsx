// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Container from './components/Container';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Help from './pages/Help';
// import { AuthProvider } from 'react-auth-kit';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import {QueryCache} from "react-query";
// import {message} from "antd";
// import {useGetProfile} from "./api/account/account.api.ts";
// import {tokenStorage} from "./static.ts";
//
// const queryClient = new QueryClient({
//     queryCache: new QueryCache({
//         onError: (err, query) => {
//             // 🎉 only show error toasts if we already have data in the cache
//             // which indicates a failed background update else handle thing locally
//             const error = err as Error;
//             if (query.state.data !== undefined) {
//                 message.error(
//                     `Something went wrong: ${error.message}, fail to refetch data`
//                 );
//             }
//             if (error.cause === 401) {
//                 // log user out imperatively
//                 const profileKey = useGetProfile.getKey();
//                 tokenStorage.clear();
//                 queryClient.setQueryData(profileKey, null);
//             }
//         },
//     }),
//     defaultOptions: {
//         queries: {
//             retry: (failureCount, err) => {
//                 const error = err as Error;
//                 console.error(error);
//                 if (
//                     error.cause === 401 ||
//                     error.cause === 400 ||
//                     error.message === "Failed to fetch"
//                 ) {
//                     return false;
//                 } else if (failureCount < 3) {
//                     return true;
//                 } else return false;
//             },
//         },
//     },
// });
//
// const App: React.FC = () => {
//     return (
//         <QueryClientProvider client={queryClient}>
//             <AuthProvider authType="cookie" authName="_auth">
//                 <Router>
//                     <div className="flex flex-col min-h-screen">
//                         <Header />
//                         <Container>
//                             <Routes>
//                                 <Route path="/" element={<Home />} />
//                                 <Route path="/home" element={<Home />} />
//                                 <Route path="/products" element={<Products />} />
//                                 <Route path="/products/:id" element={<ProductDetail />} />
//                                 <Route path="/about" element={<About />} />
//                                 <Route path="/contact" element={<Contact />} />
//                                 <Route path="/help" element={<Help />} />
//                                 <Route path="/login" element={<LoginPage />} />
//                                 <Route path="/signup" element={<SignUpPage />} />
//                             </Routes>
//                         </Container>
//                         <Footer />
//                     </div>
//                 </Router>
//             </AuthProvider>
//         </QueryClientProvider>
//     );
// };
//
// export default App;
