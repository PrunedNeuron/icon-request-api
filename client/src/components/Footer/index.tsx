import React from 'react';

import Container from 'components/ui/Container';
import { Dribbble, Github } from '@styled-icons/boxicons-logos';
import { AlternateEmail } from '@styled-icons/material';
import * as Styled from './styles';

const Footer: React.FC = () => (
  <Styled.Footer>
    <Container>
      <Styled.Links>
        <Styled.Link href="https://github.com/PrunedNeuron" rel="noreferrer noopener" target="_blank">
          <Styled.Icon>
            <Github />
          </Styled.Icon>
        </Styled.Link>
        <Styled.Link href="https://dribbble.com/ayush" rel="noreferrer noopener" target="_blank">
          <Styled.Icon>
            <Dribbble />
          </Styled.Icon>
        </Styled.Link>

        <Styled.Link href="mailto:am@ayushm.dev" rel="noreferrer noopener" target="_blank">
          <Styled.Icon>
            <AlternateEmail />
          </Styled.Icon>
        </Styled.Link>
      </Styled.Links>
    </Container>
  </Styled.Footer>
);

export default Footer;
