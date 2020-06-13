import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import * as Styled from './styles';

const Logo = () => {
  const { site, placeholderImage } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      placeholderImage: file(relativePath: { eq: "ayush.png" }) {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const logoTitle = site.siteMetadata.title;
  //const logoTitle = '';
  const logoImage = placeholderImage.childImageSharp.fluid;

  return (
    <Styled.Logo to="/">
      <Styled.Image>
        <Img fluid={logoImage} alt={logoTitle} />
      </Styled.Image>
      {/* <Styled.Text>{logoTitle}</Styled.Text> */}
    </Styled.Logo>
  );
};

export default Logo;
