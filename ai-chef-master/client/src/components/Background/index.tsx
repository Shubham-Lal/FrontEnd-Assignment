import { PropsWithChildren, useContext } from 'react';

import { AuthContext } from '../AuthProvider';
import './style.css';

const Background = ({ children }: PropsWithChildren) => {
  const { isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) return null;
  return (
    <div id='background'>
      <div className='background__layout'>
        <img
          src="/background.png"
          alt="background"
        />
      </div>
      {children}
    </div>
  )
}

export default Background