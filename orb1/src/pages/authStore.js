import {create} from 'zustand';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';




// export const saveAccommodationDetails = async (userId, tripId, accommodationDetails) => {
//   try {
//     console.log('Received parameters:');
//     console.log('userId:', userId);
//     console.log('tripId:', tripId);
//     console.log('accommodationDetails:', accommodationDetails);

//     // Save the accommodation details under the user's document in Firestore
//     await setDoc(doc(db, 'users', userId, 'trips', tripId), {
//       accommodation: accommodationDetails,
//     });

//     console.log('Accommodation details saved to Firestore');
//   } catch (error) {
//     console.error('Error saving accommodation details to Firestore:', error);
//     throw error;
//   }
// };

export const saveLandingPageDetails = async (userId, tripId, landingPageDetails) => {
  try {
    console.log('Received parameters:');
    console.log('userId:', userId);
    console.log('tripId:', tripId);
    console.log('landingPageDetails:', landingPageDetails);

    // Save the landing page details under the user's document in Firestore
    await setDoc(doc(db, 'users', userId, 'trips', tripId), {
      landingPage: landingPageDetails,
    });

    console.log('Landing page details saved to Firestore');
  } catch (error) {
    console.error('Error saving landing page details to Firestore:', error);
    throw error;
  }
};

export const saveSuggestedLocations = async (userId, tripId, suggestedLocations) => {
  try {
    // Save the suggested locations under the user's document in Firestore
    await setDoc(doc(db, 'users', userId, 'trips', tripId), {
      suggestedLocations: suggestedLocations,
    });

    console.log('Suggested locations saved to Firestore');
  } catch (error) {
    console.error('Error saving suggested locations to Firestore:', error);
    throw error;
  }
};


const useAuthStore = create((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  error: null,
  loginStatus: '',
  accommodation: [], // New field for storing accommodation details
  tripId: '',
  preferences: [  // New field for storing preferences
    {
      "category": "Exhibitions & Museums",
      "category_id": "10000",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Sports and Recreation",
      "category_id": "18067",
      "activity_duration": 2,
      "rank": undefined
    },
    {
      "category": "Night Life",
      "category_id": "10032",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Historic & Protected Sites",
      "category_id": "16020",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Landmark & Outdoors",
      "category_id": "16000",
      "activity_duration": 3,
      "rank": undefined
    },
    {
      "category": "Entertainment Events",
      "category_id": "14003",
      "activity_duration": 3,
      "rank": undefined
    }
  ],

  // New state for FoodOptions.js
  foodLocations: [],
  selectedfoodLocations: {},

  suggestedLocations: [],
  selectedSuggestedLocations: {},
  setSuggestedLocations: (value) => set((state) => ({ suggestedLocations: value })),
  setSelectedSuggestedLocations: (value) => set((state) => ({ selectedSuggestedLocations: value })),
 
  setEmail: (value) => set((state) => ({ email: value })),
  setPassword: (value) => set((state) => ({ password: value })),
  setConfirmPassword: (value) => set((state) => ({ confirmPassword: value })),
  setUsername: (value) => set((state) => ({ username: value })),
  setError: (value) => set((state) => ({ error: value })),
  setLoginStatus: (value) => set((state) => ({ loginStatus: value })),
  setAccommodation: (value) => set((state) => ({ accommodation: value })),
  setTripId: (value) => set((state) => ({ tripId: value })),
  getTripId: () => useAuthStore.getState().tripId,
  setPreferences: (newPreferences) => set((state) => ({ preferences: newPreferences })),
  setLocationId: (value) => set((state) => ({ locationId: value })),
  getLocationId: () => useAuthStore.getState().locationId,
  setFoodId: (value) => set((state) => ({ foodId: value })),
  getFoodId: () => useAuthStore.getState().foodId,

  saveLandingPageDetails: saveLandingPageDetails,
  // New action to set locations
  setfoodLocations: (foodLocations) => set((state) => ({ foodLocations })),

  // New action to set selected locations
  setSelectedfoodLocations: (selectedfoodLocations) => set((state) => ({ selectedfoodLocations })),

  getPreferences: () => useAuthStore.getState().preferences,
  saveSuggestedLocations: saveSuggestedLocations,

}));

export default useAuthStore;