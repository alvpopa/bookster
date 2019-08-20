import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMutation } from 'graphql-hooks';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { removeAllEvents, removeEvent } from '../../actions/ticketAction';

import {
  Badge,
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const TICKET_MUTATION = `
mutation($input: TicketInput) {
  addTicket(input: $input) {
    id
    userId
    predictions {
      homeTeam
      awayTeam
      prediction
      odd
    }
  }
}`;

const choice = {
  HOME_TEAM: '1',
  DRAW: 'X',
  AWAY_TEAM: '2',
};

const Bet = ({ removeAllEvents, removeEvent, tickets, userId }) => {
  const [bet, setBet] = useState(5);
  const total = tickets.reduce(
    (acc, { odd }) => Number(acc * odd).toFixed(2),
    bet
  );
  const value = Math.floor(total);
  const rest = 100 * Number(total - value).toFixed(2);

  const [addTicket, { loading }] = useMutation(TICKET_MUTATION, {
    variables: {
      input: {
        userId,
        predictions: tickets,
        amount: Number(bet),
        totalOdd: Number(total / bet),
      },
    },
  });

  const handleSubmit = () => {
    addTicket();
    removeAllEvents();
  };

  const handleClick = ({
    currentTarget: {
      dataset: { id },
    },
  }) => {
    removeEvent(Number(id));
  };

  return (
    <Container>
      <h1 className="display-8">
        Bet{' '}
        <Badge color="primary" pill>
          {tickets.length}
        </Badge>
      </h1>
      <ListGroup>
        {tickets.map(({ eventId, homeTeam, awayTeam, prediction, odd }) => (
          <ListGroupItem key={eventId}>
            {homeTeam} - {awayTeam} {choice[prediction]}@{odd}{' '}
            <FontAwesomeIcon
              data-id={eventId}
              icon={faTimesCircle}
              onClick={handleClick}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
      {tickets.length > 0 && (
        <>
          <InputGroup>
            <InputGroupAddon addonType="prepend">RON</InputGroupAddon>
            <Input
              placeholder="Amount"
              min={5}
              type="number"
              step="5"
              value={bet}
              onChange={e => setBet(e.currentTarget.value)}
            />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">RON</InputGroupAddon>
            <Input value={value} disabled />
            <InputGroupAddon addonType="append">
              <InputGroupText>.{rest}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Button
            id="btn-login"
            type="submit"
            color="primary"
            className="btn-lg"
            onClick={handleSubmit}
            disabled={loading}
            block
          >
            {loading ? 'Loading..' : 'Place bet'}
          </Button>
        </>
      )}
    </Container>
  );
};

Bet.propTypes = {
  removeAllEvents: PropTypes.func,
  removeEvent: PropTypes.func,
  tickets: PropTypes.array,
  userId: PropTypes.string,
};

const mapStateToProps = ({ auth: { user: { _id } = null }, tickets }) => ({
  userId: _id,
  tickets,
});

export default connect(
  mapStateToProps,
  { removeEvent, removeAllEvents }
)(Bet);
