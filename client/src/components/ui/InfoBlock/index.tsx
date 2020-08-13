import React from 'react';

import Icon, { IconProps } from 'components/ui/Icon';

import * as Styled from './styles';
import Linkify from 'react-linkify';

interface Props extends Styled.StyledProps {
  title: string;
  content: React.ReactNode;
  icon: IconProps;
}

const InfoBlock: React.FC<Props> = ({ icon, title, content, center }) => (
  <Styled.InfoBlock center={center}>
    <Styled.Icon>
      <Icon icon={icon} />
    </Styled.Icon>
    <Styled.Wrapper center={center}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>
        <Linkify>{content}</Linkify>
      </Styled.Content>
    </Styled.Wrapper>
  </Styled.InfoBlock>
);

export default InfoBlock;
