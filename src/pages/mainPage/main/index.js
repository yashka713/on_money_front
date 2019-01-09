import React from "react";
import Activities from "./activities";
import Charts from "./charts";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMoneyBillAlt from "@fortawesome/fontawesome-free-solid/faMoneyBillAlt";
import faColumns from "@fortawesome/fontawesome-free-solid/faColumns";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.flipCard = React.createRef();
    this.rotateFlipCart = this.rotateFlipCart.bind(this);
  }

  rotateFlipCart() {
    let classList = this.flipCard.current.className;
    if (this.flipCard.current.className.includes("flipRotate")) {
      this.flipCard.current.className = classList.replace(" flipRotate", "");
    } else {
      this.flipCard.current.className = classList + " flipRotate";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="cardContainer">
          <div className="flipCard" ref={this.flipCard}>
            <div className="flipSide">
              <div className="faContainer">
                <FontAwesomeIcon
                  icon={faColumns}
                  className="cursor-pointer faFontFlip"
                  onClick={this.rotateFlipCart}
                />
              </div>
              <Activities />
            </div>
            <div className="flipSide flipBack">
              <div className="faContainer">
                <FontAwesomeIcon
                  icon={faMoneyBillAlt}
                  className="cursor-pointer faFontFlip"
                  onClick={this.rotateFlipCart}
                />
              </div>
              <Charts />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
