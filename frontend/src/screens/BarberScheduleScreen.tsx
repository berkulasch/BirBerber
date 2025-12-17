import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BottomNav } from '../components/BottomNav';
import { MOCK_BARBERS } from '../data/mockData';

export const BarberScheduleScreen = () => {
  // Mocking logged in barber as the first one
  const barber = MOCK_BARBERS[0];
  const today = '2025-11-12'; // Mock date matching mock data

  const [slots, setSlots] = useState<string[]>(barber.availableSlots[today] || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [tempTime, setTempTime] = useState('');

  const handleAddSlot = () => {
    setTempTime('');
    setEditingSlotIndex(null);
    setIsModalVisible(true);
  };

  const handleEditSlot = (index: number) => {
    setTempTime(slots[index]);
    setEditingSlotIndex(index);
    setIsModalVisible(true);
  };

  const handleDeleteSlot = (index: number) => {
    Alert.alert(
      'Delete Slot',
      'Are you sure you want to remove this slot?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setSlots(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  const handleSaveSlot = () => {
    if (!tempTime.trim()) {
      Alert.alert('Invalid Time', 'Please enter a valid time (e.g. 14:00)');
      return;
    }

    // Basic time format validation (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(tempTime)) {
        Alert.alert('Invalid Format', 'Please use HH:MM format (e.g. 14:30)');
        return;
    }

    if (editingSlotIndex !== null) {
      // Edit existing
      setSlots(prev => {
        const newSlots = [...prev];
        newSlots[editingSlotIndex] = tempTime;
        return newSlots.sort();
      });
    } else {
      // Add new
      if (slots.includes(tempTime)) {
          Alert.alert('Duplicate Slot', 'This time slot already exists.');
          return;
      }
      setSlots(prev => [...prev, tempTime].sort());
    }

    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Schedule</Text>
        <Text style={styles.subHeading}>{today}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Slots</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddSlot}>
                <MaterialIcons name="add" size={20} color={theme.colors.background} />
                <Text style={styles.addButtonText}>Add Slot</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.slotsGrid}>
            {slots.length === 0 ? (
                <Text style={styles.emptyText}>No slots available for today.</Text>
            ) : (
                slots.map((time, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.slotCard}
                        onPress={() => handleEditSlot(index)}
                    >
                        <Text style={styles.slotTime}>{time}</Text>
                        <TouchableOpacity onPress={() => handleDeleteSlot(index)}>
                            <MaterialIcons name="close" size={20} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                    {editingSlotIndex !== null ? 'Edit Slot' : 'Add New Slot'}
                </Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="HH:MM (e.g. 14:30)"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={tempTime}
                    onChangeText={setTempTime}
                    keyboardType="numbers-and-punctuation"
                    autoFocus
                />

                <View style={styles.modalActions}>
                    <TouchableOpacity 
                        style={styles.modalButton} 
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.modalButton, styles.modalButtonPrimary]} 
                        onPress={handleSaveSlot}
                    >
                        <Text style={[styles.modalButtonText, styles.textLight]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

      <BottomNav activeRoute="Schedule" userRole="barber" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as ViewStyle,
  heading: {
    ...theme.typography.header,
    fontSize: 24,
    color: theme.colors.text,
  } as TextStyle,
  subHeading: {
    ...theme.typography.body,
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.s,
  } as TextStyle,
  content: {
    padding: theme.spacing.l,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  } as ViewStyle,
  sectionTitle: {
    ...theme.typography.subheader,
    fontSize: 18,
    color: theme.colors.text,
  } as TextStyle,
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  } as ViewStyle,
  addButtonText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 12,
  } as TextStyle,
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.m,
  } as ViewStyle,
  slotCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
    minWidth: 120,
    justifyContent: 'space-between',
  } as ViewStyle,
  slotTime: {
    ...theme.typography.subheader,
    color: theme.colors.text,
  } as TextStyle,
  emptyText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
  } as TextStyle,
  // Modal Styles
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
      fontSize: 16,
      textAlign: 'center',
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
