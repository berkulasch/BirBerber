import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BottomNav } from '../components/BottomNav';

type Booking = {
  id: string;
  title: string;
  barber: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
};

const UPCOMING_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    title: 'Haircut & Beard Trim',
    barber: 'Ahmed Khalil',
    time: 'Today • 15:00',
    location: 'Downtown Studio',
    status: 'upcoming',
  },
  {
    id: 'b2',
    title: 'Haircut',
    barber: 'Lina Ahmed',
    time: 'Thu • 18:30',
    location: 'Riverside Branch',
    status: 'upcoming',
  },
];

const PAST_BOOKINGS: Booking[] = [
  {
    id: 'p1',
    title: 'Haircut & Beard Trim',
    barber: 'Adam T.',
    time: 'Dec 02 • 12:00',
    location: 'Downtown Studio',
    status: 'completed',
  },
  {
    id: 'p2',
    title: 'Royal Shave',
    barber: 'Yusuf Al-Amiri',
    time: 'Nov 21 • 17:00',
    location: 'Marina Lounge',
    status: 'completed',
  },
];

export const BookingsScreen = () => {
  const renderBooking = (booking: Booking) => {
    const isUpcoming = booking.status === 'upcoming';
    return (
      <View key={booking.id} style={[styles.card, !isUpcoming && styles.pastCard]}>
        <View style={styles.cardHeader}>
          <MaterialIcons
            name={isUpcoming ? 'event-available' : 'history'}
            size={22}
            color={isUpcoming ? theme.colors.primary : theme.colors.textSecondary}
          />
          <View style={styles.cardTitleArea}>
            <Text style={styles.title}>{booking.title}</Text>
            <Text style={styles.subTitle}>{booking.barber}</Text>
          </View>
          <TouchableOpacity style={styles.actionChip}>
            <Text style={styles.actionText}>{isUpcoming ? 'Reschedule' : 'Rebook'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.metaRow}>
          <MaterialIcons name="schedule" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.metaText}>{booking.time}</Text>
        </View>
        <View style={styles.metaRow}>
          <MaterialIcons name="place" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.metaText}>{booking.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Bookings</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.statusPill, styles.upcomingPill]}>
            <View style={styles.dot} />
            <Text style={styles.pillText}>Upcoming</Text>
          </View>
          <View style={[styles.statusPill, styles.pastPill]}>
            <View style={[styles.dot, styles.pastDot]} />
            <Text style={styles.pillText}>Past</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Upcoming</Text>
        {UPCOMING_BOOKINGS.map(renderBooking)}

        <Text style={[styles.sectionLabel, styles.sectionSpacing]}>Past</Text>
        {PAST_BOOKINGS.map(renderBooking)}
      </ScrollView>

      <BottomNav activeRoute="Bookings" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  header: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  heading: {
    ...theme.typography.header,
    fontSize: 24,
    color: theme.colors.text,
  } as TextStyle,
  badgesRow: {
    flexDirection: 'row',
    gap: theme.spacing.s,
  } as ViewStyle,
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  } as ViewStyle,
  upcomingPill: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(197, 160, 89, 0.1)',
  } as ViewStyle,
  pastPill: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: 8,
  } as ViewStyle,
  pastDot: {
    backgroundColor: theme.colors.textSecondary,
  } as ViewStyle,
  pillText: {
    ...theme.typography.body,
    fontSize: 12,
    color: theme.colors.text,
  } as TextStyle,
  scrollContent: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.s,
  } as ViewStyle,
  sectionLabel: {
    ...theme.typography.subheader,
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  } as TextStyle,
  sectionSpacing: {
    marginTop: theme.spacing.l,
  } as TextStyle,
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.s,
  } as ViewStyle,
  pastCard: {
    opacity: 0.9,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
  } as ViewStyle,
  cardTitleArea: {
    flex: 1,
  } as ViewStyle,
  title: {
    ...theme.typography.subheader,
    fontSize: 16,
    color: theme.colors.text,
  } as TextStyle,
  subTitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: 2,
  } as TextStyle,
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  } as ViewStyle,
  metaText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  } as TextStyle,
  actionChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  } as ViewStyle,
  actionText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 12,
  } as TextStyle,
});


