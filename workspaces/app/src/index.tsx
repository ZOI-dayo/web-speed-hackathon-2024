import './setup';

import { Dialog } from './foundation/components/Dialog';
import { GlobalStyle } from './foundation/styles/GlobalStyle';
import { Router } from './routes';

export const ClientApp: React.FC = ({bookCache}) => {
  return (
    <>
      <GlobalStyle />
      <Dialog />
      <Router bookCache={bookCache} />
    </>
  );
};
