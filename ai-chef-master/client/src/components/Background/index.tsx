import { PropsWithChildren } from 'react';

import './style.css';

const Background = ({ children }: PropsWithChildren) => {
  return (
    <div id='background'>
      <div className='background__layout' />
      {children}
    </div>
  )
}

export default Background