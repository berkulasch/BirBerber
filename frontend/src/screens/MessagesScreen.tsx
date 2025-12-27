import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BottomNav } from '../components/BottomNav';

type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  role: 'user' | 'shop' | 'owner';
};

const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Downtown Studio',
    lastMessage: 'Your appointment is confirmed for 15:00.',
    time: '2m ago',
    unreadCount: 2,
    role: 'shop',
  },
  {
    id: 'c2',
    name: 'Admin Support',
    lastMessage: 'We can adjust the schedule for Friday.',
    time: '1h ago',
    unreadCount: 1,
    role: 'owner',
  },
  {
    id: 'c3',
    name: 'Riverside Branch',
    lastMessage: 'See you this Thursday!',
    time: 'Yesterday',
    role: 'shop',
  },
];

export const MessagesScreen = () => {
  const totalUnread = useMemo(
    () => CONVERSATIONS.reduce((sum, convo) => sum + (convo.unreadCount ?? 0), 0),
    [],
  );

  const renderConversation = ({ item }: { item: Conversation }) => {
    const isUnread = (item.unreadCount ?? 0) > 0;
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, isUnread && styles.avatarUnread]}>
            <MaterialIcons
              name={item.role === 'owner' ? 'verified-user' : 'store'}
              size={20}
              color={isUnread ? theme.colors.background : theme.colors.primary}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={[styles.message, isUnread && styles.messageUnread]} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          </View>
          {isUnread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Messages</Text>
        <View style={styles.headerMeta}>
          <MaterialIcons name="mark-chat-unread" size={18} color={theme.colors.primary} />
          <Text style={styles.metaText}>{totalUnread} unread</Text>
        </View>
      </View>

      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      <BottomNav activeRoute="Messages" messagesUnreadCount={totalUnread} />
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
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as ViewStyle,
  heading: {
    ...theme.typography.header,
    fontSize: 24,
    color: theme.colors.text,
  } as TextStyle,
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  } as ViewStyle,
  metaText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  } as TextStyle,
  listContent: {
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.xxl,
  } as ViewStyle,
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.s,
  } as ViewStyle,
  card: {
    paddingVertical: theme.spacing.s,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
  } as ViewStyle,
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as ViewStyle,
  avatarUnread: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  } as ViewStyle,
  content: {
    flex: 1,
    gap: 4,
  } as ViewStyle,
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  name: {
    ...theme.typography.subheader,
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.s,
  } as TextStyle,
  time: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontSize: 12,
  } as TextStyle,
  message: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  } as TextStyle,
  messageUnread: {
    color: theme.colors.text,
    fontWeight: '600',
  } as TextStyle,
  unreadBadge: {
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  } as ViewStyle,
  unreadText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 12,
  } as TextStyle,
});











