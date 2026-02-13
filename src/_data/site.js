module.exports = (data) => {
  const rows = data.messenger;

  return {
    messengerBylinesSince: "2025-10-02",

    messengerBylineCount: Array.isArray(rows)
      ? Math.max(0, rows.length - 1)
      : 0
  };
};
