import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { addEvent } from '../../actions/ticketAction';

const choice = ['HOME_TEAM', 'DRAW', 'AWAY_TEAM'];

const Odds = ({ homeTeam, awayTeam, odds, eventId, addEvent }) => {
  const handleClick = ({
    currentTarget: {
      dataset: { index, odd },
    },
  }) => {
    const prediction = choice[index];
    addEvent({ eventId, homeTeam, awayTeam, odd, prediction });
  };
  return (
    <Table size="sm">
      <thead style={{ textAlign: 'center' }}>
        <tr>
          <th>Game</th>
          <th>1x2</th>
        </tr>
      </thead>
      <tbody style={{ textAlign: 'center' }}>
        <tr>
          <td width="75%">
            {homeTeam} vs {awayTeam}
          </td>
          <td>
            <ButtonGroup>
              {odds.map((odd, index) => (
                <Button
                  color="primary"
                  key={index}
                  value={odd}
                  data-index={index}
                  data-odd={odd}
                  onClick={handleClick}
                >
                  {odd}
                </Button>
              ))}
            </ButtonGroup>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(
  null,
  { addEvent }
)(Odds);
