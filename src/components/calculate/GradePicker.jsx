import { InputNumber } from "rsuite";

import { templateConfig } from "/src/utils/templates";

export default function GradePicker() {
  return (
    <div style={{marginTop: "0.35rem", display: "flex", alignItems: "center"}}>
			<p style={{marginRight: "0.25rem"}}>Your grade: </p>
      <InputNumber
        postfix="%"
        min={1}
        max={100}
				size="sm"
        defaultValue={templateConfig.passMinimum}
				style={{width: "7rem"}}
      />
    </div>
  );
}
