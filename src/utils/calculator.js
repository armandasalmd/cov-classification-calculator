import ClassificatorUtils from "./classificator";
import GlobalUtils from "./global";
import { templateConfig } from "./templates";

const calculator = (function () {

  const STRATEGIES = templateConfig.strategies;

  function calculate(tabsState) {
    let stateClone = _dropNotSelected(GlobalUtils.deepClone(tabsState));

    let result = {
      success: !_hasFailingModule(stateClone),
      score: 0,
      classification: "",
      stategyResults: []
    };

    if (result.success === false) {
      return result;
    }

    for (let strategy of STRATEGIES) {
      let strategyResult = {
        name: strategy.name,
        score: ClassificatorUtils.classify(stateClone, strategy)
      };
      
      result.stategyResults.push(strategyResult);
    }

    result.score = _getBestScore(result.stategyResults);
    result.classification = _getClassificationName(result.score);

    return result;
  }

  function _dropNotSelected(tabsState) {
    for (let tab of tabsState) {
      tab.modules = tab.modules.filter(function (module) {
        return !(module.isOptional === true && module.isSelected === false);
      });
    }

    return tabsState;
  }

  function _getBestScore(stategyResults) {
    let max = 0;

    stategyResults.forEach(function (result) {
      if (result.score > max) {
        max = result.score;
      }
    });

    return max;
  }

  function _getClassificationName(grade) {
    if (grade >= 0 && grade < 40) {
      return "Fail";
    } else if (grade >= 40 && grade < 50) {
      return "Third Class";
    } else if (grade >= 50 && grade < 60) {
      return "2:2 (Second Class, Second Division)";
    } else if (grade >= 60 && grade < 70) {
      return "2:1 (Second Class, First Division)";
    } else if (grade >= 70 && grade <= 100) {
      return "1st Class";
    } else {
      return "Either you entered some information incorrectly, or you cheated...";
    }
  }

  function _hasFailingModule(tabsState) {
    let allModules = tabsState.reduce(function(total, tab) {
      total.push(tab.modules);

      return total;
    }, []).flat();

    return !allModules.every(function(module) {
      return module.grade >= templateConfig.passMinimum;
    });
  }

  return { calculate };
})();

export default calculator;