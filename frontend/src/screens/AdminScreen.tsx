import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ViewStyle, TextStyle, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { MOCK_APPOINTMENTS, MOCK_BARBERS, MOCK_SERVICES, Appointment, Service, Barber } from '../data/mockData';

type Tab = 'dashboard' | 'appointments' | 'services' | 'barbers';

export const AdminScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // Local state to allow editing
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [barbers, setBarbers] = useState<Barber[]>(MOCK_BARBERS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  // Edit Service State
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editPrice, setEditPrice] = useState('');

  // Add Barber State
  const [isAddingBarber, setIsAddingBarber] = useState(false);
  const [newBarberName, setNewBarberName] = useState('');
  const [newBarberSpecialty, setNewBarberSpecialty] = useState('');

  // Analytics
  const analytics = useMemo(() => {
    const totalAppointments = appointments.length;
    const confirmedApps = appointments.filter(a => a.status === 'confirmed');
    const totalRevenue = confirmedApps.reduce((sum, app) => {
        const service = services.find(s => s.id === app.serviceId);
        return sum + (service ? service.price : 0);
    }, 0);
    
    return {
        total: totalAppointments,
        confirmed: confirmedApps.length,
        revenue: totalRevenue
    };
  }, [appointments, services]);

  const handleUpdatePrice = () => {
      if (!editingService) return;
      const price = parseInt(editPrice);
      if (isNaN(price)) {
          Alert.alert('Error', 'Please enter a valid price');
          return;
      }

      setServices(prev => prev.map(s => 
          s.id === editingService.id ? { ...s, price } : s
      ));
      setEditingService(null);
      setEditPrice('');
  };

  const handleAddBarber = () => {
      if (!newBarberName || !newBarberSpecialty) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
      }

      const newBarber: Barber = {
          id: `b${Date.now()}`,
          name: newBarberName,
          specialty: newBarberSpecialty,
          rating: 5.0,
          imageUrl: `https://ui-avatars.com/api/?name=${newBarberName}&background=random`,
          location: 'Main Branch',
          services: ['1', '2'], // Default services
          availableSlots: {},
      };

      setBarbers(prev => [...prev, newBarber]);
      setIsAddingBarber(false);
      setNewBarberName('');
      setNewBarberSpecialty('');
  };

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

  const renderDashboard = () => (
      <ScrollView contentContainerStyle={styles.listContent}>
          <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                  <Text style={styles.statValue}>{analytics.total}</Text>
                  <Text style={styles.statLabel}>Total Visits</Text>
                  <MaterialIcons name="people" size={24} color={theme.colors.primary} style={styles.statIcon} />
              </View>
              <View style={styles.statCard}>
                  <Text style={styles.statValue}>{analytics.confirmed}</Text>
                  <Text style={styles.statLabel}>Confirmed</Text>
                  <MaterialIcons name="check-circle" size={24} color={theme.colors.success || '#4CAF50'} style={styles.statIcon} />
              </View>
              <View style={[styles.statCard, styles.statCardWide]}>
                  <Text style={styles.statValue}>₺{analytics.revenue}</Text>
                  <Text style={styles.statLabel}>Total Revenue</Text>
                  <MaterialIcons name="attach-money" size={24} color={theme.colors.primary} style={styles.statIcon} />
              </View>
          </View>
      </ScrollView>
  );

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity 
            onPress={() => {
                setEditingService(item);
                setEditPrice(item.price.toString());
            }}
            style={styles.editButton}
        >
            <Text style={styles.priceText}>₺{item.price}</Text>
            <MaterialIcons name="edit" size={16} color={theme.colors.primary} />
        </TouchableOpacity>
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

  const renderAppointmentItem = ({ item }: { item: Appointment }) => {
    const barber = barbers.find(b => b.id === item.barberId);
    const service = services.find(s => s.id === item.serviceId);
    
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Owner Panel</Text>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('dashboard', 'Dashboard', 'dashboard')}
        {renderTabButton('appointments', 'Appts', 'event-note')}
        {renderTabButton('services', 'Services', 'content-cut')}
        {renderTabButton('barbers', 'Team', 'people')}
      </View>

      <View style={styles.content}>
        {activeTab === 'dashboard' && renderDashboard()}
        
        {activeTab === 'appointments' && (
          <FlatList
            data={appointments}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
        
        {activeTab === 'services' && (
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
        
        {activeTab === 'barbers' && (
          <View style={{ flex: 1 }}>
              <FlatList
                data={barbers}
                renderItem={renderBarberItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
              />
              <TouchableOpacity 
                style={styles.fab}
                onPress={() => setIsAddingBarber(true)}
              >
                  <MaterialIcons name="add" size={24} color={theme.colors.background} />
                  <Text style={styles.fabText}>Add Worker</Text>
              </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Edit Service Modal */}
      <Modal visible={!!editingService} transparent animationType="fade">
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Edit Price: {editingService?.name}</Text>
                  <TextInput
                      style={styles.input}
                      value={editPrice}
                      onChangeText={setEditPrice}
                      keyboardType="numeric"
                      placeholder="Enter new price"
                  />
                  <View style={styles.modalActions}>
                      <TouchableOpacity onPress={() => setEditingService(null)} style={styles.modalButton}>
                          <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleUpdatePrice} style={[styles.modalButton, styles.modalButtonPrimary]}>
                          <Text style={[styles.modalButtonText, styles.textLight]}>Save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Modal>

      {/* Add Barber Modal */}
      <Modal visible={isAddingBarber} transparent animationType="slide">
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add New Team Member</Text>
                  <TextInput
                      style={styles.input}
                      value={newBarberName}
                      onChangeText={setNewBarberName}
                      placeholder="Name"
                  />
                  <TextInput
                      style={styles.input}
                      value={newBarberSpecialty}
                      onChangeText={setNewBarberSpecialty}
                      placeholder="Specialty (e.g. Colorist)"
                  />
                  <View style={styles.modalActions}>
                      <TouchableOpacity onPress={() => setIsAddingBarber(false)} style={styles.modalButton}>
                          <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleAddBarber} style={[styles.modalButton, styles.modalButtonPrimary]}>
                          <Text style={[styles.modalButtonText, styles.textLight]}>Add</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Modal>

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
    fontSize: 10,
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
    marginRight: 4,
  } as TextStyle,
  editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
  } as ViewStyle,
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
  // Dashboard Styles
  statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.m,
  } as ViewStyle,
  statCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.l,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      position: 'relative',
  } as ViewStyle,
  statCardWide: {
      minWidth: '100%',
  } as ViewStyle,
  statValue: {
      ...theme.typography.header,
      fontSize: 32,
      color: theme.colors.primary,
  } as TextStyle,
  statLabel: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginTop: 4,
  } as TextStyle,
  statIcon: {
      position: 'absolute',
      top: theme.spacing.m,
      right: theme.spacing.m,
      opacity: 0.2,
  } as ViewStyle,
  // FAB
  fab: {
      position: 'absolute',
      bottom: theme.spacing.l,
      right: theme.spacing.l,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.m,
      paddingHorizontal: theme.spacing.l,
      borderRadius: theme.borderRadius.full,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  } as ViewStyle,
  fabText: {
      ...theme.typography.button,
      color: theme.colors.background,
      marginLeft: 8,
  } as TextStyle,
  // Modal
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: theme.spacing.l,
  } as ViewStyle,
  modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.l,
      padding: theme.spacing.l,
  } as ViewStyle,
  modalTitle: {
      ...theme.typography.subheader,
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: theme.spacing.m,
      textAlign: 'center',
  } as TextStyle,
  input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      marginBottom: theme.spacing.m,
      color: theme.colors.text,
  } as TextStyle,
  modalActions: {
      flexDirection: 'row',
      gap: theme.spacing.m,
  } as ViewStyle,
  modalButton: {
      flex: 1,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
  } as ViewStyle,
  modalButtonPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
  } as ViewStyle,
  modalButtonText: {
      ...theme.typography.button,
      color: theme.colors.text,
  } as TextStyle,
  textLight: {
      color: theme.colors.background,
  } as TextStyle,
});
