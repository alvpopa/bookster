import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'graphql-hooks';
import { navigate } from 'hookrouter';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  ListGroup,
  ListGroupItem,
  Progress,
  UncontrolledCollapse,
} from 'reactstrap';

// SPINNER
import Spinner from '../common/spinner/Spinner';
import Status from '../common/status/Status';
import { eventColor } from '../../utils/helpers';

const TICKETS_QUERY = `query($userId: String) {
    userTickets(userId: $userId) {
      id
      date
      amount
      totalOdd
      isWinner
      predictions {
        eventId
        homeTeam
        awayTeam
        prediction
        odd
        isCorrect
        result
      }
    }
  }`;

const TicketList = ({ userId }) => {
  const { loading, error, data } = useQuery(TICKETS_QUERY, {
    variables: { userId },
  });

  if (loading) return <Spinner />;
  if (error) return 'Something Bad Happened';

  const handleClick = () => {
    navigate('/dashboard');
  };

  const expenses = data.userTickets.reduce(
    (acc, { amount, totalOdd, isWinner }) => {
      acc.paid += amount;
      if (isWinner) acc.won += amount * totalOdd;
      return acc;
    },
    { paid: 0, won: 0 }
  );

  const { paid, won } = expenses;

  return (
    <Container>
      <h1 className="display-8">
        <Button color="primary" onClick={handleClick}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>{' '}
        Tickets list{' '}
        <Badge color="primary" pill>
          {data.userTickets.length}
        </Badge>
      </h1>
      <Progress className="mt-5 mb-5" multi>
        <Progress bar color="success" value={won} max={won + paid}>
          Won: {won} RON
        </Progress>
        <Progress bar color="danger" value={paid} max={won + paid}>
          Lost: {paid} RON
        </Progress>
      </Progress>
      <ListGroup>
        {data.userTickets.map(
          ({ id, date, amount, totalOdd, isWinner, predictions }) => (
            <ListGroupItem
              color={eventColor(isWinner)}
              key={id}
              tag="button"
              id={`toggle${id}`}
              action
            >
              Date: {date} | Amount: {amount} RON | Total odd: {totalOdd} |
              Potential win: {amount * totalOdd} RON | Status:{' '}
              <Status status={isWinner} />
              <UncontrolledCollapse toggler={`toggle${id}`}>
                <Card>
                  <CardBody>
                    {predictions.map(
                      ({
                        eventId,
                        homeTeam,
                        awayTeam,
                        prediction,
                        odd,
                        result,
                        isCorrect,
                      }) => (
                        <p key={eventId}>
                          {homeTeam} vs {awayTeam} - {prediction} @ {odd}
                          {' | RESULT: '} {result}
                          {' | STATUS: '}
                          <Status status={isCorrect} />
                        </p>
                      )
                    )}
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </ListGroupItem>
          )
        )}
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = ({ auth: { user: { _id } = {} } }) => ({
  userId: _id,
});

export default connect(mapStateToProps)(TicketList);
