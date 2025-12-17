import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types/navigation';
import { theme } from '../theme';
import { MOCK_USERS } from '../data/mockData';
import { useUser } from '../context/UserContext';

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AuthMode = 'login' | 'register' | 'owner' | 'register_barber';

export const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const { setUser } = useUser();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = () => {
    // Mock Authentication Logic
    if (mode === 'owner') {
        if (email === 'owner@birberber.com' && password === 'owner123') {
            navigation.replace('Admin'); // Go directly to Admin panel (Owner dashboard)
        } else {
            alert('Invalid Owner Credentials. Try owner@birberber.com / owner123');
        }
        return;
    }

    if (mode === 'login') {
        // Simulate finding user
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
             setUser(user);
             if (user.role === 'owner') {
                 navigation.replace('Admin');
             } else {
                 navigation.replace('Home');
             }
        } else {
             // Allow generic login for demo if not found in mock data, assuming user
             setUser({ 
                id: 'guest', 
                name: 'Guest User', 
                email: email || 'guest@example.com', 
                role: 'user' 
             });
             navigation.replace('Home');
        }
    } else if (mode === 'register_barber') {
         // Register barber flow
         setUser({ 
             id: 'new-barber', 
             name: name || 'New Barber', 
             email: email, 
             role: 'barber' 
         });
         navigation.replace('Home');
    } else {
        // Register flow - assume success and go to Home
        setUser({ 
            id: 'new', 
            name: name || 'New User', 
            email: email, 
            role: 'user' 
        });
        navigation.replace('Home');
    }
  };

  const toggleMode = () => {
      // Unused now with explicit setters
      if (mode === 'login') setMode('register');
      else setMode('login');
  };

  const getTitle = () => {
      switch(mode) {
          case 'login': return 'Welcome Back';
          case 'register': return 'Create Account';
          case 'owner': return 'Owner Portal';
          case 'register_barber': return 'Barber Registration';
      }
  };

  const getButtonText = () => {
      switch(mode) {
          case 'login': return 'LOGIN';
          case 'register': return 'REGISTER';
          case 'owner': return 'OWNER LOGIN';
          case 'register_barber': return 'REGISTER AS BARBER';
      }
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
          <Text style={styles.title}>{getTitle()}</Text>

          {(mode === 'register' || mode === 'register_barber') && (
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
            <Text style={styles.buttonText}>{getButtonText()}</Text>
          </TouchableOpacity>

          {mode === 'login' && (
            <TouchableOpacity onPress={() => setMode('register')} style={styles.switchButton}>
              <Text style={styles.switchText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          )}

          {mode === 'register' && (
            <>
                <TouchableOpacity onPress={() => setMode('login')} style={styles.switchButton}>
                <Text style={styles.switchText}>Already have an account? Login</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setMode('register_barber')} style={styles.subLink}>
                    <Text style={styles.subLinkText}>Work here? Register as Barber</Text>
                </TouchableOpacity>
            </>
          )}

          {mode === 'register_barber' && (
             <TouchableOpacity onPress={() => setMode('login')} style={styles.switchButton}>
               <Text style={styles.switchText}>Back to Login</Text>
             </TouchableOpacity>
          )}

          {mode === 'owner' && (
             <TouchableOpacity onPress={() => setMode('login')} style={styles.adminLink}>
               <Text style={styles.adminLinkText}>Back to User Login</Text>
             </TouchableOpacity>
          )}

          {mode !== 'owner' && mode !== 'register_barber' && (
             <TouchableOpacity onPress={() => setMode('owner')} style={styles.adminLink}>
               <Text style={styles.adminLinkText}>Login as Shop Owner</Text>
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
  subLink: {
    marginTop: theme.spacing.m,
    alignItems: 'center',
  },
  subLinkText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontSize: 14,
  },
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


