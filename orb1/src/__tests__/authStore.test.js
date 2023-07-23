// authStore.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useAuthStore from '../pages/authStore';

test('setEmail updates the email state correctly', () => {
  const { result } = renderHook(() => useAuthStore());

  const newEmail = 'test@example.com';

  act(() => {
    result.current.setEmail(newEmail);
  });

  expect(result.current.email).toBe(newEmail);
});
