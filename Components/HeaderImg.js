import React from 'react';
import ImgSrc from '../webroot/images/undraw_adventure.svg'

function HeaderImg() {
    return (
        <div  className="content">
            <img src={ImgSrc} alt="img"/>
        </div>
    )
}

export default HeaderImg;