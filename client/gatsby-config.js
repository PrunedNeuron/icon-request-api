module.exports = {
  siteMetadata: {
    title: `Ayush Mishra`,
    description: `Graphic Designer & Developer`,
    author: `Ayush Mishra`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-personal-website-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ed64a6`,
        theme_color: `#ed64a6`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-tailwindcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/assets/styles/global.css`]
      }
    },
    `react-process-string`,
    `react-linkify`,
    `styled-icons`,
    `firebase-admin`,
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyBzBURUJcOoBG44zPZw_rA8Q3chVD4mh1I',
          authDomain: 'amphetamine-3675c.firebaseapp.com',
          databaseURL: 'https://amphetamine-3675c.firebaseio.com',
          projectId: 'amphetamine-3675c',
          storageBucket: 'amphetamine-3675c.appspot.com',
          messagingSenderId: '97337039515',
          appId: '1:97337039515:web:bde7108af37782adeb043e'
        }
      }
    }
  ]
};
