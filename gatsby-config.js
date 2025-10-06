module.exports = {
  siteMetadata: {
    title: `casas`,
    siteUrl: `https://casas.flatlatte.com`,
  },
  pathPrefix: "/casasapp",
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Casas - Cantemos juntos",
        short_name: "Casas",
        description: `Cantemos juntos`,
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#6339ccff",
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [ `/about/`, `/projects/*` ],
      },
    }, 
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/components/layout.js"),
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `canciones`,
        path: `${__dirname}/canciones/`,
      }
    },
  ],
  
}
