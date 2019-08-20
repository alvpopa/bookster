import React from 'react';
import { useQuery } from 'graphql-hooks';
import { Table } from 'reactstrap';

// SPINNER
import Spinner from '../common/spinner/Spinner';
import StandingSVG from '../../svgs/standing.svg';

const crestPlaceholder =
  'https://chesterlestreet.football/wp-content/themes/victory/includes/images/badge-placeholder.png';

const STANDING_QUERY = `query($id: ID!) {
    standing(id: $id) {
        stage
        type
        table {
          position
          team {
            name
            crestUrl
          }
          playedGames
          won
          draw
          lost
          points
          goalsFor
          goalsAgainst
        }
      }
  }
`;

const Standing = ({ id, homeTeam, awayTeam }) => {
  const { loading, error, data } = useQuery(STANDING_QUERY, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error)
    return <img src={StandingSVG} width={600} height={300} alt="standing" />;

  const isActive = name => {
    return name === homeTeam || name === awayTeam ? 'table-danger' : '';
  };

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Goals for</th>
          <th>Goals against</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {data.standing.table.map(
          ({
            position,
            team: { crestUrl, name },
            playedGames,
            won,
            draw,
            lost,
            goalsFor,
            goalsAgainst,
            points,
          }) => (
            <tr key={position} className={isActive(name)}>
              <th scope="row">{position}</th>
              <td>
                <img
                  src={crestUrl || crestPlaceholder}
                  width={20}
                  height={20}
                  alt=""
                />{' '}
                {name}
              </td>
              <td>{playedGames}</td>
              <td>{won}</td>
              <td>{draw}</td>
              <td>{lost}</td>
              <td>{goalsFor}</td>
              <td>{goalsAgainst}</td>
              <td>{points}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default Standing;
