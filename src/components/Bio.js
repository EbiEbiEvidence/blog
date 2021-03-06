import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              alignItems: 'center',
              marginTop: rhythm(1.5),
              marginBottom: rhythm(1.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
              }}
            />
            <div>
              <a href={`https://twitter.com/${social.twitter}`} target="_blank">
                {author}
              </a>
              <p style={{ margin: 0 }}>
                エンジニア at 株式会社ディー・エヌ・エー
              </p>
              <Link
                to="/aboutme"
                style={{
                  fontWeight: 'bold',
                }}
              >
                もっと詳しく
              </Link>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
