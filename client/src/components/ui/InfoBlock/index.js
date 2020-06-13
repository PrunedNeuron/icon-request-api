import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/ui/Icon';

import * as Styled from './styles';

import Linkify from 'react-linkify';

const InfoBlock = ({ icon, title, content, center }) => (
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

InfoBlock.propTypes = {
  center: PropTypes.bool,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  icon: PropTypes.string.isRequired
};

export default InfoBlock;
