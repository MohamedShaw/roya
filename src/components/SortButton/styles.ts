import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  textActive: {
    color: '#FFFFFF',
  },
});
