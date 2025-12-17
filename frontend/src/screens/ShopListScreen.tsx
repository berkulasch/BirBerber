import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ViewStyle, TextStyle, ImageStyle, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_BARBERS, Barber } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

type ShopListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShopList'>;

export const ShopListScreen = () => {
  const navigation = useNavigation<ShopListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBarbers = useMemo(() => {
    if (!searchQuery) return MOCK_BARBERS;
    
    const lowerQuery = searchQuery.toLowerCase();
    return MOCK_BARBERS.filter(
      barber => 
        barber.name.toLowerCase().includes(lowerQuery) || 
        barber.location.toLowerCase().includes(lowerQuery) ||
        barber.specialty.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const renderBarber = ({ item }: { item: Barber }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Appointment', { barberId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color={theme.colors.primary} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.location}>• {item.location}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.availabilityPreview}>
        <Text style={styles.previewLabel}>Next Available:</Text>
        <View style={styles.timeTag}>
          <Text style={styles.timeTagText}>Today 14:00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search barbers, location..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredBarbers}
        renderItem={renderBarber}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>No barbers found matching "{searchQuery}"</Text>
          </View>
        }
      />
      <BottomNav activeRoute="ShopList" />
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
    gap: theme.spacing.m,
  } as ViewStyle,
  backButton: {
    padding: theme.spacing.s,
  } as ViewStyle,
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  searchIcon: {
    marginRight: theme.spacing.s,
  } as ViewStyle,
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    height: '100%',
  } as TextStyle,
  listContent: {
    padding: theme.spacing.m,
    flexGrow: 1,
  } as ViewStyle,
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  } as ViewStyle,
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
  } as ImageStyle,
  info: {
    marginLeft: theme.spacing.m,
    flex: 1,
  } as ViewStyle,
  name: {
    ...theme.typography.subheader,
    fontSize: 18,
    color: theme.colors.primary,
  } as TextStyle,
  specialty: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.text,
    marginVertical: 2,
  } as TextStyle,
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  } as ViewStyle,
  rating: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: theme.colors.text,
  } as TextStyle,
  location: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  } as TextStyle,
  availabilityPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  } as ViewStyle,
  previewLabel: {
    ...theme.typography.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
  } as TextStyle,
  timeTag: {
    backgroundColor: 'rgba(197, 160, 89, 0.1)', // Primary color with low opacity
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.s,
  } as ViewStyle,
  timeTagText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  } as ViewStyle,
  emptyText: {
    ...theme.typography.body,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  } as TextStyle,
});
