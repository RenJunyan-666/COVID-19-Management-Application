import React from 'react'
import { Carousel } from 'antd'
import image1 from '../../images/header1.png'
import image2 from '../../images/header2.png'
import image3 from '../../images/header3.png'
import './style/testStyle.scss'

// test界面最顶上的三个动态框
export default function Header() {
  const contentStyle = {
    marginLeft:"280px",
    height: '400px',
    width:'900px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  return (
    <div>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img src={image1} alt="" className='img_header'/>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={image2} alt="" className='img_header'/>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img src={image3} alt="" className='img_header'/>
            </h3>
          </div>
        </Carousel>
    </div>
  )
}
