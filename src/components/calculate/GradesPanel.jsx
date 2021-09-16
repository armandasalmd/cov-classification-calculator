import { useState } from "react";
import { Button, Icon, Grid, Row, Message, List } from "rsuite";

import ResultsModal from "./ResultsModal";
import ModuleItem from "./ModuleItem";
import CalculatorUtils from "/src/utils/calculator";
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

export default function GradesPanel({ active, data }) {
  const [resultsVisable, setResultsVisable] = useState(false);
  const [result, setResult] = useState(null);

  const styles = {
    marginTop: "0.5rem",
    padding: "1rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  const { modules } = data.find(function (dataItem) {
    return dataItem.year === active;
  });

  function onCalculate() {
    setResultsVisable(true);
    setResult(CalculatorUtils.calculate(null));
  }

  function closeResults() {
    setResultsVisable(false);
    setResult(null);
  }

  const mandatoryItems = CreateMandatoryModules(modules, active);
  const optionalItems = CreatOptionalModules(modules, active);

  return (
    <>
      <Grid fluid style={styles}>
        <Row>
          <Message type="error" description="Sum of credits 100/120" />
        </Row>
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
        show={resultsVisable}
        closeResults={closeResults}
        result={result}
      />
    </>
  );
}
