import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_BARBERS, MOCK_SERVICES, Service } from '../data/mockData';
import { RootStackParamList } from '../types/navigation';
import { scheduleBookingNotification } from '../utils/notifications';

type AppointmentScreenRouteProp = RouteProp<RootStackParamList, 'Appointment'>;

export const AppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AppointmentScreenRouteProp>();
  const { barberId } = route.params;
  
  const barber = MOCK_BARBERS.find(b => b.id === barberId);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Generate dates based on available slots
  const availableDates = barber ? Object.keys(barber.availableSlots).sort() : [];
  
  // Get available times for selected date
  const availableTimes = (selectedDate && barber) ? barber.availableSlots[selectedDate] : [];

  const handleBook = async () => {
    if (!barber || !selectedDate || !selectedTime) return;
    
    await scheduleBookingNotification(barber.name, selectedDate, selectedTime);
    
    const service = MOCK_SERVICES.find(s => s.id === selectedService);
    Alert.alert(
      'Appointment Confirmed',
      `Booked with ${barber.name}\nService: ${service?.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nYou will receive a notification shortly.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderDateItem = ({ item: date }: { item: string }) => {
    const isSelected = selectedDate === date;
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dateObj.getDate();

    return (
      <TouchableOpacity 
        style={[styles.dateItem, isSelected && styles.dateItemSelected]}
        onPress={() => {
          setSelectedDate(date);
          setSelectedTime(null);
        }}
      >
        <Text style={[styles.dayText, isSelected && styles.textSelected]}>{day}</Text>
        <Text style={[styles.dateText, isSelected && styles.textSelected]}>{dayNum}</Text>
      </TouchableOpacity>
    );
  };

  if (!barber) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <Text style={styles.barberName}>{barber.name}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        <View style={styles.servicesContainer}>
          {barber?.services.map((serviceId) => {
            const service = MOCK_SERVICES.find(s => s.id === serviceId);
            if (!service) return null;
            const isSelected = selectedService === service.id;
            return (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceItem, isSelected && styles.serviceItemSelected]}
                onPress={() => setSelectedService(service.id)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceName, isSelected && styles.textSelected]}>{service.name}</Text>
                  <Text style={[styles.serviceDuration, isSelected && styles.textSelected]}>{service.duration} min</Text>
                </View>
                <Text style={[styles.servicePrice, isSelected && styles.textSelected]}>₺{service.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.datesContainer}>
          <FlatList
            horizontal
            data={availableDates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No available dates found.</Text>
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Available Times</Text>
        <View style={styles.timesGrid}>
          {selectedDate ? (
            availableTimes.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeItem, isSelected && styles.timeItemSelected]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeText, isSelected && styles.textSelected]}>{time}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.placeholderText}>Please select a date first.</Text>
          )}
          {selectedDate && availableTimes.length === 0 && (
             <Text style={styles.emptyText}>No times available for this date.</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton, 
            (!selectedDate || !selectedTime || !selectedService) && styles.confirmButtonDisabled
          ]}
          disabled={!selectedDate || !selectedTime || !selectedService}
          onPress={handleBook}
        >
          <Text style={styles.confirmButtonText}>CONFIRM APPOINTMENT</Text>
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
    fontSize: 16,
    color: theme.colors.textSecondary,
  } as TextStyle,
  barberName: {
    ...theme.typography.subheader,
    fontSize: 20,
    color: theme.colors.primary,
  } as TextStyle,
  content: {
    flex: 1,
  } as ViewStyle,
  sectionTitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    margin: theme.spacing.m,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  } as TextStyle,
  servicesContainer: {
    paddingHorizontal: theme.spacing.m,
  } as ViewStyle,
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  serviceItemSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  serviceInfo: {
    flex: 1,
  } as ViewStyle,
  serviceName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600' as TextStyle['fontWeight'],
    fontSize: 16,
  } as TextStyle,
  serviceDuration: {
    ...theme.typography.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  } as TextStyle,
  servicePrice: {
    ...theme.typography.subheader,
    fontSize: 16,
    color: theme.colors.primary,
  } as TextStyle,
  datesContainer: {
    height: 90,
  } as ViewStyle,
  datesList: {
    paddingHorizontal: theme.spacing.m,
  } as ViewStyle,
  dateItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    width: 60,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  dateItemSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  dayText: {
    ...theme.typography.body,
    fontSize: 12,
    marginBottom: 4,
  } as TextStyle,
  dateText: {
    ...theme.typography.subheader,
    fontSize: 18,
  } as TextStyle,
  textSelected: {
    color: theme.colors.background,
  } as TextStyle,
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.s,
  } as ViewStyle,
  timeItem: {
    width: '30%',
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  timeItemSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  timeText: {
    ...theme.typography.button,
    color: theme.colors.text,
  } as TextStyle,
  placeholderText: {
    ...theme.typography.body,
    paddingHorizontal: theme.spacing.m,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  } as TextStyle,
  emptyText: {
    ...theme.typography.body,
    paddingHorizontal: theme.spacing.m,
    color: theme.colors.textSecondary,
  } as TextStyle,
  footer: {
    padding: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  } as ViewStyle,
  confirmButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  } as ViewStyle,
  confirmButtonDisabled: {
    backgroundColor: theme.colors.surface,
    opacity: 0.5,
  } as ViewStyle,
  confirmButtonText: {
    ...theme.typography.button,
    color: theme.colors.background,
    letterSpacing: 1,
  } as TextStyle,
});
