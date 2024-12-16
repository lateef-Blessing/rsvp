/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://atendeo.com",
  generateRobotsTxt: true, // Generate robots.txt automatically
  sitemapSize: 7000, // Adjust as needed for large sites
  changefreq: "daily",
  priority: 0.7,
};

module.exports = config;
