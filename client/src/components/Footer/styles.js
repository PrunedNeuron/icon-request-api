import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Footer = styled.footer`
  ${tw`border-t border-gray-200 py-4`};
`;

export const Links = styled.div`
  ${tw`flex items-center justify-center w-full`};

  a {
    ${tw`text-indigo-900 hover:text-red-600 mx-2`};
  }
`;

export const Link = styled.a`
  ${tw`text-red-900 hover:text-red-600 mx-2`};
`;

export const Icon = styled.span`
  ${tw`flex items-center justify-center w-5 h-5 rounded-full hover:text-red-600 mb-2`};
`;
