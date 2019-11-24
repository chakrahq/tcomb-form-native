function getFilteredEnums(enums = [], groupValues = {}) {
  let filteredEnums = [{value: "", text: "-"}];
  for(i=0; i<enums.length; i++) {
    const currentOption = enums[i];
    let shouldAdd = false;
    if(currentOption.where) {
      shouldAdd = doesConditionMatch(currentOption.where, groupValues);
    } else {
      shouldAdd = true;
    }

    if(shouldAdd) {
      filteredEnums.push({value: currentOption['value'], text: currentOption['key']});
    }
  }
  return filteredEnums;
}

function doesConditionMatch(whereConditions, values) {
  let doesMatch = true;
  for(key in whereConditions) {
    //only hchecking equality right now. mustenhance for not equalto
    if(values[key] != whereConditions[key]) doesMatch = false;
  }
  return doesMatch;
}

module.exports = {
  getFilteredEnums: getFilteredEnums,
  doesConditionMatch: doesConditionMatch
}