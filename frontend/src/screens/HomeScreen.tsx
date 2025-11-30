import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Admin')} style={styles.adminButton}>
          <MaterialIcons name="admin-panel-settings" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.brandName}>BIRBERBER</Text>
        <Text style={styles.subtitle}>Est. 2024</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Experience the Art of Grooming</Text>
        
        <View style={styles.card}>
          <MaterialIcons name="content-cut" size={40} color={theme.colors.primary} />
          <Text style={styles.cardTitle}>Professional Cuts</Text>
          <Text style={styles.cardDescription}>Master barbers at your service.</Text>
        </View>

        <View style={styles.card}>
          <MaterialIcons name="spa" size={40} color={theme.colors.primary} />
          <Text style={styles.cardTitle}>Premium Care</Text>
          <Text style={styles.cardDescription}>Hot towel shaves & facial treatments.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('ShopList')}
        >
          <Text style={styles.bookButtonText}>BOOK APPOINTMENT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    position: 'relative',
  } as ViewStyle,
  adminButton: {
    position: 'absolute',
    right: theme.spacing.l,
    top: 0,
  } as ViewStyle,
  brandName: {
    ...theme.typography.header,
    color: theme.colors.primary,
    letterSpacing: 2,
  } as TextStyle,
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontSize: 12,
  } as TextStyle,
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
    justifyContent: 'center',
  } as ViewStyle,
  welcomeText: {
    ...theme.typography.subheader,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontStyle: 'italic',
  } as TextStyle,
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  cardTitle: {
    ...theme.typography.subheader,
    fontSize: 18,
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  cardDescription: {
    ...theme.typography.body,
    textAlign: 'center',
    fontSize: 14,
  } as TextStyle,
  footer: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  } as ViewStyle,
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  } as ViewStyle,
  bookButtonText: {
    ...theme.typography.button,
    color: theme.colors.background, // Contrast text
    letterSpacing: 1,
  } as TextStyle,
});
