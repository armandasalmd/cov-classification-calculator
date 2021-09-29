import GlobalUtils from "./global";

const PASS_MINIMUM = 40;
const DEFAULT_GRADE = 50;

const templateConfig = {
  creditsPerYear: 120,
  defaultGrade: DEFAULT_GRADE,
  passMinimum: PASS_MINIMUM,
  strategies: [
    {
      name: "Strategy 1 result (100/100/100)",
      components: [
        {
          year: "1",
          credits: 100,
        },
        {
          year: "2",
          credits: 100,
        },
        {
          year: "3",
          credits: 100,
        },
      ],
    },
    {
      name: "Strategy 2 result (0/100/120)",
      components: [
        {
          year: "2",
          credits: 100,
        },
        {
          year: "3",
          credits: 120,
        },
      ],
    },
    {
      name: "Strategy 3 result (Top 300 credits from any level)",
      anyLevelCredits: 300
    },
  ],
  templates: [
    {
      displayName: "Bsc Computer Science (2021)",
      description: "Calculate Computer Science classification",
      key: "bsc-computer-science",
    },
    {
      displayName: "Bsc Computer Science (Matthew Chivers)",
      description: "Original Python classification module template",
      key: "bsc-computer-science-matthew",
    },
    {
      displayName: "BA Digital Marketing",
      description: "Calculate Digital Marketing classification (2021)",
      key: "ba-digital-marketing",
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
