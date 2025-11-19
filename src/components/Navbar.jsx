import { Link, NavLink } from "react-router-dom";
import { Menu, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-black to-slate-700" />
          <span className="font-semibold tracking-tight text-slate-900">Assmat Pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <NavLink to="/" end className={({isActive})=>isActive?"text-slate-900":"hover:text-slate-900 transition"}>Accueil</NavLink>
          <NavLink to="/dashboard" className={({isActive})=>isActive?"text-slate-900":"hover:text-slate-900 transition"}>Tableau de bord</NavLink>
          <NavLink to="/annonces" className={({isActive})=>isActive?"text-slate-900":"hover:text-slate-900 transition"}>Annonces</NavLink>
          <NavLink to="/infos" className={({isActive})=>isActive?"text-slate-900":"hover:text-slate-900 transition"}>Infos utiles</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm hover:shadow transition">
            <User className="w-4 h-4" />
            Se connecter
          </Link>
          <button className="md:hidden p-2 rounded-lg hover:bg-black/5">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
