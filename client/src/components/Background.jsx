import React from 'react'
//import styled from 'styled-components'
export default function Background() {

    const styles = {
      position: 'absolute',
      width: '558px',
      height: '548px',
      left: '-89px',
      top: '-99px',
      background: 'rgba(18, 255, 28, 0.03)',
      filter: 'blur(61px)',
      zIndex : '1',
    };

    return (
    
    <div style={styles}/>
  )
}

