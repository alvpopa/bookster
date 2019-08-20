import React from 'react';
import { Col, Row } from 'reactstrap';

import MatchList from './MatchList';
import Bet from './Bet';

const Dashboard = () => {
  return (
    <Row>
      <Col xl="7" sm="12">
        <MatchList />
      </Col>
      <Col xl="5" sm="12">
        <Bet className="mt-5" />
      </Col>
    </Row>
  );
};

export default Dashboard;
