import React from 'react'
import { Collapse, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import detail from '../../images/detail.png'
import './style/testStyle.scss'

// test界面的三个平行的广告框
export default function Detail() {
    const text1 = `
    These tests provide convenient at-home testing intended for 
    use by individuals with or without symptoms. 
    These options provide customers with access to testing 
    that can be conducted at home and complement the CVS Health® 
    commitment to providing consumers with access to comprehensive 
    COVID-19 testing services.`

    const text2 = `A PCR (polymerase chain reaction) test is a type 
    of molecular test that often requires a patient sample to be sent 
    to a lab for analysis. Getting results can take anywhere from several 
    hours to days after being received at the lab. A PCR test can sense 
    low levels of viral genetic material (e.g., RNA), so these tests are usually 
    highly sensitive, which means they are good at detecting a true positive result.`

    const text3 = `COVID-19 serial testing occurs when one person tests themselves 
    multiple times for COVID-19 on a routine basis, such as every day or 
    every other day. By testing more frequently, you may detect COVID-19 more 
    quickly and reduce spread of infection.`

    const { Panel } = Collapse;
  

  return (
    <div>
        <Row>
            <Col span={10} push={10}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="site-collapse-custom-collapse">
                    <Panel header="Why should a customer consider purchasing an at-home COVID-19 test versus going to a local testing site for free?"
                     key="1" className="site-collapse-custom-panel">
                    <p>{text1}</p>
                    </Panel>
                    <Panel header="What is the difference between PCR and antigen tests?" key="2" className="site-collapse-custom-panel">
                    <p>{text2}</p>
                    </Panel>
                    <Panel header="What is COVID-19 serial testing?" key="3" className="site-collapse-custom-panel">
                    <p>{text3}</p>
                    </Panel>
                </Collapse>
            </Col>
            <Col span={6} pull={8}>
                <img src={detail} alt="" className='detailPicture'/>
            </Col>
        </Row>
        
    </div>
  )
}
