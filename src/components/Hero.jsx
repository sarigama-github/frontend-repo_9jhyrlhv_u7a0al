import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              La plateforme élégante pour parents employeurs et assistantes maternelles
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1, duration:0.6}} className="mt-6 text-lg text-slate-600">
              Gérez contrats, plannings et calculs en toute simplicité. Minimaliste, clair, fluide — façon Apple.
            </motion.p>
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.6}} className="mt-8 flex items-center gap-3">
              <a href="/dashboard" className="rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">Accéder au tableau de bord</a>
              <a href="#annonces" className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:shadow-sm transition">Découvrir les annonces</a>
            </motion.div>
          </div>
          <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6}} className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop" alt="Parents et enfants" className="w-full h-full object-cover opacity-90"/>
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl bg-white/70 backdrop-blur border border-black/5 shadow" />
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-2xl bg-white/70 backdrop-blur border border-black/5 shadow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
