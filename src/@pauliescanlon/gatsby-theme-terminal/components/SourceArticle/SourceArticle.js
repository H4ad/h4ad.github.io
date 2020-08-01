import { MDXProvider } from '@mdx-js/react';

import { Main } from '@pauliescanlon/gatsby-theme-terminal/src/components/Main';
import { mix } from '@theme-ui/color';
import { Alert, Badge, Box, Divider, Flex, Heading, Image, Text } from '@theme-ui/components';
import { format } from 'date-fns';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Index from 'src/components/DisqusSection';
import pt from 'date-fns/locale/pt-BR';

const formatDate = date => format(new Date(date), 'd-MMM-u', { locale: pt });

export const SourceArticle = (props) => {
  const { title, tags, date, dateModified, author, isPrivate, featuredImage, featuredImageUrl, embedded, body, timeToRead, wordCount } = props;

  return (
    <Main>
      { isPrivate && (
        <Fragment>
          <Alert variant="error">Esse é um post privado</Alert>
          <Divider/>
        </Fragment>
      ) }

      <Box sx={ { mb: 4 } }>
        { featuredImage && featuredImage.childImageSharp && (
          <Img
            fluid={ featuredImage.childImageSharp.fluid }
            alt={ featuredImage.childImageSharp.fluid.originalName }
          />
        ) }
        { featuredImageUrl && <Image src={ featuredImageUrl }/> }
      </Box>
      <Heading as="h1" variant="styles.h1" sx={ { mb: 4 } }>
        { title }
      </Heading>
      <Flex sx={ { flexWrap: 'wrap' } }>
        <Box
          sx={ {
            width: ['100%', '50%'],
          } }
        >
          { date && (
            <Text sx={ { color: 'muted' } }>
              Publicado em: { formatDate(date) }
            </Text>
          ) }
        </Box>
        <Box
          sx={ {
            width: ['100%', '50%'],
          } }
        >
          { dateModified && (
            <Text
              sx={ {
                color: 'muted',
                textAlign: ['left', 'right'],
              } }
            >
              Modificado em: { formatDate(dateModified) }
            </Text>
          ) }
        </Box>
      </Flex>

      <Flex sx={ { flexWrap: 'wrap' } }>
        <Box
          sx={ {
            width: ['100%', '50%'],
          } }
        >
          <Text
            sx={ { color: 'muted' } }
          >{ `${ timeToRead } min de leitura / ${ wordCount.words } palavras` }</Text>
        </Box>
        { author && (
          <Box
            sx={ {
              width: ['100%', '50%'],
            } }
          >
            <Text sx={ { color: 'muted', textAlign: ['left', 'right'] } }>
              Autor: { author }
            </Text>
          </Box>
        ) }
      </Flex>

      <Divider/>

      { tags &&
      tags.map((tag, index) => (
        <Badge
          key={ index }
          variant="primary"
          sx={ {
            mb: 2,
            mr: 2,
            color: mix('muted', 'primary', `${ index / tags.length }`),
            borderColor: mix('muted', 'primary', `${ index / tags.length }`),
          } }
        >
          { tag }
        </Badge>
      )) }

      <Divider/>
      <MDXProvider>
        <MDXRenderer embedded={ embedded } frontmatter={ { ...props.frontmatter } }>{ body }</MDXRenderer>
      </MDXProvider>

      <Divider/>
      <Index
        frontmatter={ props.frontmatter }
        pathname={ props.location.pathname }
      />
    </Main>
  );
};

SourceArticle.propTypes = {
  /** Title frommatter" */
  title: PropTypes.string,
  /** Tags from frontmatter */
  tags: PropTypes.arrayOf(PropTypes.string),
  /** Date from frontmatter */
  date: PropTypes.string,
  /** DateModified from frontmatter */
  dateModified: PropTypes.string,
  /** Author from frontmatter */
  author: PropTypes.string,
  /** isPrivate from frontMatter */
  isPrivate: PropTypes.bool,
  /** FeaturedImage from frontmatter */
  featuredImage: PropTypes.any,
  /** FeaturedImageUrl from frontmatter */
  featuredImageUrl: PropTypes.string,
  /** embeddedImage array from SourceLayout */
  embedded: PropTypes.any,
  /** body from SourceLayout */
  body: PropTypes.any,
  /** timeToRead from SourceLayout */
  timeToRead: PropTypes.number,
  /** wordCount from SourceLayout */
  wordCount: PropTypes.shape({
    words: PropTypes.number,
  }),
};
