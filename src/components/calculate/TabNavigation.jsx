import { useState } from "react";
import { Nav } from "rsuite";

import GradesPanel from "./GradesPanel";

function CreateNavItem(eventKey, text) {
  return <Nav.Item key={eventKey} eventKey={eventKey}>{text}</Nav.Item>
}

export default function TabNavigation({tabsState, tabsDispatch}) {
  const [active, setActive] = useState(tabsState[0].year);

  const navItems = Array.isArray(tabsState) ? tabsState.map(function (item) {
    return CreateNavItem(item.year, `Year ${item.year}`);
  }) : [];

  function onSelect(activeKey) {
    setActive(activeKey);
  }

  return (
    <div>
      <Nav appearance="subtle" activeKey={active} onSelect={onSelect}>
        {navItems}
      </Nav>
      <GradesPanel active={active} tabsState={tabsState} tabsDispatch={tabsDispatch} />
    </div>
  );
}
