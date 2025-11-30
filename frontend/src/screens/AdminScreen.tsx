import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { MOCK_APPOINTMENTS, MOCK_BARBERS, MOCK_SERVICES, Appointment, Service, Barber } from '../data/mockData';

type Tab = 'appointments' | 'services' | 'barbers';

export const AdminScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('appointments');

  const renderTabButton = (tab: Tab, label: string, icon: keyof typeof MaterialIcons.glyphMap) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab)}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={activeTab === tab ? theme.colors.primary : theme.colors.textSecondary}
      />
      <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    const barber = MOCK_BARBERS.find(b => b.id === item.barberId);
    const service = MOCK_SERVICES.find(s => s.id === item.serviceId);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{service?.name || 'Unknown Service'}</Text>
          <View style={[styles.statusBadge, item.status === 'confirmed' ? styles.statusConfirmed : styles.statusCancelled]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.cardSubtitle}>with {barber?.name || 'Unknown Barber'}</Text>
        <View style={styles.cardRow}>
          <MaterialIcons name="event" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.cardText}>{item.date} at {item.time}</Text>
        </View>
      </View>
    );
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.priceText}>₺{item.price}</Text>
      </View>
      <View style={styles.cardRow}>
        <MaterialIcons name="schedule" size={16} color={theme.colors.textSecondary} />
        <Text style={styles.cardText}>{item.duration} min</Text>
      </View>
    </View>
  );

  const renderBarberItem = ({ item }: { item: Barber }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color={theme.colors.primary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.cardSubtitle}>{item.specialty}</Text>
      <Text style={styles.cardText}>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('appointments', 'Appointments', 'event-note')}
        {renderTabButton('services', 'Services', 'content-cut')}
        {renderTabButton('barbers', 'Barbers', 'people')}
      </View>

      <View style={styles.content}>
        {activeTab === 'appointments' && (
          <FlatList
            data={MOCK_APPOINTMENTS}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
        {activeTab === 'services' && (
          <FlatList
            data={MOCK_SERVICES}
            renderItem={renderServiceItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
        {activeTab === 'barbers' && (
          <FlatList
            data={MOCK_BARBERS}
            renderItem={renderBarberItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as ViewStyle,
  backButton: {
    padding: theme.spacing.s,
    marginRight: theme.spacing.s,
  } as ViewStyle,
  headerTitle: {
    ...theme.typography.subheader,
    fontSize: 20,
    color: theme.colors.primary,
  } as TextStyle,
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  } as ViewStyle,
  tabButtonActive: {
    borderBottomColor: theme.colors.primary,
  } as ViewStyle,
  tabText: {
    ...theme.typography.body,
    fontSize: 12,
    marginTop: 4,
    color: theme.colors.textSecondary,
  } as TextStyle,
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  } as TextStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  listContent: {
    padding: theme.spacing.m,
  } as ViewStyle,
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  } as ViewStyle,
  cardTitle: {
    ...theme.typography.subheader,
    fontSize: 16,
    color: theme.colors.text,
  } as TextStyle,
  cardSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  } as ViewStyle,
  cardText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: 8,
  } as TextStyle,
  priceText: {
    ...theme.typography.subheader,
    color: theme.colors.primary,
  } as TextStyle,
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  } as ViewStyle,
  statusConfirmed: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  } as ViewStyle,
  statusCancelled: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  } as ViewStyle,
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.text,
  } as TextStyle,
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  ratingText: {
    ...theme.typography.body,
    fontWeight: 'bold',
    marginLeft: 4,
  } as TextStyle,
});
