module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

eleventyConfig.addFilter("date", (value, fmt = "yyyy-LL-dd") => {
  const d = value ? new Date(value) : new Date();

  const pad2 = (n) => String(n).padStart(2, "0");

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const EEE = days[d.getDay()];
  const MMM = months[d.getMonth()];

  if (fmt === "EEE, MMM dd, yyyy") {
    return `${EEE}, ${MMM} ${dd}, ${yyyy}`;
  }

  // default ISO
  return `${yyyy}-${mm}-${dd}`;
});


  return {
    dir: {
      input: "src",
      output: "."
    }
  };
};
