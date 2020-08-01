//#region Imports

import { useConfig } from '@pauliescanlon/gatsby-theme-terminal/src/data';
import { Disqus } from 'gatsby-plugin-disqus';
import React from 'react';

//#endregion

//#region Styles

const disqusFrame = {
  backgroundColor: '#FFF',
  padding: '1rem',
  borderRadius: '8px',
};

//#endregion

/**
 * A função que representa o componente que exibe comentários do Disqus
 *
 * @param title O título da postagem
 * @param identifier O identificador da postagem
 *
 * @returns {*}
 * @constructor
 */
export default function Index({ frontmatter, pathname }) {
  const { site: { siteMetadata: { siteUrl } } } = useConfig();

  const disqusConfig = {
    url: `${ siteUrl + pathname }`,
    identifier: frontmatter.id,
    title: frontmatter.title,
  };

  return (
    <div style={ disqusFrame }>
      <Disqus config={ disqusConfig }/>
    </div>
  );
}

