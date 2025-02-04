import { useEffect, useState } from 'react';

export function useUserData() {
  const [userData, setUserData] = useState<{ locale: string; unit_of_temperature: string; unit_of_measurement: string } | null>(null);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('user_data='));
    
    if (cookie) {
        const cookieValue = cookie.split('=')[1];
        setUserData(JSON.parse(decodeURIComponent(cookieValue)));
      }
  }, []);

  return userData;
}
