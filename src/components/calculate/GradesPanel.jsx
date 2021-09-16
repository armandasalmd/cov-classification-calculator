import { useState } from "react";
import { Button, Icon, Grid, Row, Message, List } from "rsuite";

import ResultsModal from "./ResultsModal";
import ModuleItem from "./ModuleItem";
import CalculatorUtils from "/src/utils/calculator";
import { templateConfig } from "/src/utils/templates";
import { getMandatoryModules, getOptionalModules } from "/src/utils/templates";

function CreateMandatoryModules(allModules, year) {
  return getMandatoryModules(allModules).map(function (module) {
    return <ModuleItem module={module} key={module.code} year={year} />;
  });
}

function CreatOptionalModules(allModules, year) {
  return getOptionalModules(allModules).map(function (module) {
    return <ModuleItem module={module} key={module.code} year={year} />;
  });
}

export default function GradesPanel({ active, tabsState }) {
  const [result, setResult] = useState(null);

  const styles = {
    marginTop: "0.5rem",
    padding: "1rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  const { modules, activeCredits } = tabsState.find(function (tab) {
    return tab.year === active;
  });

  function onCalculate() {
    setResult(CalculatorUtils.calculate(null));
  }

  function closeResults() {
    setResult(null);
  }

  const mandatoryItems = CreateMandatoryModules(modules, active);
  const optionalItems = CreatOptionalModules(modules, active);

  return (
    <div style={{marginBottom: "1rem"}}>
      <Grid fluid style={styles}>
        {
          activeCredits < templateConfig.creditsPerYear &&
          <Row>
            <Message type="error" description="Sum of credits 100/120" />
          </Row>
        }
        {mandatoryItems.length > 0 && (
          <Row style={{ margin: "1rem 0" }}>
            <h5>Mandatory modules</h5>
            <List>{mandatoryItems}</List>
          </Row>
        )}
        {optionalItems.length > 0 && (
          <Row style={{ margin: "1rem 0" }}>
            <h5>Optional modules</h5>
            <List>{optionalItems}</List>
          </Row>
        )}
        <Row>
          <Button
            appearance="primary"
            color="green"
            onClick={onCalculate}
            style={{ float: "right" }}
          >
            <Icon icon="calculator" /> Calculate
          </Button>
          <Button style={{ float: "right", marginRight: "0.5rem" }}>
            <Icon icon="reload" /> Reset
          </Button>
        </Row>
      </Grid>
      <ResultsModal
        show={!!result}
        closeResults={closeResults}
        result={result}
      />
    </div>
  );
}
