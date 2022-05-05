import React from 'react'
import { Row, Col, Card, Divider } from 'antd';
import './style/vaccineStyle.scss'
import help_01 from '../../images/help_01.png'
import help_02 from '../../images/help_02.png'
import help_03 from '../../images/help_03.png'
import help_04 from '../../images/help_04.png'
import help_05 from '../../images/help_05.png'
import help_06 from '../../images/help_06.png'
import help_07 from '../../images/help_07.png'
import help_08 from '../../images/help_08.png'
import { Layout } from 'antd';
import { Image } from 'antd';


const { Sider, Content } = Layout;

export default function Help() {
    const { Meta } = Card
    return (
      <div>
          <Layout className="helpBar">
              <Content>
                <Divider><p data="help">NEED HELP?</p></Divider>
                <p data="online">ONLINE SERVICE</p>
                <Row style={{
                    marginLeft:"225px",
                    marginTop:"-75px"
                }}>
                    <Col span={4}>
                        <img src={help_01} className="ad1"/>
                        <center><p data="service">Medical Insurance</p></center>
                    </Col> 
                    <Col span={4} offset={1}>
                        <img src={help_02} className="ad1"/>
                        <center><p data="service">Get Care For a Provider</p></center>
                    </Col>
                    <Col span={4} offset={1}>
                        <img src={help_03} className="ad1"/>
                        <center><p data="service">Home Health Care</p></center>
                    </Col>
                    <Col span={4} offset={1}>
                        <img src={help_04} className="ad1"/>
                        <center><p data="service">Personal Care</p></center>
                    </Col>
                </Row>

                <Row style={{
                    marginLeft:"225px",
                    marginTop:"-120px"
                }}>
                    <Col span={4}>
                        <img src={help_05} className="ad1"/>
                        <center><p data="service">Shop Allergy</p></center>
                    </Col> 
                    <Col span={4} offset={1}>
                        <img src={help_06} className="ad1"/>
                        <center><p data="service">Manage Your Rx</p></center>
                    </Col>
                    <Col span={4} offset={1}>
                        <img src={help_07} className="ad1"/>
                        <center><p data="service">Schedule MinuteClinic</p></center>
                    </Col>
                    <Col span={4} offset={1}>
                        <img src={help_08} className="ad1"/>
                        <center><p data="service">Weekly Deals</p></center>
                    </Col>
                </Row>
              </Content>    
          </Layout>
      </div>
    )
}


