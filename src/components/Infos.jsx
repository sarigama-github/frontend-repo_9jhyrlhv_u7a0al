export default function Infos(){
  const links = [
    { title:"URSSAF - Pajemploi", url:"https://www.pajemploi.urssaf.fr/" },
    { title:"Service-Public - Droits et démarches", url:"https://www.service-public.fr/" },
    { title:"CAF - Petite enfance", url:"https://www.caf.fr/" },
    { title:"Ministère - Petite enfance", url:"https://solidarites.gouv.fr/petite-enfance" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-6">Infos utiles</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {links.map(l => (
          <a key={l.url} href={l.url} target="_blank" className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm hover:shadow transition">
            <div className="font-medium text-slate-900">{l.title}</div>
            <div className="text-sm text-slate-600 mt-1">Ressource externe</div>
          </a>
        ))}
      </div>
    </div>
  );
}
