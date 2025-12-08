import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

// Mock permissions based on usage requirements
const PERMISSIONS = {
  USER: [
    'ITEM_LIST',
    'ITEM_DETAIL',
    'FAVORITES_USE',
    'PROFILE_VIEW',
    'PROFILE_EDIT',
  ],
  ADMIN: [
    'ITEM_LIST',
    'ITEM_DETAIL',
    'ITEM_CREATE',
    'ITEM_EDIT',
    'ITEM_DEACTIVATE',
    'ADMIN_PANEL_VIEW',
    'PROFILE_VIEW',
    'PROFILE_EDIT',
    'FAVORITES_USE',
  ],
};

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('userRole');
      if (storedRole) {
        setRoleState(storedRole);
      }
      
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const setRoleState = (role) => {
    setUserRole(role);
    setPermissions(PERMISSIONS[role] || []);
  };

  const toggleFavorite = async (item) => {
    try {
      let newFavorites;
      if (favorites.some(fav => fav.id === item.id)) {
        newFavorites = favorites.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [...favorites, item];
      }
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Failed to update favorites', e);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.id === itemId);
  };

  const login = async (role) => {
    try {
      await AsyncStorage.setItem('userRole', role);
      setRoleState(role);
    } catch (e) {
      console.error('Failed to save role', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userRole');
      setUserRole(null);
      setPermissions([]);
    } catch (e) {
      console.error('Failed to remove role', e);
    }
  };

  const can = (permissionCode) => {
    return permissions.includes(permissionCode);
  };

  return (
    <AuthContext.Provider value={{ userRole, permissions, login, logout, can, isLoading, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
