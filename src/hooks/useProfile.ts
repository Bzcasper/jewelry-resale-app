
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  email?: string;
  user_type?: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        // Explicitly add email from user object if needed
        setProfile({
          ...data,
          email: user.email,
          user_type: data.user_type || 'user'
        } as Profile);
      } else {
        // Create a new profile if one doesn't exist
        await createProfile();
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message);
      
      // If the profile doesn't exist, create one
      if (err.code === 'PGRST116') {
        await createProfile();
      } else {
        toast({
          title: 'Error loading profile',
          description: err.message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    try {
      const newProfile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
        email: user.email,
        user_type: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .insert(newProfile);

      if (error) throw error;

      setProfile(newProfile as Profile);
    } catch (err: any) {
      console.error('Error creating profile:', err);
      setError(err.message);
      toast({
        title: 'Error creating profile',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
      toast({
        title: 'Error updating profile',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
}
