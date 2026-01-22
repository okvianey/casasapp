module.exports = {
  siteMetadata: {
    title: `casas`,
    siteUrl: `https://casas.flatlatte.com`,
  },
  pathPrefix: "/",
  plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `canciones`,
      path: `${__dirname}/canciones`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve("./src/components/layout.js"),
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "Casas - Cantemos juntos",
      short_name: "Casas",
      description: `Cantemos juntos`,
      start_url: "/",
      background_color: "#ffffff",
      display: "standalone",
      icon: "src/images/icon.png",
      crossOrigin: `use-credentials`,
    },
  },
  {
    resolve: `gatsby-plugin-offline`,
    options: {
      precachePages: [`/about/`, `/projects/*`],
    },
  },
],
  
}
