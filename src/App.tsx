import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Catalog from "./components/catalog";
import Dashboard from "./components/dashboardCatalog";
import Allies from "./components/allies";
import Login from "./components/login";
import Register from "./components/register";
import Welcome from "./pages/welcome";
import Home from "./pages/home";

const AppContent: React.FC = () => {
    const location = useLocation();

    const hideLayout = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {!hideLayout && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/food" element={<Catalog />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expiring" element={<Catalog />} />
                    <Route path="/new" element={<Catalog />} />
                    <Route path="/rol" element={<Allies />} />
                </Routes>
            </main>

            {!hideLayout && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
