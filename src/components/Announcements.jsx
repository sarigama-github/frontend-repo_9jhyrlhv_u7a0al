import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Announcements(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title:"", description:"", author_email:"", author_role:"parent", city:"" });

  const load = async () => {
    const r = await fetch(`${API}/announcements`);
    const data = await r.json();
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/announcements`, { method: "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form)});
    setForm({ title:"", description:"", author_email:"", author_role:"parent", city:"" });
    load();
  }

  return (
    <div id="annonces" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-6">Annonces</h1>
      <form onSubmit={onSubmit} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm grid md:grid-cols-5 gap-3 mb-8">
        <input className="input md:col-span-2" placeholder="Titre" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="input md:col-span-2" placeholder="Ville" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        <select className="input" value={form.author_role} onChange={e=>setForm({...form, author_role:e.target.value})}>
          <option value="parent">Parent employeur</option>
          <option value="assistant">Assistante maternelle</option>
        </select>
        <input className="input md:col-span-3" placeholder="Votre email" value={form.author_email} onChange={e=>setForm({...form, author_email:e.target.value})} />
        <input className="input md:col-span-5" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="rounded-xl bg-black text-white px-4 py-2 text-sm">Publier</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it)=> (
          <div key={it._id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <h3 className="font-medium text-slate-900">{it.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{it.description}</p>
            <div className="text-xs text-slate-500 mt-3">{it.city} • {it.author_role === 'parent' ? 'Parent' : 'Assistante'}</div>
          </div>
        ))}
      </div>
      <style>{`.input{appearance:none; border-radius:0.75rem; border:1px solid rgba(0,0,0,0.08); padding:0.5rem 0.75rem; background:white; outline:none} .input:focus{box-shadow:0 0 0 4px rgba(0,0,0,0.06)}`}</style>
    </div>
  );
}
