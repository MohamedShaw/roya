import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  twoColumnItem: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999999',
  },
});

