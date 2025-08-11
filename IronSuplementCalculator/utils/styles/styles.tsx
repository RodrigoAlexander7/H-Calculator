import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';
import './themes';

Typography.loadTypographies({
  title: { fontSize: 22, fontWeight: '600', lineHeight: 30 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  label: { fontSize: 16, fontWeight: '600', lineHeight: 22 }
});

ThemeManager.setComponentTheme('Button', () => ({
  backgroundColor: Colors.primary,
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 20,
  labelStyle: { fontWeight: '600', fontSize: 16, color: Colors.white },
  enableShadow: false
}));

ThemeManager.setComponentTheme('RadioButton', () => ({
  color: Colors.primary,
  borderRadius: 99,
  size: 22,
  labelStyle: { ...Typography.body, color: Colors.textColor }
}));

ThemeManager.setComponentTheme('TextField', () => ({
  placeholderTextColor: Colors.border,
  floatingPlaceholderColor: Colors.primary,
  selectionColor: Colors.primary,
  enableErrors: true,
  validationMessageStyle: { color: Colors.error, fontSize: 13 },
  fieldStyle: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.inputBG,
    padding: 12
  },
  color: Colors.textColor,
  labelStyle: { ...Typography.label, color: Colors.textColor }
}));

ThemeManager.setComponentTheme('Picker', () => ({
  placeholderTextColor: Colors.border,
  style: { ...Typography.body, color: Colors.textColor },
  labelStyle: { ...Typography.label, color: Colors.textColor },
  fieldStyle: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.inputBG,
    padding: 12
  }
}));
