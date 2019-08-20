import React from 'react';
import { useQuery } from 'graphql-hooks';
import { A } from 'hookrouter';
import { Badge, Container, ListGroup, ListGroupItem } from 'reactstrap';

// SPINNER
import Spinner from '../common/spinner/Spinner';

import { getHour } from '../../utils/helpers';

const MATCHES_QUERY = `query {
	matches {
    id
    homeTeam {
      name
    }
    awayTeam {
      name
    }
    competition {
      name
    }
    utcDate
  }
}`;

const MatchList = () => {
  const { loading, error, data } = useQuery(MATCHES_QUERY);

  if (loading) return <Spinner />;
  if (error) return 'Something Bad Happened';

  return (
    <Container>
      <h1 className="display-8">
        Matches list{' '}
        <Badge color="primary" pill>
          {data.matches.length}
        </Badge>
      </h1>
      <ListGroup>
        {data.matches.map(
          ({
            id,
            homeTeam: { name: homeTeam },
            awayTeam: { name: awayTeam },
            utcDate,
          }) => (
            <A key={id} href={`dashboard/${id}`}>
              <ListGroupItem key={id} tag="button" action>
                {getHour(utcDate)} | {homeTeam} vs {awayTeam}
              </ListGroupItem>
            </A>
          )
        )}
      </ListGroup>
    </Container>
  );
};
export default MatchList;
