import * as Styled from './styles';

import { ImageSharpFixed, ImageSharpFluid } from 'helpers/definitions';
import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image';
import React from 'react';

const Logo: React.FC = () => {
  const { site, placeholderImage } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      placeholderImage: file(relativePath: { eq: "ayush.png" }) {
        childImageSharp {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const logoTitle: string = site.siteMetadata.title;
  const logoImage: ImageSharpFixed = placeholderImage.childImageSharp.fixed;

  return (
    <Styled.Logo to="/">
      <Styled.Image>
        <Img fixed={logoImage} alt={logoTitle} />
      </Styled.Image>
      {/*<Styled.Text>{logoTitle}</Styled.Text>*/}
    </Styled.Logo>
  );
};

export default Logo;
