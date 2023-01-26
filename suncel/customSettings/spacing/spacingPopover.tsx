import { Listbox, Popover } from "@headlessui/react";
import clsx from "clsx";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { SpacingValue } from ".";

type SpacingPopoverProps = {
  spacingValue: SpacingValue;
  onChange: (value: SpacingValue) => void;
  gridArea: string;
};

const units = ["px", "%", "em", "ch", "rem", "vw", "vh", "auto"];
const commonValues = ["auto", "0", "10", "20", "40", "60", "100", "140", "220"];

export const SpacingPopover: React.FC<SpacingPopoverProps> = ({ spacingValue, onChange, gridArea }) => {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement>();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  const [startVal, setStartVal] = useState(0);

  const onStart = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setStartVal(event.clientY);
  }, []);

  // Drag the mouse on the value to change it
  useEffect(() => {
    // Only change the value if the drag was actually started.
    const onUpdate = (event: globalThis.MouseEvent) => {
      if (startVal) {
        const snapshot = Math.trunc((event.clientY - startVal) / 50);
        onChange?.({
          ...spacingValue,
          value: (parseInt(spacingValue?.value || "0") - snapshot).toString(),
        });
      }
    };

    // Stop the drag operation now.
    const onEnd = () => {
      setStartVal(0);
    };

    document.addEventListener("mousemove", onUpdate);
    document.addEventListener("mouseup", onEnd);
    return () => {
      document.removeEventListener("mousemove", onUpdate);
      document.removeEventListener("mouseup", onEnd);
    };
  }, [startVal, spacingValue?.value, onChange, spacingValue]);

  return (
    <Popover className='flex items-center self-center justify-center' style={{ gridArea }}>
      <Popover.Button
        ref={(ref: HTMLButtonElement) => setReferenceElement(ref)}
        onMouseDown={onStart}
        className='text-sm text-white cursor-ns-resize'
      >
        {spacingValue?.value || "0"}
        {spacingValue?.value !== "auto" ? spacingValue?.unit || "" : ""}
      </Popover.Button>
      <Popover.Panel
        ref={(ref: HTMLDivElement) => setPopperElement(ref)}
        style={styles.popper}
        {...attributes.popper}
        className='absolute z-10 w-full p-4 space-y-6 text-white bg-gray-800 rounded-lg '
      >
        <div className='flex flex-row items-center justify-center space-x-4'>
          <input
            type='range'
            min='1'
            max='300'
            onChange={(rangeVal) => {
              onChange({
                ...spacingValue,
                value: rangeVal.target.value,
              });
            }}
          />
          <div className='flex flex-row border border-white rounded-md item-center'>
            <input
              type='text'
              value={spacingValue?.value || "0"}
              onChange={(newVal) => {
                onChange({
                  ...spacingValue,
                  value: newVal.target.value,
                });
              }}
              className='h-8 text-sm text-gray-800 rounded-md w-14'
            />

            <Listbox
              value={spacingValue?.unit || ""}
              onChange={(newUnit) => {
                onChange({
                  ...spacingValue,
                  unit: newUnit,
                });
              }}
            >
              <Listbox.Button className='px-2'> {spacingValue?.unit || "px"}</Listbox.Button>
              <Listbox.Options className='absolute z-50 py-1 text-left text-gray-800 uppercase bg-gray-100 border rounded-md'>
                {units.map((unit, idx) => (
                  <Listbox.Option key={idx} value={unit}>
                    {({ selected }) => (
                      <div
                        className={clsx("p-1 text-center  cursor-pointer text-sm", {
                          "bg-gray-600 text-white": selected,
                        })}
                      >
                        {unit}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <div className='grid w-full grid-cols-5 gap-1'>
          {commonValues.map((val, idx) => (
            <div
              key={idx}
              className={clsx("p-2 flex justify-center items-center bg-gray-600 text-white cursor-pointer", {
                "row-span-2": idx == 0,
              })}
              onClick={() => {
                onChange({
                  ...spacingValue,
                  value: val,
                });
              }}
            >
              {val}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};
