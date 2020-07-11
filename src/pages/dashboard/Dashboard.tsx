import { Container } from '@material-ui/core';
import React from 'react';

import MetricsSelector from './components/MetricsSelector/MetricsSelector';

const Dashboard: React.FC = (): React.ReactElement => {
  return (
    <Container>
      <MetricsSelector />
    </Container>
  );
};

export default Dashboard;
