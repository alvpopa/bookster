import React from 'react';

import AboutSVG from '../../svgs/aboutpage.svg';

const About = () => {
  return (
    <div id="About">
      <h1 className="display-4">About</h1>
      <img src={AboutSVG} alt="about page" />
    </div>
  );
};

export default About;
