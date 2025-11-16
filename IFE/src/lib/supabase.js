import { createClient } from '@supabase/supabase-js';

// Stub Supabase functions for demo
export const getSceneImageUrl = (scenePath) => {
  if (!scenePath) return null;
  // Return a placeholder image for demo
  return '/placeholder-scene.jpg';
};

export const uploadSceneImage = async (file, sceneId) => {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return a fake path
  return `scenes/${sceneId}-stub.jpg`;
};
