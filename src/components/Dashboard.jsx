import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calculator, Calendar, Download, LogIn } from "lucide-react";
import Auth from "./Auth";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Card({ title, children, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-slate-600" />}
        <h3 className="font-medium text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  // Calculatrices
  const [salary, setSalary] = useState({ hours: 151.67, rate: 4.5 });
  const [leave, setLeave] = useState({ accrued_days: 25, days_taken: 5 });
  const [balance, setBalance] = useState({ credits: 0, debits: 0 });
  const [results, setResults] = useState({});

  const compute = async (path, payload) => {
    const r = await fetch(`${API}/calc/${path}`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload)});
    return r.json();
  }

  const onCompute = async () => {
    const [s, l, b] = await Promise.all([
      compute("salary", salary),
      compute("leave", leave),
      compute("balance", balance),
    ]);
    setResults({ s, l, b });
  }

  // Planning simple (affichage)
  const weekdays = [
    { k: "monday", l: "Lun" },{ k: "tuesday", l: "Mar" },{ k: "wednesday", l: "Mer" },{ k: "thursday", l: "Jeu" },{ k: "friday", l: "Ven" },{ k: "saturday", l: "Sam" },{ k: "sunday", l: "Dim" },
  ];

  // Contract form state + PDF
  const [contract, setContract] = useState({ parent_email: "", assistant_email: "", child_name: "", start_date: "", hours_per_week: "", hourly_rate: "", paid_vacation_days: 25, notes: "" });
  const genPdf = async () => {
    const payload = { ...contract, hours_per_week: parseFloat(contract.hours_per_week||0), hourly_rate: parseFloat(contract.hourly_rate||0) };
    const r = await fetch(`${API}/contracts/pdf`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload) });
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contrat_assmat_pro.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl font-semibold tracking-tight text-slate-900 mb-6">Tableau de bord</motion.h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Contrat" icon={FileText}>
          <p className="text-sm text-slate-600 mb-4">Renseignez les éléments clés puis générez un PDF.</p>
          <form className="grid grid-cols-2 gap-3" onSubmit={(e)=>e.preventDefault()}>
            <input className="col-span-2 input" placeholder="Parent (email)" value={contract.parent_email} onChange={e=>setContract({...contract, parent_email:e.target.value})} />
            <input className="col-span-2 input" placeholder="Assistante (email)" value={contract.assistant_email} onChange={e=>setContract({...contract, assistant_email:e.target.value})} />
            <input className="col-span-2 input" placeholder="Enfant" value={contract.child_name} onChange={e=>setContract({...contract, child_name:e.target.value})} />
            <input className="input" type="date" value={contract.start_date} onChange={e=>setContract({...contract, start_date:e.target.value})} />
            <input className="input" placeholder="Heures/sem" value={contract.hours_per_week} onChange={e=>setContract({...contract, hours_per_week:e.target.value})} />
            <input className="input" placeholder="Taux horaire" value={contract.hourly_rate} onChange={e=>setContract({...contract, hourly_rate:e.target.value})} />
            <input className="input" placeholder="Jours CP" value={contract.paid_vacation_days} onChange={e=>setContract({...contract, paid_vacation_days:e.target.value})} />
            <input className="col-span-2 input" placeholder="Notes" value={contract.notes} onChange={e=>setContract({...contract, notes:e.target.value})} />
            <button type="button" onClick={genPdf} className="col-span-2 rounded-xl bg-black text-white py-2 text-sm hover:opacity-90 flex items-center justify-center gap-2">
              <Download className="w-4 h-4"/> Générer PDF
            </button>
          </form>
        </Card>

        <Card title="Calculatrices" icon={Calculator}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="number" value={salary.hours} onChange={e=>setSalary({...salary, hours: parseFloat(e.target.value||0)})} placeholder="Heures" />
              <input className="input" type="number" value={salary.rate} onChange={e=>setSalary({...salary, rate: parseFloat(e.target.value||0)})} placeholder="Taux" />
              <input className="input" type="number" value={leave.accrued_days} onChange={e=>setLeave({...leave, accrued_days: parseFloat(e.target.value||0)})} placeholder="CP acquis" />
              <input className="input" type="number" value={leave.days_taken} onChange={e=>setLeave({...leave, days_taken: parseFloat(e.target.value||0)})} placeholder="CP pris" />
              <input className="input" type="number" value={balance.credits} onChange={e=>setBalance({...balance, credits: parseFloat(e.target.value||0)})} placeholder="Crédits" />
              <input className="input" type="number" value={balance.debits} onChange={e=>setBalance({...balance, debits: parseFloat(e.target.value||0)})} placeholder="Débits" />
            </div>
            <button onClick={onCompute} className="rounded-xl bg-black text-white px-4 py-2 text-sm">Calculer</button>
            <div className="text-sm text-slate-700">
              {results.s && <p>Brut: <b>{results.s.gross}€</b></p>}
              {results.l && <p>CP Restants: <b>{results.l.remaining}</b></p>}
              {results.b && <p>Solde: <b>{results.b.balance}€</b></p>}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Planning hebdo" icon={Calendar}>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
              {weekdays.map(d => (
                <div key={d.k} className="rounded-xl border border-black/5 py-3 bg-slate-50">{d.l}</div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Bientôt: enregistrement et partage.</p>
          </Card>

          <Card title="Connexion" icon={LogIn}>
            <Auth />
          </Card>
        </div>
      </div>

      <style>{`.input{appearance:none; border-radius:0.75rem; border:1px solid rgba(0,0,0,0.08); padding:0.5rem 0.75rem; background:white; outline:none} .input:focus{box-shadow:0 0 0 4px rgba(0,0,0,0.06)}`}</style>
    </div>
  );
}
