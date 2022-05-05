import React from 'react'
import { Row, Col, Card } from 'antd';
import './style/vaccineStyle.scss'
import neu1 from '../../images/neu1.png'
import neu2 from '../../images/neu2.png'
import { Layout } from 'antd';
import { Image } from 'antd';


const { Sider, Content } = Layout;

export default function BestChoice() {
    const { Meta } = Card
    return (
      <div>
          <Layout>
              <Content>
                <h1 data="choose">Choose the best option for your needs:</h1>
                <Row>
                    <Col span={10} offset={4}>
                        <Image src={neu1} style={{ width:"500px" }}/>
                    </Col> 
                    <Col span={10} style={{
                        marginLeft: "-150px",
                        marginTop: "-20px"
                    }}>
                        <h1 data="title3">Getting vaccinated at NEU®</h1>
                        <ul data="title4">
                            <li>More than 9,000 locations</li>
                            <li>Can vaccinate age 5 and up in most states</li>
                            <li>Vaccination performed by certified immunizing pharmacist or trained technician*footnote3 vaccine</li>
                            <li>Privacy curtain setting</li>
                        </ul>
                    </Col>
                </Row>

                <Row style={{ marginTop: "50px" }}>
                    <Col span={10}>
                        <h3 data="title5">Stay up with COVID-19 information</h3>
                        <ul data="title6">
                            <li>The FDA has approved COVID-19 vaccines from Pfizer-BioNTech for age 16+ and Moderna for age 18+.</li>
                            <li>Emergency Use Authorization(EUA) is in place for the Johnson & Johnson vaccine for age 18+ and the Pfizer-BioNTech vaccine for ages 5 to 15 years.</li>
                            <li>Common side effects may include pain at the injection site, tired-ness, muscle pain or fever.</li>
                        </ul>
                    </Col>

                    <Col span={10} offset={3}>
                        <Image src={neu2}  style={{ width:"500px" }}/>
                    </Col> 
                </Row>

              </Content>    
          </Layout>
      </div>
    )
}


