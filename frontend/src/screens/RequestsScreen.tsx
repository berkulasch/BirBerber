import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BottomNav } from '../components/BottomNav';
import { MOCK_APPOINTMENTS, MOCK_USERS, Appointment } from '../data/mockData';

// Helper to find user details
const getUser = (userId: string) => MOCK_USERS.find(u => u.id === userId);

export const RequestsScreen = () => {
  // Filter for pending appointments (mocking the status for now as we don't have pending in initial mock data)
  // In a real app, we'd filter by status === 'pending'
  const [requests, setRequests] = useState<Appointment[]>([
    {
        id: 'req1',
        barberId: '1',
        userId: 'u1', // John Doe
        serviceId: '1',
        date: '2025-11-12',
        time: '11:00',
        status: 'pending'
    },
    {
        id: 'req2',
        barberId: '1',
        userId: 'u4', // Jane Smith
        serviceId: '2',
        date: '2025-11-12',
        time: '14:00',
        status: 'pending'
    }
  ]);

  const handleAction = (id: string, action: 'accept' | 'reject') => {
      // Logic to update status would go here
      console.log(`${action} request ${id}`);
      setRequests(prev => prev.filter(r => r.id !== id));
  };

  const renderRequest = (request: Appointment) => {
    const user = getUser(request.userId);
    if (!user) return null;

    return (
      <View key={request.id} style={styles.card}>
        <View style={styles.cardHeader}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.serviceText}>Requested Appointment</Text>
            </View>
        </View>
        
        <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
                <MaterialIcons name="event" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.detailText}>{request.date}</Text>
            </View>
            <View style={styles.detailItem}>
                <MaterialIcons name="schedule" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.detailText}>{request.time}</Text>
            </View>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity 
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => handleAction(request.id, 'reject')}
            >
                <Text style={[styles.actionText, styles.rejectText]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => handleAction(request.id, 'accept')}
            >
                <Text style={styles.actionText}>Accept</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Appointment Requests</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {requests.length === 0 ? (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No pending requests.</Text>
            </View>
        ) : (
            requests.map(renderRequest)
        )}
      </ScrollView>

      <BottomNav activeRoute="Requests" userRole="barber" />
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
  content: {
    padding: theme.spacing.l,
    gap: theme.spacing.m,
  } as ViewStyle,
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.m,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
  } as ViewStyle,
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.border,
  } as ImageStyle,
  userInfo: {
    flex: 1,
  } as ViewStyle,
  userName: {
    ...theme.typography.subheader,
    color: theme.colors.text,
  } as TextStyle,
  serviceText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontSize: 12,
  } as TextStyle,
  detailsRow: {
    flexDirection: 'row',
    gap: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  } as ViewStyle,
  detailText: {
    ...theme.typography.body,
    color: theme.colors.text,
  } as TextStyle,
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.m,
  } as ViewStyle,
  actionButton: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  acceptButton: {
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  rejectButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.error || '#FF4444',
  } as ViewStyle,
  actionText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 14,
  } as TextStyle,
  rejectText: {
    color: theme.colors.error || '#FF4444',
  } as TextStyle,
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  } as ViewStyle,
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  } as TextStyle,
});
