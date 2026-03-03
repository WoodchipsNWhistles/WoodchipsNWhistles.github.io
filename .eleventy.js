const { execSync } = require("child_process");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // "Last updated" = last git commit that touched this input file
  eleventyConfig.addFilter("lastUpdatedGit", (inputPath) => {
    try {
      const out = execSync(`git log -1 --format=%ct -- "${inputPath}"`, {
        encoding: "utf8",
      }).trim();
      return out ? new Date(Number(out) * 1000) : new Date();
    } catch (e) {
      return new Date();
    }
  });

  // Your custom date filter (kept, but moved inside)
  eleventyConfig.addFilter("date", (value, fmt = "yyyy-LL-dd") => {
    const d = value ? new Date(value) : new Date();

    const pad2 = (n) => String(n).padStart(2, "0");

    const yyyy = d.getFullYear();
    const mm = pad2(d.getMonth() + 1);
    const dd = pad2(d.getDate());

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
      includes: "_includes",
      data: "_data",
      output: ".", // publish to repo root
    },
  };
};