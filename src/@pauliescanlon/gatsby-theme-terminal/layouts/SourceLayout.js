import React, { Fragment } from 'react'
import { Location } from '@reach/router'
import { graphql } from 'gatsby'

import { ContextProvider } from '@pauliescanlon/gatsby-theme-terminal/src/context'
import { Seo } from '@pauliescanlon/gatsby-theme-terminal/src/components/Seo'
import { SourceArticle } from '@pauliescanlon/gatsby-theme-terminal/src/components/SourceArticle'
import { useConfig } from '@pauliescanlon/gatsby-theme-terminal/src/data'

const IMAGE_KEY = 'image'

const SourceLayout = ({
                        data: {
                          mdx: { id, body, excerpt, frontmatter, timeToRead, wordCount },
                        },
                      }) => {
  const {
    site: {
      siteMetadata: { name, siteUrl, siteImage, lang },
    },
  } = useConfig()

  const {
    title,
    tags,
    date,
    dateModified,
    author,
    isPrivate,
    featuredImage,
    featuredImageUrl,
    embeddedImages,
    embeddedImageUrls,
  } = frontmatter

  const seoImage =
    (featuredImage &&
      `${siteUrl}/${featuredImage.childImageSharp.fluid.src}`) ||
    featuredImageUrl ||
    `${siteUrl}/${siteImage}`

  const combinedEmbedded = [
    ...(embeddedImages || []),
    ...(embeddedImageUrls || []),
  ].filter(n => n)

  const embedded = combinedEmbedded.reduce((images, image, index) => {
    images[`${IMAGE_KEY}${index + 1}`] = images[`${IMAGE_KEY}${index + 1}`] || {
      ...(image.childImageSharp || { url: image }),
    }
    return images
  }, [])

  return (
    <ContextProvider>
      <Location>
        {({ location }) => {
          const { pathname } = location
          return (
            <Fragment>
              <Seo
                type="article"
                title={name}
                titleTemplate={title}
                description={excerpt}
                siteUrl={siteUrl}
                image={seoImage}
                path={pathname}
                keywords={tags}
                lang={lang}
              />
              <SourceArticle
                location={location}
                frontmatter={{ ...frontmatter, id }}
                title={title}
                tags={tags}
                date={date}
                dateModified={dateModified}
                author={author}
                isPrivate={isPrivate}
                featuredImage={featuredImage}
                featuredImageUrl={featuredImageUrl}
                embedded={embedded}
                body={body}
                timeToRead={timeToRead}
                wordCount={wordCount}
              />
            </Fragment>
          )
        }}
      </Location>
    </ContextProvider>
  )
}

// This query is a duplicate of useAllMdx so if you update this one update that one too! in data/useAllMdx
// test id: c147b696-2ac9-58b3-a3e6-17d8402289e0
// draft id: c2a66bb2-6fc4-5b03-94f1-e31abea07a59

export const query = graphql`
    query singleMdxCustom($id: String) {
        mdx(id: { eq: $id }) {
            id
            body
            excerpt
            timeToRead
            wordCount {
                words
            }
            frontmatter {
                title
                tags
                date
                dateModified
                author
                status
                isPrivate
                url
                misc
                featuredImage {
                    childImageSharp {
                        original {
                            width
                            height
                            src
                        }
                        fluid(maxWidth: 1200, quality: 90) {
                            ...GatsbyImageSharpFluid
                        }
                        fixed(quality: 90) {
                            ...GatsbyImageSharpFixed
                        }
                        id
                    }
                }
                embeddedImages {
                    childImageSharp {
                        original {
                            width
                            height
                            src
                        }
                        fluid(maxWidth: 1200, quality: 90) {
                            ...GatsbyImageSharpFluid
                        }
                        fixed(quality: 90) {
                            ...GatsbyImageSharpFixed
                        }
                        id
                    }
                }
            }
            fields {
                slug
                owner
                parent
            }
        }
    }
`

export default SourceLayout
