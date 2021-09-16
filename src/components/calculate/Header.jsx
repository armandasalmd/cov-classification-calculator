import { Button, Icon } from "rsuite";

export default function Header({ displayName }) {
  return (
    <div>
      <Button href="/">
        <Icon icon="long-arrow-left" /> Go back home
      </Button>
      <div>
        <h3>Calculate {displayName} classification</h3>
        <p>Please enter the details to complete calculation</p>
      </div>
    </div>
  );
}
