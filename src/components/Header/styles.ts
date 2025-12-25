import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  controlsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonSpacing: {
    marginRight: 12,
  },
});
