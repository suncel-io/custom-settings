import { SettingsComponentProps } from "@suncel/nextjs/admin";
import clsx from "clsx";
import React from "react";
import { SpacingPopover } from "./spacingPopover";
import classes from "./spacingStyle.module.scss";

export type SpacingValue = {
  value: string;
  unit: string;
};

export type SpacingFieldType = {
  margin: {
    top: SpacingValue;
    right: SpacingValue;
    bottom: SpacingValue;
    left: SpacingValue;
  };
  padding: {
    top: SpacingValue;
    right: SpacingValue;
    bottom: SpacingValue;
    left: SpacingValue;
  };
};

export const SpacingField: React.FC<SettingsComponentProps> = ({ value, onChange }) => {
  return (
    <div className={clsx(classes.container, "relative")}>
      <div className={clsx(classes.marginContainer, "border border-gray-800 bg-gray-500")}>
        <div className='absolute text-[10px] font-semibold text-white top-1 left-1 '>MARGIN</div>
        {["top", "right", "bottom", "left"].map((e, idx) => {
          return (
            <SpacingPopover
              spacingValue={value?.margin?.[e]}
              key={idx}
              gridArea={e}
              onChange={(val) =>
                onChange({
                  ...value,
                  margin: {
                    ...(value?.margin || {}),
                    [e]: {
                      value: val.value,
                      unit: val.value != "auto" ? val.unit || "px" : "",
                    },
                  },
                })
              }
            />
          );
        })}
      </div>
      <div className={clsx(classes.paddingContainer, "border border-gray-800 bg-gray-600")}>
        <div className='absolute text-[10px] font-semibold text-white top-[45px] left-[65px] '>PADDING</div>
        {["top", "right", "bottom", "left"].map((e, idx) => {
          return (
            <SpacingPopover
              spacingValue={value?.padding?.[e]}
              key={idx}
              gridArea={e}
              onChange={(val) =>
                onChange({
                  ...value,
                  padding: {
                    ...(value?.padding || {}),
                    [e]: {
                      value: val.value,
                      unit: val.value != "auto" ? val.unit || "px" : "",
                    },
                  },
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
};
