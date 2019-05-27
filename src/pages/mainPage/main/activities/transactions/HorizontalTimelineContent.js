import React from "react";
import SwipeableViews from "react-swipeable-views";

import HorizontalTimeline from "react-horizontal-timeline";

export default class HorizontalTimelineContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      minEventPadding: 20,
      maxEventPadding: 20,
      linePadding: 100,
      labelWidth: 100,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: "#f8f8f8",
      stylesForeground: "#7b9d6f",
      stylesOutline: "#dfdfdf",
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: false,
      isOpenBeginning: false
    };
  }

  componentWillMount() {
    this.dates = this.props.content.map(entry => entry.date);
  }

  componentWillReceiveProps(nextProps) {
    this.dates = nextProps.content.map(entry => entry.date);
  }

  render() {
    const state = this.state;

    const views = this.props.content.map((entry, index) => {
      return (
        <div style={{ width: "90%", margin: "0 auto" }} key={index}>
          {entry.component}
        </div>
      );
    });

    return (
      <div className="col-md-12 margin-top-15">
        {this.props.children}
        <div style={{ width: "90%", height: "100px", margin: "0 auto" }}>
          <HorizontalTimeline
            fillingMotion={{
              stiffness: state.fillingMotionStiffness,
              damping: state.fillingMotionDamping
            }}
            index={this.state.value}
            indexClick={index => {
              this.setState({ value: index, previous: this.state.value });
            }}
            isKeyboardEnabled={state.isKeyboardEnabled}
            isTouchEnabled={state.isTouchEnabled}
            labelWidth={state.labelWidth}
            linePadding={state.linePadding}
            maxEventPadding={state.maxEventPadding}
            minEventPadding={state.minEventPadding}
            slidingMotion={{
              stiffness: state.slidingMotionStiffness,
              damping: state.slidingMotionDamping
            }}
            styles={{
              background: state.stylesBackground,
              foreground: state.stylesForeground,
              outline: state.stylesOutline
            }}
            values={this.dates}
            isOpenEnding={state.isOpenEnding}
            isOpenBeginning={state.isOpenBeginning}
          />
        </div>
        <div className="text-center">
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value: value, previous: previous });
            }}
          >
            {views}
          </SwipeableViews>
        </div>
      </div>
    );
  }
}
