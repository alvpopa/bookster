import React from 'react';
import Alert from '../../common/alert/Alert';
import { Container } from 'reactstrap';

const AppFooter = () => {
  return (
    <div id="Footer" className="text-center">
      <Container>
        <hr />
        <div style={{ position: 'absolute', top: '85%', left: '2%' }}>
          <Alert />
        </div>
        <p className="lead text-muted py-4">Bookster 2019</p>
      </Container>
    </div>
  );
};

export default AppFooter;
