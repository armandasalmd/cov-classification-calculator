import GlobalUtils from "./global";

const classificator = (function () {
  // function _get_required_modules(modules) {
  //   return modules.filter(function (module) {
  //     return module.mustInclude === true;
  //   });
  // }

  function _calculateWeightedAverage(modules) {
    let totalCredits = modules.reduce(function (total, module) {
      return total + module.credits;
    }, 0);

    let result = 0.0;

    for (let module of modules) {
      result += (parseInt(module.grade) * module.credits) / totalCredits;
    }

    return GlobalUtils.roundFloat(result, 2);
  }

  function _getBestModuleCombination(modules, creditsAmount) {
    let bestScore = 0.0;
    let bestModules = [];

    _findBestSubsetSum(modules, creditsAmount);

    function _findBestSubsetSum(modules, target, partial = []) {
      let s = GlobalUtils.sum(partial, "credits");
			
      if (s === target) {
				let partialScore = _calculateWeightedAverage(partial);
				
        if (partialScore > bestScore) {
          bestScore = partialScore;
          bestModules = [...partial];
        }
      }

      if (s >= target) {
        return;
      }

      for (let i = 0; i < modules.length; i++) {
        let n = modules[i];
        let remaining = modules.slice(i + 1);
        _findBestSubsetSum(remaining, target, [...partial, n]);
      }
    }

    return bestModules;
  }

  function _findYear(state, year) {
    return state.find(function (element) {
      return element.year === year;
    });
  }

  function classify(state, strategy) {
    let modulesToAverage = [];

    for (let component of strategy.components) {
      let yearData = _findYear(state, component.year);
      let modulesToAdd = _getBestModuleCombination(
        yearData.modules,
        component.credits
      );

      modulesToAverage.push(modulesToAdd);
    }

    return _calculateWeightedAverage(modulesToAverage.flat());
  }

  return { classify };
})();

export default classificator;
