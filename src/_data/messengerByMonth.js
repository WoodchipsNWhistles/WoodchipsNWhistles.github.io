const rows = require("./messenger.json");

function monthKey(isoDate) {
  // expects YYYY-MM-DD
  return (isoDate || "").slice(0, 7);
}

function monthLabel(key) {
  // key: YYYY-MM
  const [y, m] = key.split("-");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const mi = Number(m) - 1;
  return `${months[mi]} ${y}`;
}

module.exports = () => {
  if (!Array.isArray(rows) || rows.length < 2) {
    return { months: [] };
  }

  const header = rows[0];
  const dataRows = rows.slice(1);

  // Convert row arrays -> objects using header
  const items = dataRows.map(r => {
    const o = {};
    header.forEach((h, i) => (o[h] = (r && r[i] !== undefined) ? r[i] : ""));
    return o;
  });

  // Group by YYYY-MM
  const groups = new Map();
  for (const it of items) {
    const key = monthKey(it.issueDate);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(it);
  }

  // Sort months desc; sort items desc by date within month
  const monthKeys = Array.from(groups.keys())
    .filter(k => /^\d{4}-\d{2}$/.test(k))
    .sort((a, b) => (a < b ? 1 : -1));

  const months = monthKeys.map(k => {
    const list = groups.get(k).slice().sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1));
    return {
      key: k,
      label: monthLabel(k),
      count: list.length,
      items: list
    };
  });

  return { months };
};
