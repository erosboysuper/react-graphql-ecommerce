const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `TBô Clothing`,
    description: ``,
    author: `@tbounderwear`,
    siteUrl: `${process.env.SITE_URL}`,
  },
  flags: {
    // FAST_DEV: true,
    // FAST_REFRESH: true,
    // PARALLEL_SOURCING: true,
    // DEV_SSR: true,
    // FUNCTIONS: true,
    // LAZY_IMAGES: true,
    // QUERY_ON_DEMAND: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'content',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-preload-fonts`,
    // `gatsby-plugin-preload-link-crossorigin`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            `X-Frame-Options: SAMEORIGIN always`,
            `Content-Security-Policy: frame-ancestors 'self' https://optimize.google.com`,
          ],
          '/*.js': ['Cache-Control: public, max-age=28800'], // 8 hours
          '/*.css': ['Cache-Control: public, max-age=31536000, immutable'], // one year
          '/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'], // one year
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TBô Clothing`,
        short_name: `TBô`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FF8C00`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        crossOrigin: `anonymous`,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        environment: process.env.DATO_ENV,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          {
            domain: `https://shop-us.tbo.clothing`,
            crossOrigin: `anonymous`,
          },
          {
            domain: `https://shop-ch.tbo.clothing`,
            crossOrigin: `anonymous`,
          },
          {
            domain: `https://shop-de.tbo.clothing`,
            crossOrigin: `anonymous`,
          },

          // { domain: 'https://enablecors.com', crossOrigin: true },
          // { domain: 'https://disablecors.com', crossOrigin: false },
          // { domain: 'https://corswithanonymous.com', crossOrigin: 'anonymous' },
          // { domain: 'https://corswithcreds.com', crossOrigin: 'use-credentials' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: `${process.env.SITE_URL}`,
        sitemap: `${process.env.SITE_URL}sitemap.xml`,
        policy: [
          {
            userAgent: "*",
            allow: ['/'],
            disallow: ['/page-data/*'],
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        output: `/sitemap.xml`
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    // this (optional) plugin enables the webpack bundle analyzer functionality
    // 'gatsby-plugin-webpack-bundle-analyser-v2',
  ],
}
