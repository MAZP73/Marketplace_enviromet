import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Catalog from "./components/catalog";
import Dashboard from "./components/dashboardCatalog";
import Allies from "./components/allies";
import Welcome from "./pages/welcome";
import Home from "./pages/home";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />

                <main className="flex-grow p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/food" element={<Catalog />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/expiring" element={<Catalog />} />
                        <Route path="/new" element={<Catalog />} />
                        <Route path="/rol" element={<Allies />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter >
    );
};

export default App;
