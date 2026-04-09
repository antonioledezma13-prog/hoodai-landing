const BASE = import.meta.env.VITE_API_URL || '';

export const submitLead = async (email, plan = 'free') => {
  const res = await fetch(`${BASE}/api/leads`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, plan }),
  });
  return res.json();
};
