import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { UserRole } from '../types/user';
import { useUser } from '../context/UserContext';

export type TabRoute = 'Home' | 'ShopList' | 'Bookings' | 'Messages' | 'Schedule' | 'Requests';

interface BottomNavProps {
  activeRoute: TabRoute;
  messagesUnreadCount?: number;
  userRole?: UserRole;
}

export const BottomNav = ({ activeRoute, messagesUnreadCount = 0, userRole: propRole }: BottomNavProps) => {
  const navigation = useNavigation<any>();
  const { role: contextRole } = useUser();
  const userRole = propRole || contextRole;

  const renderTab = (
    route: TabRoute,
    icon: keyof typeof MaterialIcons.glyphMap,
    label: string,
    badgeCount?: number,
  ) => {
    const isActive = activeRoute === route;
    return (
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate(route)}
      >
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name={icon}
            size={24}
            color={isActive ? theme.colors.primary : theme.colors.textSecondary}
          />
          {!!badgeCount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {badgeCount > 9 ? '9+' : badgeCount}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderTab('Home', 'home', 'Home')}
      
      {userRole === 'user' && (
        <>
          {renderTab('ShopList', 'search', 'Explore')}
          {renderTab('Bookings', 'event', 'Bookings')}
        </>
      )}

      {userRole === 'barber' && (
        <>
          {renderTab('Schedule', 'calendar-today', 'Schedule')}
          {renderTab('Requests', 'notifications', 'Requests')}
        </>
      )}

      {userRole === 'owner' && (
        <>
             {/* Owner specific tabs can go here, falling back to user/barber mix or similar */}
             {renderTab('ShopList', 'store', 'My Shop')}
             {renderTab('Bookings', 'event', 'Bookings')} 
        </>
      )}

      {renderTab('Messages', 'chat-bubble', 'Messages', messagesUnreadCount)}
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
  iconWrapper: {
    position: 'relative',
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
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 9,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  } as ViewStyle,
  badgeText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 10,
  } as TextStyle,
});
