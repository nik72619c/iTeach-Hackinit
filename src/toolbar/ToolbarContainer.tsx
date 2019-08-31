import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "./Toolbar";

// export interface ToolbarContainerProps extends JSX.IntrinsicAttributes {
//   colors: string[]
//   selectedColor?: string
//   weights: number[]
//   selectedWeight?: number
//   setColor: Function
//   setWeight: Function
//   undo: Function
//   redo: Function
//   clear: Function
// }

// duck
import { setColor, setWeight, setHighlighter,reset as r } from "./ducks/toolbar";
import { undoAction, redoAction, emptyAction } from "../canvas/ducks/canvas";

class ToolbarContainer extends Component<any, {}> {
  componentWillUnmount() {
    console.log()
    this.props.reset()
    this.props.clear()
  }
  render() {
    const { children, ...props } = this.props;
    return (
      <>
        <input
          type="checkbox"
          name="highlightStatus"
          onChange={e => {
            console.log(e.target.checked);
            this.props.setHighlighter(e.target.checked);
          }}
          style={{ position: "absolute", top: 175, left: 21 }}
        />
        <div style={{ position: "absolute", top: 176, left: 45 }}>
          Highlight
        </div>
        <Toolbar {...props} />
      </>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  const colors = state.toolbar.get("colors");
  const weights = state.toolbar.get("weights");
  const highlightStatus = state.toolbar.get("highlight");
  const selectedColor = state.toolbar.get("selectedColor");
  const selectedWeight = state.toolbar.get("selectedWeight");
  return {
    colors,
    weights,
    selectedColor,
    selectedWeight,
    highlightStatus,
  };
}

function mapDispatchToProps(dispatch: any, props: any) {
  return {
    setColor: (color: string) => {
      dispatch(setColor(color));
    },
    setWeight: (weight: number) => {
      dispatch(setWeight(weight));
    },
    undo: () => {
      dispatch(undoAction());
    },
    redo: () => {
      dispatch(redoAction());
    },
    clear: () => {
      dispatch(emptyAction());
    },
    setHighlighter: (highlightStatus: boolean) => {
      dispatch(setHighlighter(highlightStatus));
    },
    reset: () => {
      dispatch(r());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarContainer);
