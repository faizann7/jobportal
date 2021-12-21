import React from "react";
import { Link } from "react-router-dom";
import "./Speical.scss";

const Special = () => {
  return (
    <div>
      <section className="page_404">
        <div className="containerr">
          <div className="roww">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="404">
                  <h1 className="text-center">
                    <h1>404</h1>
                  </h1>
                </div>
                <div className="four_zero_four_bg"></div>

                <div className="contant_box_404">
                  <h3 className="h2">Looks like you're lost</h3>

                  <p>The page you are looking for not avaible!</p>

                  <Link to="/" className="link_404">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Special;
