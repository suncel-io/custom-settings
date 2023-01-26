import React from "react";
import { NextPage } from "next";
import { SuncelAdmin } from "@suncel/nextjs/admin";
import { SpacingField } from "@/suncel/customSettings/spacing";

const AdminPage: NextPage = () => {
  return (
    <SuncelAdmin
      settingsComponents={[
        {
          type: "spacing",
          component: (props) => <SpacingField {...props} />,
        },
      ]}
    />
  );
};

export default AdminPage;
