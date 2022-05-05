import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import { Carousel } from 'antd'
import './style/vaccineStyle.scss'
import adMain1 from '../../images/adMain1.png'
import adMain2 from '../../images/adMain2.png'
import { Layout } from 'antd';
import { Image } from 'antd';


const { Sider, Content } = Layout;

export default function Slogan() {
    const { Meta } = Card
    return (
      <div>
          <Layout>
            <Row>
              <Col span={11}>
                <center data="title1" style={{
                  marginTop: "175px",
                  marginLeft: "30px"
                }}>Schedule your FREE COVID-19 vaccine and booster shot</center>
                <center data="title2" style={{
                  marginTop: "40px",
                  marginLeft: "30px"
                }}>FREE COVID-19 VACCINES AND BOOSTERS  |  Free COVID-19 Vaccines Available for everyone 12+. Appointments are not required for vaccines or booster shots at Fulton County vaccination sites.</center>
              </Col>

              {/* <Col span={10} style={{ padding:"25px"}}> */}
              <Col span={12} offset={1} style={{
                marginTop:"40px"
              }}>
                <Carousel autoplay className="imgSlogan">
                  <div>
                    <h3>
                      <Image src={adMain1}/>
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <Image src={adMain2}/>
                    </h3>
                  </div>
                </Carousel>
              </Col> 
            </Row>   
          </Layout>
      </div>
    )
}


