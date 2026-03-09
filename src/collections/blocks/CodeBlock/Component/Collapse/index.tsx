import React from "react";

import "./index.scss";

const baseClass = "code-block-collapse-button";
import { useCollapsible } from "@payloadcms/ui";

export const Collapse: React.FC = () => {
  const { toggle } = useCollapsible();
  return (
    <button className={baseClass} onClick={toggle} type="button">
      aaaaaa
    </button>
  );
};
