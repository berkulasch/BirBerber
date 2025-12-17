import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { useUser } from '../context/UserContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { role, user } = useUser();

  if (role === 'barber') {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Text style={styles.brandName}>BIRBERBER</Text>
                <Text style={styles.subtitle}>BARBER PORTAL</Text>
            </View>
          </View>
    
          <View style={styles.content}>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Welcome, {user?.name}</Text>
                <Text style={styles.heroSubtitle}>Manage your day efficiently.</Text>
                
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => navigation.navigate('Schedule')}
                >
                  <Text style={styles.bookButtonText}>MY SCHEDULE</Text>
                  <MaterialIcons name="calendar-today" size={20} color={theme.colors.background} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.bookButton, styles.secondaryButton]}
                  onPress={() => navigation.navigate('Requests')}
                >
                  <Text style={[styles.bookButtonText, styles.secondaryButtonText]}>VIEW REQUESTS</Text>
                  <MaterialIcons name="notifications" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
          </View>
    
          <BottomNav activeRoute="Home" />
        </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
            <Text style={styles.brandName}>BIRBERBER</Text>
            <Text style={styles.subtitle}>PREMIUM GROOMING</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.adminButton}>
          <MaterialIcons name="admin-panel-settings" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Book Your Next Cut in Seconds</Text>
            <Text style={styles.heroSubtitle}>Find top-rated barbers near you.</Text>
            
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => navigation.navigate('ShopList')}
            >
              <Text style={styles.bookButtonText}>BOOK NOW</Text>
              <MaterialIcons name="arrow-forward" size={20} color={theme.colors.background} />
            </TouchableOpacity>
        </View>

        <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
                <View style={styles.iconCircle}>
                    <MaterialIcons name="schedule" size={24} color={theme.colors.primary} />
                </View>
                <Text style={styles.featureText}>24/7 Booking</Text>
            </View>
            <View style={styles.featureItem}>
                <View style={styles.iconCircle}>
                    <MaterialIcons name="star" size={24} color={theme.colors.primary} />
                </View>
                <Text style={styles.featureText}>Top Rated</Text>
            </View>
            <View style={styles.featureItem}>
                <View style={styles.iconCircle}>
                    <MaterialIcons name="notifications-active" size={24} color={theme.colors.primary} />
                </View>
                <Text style={styles.featureText}>Reminders</Text>
            </View>
        </View>
      </View>

      <BottomNav activeRoute="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
  } as ViewStyle,
  logoContainer: {
    justifyContent: 'center',
  } as ViewStyle,
  brandName: {
    ...theme.typography.header,
    fontSize: 24,
    color: theme.colors.primary,
    letterSpacing: 2,
  } as TextStyle,
  subtitle: {
    ...theme.typography.body,
    fontSize: 10,
    color: theme.colors.textSecondary,
    letterSpacing: 3,
    marginTop: 2,
  } as TextStyle,
  adminButton: {
    padding: theme.spacing.s,
  } as ViewStyle,
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
    justifyContent: 'center',
  } as ViewStyle,
  heroSection: {
    marginBottom: theme.spacing.xl * 2,
  } as ViewStyle,
  heroTitle: {
    ...theme.typography.header,
    fontSize: 42,
    lineHeight: 48,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  } as TextStyle,
  heroSubtitle: {
    ...theme.typography.body,
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  } as TextStyle,
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.spacing.s,
  } as ViewStyle,
  bookButtonText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 16,
    letterSpacing: 1,
  } as TextStyle,
  secondaryButton: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  secondaryButtonText: {
    color: theme.colors.primary,
  } as TextStyle,
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  } as ViewStyle,
  featureItem: {
    alignItems: 'center',
    gap: theme.spacing.s,
  } as ViewStyle,
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  featureText: {
    ...theme.typography.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
  } as TextStyle,
});
