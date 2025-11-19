import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Announcements from "./components/Announcements";
import Infos from "./components/Infos";

function Home(){
  return (
    <div>
      <Hero />
      <section className="py-12" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[{t:"Contrats & PDFs",d:"Générez des contrats propres et partagez-les en un clic."},{t:"Calculs fiables",d:"Salaire, CP, soldes : tout est automatique."},{t:"Annonces locales",d:"Trouvez rapidement l'assistante idéale ou un parent."}].map(f=> (
            <div key={f.t} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="text-slate-900 font-medium">{f.t}</div>
              <div className="text-slate-600 text-sm mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/annonces" element={<Announcements />} />
          <Route path="/infos" element={<Infos />} />
        </Routes>
        <footer className="border-t border-black/5 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-sm text-slate-500">© {new Date().getFullYear()} Assmat Pro</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App