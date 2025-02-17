import React from "react";
import { Range } from "react-range";
import "./dual-slider.css";

interface DualSliderProps {
  min: number;
  max: number;
  step: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const DualSlider: React.FC<DualSliderProps> = ({
  min,
  max,
  step,
  values,
  onChange,
}) => {
  return (
    <div className="dual-range-slider">
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={(values: number[]) => onChange(values)}
        renderTrack={({ props, children }) => (
          <div {...props} className="track">
            <div
              className="track-active"
              style={{
                left: `${((values[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => <div {...props} className="thumb" />}
      />
      <div className="range-values">
        <span>Min: {values[0]}</span>
        <span>Max: {values[1]}</span>
      </div>
    </div>
  );
};

export default DualSlider;
