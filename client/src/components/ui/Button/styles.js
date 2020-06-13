import styled from 'styled-components';
import tw from 'tailwind.macro';
import { motion } from 'framer-motion';

export const Button = motion.custom(styled.button`
  outline: none !important;
  ${tw`py-2 px-8 rounded-full text-white`};

  ${({ primary }) => (primary ? tw`bg-red-500` : tw`text-red-500`)};

  ${({ block }) => block && tw`w-full`};
`);
