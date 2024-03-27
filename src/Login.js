import React from 'react'
import axios  from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login() {

    const onFinish = values => {
            const {username, password} = values
            axios.post('http://localhost:3001/validatePassword', {username, password})
            .then(res => {
                    if(res.data.validation){
                        alert('Your password is correct, thank you')
                    }
                    else{
                        alert('Your password is not correct')
                    }
            })
    }

    const register = value => {
        
    }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{width:400}}>

            <h1 style={{textAlign:'center'}}>Login</h1>
            
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>

                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>



        </div>



    </div>
  )
}
