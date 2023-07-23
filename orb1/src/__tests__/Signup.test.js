// signup.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { db, auth } from '../firebase';
import { setDoc, collection, doc } from 'firebase/firestore';
import SignUp from '../pages/Signup';

// Mock createUserWithEmailAndPassword and sendEmailVerification
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
}));

console.log(createUserWithEmailAndPassword)
