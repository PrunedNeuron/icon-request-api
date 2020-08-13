import { graphql, useStaticQuery } from 'gatsby';

import Banner from 'components/ui/Banner';
import React from 'react';
import { SectionTitle } from 'helpers/definitions';

interface SectionHeroBanner extends SectionTitle {
  // content: string;
  linkTo: string;
  linkText: string;
}

const HeroBanner: React.FC = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "hero section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
    }
  `);

  const heroBanner: SectionHeroBanner = markdownRemark.frontmatter;

  return (
    <Banner
      title={heroBanner.title}
      subtitle={heroBanner.subtitle}
      // content={heroBanner.content}
      // linkTo={heroBanner.linkTo}
      // linkText={heroBanner.linkText}
    />
  );
};

export default HeroBanner;
