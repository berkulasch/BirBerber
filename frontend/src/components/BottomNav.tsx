import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

type TabRoute = 'Home' | 'ShopList' | 'Profile' | 'Admin';

interface BottomNavProps {
  activeRoute: TabRoute;
}

export const BottomNav = ({ activeRoute }: BottomNavProps) => {
  const navigation = useNavigation<any>();

  const renderTab = (route: TabRoute, icon: keyof typeof MaterialIcons.glyphMap, label: string) => {
    const isActive = activeRoute === route;
    return (
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate(route)}
      >
        <MaterialIcons
          name={icon}
          size={24}
          color={isActive ? theme.colors.primary : theme.colors.textSecondary}
        />
        <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTab('Home', 'home', 'Home')}
      {renderTab('ShopList', 'search', 'Explore')}
      {renderTab('Profile', 'person', 'Profile')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.s,
    paddingBottom: theme.spacing.l, // For iPhone home indicator
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  } as ViewStyle,
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  } as ViewStyle,
  label: {
    ...theme.typography.body,
    fontSize: 10,
    color: theme.colors.textSecondary,
  } as TextStyle,
  labelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  } as TextStyle,
});
