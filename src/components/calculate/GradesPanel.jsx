import { useState } from "react";
import { Alert, Button, Icon, Grid, Row, Message, List, Whisper, Tooltip } from "rsuite";

import ResultsModal from "./ResultsModal";
import ModuleItem from "./ModuleItem";
import SaveUtils from "/src/utils/save";
import CalculatorUtils from "/src/utils/calculator";
import { templateConfig, getMandatoryModules, getOptionalModules } from "/src/utils/templates";
import { RESET_INPUT, OVERRIDE_STATE } from "/src/reducers/tabsReducer";

function CreateMandatoryModules(allModules, year, tabsDispatch) {
  return getMandatoryModules(allModules).map(function (module) {
    return <ModuleItem module={module} key={module.code} year={year} tabsDispatch={tabsDispatch} />;
  });
}

function CreatOptionalModules(allModules, year, tabsDispatch) {
  return getOptionalModules(allModules).map(function (module) {
    return <ModuleItem module={module} key={module.code} year={year} tabsDispatch={tabsDispatch} />;
  });
}

function isCalculateEnabled(tabsState) {
  const failingTab = tabsState.find(function (tab) {
    return tab.activeCredits !== templateConfig.creditsPerYear;
  });

  return failingTab === undefined;
}

export default function GradesPanel({ active, pageId, tabsState, tabsDispatch }) {
  const [result, setResult] = useState(null);
  const [loadDisabled, setLoadDisabled] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);

  const styles = {
    marginTop: "0.5rem",
    padding: "1rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  const { modules, activeCredits } = tabsState.find(function (tab) {
    return tab.year === active;
  });

  function onCalculate() {
    setResult(CalculatorUtils.calculate(tabsState));
  }

  function onReset() {
    tabsDispatch({
      type: RESET_INPUT
    });
  }

  function onSave() {
    setSaveDisabled(true);

    SaveUtils.save(tabsState, pageId);
    Alert.success("Successfully saved your input data", 5000);
    setTimeout(() => setSaveDisabled(false), 5000);
  }
  
  function onLoad() {
    setLoadDisabled(true);

    let loadedTabsState = SaveUtils.load(pageId);
    
    if (Array.isArray(loadedTabsState)) {
      tabsDispatch({
        type: OVERRIDE_STATE,
        payload: loadedTabsState
      });
      Alert.success("Successfully loaded your data", 5000);
    } else {
      Alert.error("Malformatted data was saved in memory!", 5000);
    }

    setTimeout(() => setLoadDisabled(false), 5000);
  }

  function closeResults() {
    setResult(null);
  }

  const mandatoryItems = CreateMandatoryModules(modules, active, tabsDispatch);
  const optionalItems = CreatOptionalModules(modules, active, tabsDispatch);
  const isCreditRequirementFulfilled =
    activeCredits === templateConfig.creditsPerYear;

  return (
    <div style={{ marginBottom: "4rem" }}>
      <Grid fluid style={styles}>
        <Row style={{marginBottom: "1rem"}}>
          <div className="button-container">
            <Button
              appearance="primary"
              color="green"
              onClick={onCalculate}
              disabled={!isCalculateEnabled(tabsState)}
              style={{ float: "right" }}
            >
              <Icon icon="calculator" /> Calculate
            </Button>
            <Button onClick={onReset}>
              <Icon icon="reload" /> Reset
            </Button>
            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Optional. This saves input data for later use</Tooltip>}>
              <Button disabled={saveDisabled} onClick={onSave}>
                <Icon icon="save" /> Save grades
              </Button>
            </Whisper>
            <Button disabled={loadDisabled} onClick={onLoad}>
              <Icon icon="export" /> Load grades
            </Button>
          </div>
        </Row>
        {mandatoryItems.length > 0 && (
          <Row style={{ margin: "1rem 0" }}>
            <h5>Mandatory modules</h5>
            <List>{mandatoryItems}</List>
          </Row>
        )}
        {!isCreditRequirementFulfilled && (
          <Row>
            <Message type="error" title={`Used module credits: ${activeCredits} (${templateConfig.creditsPerYear} are required)`} description="Select some optional modules to update credits count" />
          </Row>
        )}
        {optionalItems.length > 0 && (
          <Row style={{ margin: "1rem 0" }}>
            <h5>Optional modules</h5>
            <List>{optionalItems}</List>
          </Row>
        )}
      </Grid>
      <ResultsModal
        show={!!result}
        closeResults={closeResults}
        result={result}
      />

      <style jsx>{`
        .button-container {
          display: flex;
          justify-content: end;
          gap: .5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
