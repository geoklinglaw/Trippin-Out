import create from 'zustand';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';




export const saveAccommodationDetails = async (userId, tripId, accommodationDetails) => {
  try {
    console.log('Received parameters:');
    console.log('userId:', userId);
    console.log('tripId:', tripId);
    console.log('accommodationDetails:', accommodationDetails);


  

    // Save the accommodation details under the user's document in Firestore
    await setDoc(doc(db, 'users', userId, 'trips', tripId), {
      accommodation: accommodationDetails,
    });

    console.log('Accommodation details saved to Firestore');
  } catch (error) {
    console.error('Error saving accommodation details to Firestore:', error);
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
 
  setEmail: (value) => set((state) => ({ email: value })),
  setPassword: (value) => set((state) => ({ password: value })),
  setConfirmPassword: (value) => set((state) => ({ confirmPassword: value })),
  setUsername: (value) => set((state) => ({ username: value })),
  setError: (value) => set((state) => ({ error: value })),
  setLoginStatus: (value) => set((state) => ({ loginStatus: value })),
  setAccommodation: (value) => set((state) => ({ accommodation: value })),
  setTripId: (value) => set((state) => ({ tripId: value })),
  getTripId: () => useAuthStore.getState().tripId,

}));

export default useAuthStore;
