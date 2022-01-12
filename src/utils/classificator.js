import GlobalUtils from "./global";

const classificator = (function () {
  function _getRequiredAndRestModules(modules) {
    let requiredModules = [], restModules = [];

    for (let module of modules) {
      if (module.isRequired === true) {
        requiredModules.push(module);
      } else {
        restModules.push(module);
      }
    }

    return [requiredModules, restModules];
  }

  function _calculateWeightedAverage(modules) {
    let totalCredits = modules.reduce(function (total, module) {
      return total + module.credits;
    }, 0);

    let result = modules.reduce(function (total, module) {
      return total += (parseInt(module.grade) * module.credits) / totalCredits;
    }, 0.0);

    return GlobalUtils.roundFloat(result, 2);
  }

  function _combineAllModules(levels) {
    return levels.reduce(function (total, level) {
      return total.concat(level.modules);
    }, []);
  }

  function _getBestModuleCombination(modules, creditsAmount) {
    let [ missingCredits, modulesBin, remainingModules ] = _pickBestScoresUntilBinIsFull(modules, creditsAmount);

    if (missingCredits !== 0) {
      let bestScore = 0.0;
      let bestRemainingModules = [];
      let loopProtector = 0;
  
      while (bestRemainingModules.length === 0 && loopProtector < 100) {
        let worstModuleInBin = modulesBin.pop();

        remainingModules.push(worstModuleInBin);
        missingCredits += worstModuleInBin.credits;
        _findBestSubsetSum(remainingModules, missingCredits);

        loopProtector += 1;
      }

      if (bestRemainingModules.length === 0) {
        throw new Error("Calculation failed");
      } else {
        modulesBin = modulesBin.concat(bestRemainingModules);
      }
      
      function _findBestSubsetSum(modules, target, partial = []) {
        let s = GlobalUtils.sum(partial, "credits");
        
        if (s === target) {
          let partialScore = _calculateWeightedAverage(partial);
          
          if (partialScore > bestScore) {
            bestScore = partialScore;
            bestRemainingModules = [...partial];
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
    }

    return modulesBin;
  }

  function _getBestModuleCombinationWithRequired(
    applicableModules,
    totalCreditAim
  ) {
    let [requiredModules, restModules] = _getRequiredAndRestModules(applicableModules);
    let requiredModulesCredits = _requiredCreditsAmount(requiredModules);

    let topCreditModules = _getBestModuleCombination(
      restModules,
      totalCreditAim - requiredModulesCredits
    );

    return requiredModules.concat(topCreditModules);

    function _requiredCreditsAmount(requiredModules) {
      return requiredModules.reduce(function (total, module) {
        return total + module.credits;
      }, 0);
    }
  }

  function _findYear(state, year) {
    return state.find(function (element) {
      return element.year === year;
    });
  }

  function _pickBestScoresUntilBinIsFull(modules, creditAmount) {
    let binCreditCount = 0, modulesBin = [];
    let sortedModules = modules.sort((a, b) => a.grade - b.grade);

    while (sortedModules.length > 0) {
      let module = sortedModules.pop();

      if (binCreditCount + module.credits <= creditAmount) {
        binCreditCount += module.credits;
        modulesBin.push(module);
      } else {
        sortedModules.push(module);
        break;
      }
    }

    const missingCredits = creditAmount - binCreditCount;

    return [missingCredits, modulesBin, sortedModules];
  }

  function classify(state, strategy) {
    let modulesToAverage = [];

    if (typeof strategy.anyLevelCredits === "number") {
      // Strategy type: general where all years/levels are squashed in one big module pool

      modulesToAverage.push(
        _getBestModuleCombinationWithRequired(
          _combineAllModules(state),
          strategy.anyLevelCredits
        )
      );
    } else {
      // Strategy type: where each year/level are independant
      for (let component of strategy.components) {
        let yearData = _findYear(state, component.year);

        modulesToAverage.push(
          _getBestModuleCombinationWithRequired(
            yearData.modules,
            component.credits
          )
        );
      }
    }

    return _calculateWeightedAverage(modulesToAverage.flat());
  }

  return { classify };
})();

export default classificator;
