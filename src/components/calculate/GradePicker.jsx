import { InputNumber, Slider } from "rsuite";

import { templateConfig } from "/src/utils/templates";

export default function GradePicker({value, onChange}) {
  return (
    <div style={{marginTop: "0.35rem", display: "flex", alignItems: "center"}}>
			<p style={{marginRight: "0.25rem"}}>Your grade: </p>
      <InputNumber
        postfix="%"
        min={1}
        max={100}
				size="sm"
        onChange={onChange}
        defaultValue={templateConfig.passMinimum}
        value={value}
				style={{width: "7rem"}}
      />
      <p style={{margin: "0 1rem"}}>or</p>
      <Slider value={value} onChange={onChange} style={{width: "18rem"}} />
    </div>
  );
}
