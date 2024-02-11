import { PropsWithChildren } from 'react';

import Navbar from '../Navbar';
import './style.css';

type BackgroundProps = PropsWithChildren;

const Background = ({ children }: BackgroundProps) => {
  return (
    <>
      <Navbar />
      <div id='background'>
        <div className='background__layout'>
          <img
            src="/background.png"
            alt="background"
          />
        </div>
        {children}
      </div>
    </>
  )
}

export default Background