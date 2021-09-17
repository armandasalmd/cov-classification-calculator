import {
  Button,
  Checkbox,
  List,
  Tag,
  TagGroup,
  Whisper,
  Tooltip,
  Icon,
} from "rsuite";
import GradePicker from "./GradePicker";

import { CHECK_MODULE, CHANGE_GRADE } from "/src/reducers/tabsReducer";

function pickTagColor(year) {
  if (year === "1") {
    return "cyan";
  } else if (year === "2") {
    return "yellow";
  } else {
    return "orange";
  }
}

export default function ModuleItem({ module, year, tabsDispatch }) {
  const tagColor = pickTagColor(year);

  function onCheckboxChange(_, checked) {
    tabsDispatch({
      type: CHECK_MODULE,
      payload: {
        year,
        code: module.code,
        value: checked,
      },
    });
  }

  function onGradeChange(value) {
    tabsDispatch({
      type: CHANGE_GRADE,
      payload: {
        year,
        code: module.code,
        value,
      },
    });
  }

  return (
    <List.Item>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {module.isOptional && (
          <div style={{ marginLeft: "0.5rem" }}>
            <Checkbox checked={module.isSelected} onChange={onCheckboxChange} />
          </div>
        )}
        <div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <TagGroup>
              <Tag color={tagColor}>{module.code}</Tag>
              <Tag>{module.credits} credits</Tag>
            </TagGroup>
            <div style={{ marginBottom: "0.125rem", marginTop: "0", display:"flex", alignItems:"center" }}>
              <p>{module.displayName}</p>
							{
								module.isRequired === true &&
								<Whisper
									trigger="click"
									speaker={
										<Tooltip>
											This module will always be included in the calculation!
										</Tooltip>
									}
								>
									<Button
										size="xs"
										appearance="subtle"
										style={{ color: "#f59700", marginLeft: "0.5rem" }}
									>
										<Icon icon="info" />
									</Button>
								</Whisper>
							}
            </div>
          </div>
          <GradePicker value={module.grade} onChange={onGradeChange} />
        </div>
      </div>
    </List.Item>
  );
}
