import { PropsWithChildren } from 'react';
import './style.css';

type BackgroundProps = PropsWithChildren;

const Background = ({ children }: BackgroundProps) => {
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