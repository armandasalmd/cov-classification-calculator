import { Button, Icon } from "rsuite";

export default function Header({ displayName }) {
  return (
    <div>
      <Button href="/">
        <Icon icon="long-arrow-left" /> Go back home
      </Button>
      <div style={{margin: "1.5rem 0"}}>
        <h3>Calculate {displayName} classification</h3>
        <p>Please enter the details to complete calculation</p>
      </div>
    </div>
  );
}
