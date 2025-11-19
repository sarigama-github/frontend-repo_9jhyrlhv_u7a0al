import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Auth(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("google");
  const [status, setStatus] = useState(null);

  const login = async () => {
    // Placeholder: simulate social login by sending email/name/provider to backend
    const r = await fetch(`${API}/auth/callback`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ provider, email, name })});
    const data = await r.json();
    setStatus(data.ok?`Connecté: ${email}`:`Erreur: ${data.detail||'inconnue'}`);
    if(data.ok){
      localStorage.setItem("assmat_user", JSON.stringify({ email, name, provider }));
    }
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <h3 className="font-medium text-slate-900 mb-2">Connexion sociale (démo)</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <select className="input" value={provider} onChange={e=>setProvider(e.target.value)}>
          <option value="google">Google</option>
          <option value="apple">Apple</option>
          <option value="facebook">Facebook</option>
        </select>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <button onClick={login} className="mt-3 rounded-xl bg-black text-white px-4 py-2 text-sm">Se connecter</button>
      {status && <p className="text-xs text-slate-600 mt-2">{status}</p>}
      <style>{`.input{appearance:none; border-radius:0.75rem; border:1px solid rgba(0,0,0,0.08); padding:0.5rem 0.75rem; background:white; outline:none} .input:focus{box-shadow:0 0 0 4px rgba(0,0,0,0.06)}`}</style>
    </div>
  );
}
