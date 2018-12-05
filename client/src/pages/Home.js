import React, { Component } from 'react';
import Navigation from './../components/Navigation/Navigation';
import Slider from './../components/Slider/Slider';

function Home() {
  return (
  <div>
      <Navigation />
      <Slider  />
      <main id="page-wrap">
    </main>
  </div>
  );
}

export default Home;