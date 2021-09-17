import { useState } from "react";
import { Nav, Icon } from "rsuite";

import GradesPanel from "./GradesPanel";
import { templateConfig } from "/src/utils/templates";

function isTabFailing(tab) {
  return tab.activeCredits !== templateConfig.creditsPerYear;
}

function CreateNavItem(eventKey, text, isFailing) {
  return (
    <Nav.Item
      key={eventKey}
      eventKey={eventKey}
      icon={isFailing ? <Icon icon="exclamation-circle2" /> : undefined}
    >
      {text}
    </Nav.Item>
  );
}

export default function TabNavigation({ tabsState, tabsDispatch, pageId }) {
  const [active, setActive] = useState(tabsState[0].year);

  const navItems = Array.isArray(tabsState)
    ? tabsState.map(function (item) {
        return CreateNavItem(
          item.year,
          `Year ${item.year}`,
          isTabFailing(item)
        );
      })
    : [];

  function onSelect(activeKey) {
    setActive(activeKey);
  }

  return (
    <div>
      <Nav appearance="subtle" activeKey={active} onSelect={onSelect}>
        {navItems}
      </Nav>
      <GradesPanel
        active={active}
        pageId={pageId}
        tabsState={tabsState}
        tabsDispatch={tabsDispatch}
      />
    </div>
  );
}
