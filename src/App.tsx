import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Catalog from "./components/catalog";
import About from "./components/about";
import Home from "./pages/home";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />

                <main className="flex-grow p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/expiring" element={<Catalog />} />
                        <Route path="/foundations" element={<Catalog />} />
                        <Route path="/donors" element={<Catalog />} />
                        <Route path="/new" element={<Catalog />} />
                        <Route path="/impact" element={<Catalog />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter >
    );
};

export default App;
