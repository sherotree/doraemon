import { on } from 'fig-tools';
import { emit } from '../../emit';
import { useEffect, useState } from 'react';

export default function User() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    emit('get-storage');
  }, []);

  useEffect(() => {
    on('get-storage', storage => {
      setCurrentUser(storage.currentUser);
    });
  }, []);

  return (
    <div className="flex items-center">
      <img src={currentUser?.photoUrl} alt="" className="mr-2 h-9 w-9 rounded-full" />
      <span className="text-xs font-semibold text-[color:var(--fig-color-text-primary)] truncate w-[100px]">
        {currentUser?.name}
      </span>
    </div>
  );
}
