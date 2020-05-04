import React from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const ProgressSlider = withStyles({
  root: {
    width: 291,
    height: 8,
    color: "#304149",
    marginBottom: 8,
    marginLeft: 2,
    marginRight: 2,
    padding: 2,
    opacity: 0.9,
  },
  thumb: {
    height: 8,
    width: 8,
    backgroundColor: "#fff",
    marginTop: 0,
    marginLeft: -3,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% -10px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  thumbColorSecondary: {
    display: 'none'
  }
})(Slider);

const ProgressBar = ({ defaultValue, onChange, value, disabled }) => {
  return disabled ? (
    <ProgressSlider
      color='secondary'
      style={{opacity: 0.3}}
      disabled={disabled}
      onChange={onChange}
      value={value}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => value + "%"}
      step={10}
      defaultValue={defaultValue}
    />
  ) : (
    <ProgressSlider
      onChange={onChange}
      value={value}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => value + "%"}
      step={10}
      defaultValue={defaultValue}
    />
  );
};

export default ProgressBar;
