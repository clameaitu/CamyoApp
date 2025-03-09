import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../assets/styles/colors";

interface MultiSelectProps {
  value: string[];
  onChange: (selectedValues: string[]) => void;
  options: string[];
  colors: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ value, onChange, options, colors }) => {
  const handleSelect = (option: string) => {
    if (value.includes(option)) {
      // Si la opción ya está seleccionada, la quitamos
      onChange(value.filter(item => item !== option));
    } else {
      // Si no está seleccionada, la añadimos
      onChange([...value, option]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            value.includes(option) && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleSelect(option)}
        >
          <Text
            style={[
              styles.optionText,
              value.includes(option) && { color: colors.white }
            ]}
          >
            {option}
          </Text>
          {value.includes(option) && <FontAwesome5 name="check" size={18} color={colors.white} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
    marginTop: 5
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  optionText: {
    fontSize: 16,
    marginRight: 8,
    color: colors.secondary,
  }
});

export default MultiSelect;
