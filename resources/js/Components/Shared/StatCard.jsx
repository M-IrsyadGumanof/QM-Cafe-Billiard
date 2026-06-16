export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-[7px] border border-[#2b3232] bg-[#1d2222] p-5">
      <p className="text-sm text-[#9aa7b3]">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-white">{value}</p>
      {hint && <p className="mt-2 text-xs text-[#9aa7b3]">{hint}</p>}
    </div>
  );
}
