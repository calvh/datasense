import React from "react";
import "./Slider.css";
import Typed from "react-typed";

export default props => {
  // const style1 = {
  //   backgroundImage:
  //     'url("https://images.unsplash.com/photo-1536917802625-4427dfe13a91?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bbc0f570acf0b45569a972c396c6bcbe&auto=format&fit=crop&w=1890&q=80")',
  // };

  // const style2 = {
  //   backgroundImage:
  //     'url("https://images.unsplash.com/photo-1536286053831-52e1354eb5b7?ixlib=rb-0.3.5&s=5853d66c8f74e20f8e29eac13ec044a8&auto=format&fit=crop&w=1350&q=80")',
  // };

  // const style3 = {
  //   backgroundImage: 'url("https://source.unsplash.com/szFUQoyvrxM/1920x1080")',
  // };

  // return (
  //   <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  //     <ol className="carousel-indicators">
  //       <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
  //       <li data-target="#carouselExampleIndicators" data-slide-to="1" />
  //       <li data-target="#carouselExampleIndicators" data-slide-to="2" />
  //     </ol>

  //     <div className="carousel-inner" role="listbox">
  //       <div className="carousel-item active" style={style1}>
  //         <div className="carousel-caption d-none d-md-block">
  //           <h1>
  //             <Typed
  //               strings={["Search for products", "Search for categories", "Search for brands"]}
  //               typeSpeed={50}
  //               backSpeed={50}
  //               startDelay={2000}
  //               backDelay={2000}
  //               loop
  //             />
  //           </h1>
  //           <h2 className="display-4">First Slide</h2>
  //           <p className="element lead">This is a description for the first slide.</p>
  //         </div>
  //       </div>

  //       <div className="carousel-item" style={style2}>
  //         <div className="carousel-caption d-none d-md-block">
  //           <h2 className="display-4">Second Slide</h2>
  //           <p className="lead">This is a description for the second slide.</p>
  //         </div>
  //       </div>

  //       <div className="carousel-item" style={style3}>
  //         <div className="carousel-caption d-none d-md-block">
  //           <h2 className="display-4">Third Slide</h2>
  //           <p className="lead">This is a description for the third slide.</p>
  //         </div>
  //       </div>
  //     </div>

  //     <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
  //       <span className="carousel-control-prev-icon" aria-hidden="true" />
  //       <span className="sr-only">Previous</span>
  //     </a>
  //     <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
  //       <span className="carousel-control-next-icon" aria-hidden="true" />
  //       <span className="sr-only">Next</span>
  //     </a>
  //   </div>
  return (
    <React.Fragment>
      <div className="bg" />
      <div className="caption">
        <h1 className="title-home">INTRODUCING DATASENSE</h1>
        <br />
        <h1 className="animated-title">
          GENERATE
          <span className="animated-title2">
            <Typed
              strings={[" CHARTS", " DATASETS", " MODELS", " EQUATIONS"]}
              typeSpeed={50}
              backSpeed={50}
              startDelay={500}
              backDelay={2000}
              loop
            />
          </span>
        </h1>
        <h4 className="subtitle-home">A single place to find meaningful insights from your data.</h4>
      </div>
    </React.Fragment>
  );
};
