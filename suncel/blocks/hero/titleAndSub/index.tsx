import React from "react";
import { RichTextType, SuncelBlock } from "@suncel/nextjs";
import { RichTextKey } from "@suncel/nextjs/components";
import { CustomRichText } from "@/suncel/wrappers/richtext";
import classes from "./styles.module.scss";
import { SpacingFieldType } from "@/suncel/customSettings/spacing";
import clsx from "clsx";

type TitleAndSubProps = {
  title?: RichTextType;
  hasSubtitle: boolean;
  subTitle?: RichTextType;
  spacing: SpacingFieldType;
};

type Position = "top" | "right" | "bottom" | "left";
const positions: Position[] = ["top", "right", "bottom", "left"];

export const TitleAndSub: SuncelBlock<TitleAndSubProps> = ({ title, subTitle, hasSubtitle, spacing }) => {
  return (
    <div
      className={clsx("bg-gray-100", classes?.container)}
      style={Object.assign(
        {} as React.CSSProperties,
        ...positions.map((e) => {
          const cap = e.charAt(0).toUpperCase() + e.slice(1);
          return {
            [`margin${cap}`]: `${spacing?.margin?.[e]?.value || "0"}${
              spacing?.margin?.[e]?.value == "auto" ? "" : spacing?.margin?.[e]?.unit || "px"
            }`,
            [`padding${cap}`]: `${spacing?.padding?.[e]?.value || ""}${
              spacing?.padding?.[e]?.value == "auto" ? "0" : spacing?.padding?.[e]?.unit || "px"
            }`,
          } as React.CSSProperties;
        })
      )}
    >
      <CustomRichText slug='title' value={title} allowedFeatures={[RichTextKey.MARK_HIGHLIGHT]} />
      {hasSubtitle && (
        <div className='mt-8'>
          <CustomRichText slug='subTitle' value={subTitle} />
        </div>
      )}
    </div>
  );
};

TitleAndSub.suncel = {
  slug: "TitleAndSub",
  displayName: "Title And Sub",
  defaultProps: {
    title: "<h1>Title to feed...</h1>",
    subTitle: "Tagline to feed...",
    hasSubtitle: true,
  },
  editor: {
    settings: [
      {
        type: "checkbox",
        name: "Has subtitle",
        slug: "hasSubtitle",
      },
      {
        type: "custom",
        customType: "spacing",
        name: "Spacing",
        slug: "spacing",
      },
    ],
  },
};
