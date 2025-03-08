import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

// Selector de opciones pasadas por props como una lista de strings
const Selector = ({ value, onChange, options, colors, globalStyles }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, width: '100%' }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            globalStyles.userTypeButton,
            value === option
              ? { backgroundColor: colors.lightOrange, borderRadius: 8, padding: 10 }
              : { backgroundColor: colors.lightGray, borderWidth: 1, borderColor: colors.mediumGray, borderRadius: 8, padding: 10 }
          ]}
          onPress={() => onChange(option)}
        >
          <Text style={{ color: value === option ? colors.white : colors.secondary }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Selector;
