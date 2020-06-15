import * as Styled from './styles';

import Button from 'components/ui/Button';
import Container from 'components/ui/Container';
import { Link } from 'gatsby';
import React from 'react';
import TitleSection from 'components/ui/TitleSection';

interface Props {
  title: string;
  subtitle?: string;
  // content: React.ReactNode;
  // linkTo: string;
  // linkText: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }) => (
  <Styled.Banner>
    <Container section>
      <TitleSection title={title} subtitle={subtitle} />
      {/* <Link to={linkTo}>
        <Button primary>{linkText}</Button>
      </Link> */}
    </Container>
  </Styled.Banner>
);

export default Banner;
