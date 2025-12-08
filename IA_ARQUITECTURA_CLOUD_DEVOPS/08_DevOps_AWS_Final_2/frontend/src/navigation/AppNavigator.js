import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';

// Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateItemScreen from '../screens/CreateItemScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PanelAdminScreen from '../screens/PanelAdminScreen';
import EditItemScreen from '../screens/EditItemScreen'; // Will be created later

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Loading Screen
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

// Main Tabs
const MainTabs = () => {
  const { can } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />

      {can('ADMIN_PANEL_VIEW') && (
        <Tab.Screen 
          name="AdminPanel" 
          component={PanelAdminScreen} 
          options={{ title: 'Panel Admin', tabBarLabel: 'Admin' }} 
        />
      )}
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const { userRole, isLoading, can } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userRole ? (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            
            {/* Common usage permissions for screens that need logic inside them, 
                but we also protect navigation here if needed. 
                Detail is viewable by all typically, but buttons inside differ. */}
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen} 
              options={{ headerShown: true, title: 'Detalle' }} 
            />
            
            <Stack.Screen 
              name="Filters" 
              component={FiltersScreen} 
              options={{ 
                headerShown: true, 
                presentation: 'modal', 
                title: 'Filtros' 
              }} 
            />

            {/* Admin Only Screens */}
            {can('ITEM_CREATE') && (
              <Stack.Screen 
                name="CreateItem" 
                component={CreateItemScreen} 
                options={{ headerShown: true, title: 'Crear Ítem' }} 
              />
            )}

            {can('ITEM_EDIT') && (
              <Stack.Screen 
                name="EditItem" 
                component={EditItemScreen} 
                options={{ headerShown: true, title: 'Editar Ítem' }} 
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
