import { useReducer } from "react";
import { templateConfig } from "/src/utils/templates";
import RouteUtils from "/src/utils/route";
import { Grid, Row } from "rsuite";

import { Header, TabNavigation } from "/src/components/calculate";
import { initializeTabsState } from "/src/utils/templates";
import TabsReducer from "/src/reducers/tabsReducer";

function Calculate(props) {
  const [tabsState, tabsDispatch] = useReducer(
    TabsReducer,
    initializeTabsState(props.data)
  );

  return (
    <div>
      <Grid fluid>
        <Row>
          <Header displayName={props.displayName} />
        </Row>
        <Row>
          <TabNavigation
            tabsState={tabsState}
            tabsDispatch={tabsDispatch}
            {...props}
          />
        </Row>
      </Grid>

      <style jsx>{`
        div {
          margin: 3rem 20% 0 20%;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = templateConfig.templates.map((template) => ({
    params: { id: template.key },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    RouteUtils.buildAbsoluteUrl(`/templates/${params.id}.json`)
  );
  const template = await res.json();

  return {
    props: template,
  };
}

export default Calculate;
