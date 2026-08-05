export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-300" />

        <span className="font-medium">Emiliano</span>
      </div>
    </header>
  );
}
