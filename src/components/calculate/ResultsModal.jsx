import { Modal, Message, List, Button } from "rsuite";
import { Disclaimer } from "../Disclaimer";

function CreateMessage(result) {
  if (result.success) {
    return (
      <Message
        type="success"
        title={result.classification}
        description={`Your result is ${result.score}%. You've successfully completed your degree!`}
      />
    );
  } else {
    return (
      <Message
        type="error"
        description="Degree failed. You must pass all modules (>40%)"
      />
    );
  }
}

function CreateMoreDetailsList(result) {
  return (
    <List>
      {result.stategyResults.map((item, index) => (
        <List.Item key={index} index={index}>
          <p>
            {item.name}: <strong>{item.score}%</strong>
          </p>
        </List.Item>
      ))}
    </List>
  );
}

export default function ResultsModal({ show, closeResults, result }) {
  return (
    <Modal overflow show={show} onHide={closeResults}>
      <Modal.Header>
        <Modal.Title>Calculation results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {result == null && (
          <Message type="warning" description="Result cannot be calculated!" />
        )}
        {result != null && CreateMessage(result)}
        {result != null && result.success && (
          <p style={{ marginTop: "1rem" }}>More details</p>
        )}
        {result != null && result.success && CreateMoreDetailsList(result)}
        <p style={{ marginTop: "1rem" }}><Disclaimer asMessage /></p>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={closeResults}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
