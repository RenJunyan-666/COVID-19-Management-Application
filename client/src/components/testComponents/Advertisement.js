import React from 'react'
import { Row, Col, Card } from 'antd';
import card1 from '../../images/card1.png'
import card2 from '../../images/card2.png'
import card3 from '../../images/card3.png'

export default function Advertisement() {
  const { Meta } = Card
  return (
    <div className="site-card-wrapper">
        <Row gutter={20}>
        <Col span={8} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt="" src={card1} />}>
                <Meta title="Boosters are worth a shot" description="CDC recommended booster shots can help provide continued,
                 long-lasting protection against severe complications, hospitalization and death from COVID-19 for select individuals.
                 You can choose which booster you receive, as the CDC's guidelines now allow you to mix and match dosing for booster shots." />
            </Card>
        </Col>
        <Col span={8} xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt="" src={card2} />}>
                <Meta title="Protecting our youth" description="Pfizer-BioNTech vaccine has been shown to be about 91% effective
                 in children ages 5 to 11 and the CDC has recommended its use. Trials showed the vaccine was safe, 
                 well tolerated and produced a robust antibody response." />
            </Card>
        </Col>
        <Col span={8} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt="" src={card3} />}>
                <Meta title="Vaccine side effects" description="Minor side effects are normal signs that your body is building protection.
                    Common side effects may include pain at the injection site, tiredness, headache, muscle and joint pain or chills and fever.
                    The vaccine does not contain the virus so it cannot give you COVID-19." />
            </Card> 
        </Col>
        </Row>
    </div>
  )
}
