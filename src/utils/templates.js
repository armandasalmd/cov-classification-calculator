import GlobalUtils from "./global";

const PASS_MINIMUM = 40;
const DEFAULT_GRADE = 50;

const templateConfig = {
  creditsPerYear: 120,
  passMinimum: PASS_MINIMUM,
  defaultGrade: DEFAULT_GRADE,
  strategies: [
    {
      name: "Strategy 1 result (100/100/100)",
      components: [
        {
          year: 1,
          credits: 100,
        },
        {
          year: 2,
          credits: 100,
        },
        {
          year: 3,
          credits: 100,
        },
      ],
    },
    {
      name: "Strategy 2 result (0/100/120)",
      components: [
        {
          year: 2,
          credits: 100,
        },
        {
          year: 3,
          credits: 120,
        },
      ],
    },
    {
      name: "Strategy 3 result (0/120/100)",
      components: [
        {
          year: 2,
          credits: 120,
        },
        {
          year: 3,
          credits: 100,
        },
      ],
    },
  ],
  templates: [
    {
      displayName: "Bsc Computer Science",
      description: "Calculate Computer Science classification",
      key: "bsc-computer-science",
    },
  ],
};

const _filterModules = function (allModules, isOptional) {
  const mandatoryModules = Array.isArray(allModules)
    ? allModules.filter(function (module) {
        return module.isOptional === isOptional;
      })
    : [];

  return mandatoryModules;
};

const getMandatoryModules = (allModules) => _filterModules(allModules, false);
const getOptionalModules = (allModules) => _filterModules(allModules, true);

const initializeTabsState = function (originalTabs) {
  return Array.isArray(originalTabs)
    ? originalTabs.map(function (tab) {
        let initializedTab = GlobalUtils.deepClone(tab);

        _ammendIsSelectedForOptionalModules(initializedTab);
        _ammendActiveCreditsValue(initializedTab);
        _ammendDefaultGradeValue(initializedTab);

        return initializedTab;
      })
    : [];

  function _ammendActiveCreditsValue(tab) {
    tab["activeCredits"] = tab.modules.reduce(function (total, module) {
      if (module.isOptional === true && !!module["isSelected"] === false) {
        return total;
      } else {
        return total + module.credits;
      }
    }, 0);
  }

  function _ammendIsSelectedForOptionalModules(tab) {
    tab.modules.forEach(function (module) {
      if (module.isOptional === true) {
        module["isSelected"] = false;
      }
    });
  }

  function _ammendDefaultGradeValue(tab) {
    if (tab && Array.isArray(tab.modules)) {
      tab.modules.map(function (module) {
        module["grade"] = DEFAULT_GRADE;
      });
    }
  }
};

const getTabAndModuleFromState = function (tabs, year, moduleCode) {
  const tabItem = tabs.find(function (tab) {
    return tab.year === year;
  });

  if (tabItem) {
    var moduleItem = tabItem.modules.find(function (module) {
      return module.code === moduleCode;
    });
  }

  return [tabItem, moduleItem];
}

export {
  templateConfig,
  getMandatoryModules,
  getOptionalModules,
  getTabAndModuleFromState,
  initializeTabsState,
};
