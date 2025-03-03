import { StyleSheet } from "react-native";
import colors from "./colors";
import typography from "./typography";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    color: colors.secondary,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedUserType: {
    backgroundColor: colors.primary,
  },
  unselectedUserType: {
    backgroundColor: colors.mediumGray,
  },
  userTypeText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default globalStyles;
