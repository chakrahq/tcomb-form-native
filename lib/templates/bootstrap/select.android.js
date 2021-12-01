import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
const enumutils = require('./enumutils.js');

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  let localOptions = locals.options;
  if(locals["_enum"]){
    // console.log("select", locals.value, locals["_enum"]["groupValues"]);
    localOptions = enumutils.getFilteredEnums(locals["_enum"]["options"], locals["_enum"]["groupValues"]);
  }

  var options = localOptions.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));

  const selectedOption = localOptions.find(
    option => option.value === locals.value
  );
  //check iof the current selected value is valid
  if(!selectedOption && locals.value)
    locals.value = "";


  return (
    <View style={formGroupStyle}>
      {label}
      <Picker
        key={(locals.label + options.length)}
        accessibilityLabel={locals.label}
        ref="input"
        style={selectStyle}
        selectedValue={locals.value}
        onValueChange={locals.onChange}
        help={locals.help}
        enabled={!locals.disabled}
        mode={locals.mode}
        prompt={locals.prompt}
        itemStyle={locals.itemStyle}
      >
        {options}
      </Picker>
      {help}
      {error}
    </View>
  );
}

module.exports = select;
