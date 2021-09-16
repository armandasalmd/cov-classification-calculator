import { Checkbox, List, Tag, TagGroup } from "rsuite";
import GradePicker from "./GradePicker";

function pickTagColor(year) {
  if (year === "1") {
    return "cyan";
  } else if (year === "2") {
    return "yellow";
  } else {
    return "orange";
  }
}

export default function ModuleItem({ module, year }) {
	const tagColor = pickTagColor(year);

  return (
    <List.Item>
			<div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
				{ 
					module.isOptional && 
					<div style={{marginLeft: "0.5rem"}}>
						<Checkbox />
					</div>
				}
				<div>
					<div style={{ display: "flex", gap: "1rem" }}>
						<TagGroup>
							<Tag color={tagColor}>{module.code}</Tag>
							<Tag>{module.credits} credits</Tag>
						</TagGroup>
						<p style={{marginBottom: "0.125rem", marginTop: "0"}}>{module.displayName}</p>
					</div>
					<GradePicker />
				</div>
			</div>
    </List.Item>
  );
}
