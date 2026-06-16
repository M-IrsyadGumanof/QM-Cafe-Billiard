import { textStatus } from './Format';

const styles = {
  active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  available: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  verified: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  confirmed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',

  ready: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  processing: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  paid: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  paid_after_play: 'border-blue-500/30 bg-blue-500/10 text-blue-300',

  pending: 'border-[#ffcc00]/30 bg-[#ffcc00]/10 text-[#ffcc00]',
  pending_payment: 'border-[#ffcc00]/30 bg-[#ffcc00]/10 text-[#ffcc00]',
  unpaid: 'border-[#ffcc00]/30 bg-[#ffcc00]/10 text-[#ffcc00]',
  reserved: 'border-[#ffcc00]/30 bg-[#ffcc00]/10 text-[#ffcc00]',

  playing: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  occupied: 'border-purple-500/30 bg-purple-500/10 text-purple-300',

  inactive: 'border-gray-500/30 bg-gray-500/10 text-gray-300',

  suspended: 'border-red-500/30 bg-red-500/10 text-red-300',
  rejected: 'border-red-500/30 bg-red-500/10 text-red-300',
  cancelled: 'border-red-500/30 bg-red-500/10 text-red-300',
  unavailable: 'border-red-500/30 bg-red-500/10 text-red-300',
  maintenance: 'border-red-500/30 bg-red-500/10 text-red-300',
};

export default function StatusBadge({ value }) {
  return (
    <span
      className={`inline-flex items-center justify-center align-middle h-fit rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider leading-none whitespace-nowrap ${
        styles[value] || 'border-[#222727] bg-[#111515]/80 text-[#9aa7b3]'
      }`}
    >
      {textStatus(value)}
    </span>
  );
}


