import { Button, Icon, Grid, Row } from "rsuite";

export default function GradesPanel({ active, data }) {
	const styles = {
		marginTop: "0.5rem",
		padding: "1rem",
		boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
	};

  const { modules } = data.find(function (dataItem) {
    return dataItem.year === active;
  });

  return (
      <Grid style={styles}>
        <Row>
          <h1>Active {active}</h1>
          <p>
            {JSON.stringify(modules)}
          </p>
        </Row>
        <Row>
          <Button appearance="primary" style={{ float: "right" }}>
            <Icon icon="calculator" /> Calculate
          </Button>
        </Row>
      </Grid>
  );
}
