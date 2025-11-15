// app.config.js
export default {
    expo: {
      ios: {
        config: {
          googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY,
        },
      },
      android: {
        config: {
          googleMapsApiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY,
        },
      },
      extra: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // For JS usage
      },
    },
  };