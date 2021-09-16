const templateConfig = {
  passMinimum: 40,
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

export { templateConfig, getMandatoryModules, getOptionalModules };
