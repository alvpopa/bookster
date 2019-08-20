import React from 'react';
import { Progress as ProgressBar } from 'reactstrap';

const Progress = ({
  homeTeam,
  awayTeam,
  head2head: {
    numberOfMatches,
    homeTeam: { wins, draws, losses },
  },
}) => {
  return (
    <ProgressBar multi>
      <ProgressBar
        bar
        value={Number((wins * 100) / numberOfMatches).toFixed(2)}
      >
        {homeTeam}
      </ProgressBar>
      <ProgressBar
        bar
        value={Number((draws * 100) / numberOfMatches).toFixed(2)}
        color="warning"
      >
        draws
      </ProgressBar>
      <ProgressBar
        bar
        value={Number((losses * 100) / numberOfMatches).toFixed(2)}
        color="danger"
      >
        {awayTeam}
      </ProgressBar>
    </ProgressBar>
  );
};
export default Progress;
