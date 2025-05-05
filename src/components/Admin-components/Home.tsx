import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true,
});

export function AdminHome() {
  const [counts, setCounts] = useState({
    sellers: 0,
    customers: 0,
    admin: 0,
  });

  useEffect(() => {
    socket.on('activeUserCount', (data) => {
      setCounts(data);
    });

    return () => {
      socket.off('activeUserCount');
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">Active Sellers</h2>
          <p className="text-3xl text-green-600">{counts.sellers}</p>
        </div>
        <div className="aspect-video rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">Active Customers</h2>
          <p className="text-3xl text-blue-600">{counts.customers}</p>
        </div>
        <div className="aspect-video rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">Active Admin</h2>
          <p className="text-3xl text-purple-600">{counts.admin}</p>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
