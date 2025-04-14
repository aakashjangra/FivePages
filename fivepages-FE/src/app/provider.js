// src/app/provider.js
'use client';
import { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/lib/store/store';
import { loginComplete, setReady } from '@/lib/store/authSlice';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    console.log('🔄 Hydration started...');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('📦 Stored user found:', user);
        if (user?._id) {
          dispatch(loginComplete(user));
          console.log('✅ loginComplete dispatched');
        }
      } catch (error) {
        console.error('❌ Failed to parse user:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('⚠️ No user in localStorage');
    }

    dispatch(setReady());
    console.log('✅ setReady dispatched');
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) {
    console.log('⏳ Waiting for hydration...');
    return null;
  }

  return children;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
