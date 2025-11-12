import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Headers/navbar";
import Footer from "./components/Headers/footer";
import Catalog from "./components/Catalogs/catalog";
import Login from "./components/Users/login";
import Register from "./components/Users/register";
import ProductDetail from "./components/Catalogs/productDetails";
import PreguntasFrecuentes from "./components/Headers/PreguntasFrecuentes";
import Welcome from "./pages/welcome";
import Home from "./pages/home";
import About from "./pages/about";
import ImpactoSocial from "./pages/impact";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import DashboardPage from "./pages/dashboardPage";

const AppContent: React.FC = () => {
    const location = useLocation();

    const hideLayout =
        ["/login", "/register"].includes(location.pathname) ||
        location.pathname.startsWith("/dashboard");

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {!hideLayout && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<PublicRoute children={<Home />} />} />
                    <Route path="/login" element={<PublicRoute children={<Login />} />} />
                    <Route path="/register" element={<PublicRoute children={<Register />} />} />

                    <Route path="/about" element={<About />} />
                    <Route path="/impact" element={<ImpactoSocial />} />

                    <Route path="/welcome" element={<ProtectedRoute element={<Welcome />} />} />
                    <Route path="/preguntas_frecuentes/*" element={<ProtectedRoute element={<PreguntasFrecuentes />} />} />
                    <Route path="/dashboard/*" element={<ProtectedRoute element={<DashboardPage />} />} />
                    <Route path="/food" element={<ProtectedRoute element={<Catalog />} />} />
                    <Route path="/producto/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
                </Routes>
            </main>

            {!hideLayout && <Footer />}
        </div>
    );
};

const App: React.FC = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;