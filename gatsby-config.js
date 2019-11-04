module.exports = {
  siteMetadata: {
    title: `uniuniunicode.com`,
    author: `Kosui Iwasa`,
    description: `UniUniUnicode`,
    siteUrl: `https://www.uniuniunicode.com`,
    social: {
      twitter: `UniUniUnicode`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: 'gatsby-remark-toc',
            options: {
              header: '目次', // the custom header text
              include: [
                'content/blog/**/*.md', // an include glob to match against
              ],
              mdastUtilTocOptions: {
                maxDepth: 3,
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener nofollow',
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-120669410-1`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `uniuniunicode.com`,
        short_name: `uniuniunicode.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2358ce`,
        display: `minimal-ui`,
        icon: `content/assets/profile-pic.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges
                .filter(
                  edge => edge.node.fields.slug.indexOf('/private/') === -1
                )
                .map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.frontmatter.desc,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.path,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                    custom_elements: [{ 'content:encoded': edge.node.html }],
                  })
                })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                      path
                    }
                    frontmatter {
                      title
                      date
                      desc
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'uniuniunicode.com',
          },
        ],
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
  ],
}
