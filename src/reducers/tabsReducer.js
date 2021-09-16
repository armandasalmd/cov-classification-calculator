import { templateConfig, getTabAndModuleFromState } from "/src/utils/templates";

export const CHANGE_GRADE = "CHANGE_GRADE";
export const CHECK_MODULE = "CHECK_MODULE";
export const RESET_INPUT = "RESET_INPUT";

export default function reducer(state, { type, payload }) {
	switch (type) {
		case CHANGE_GRADE: {
			const { year, code, value } = payload;
			const [, module] = getTabAndModuleFromState(state, year, code);

			try {
				module.grade = parseInt(value);
			} catch {
				module.grade = templateConfig.defaultGrade;
			}

			return [
				...state
			];
		}
		case CHECK_MODULE: {
			const { year, code, value } = payload;
			const [tab, module] = getTabAndModuleFromState(state, year, code);

			module.isSelected = !!value;

			if (!!value == true) {
				tab.activeCredits += module.credits;
			} else {
				tab.activeCredits -= module.credits;
			}

			return [
				...state
			];
		}
		case RESET_INPUT:
			state.forEach(function (tab) {
				tab.modules.forEach(function (module) {
					if (module.isSelected === true) {
						module.isSelected = false;
						tab.activeCredits -= module.credits;
					}

					module.grade = templateConfig.defaultGrade;
				});
			});

			return [
				...state
			];
		default:
			throw new Error();
	}
}
