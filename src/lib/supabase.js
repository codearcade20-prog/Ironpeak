import { createClient } from '@supabase/supabase-js';

// Default initial sample applications (as requested)
const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    name: 'Arun Kumar',
    phone: '9876543210',
    age: 24,
    plan_name: 'Standard',
    status: 'Interested',
    message: 'Interested in morning personal training.',
    created_at: new Date().toISOString()
  },
  {
    id: 'app-2',
    name: 'Rahul S',
    phone: '9123456789',
    age: 28,
    plan_name: 'Premium',
    status: 'Call Later',
    message: 'Please call after 6 PM regarding diet plan.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'app-3',
    name: 'Priya Dharshini',
    phone: '9443212345',
    age: 26,
    plan_name: 'Annual',
    status: 'Interested',
    message: 'Looking for 1-year transformation package.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

// Read from env or localStorage
const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('ironpeak_supabase_url') || '';
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('ironpeak_supabase_key') || '';
  return { url: url.trim(), key: key.trim() };
};

let supabaseInstance = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
    }
  }
  return supabaseInstance;
};

// Immediate initialization attempt
getSupabaseClient();

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
};

export const saveSupabaseConfig = (url, key) => {
  localStorage.setItem('ironpeak_supabase_url', url);
  localStorage.setItem('ironpeak_supabase_key', key);
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

// Local storage storage helper
const getLocalApplications = () => {
  const saved = localStorage.getItem('ironpeak_member_applications');
  if (!saved) {
    localStorage.setItem('ironpeak_member_applications', JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_APPLICATIONS;
  }
};

const saveLocalApplications = (apps) => {
  localStorage.setItem('ironpeak_member_applications', JSON.stringify(apps));
};

/**
 * 1. Submit Membership Application
 */
export const submitMembershipApplication = async ({ name, phone, age, plan_name, message }) => {
  const payload = {
    name,
    phone,
    age: age ? Number(age) : null,
    plan_name: plan_name || 'Standard',
    status: 'Call Later',
    message: message || '',
    created_at: new Date().toISOString()
  };

  // If Supabase is connected, write to Supabase
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .insert([{
          name: payload.name,
          phone: payload.phone,
          age: payload.age,
          status: payload.status,
          message: payload.message,
          plan_name: payload.plan_name
        }])
        .select();

      if (error) {
        console.warn('Supabase insert warning, falling back to local:', error.message);
      } else if (data && data[0]) {
        // Also update local cache
        const local = getLocalApplications();
        saveLocalApplications([data[0], ...local]);
        return { success: true, data: data[0], source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase submission error, saving locally:', err);
    }
  }

  // Fallback: save to LocalStorage
  const local = getLocalApplications();
  const newApp = {
    ...payload,
    id: 'app-' + Date.now()
  };
  saveLocalApplications([newApp, ...local]);
  return { success: true, data: newApp, source: 'local' };
};

/**
 * 2. Fetch All Applications (for Admin)
 */
export const fetchMemberApplications = async () => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Sync local cache
        saveLocalApplications(data);
        return { data, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase fetch error, using local fallback:', err);
    }
  }

  return { data: getLocalApplications(), source: 'local' };
};

/**
 * 3. Update Member Application Status
 */
export const updateApplicationStatus = async (id, newStatus) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .update({ status: newStatus })
        .eq('id', id)
        .select();

      if (!error && data) {
        // update local cache as well
        const local = getLocalApplications().map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        );
        saveLocalApplications(local);
        return { success: true, data: data[0], source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase update error, falling back locally:', err);
    }
  }

  // Update in LocalStorage
  const local = getLocalApplications().map(app => 
    app.id === id ? { ...app, status: newStatus } : app
  );
  saveLocalApplications(local);
  return { success: true, source: 'local' };
};
