import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import Navbar from "../components/homeComponents/NavBar";
import './style/Hospital.scss';
import {
  Button,
  message,
  Input,
  Popconfirm,
  Table,
  Tag,
  Spin,
  Form,
  Modal,
  Radio,
  Select,
  DatePicker,
  Descriptions,
} from 'antd';
import { getPatients, putUserInfo } from '../services/hospital';
import { useForm } from 'antd/lib/form/Form';

const errorHandler = (e) => message.error(e.message || e.msg || e);

function Complete({ onSubmit }) {
  const [name, setName] = useState('');

  const submit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
      setName('');
    } else {
      message.error('Please input name');
    }
  };

  const contentNode = (
    <div>
      <p>Please input your name to submit</p>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );

  return (
    <Popconfirm
      cancelText='Cancel'
      okText='Confirm'
      onConfirm={submit}
      onCancel={() => setName('')}
      title={contentNode}
    >
      <Button type='primary'>Complete</Button>
    </Popconfirm>
  );
}

function CheckModal({ onSubmit, onCancel, visible }) {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    await onSubmit(values).finally(() => setLoading(false));
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title='Confirm Info'
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item
          name='provider'
          label='Provider'
          rules={[{ required: true, message: 'Please input your name' }]}
        >
          <Input placeholder='Please input your name' />
        </Form.Item>
        <Form.Item name='result' label='Result' initialValue='negative'>
          <Radio.Group
            options={[
              { label: 'Negative', value: 'negative' },
              { label: 'Positive', value: 'positive' },
            ]}
            optionType='button'
          />
        </Form.Item>
        <Form.Item name='method' initialValue='RT-PCR' label='Method'>
          <Select options={[{ label: 'RT-PCR', value: 'RT-PCR' }]} />
        </Form.Item>
        <Form.Item
          name='completedDate'
          label='Complete Date'
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function DetailInfo({ info, onSubmitVaccine, onCheck }) {
  const { vaccineInfo, testInfo } = info;
  const vaccineNode = vaccineInfo ? (
    <Descriptions title='Vaccine Info'>
      <Descriptions.Item label='Order Date'>
        {vaccineInfo.orderDate}
      </Descriptions.Item>
      <Descriptions.Item label='Location'>
        {vaccineInfo.location}
      </Descriptions.Item>
      <Descriptions.Item label='Dose'>{vaccineInfo.dose}</Descriptions.Item>
      <Descriptions.Item label='Type'>
        {vaccineInfo.vaccineType}
      </Descriptions.Item>
      <Descriptions.Item label='Provider'>
        {vaccineInfo.provider}
      </Descriptions.Item>
      <Descriptions.Item label='Status'>{vaccineInfo.status ? 'Completed' : 'Not Completed'}</Descriptions.Item>
    </Descriptions>
  ) : null;
  const testNode = testInfo ? (
    <Descriptions title='Test Info'>
      <Descriptions.Item label='Order Date'>
        {testInfo.orderDate}
      </Descriptions.Item>
      <Descriptions.Item label='Location'>
        {testInfo.location}
      </Descriptions.Item>
      <Descriptions.Item label='Type'>{testInfo.testType}</Descriptions.Item>
      <Descriptions.Item label='Provider'>
        {testInfo.provider}
      </Descriptions.Item>
      <Descriptions.Item label='Method'>{testInfo.method}</Descriptions.Item>
      <Descriptions.Item label='Completed Date'>
        {testInfo.completedDate}
      </Descriptions.Item>
      <Descriptions.Item label='Result'>{testInfo.result}</Descriptions.Item>
      <Descriptions.Item label='Status'>{testInfo.status ? 'Completed' : 'Not Completed'}</Descriptions.Item>
    </Descriptions>
  ) : null;

  return (
    <>
      {vaccineNode}
      {!vaccineInfo || vaccineInfo.status ? null : (
        <Complete onSubmit={(name) => onSubmitVaccine(name)} />
      )}
      <div style={{ height: 10 }} />
      {testNode}
      {!testInfo || testInfo.status ? null : (
        <Button type='primary' onClick={onCheck}>
          Complete
        </Button>
      )}
    </>
  );
}

function PatientTable({ patients, onSubmitVaccine, onCheck }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: ['userInfo', 'name'],
      sorter: (a, b) => a.userInfo.name.localeCompare(b.userInfo.name),
    },
    {
      title: 'Phone',
      dataIndex: ['userInfo', 'phone'],
      sorter: (a, b) => a.userInfo.phone.localeCompare(b.userInfo.phone),
    },
    {
      title: 'Gender',
      dataIndex: ['userInfo', 'gender'],
      sorter: (a, b) => a.userInfo.gender - b.userInfo.gender,
      filters: [
        { text: 'Female', value: "Female" },
        { text: 'Male', value: "Male" },
      ],
      onFilter: (value, record) => record.userInfo.gender === value,
      render: (gender) => (
        (gender==="Male")?<Tag color="blue">Male</Tag>:<Tag color="pink">Female</Tag>
      ),
    },
    {
      title: 'Age',
      dataIndex: ['userInfo', 'age'],
      sorter: (a, b) => a.userInfo.age - b.userInfo.age,
    },
    {
      title: 'birth',
      dataIndex: ['userInfo', 'birth'],
      sorter: (a, b) =>
        new Date(a.userInfo.birth).getTime() - new Date(b.userInfo.birth).getTime(),
    },
    {
      title: 'Address',
      dataIndex: ['userInfo', 'address'],
      sorter: (a, b) => a.userInfo.address.localeCompare(b.userInfo.address),
    },
  ];
  return (
    <Table
      rowKey='_id'
      columns={columns}
      dataSource={patients}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => (
          <DetailInfo
            info={record}
            onSubmitVaccine={(name) => onSubmitVaccine(record, name)}
            onCheck={() => onCheck(record)}
          />
        ),
      }}
    />
  );
}

 export function Hospital() {
   const navigate = useNavigate();
   const { setAuth } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [toCheckTest, setToCheckTest] = useState();
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    // load data from database
    getPatients()
      .catch(errorHandler)
      .then((patients) => {
        setPatients(
          // only show patients with vaccineInfo or testInfo
          patients.filter((item) => item.email !== 'Hospital@northeastern.edu')
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmitVaccine = async (record, name) => {
    setLoading(true);
    // put data to complete vaccine
    await putUserInfo({
      ...record,
      vaccineInfo: {
        ...record.vaccineInfo,
        status: true,
        provider: name,
      }
    }).catch(errorHandler);
    load();
  };

  const handleCheckTest = async (params) => {
    // put data to complete vaccine
    await putUserInfo({
      ...toCheckTest,
      testInfo: {
        ...toCheckTest.testInfo,
        ...params,
        status: true,
      }
    }).catch(errorHandler);
    // close modal
    setToCheckTest(null);
    // refresh list
    load();
  };

  const signout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/login');
  }

  return (
    <Spin spinning={loading}>
      <Navbar />
      <h1 className='ttl4'>COVID-19 Test/Vaccine Appointment System</h1><br />
      <h2 className='ttl5'>Hospital Main Page</h2>
      <div style={{ padding: 20 }}>
        <PatientTable
          patients={patients}
          onCheck={setToCheckTest}
          onSubmitVaccine={onSubmitVaccine}
        />
      </div>
      <CheckModal
        visible={!!toCheckTest}
        onCancel={() => setToCheckTest(null)}
        onSubmit={(values) => handleCheckTest(values)}
      />
      <button button className="btnn" onClick={signout}>Sign Out</button>
    </Spin>
    
  );
}

// export default Hospital;
