import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';
import { MOCK_USERS } from '../data/mockData';

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AuthMode = 'login' | 'register' | 'admin';

export const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = () => {
    // Mock Authentication Logic
    if (mode === 'admin') {
        if (email === 'admin@birberber.com' && password === 'admin123') {
            navigation.replace('Admin'); // Go directly to Admin panel
        } else {
            alert('Invalid Admin Credentials. Try admin@birberber.com / admin123');
        }
        return;
    }

    if (mode === 'login') {
        // Simulate finding user
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
             // In a real app, we'd store the token/user info here
             if (user.role === 'admin') {
                 navigation.replace('Admin');
             } else {
                 navigation.replace('Home');
             }
        } else {
             // Allow generic login for demo if not found in mock data, assuming customer
             navigation.replace('Home');
        }
    } else {
        // Register flow - assume success and go to Home
        navigation.replace('Home');
    }
  };

  const toggleMode = () => {
      if (mode === 'login') setMode('register');
      else setMode('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.brandName}>BIRBERBER</Text>
          <Text style={styles.subtitle}>Est. 2024</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Admin Portal'}
          </Text>

          {mode === 'register' && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {mode === 'login' ? 'LOGIN' : mode === 'register' ? 'REGISTER' : 'ADMIN LOGIN'}
            </Text>
          </TouchableOpacity>

          {mode !== 'admin' && (
            <TouchableOpacity onPress={toggleMode} style={styles.switchButton}>
              <Text style={styles.switchText}>
                {mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          )}

          {mode !== 'admin' ? (
             <TouchableOpacity onPress={() => setMode('admin')} style={styles.adminLink}>
               <Text style={styles.adminLinkText}>Login as Shop Owner / Admin</Text>
             </TouchableOpacity>
          ) : (
             <TouchableOpacity onPress={() => setMode('login')} style={styles.adminLink}>
               <Text style={styles.adminLinkText}>Back to User Login</Text>
             </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.l,
  } as ViewStyle,
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2,
  } as ViewStyle,
  brandName: {
    ...theme.typography.header,
    fontSize: 40,
    color: theme.colors.primary,
    letterSpacing: 4,
  } as TextStyle,
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.s,
    letterSpacing: 4,
    fontSize: 14,
  } as TextStyle,
  formContainer: {
    width: '100%',
  } as ViewStyle,
  title: {
    ...theme.typography.subheader,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
  } as TextStyle,
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  } as TextStyle,
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    marginTop: theme.spacing.s,
  } as ViewStyle,
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.background,
    fontSize: 16,
  } as TextStyle,
  switchButton: {
    marginTop: theme.spacing.l,
    alignItems: 'center',
  } as ViewStyle,
  switchText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  } as TextStyle,
  adminLink: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  } as ViewStyle,
  adminLinkText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    fontSize: 12,
  } as TextStyle,
});
