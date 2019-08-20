import React from 'react';
import { useQuery } from 'graphql-hooks';
import { Button, Col, Row } from 'reactstrap';
import { navigate } from 'hookrouter';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Bet from './Bet';
import Standing from './Standing';

// SPINNER
import Spinner from '../common/spinner/Spinner';
import Progress from './Progress';
import Odds from './Odds';
import { oddMaker } from '../../utils/helpers';

const noH2H = {
  numberOfMatches: 0,
  totalGoals: 0,
  homeTeam: {
    wins: 0,
    draws: 0,
    losses: 0,
  },
};

const MATCH_QUERY = `query($id: ID!) {
    match(id: $id) {
      head2head {
        numberOfMatches
        totalGoals
        homeTeam {
          wins
          draws
          losses
        }
      }
      match {
        id
        competition {
          id
          name
        }
        utcDate
        stage
        venue
        matchday
        homeTeam {
          name
        }
        awayTeam {
          name
        }
      }
    }
  }
  `;

const Match = ({ id }) => {
  const { loading, error, data } = useQuery(MATCH_QUERY, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return 'Something Bad Happened';

  const handleClick = () => {
    navigate('/dashboard');
  };

  const {
    match: {
      head2head,
      match: {
        id: eventId,
        homeTeam: { name: homeTeamName },
        awayTeam: { name: awayTeamName },
        competition: { id: competitionId },
      },
    },
  } = data;

  const { numberOfMatches, totalGoals, homeTeam } = head2head || noH2H;

  const odds = oddMaker({ numberOfMatches, homeTeam });

  return (
    <Row>
      <Col xl="7" xs="12">
        <h1 className="display-6">
          <Button color="primary" onClick={handleClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>{' '}
          {homeTeamName} vs {awayTeamName}
        </h1>
        <p>
          Head2Head: {homeTeam.wins} - {homeTeam.draws} - {homeTeam.losses}
        </p>
        <p>No. of goals : {totalGoals} ⚽️</p>
        {numberOfMatches && (
          <Progress
            homeTeam={homeTeamName}
            awayTeam={awayTeamName}
            head2head={{ numberOfMatches, homeTeam }}
          />
        )}
        <Odds
          homeTeam={homeTeamName}
          awayTeam={awayTeamName}
          odds={odds}
          eventId={eventId}
        />
        <Standing
          id={competitionId}
          homeTeam={homeTeamName}
          awayTeam={awayTeamName}
        />
      </Col>
      <Col xl="5" xs="12">
        <Bet className="mt-5" />
      </Col>
    </Row>
  );
};

export default Match;
