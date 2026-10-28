export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-maroon-800 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-maroon-100">{subtitle}</p>}
      </div>
    </section>
  );
}
