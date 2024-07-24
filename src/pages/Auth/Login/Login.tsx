import { Controller, useForm } from 'react-hook-form';
import styles from './style.module.css'
import { Input, Card, Flex } from 'antd';
import { loginUser } from '../../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { control, handleSubmit, reset } = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data: any) => {
        const token = await loginUser(data)
        if (token) {
            window.localStorage.setItem("token", token)
            reset()
            navigate('/')
        }
    }
    return (
        <div className={styles.root}>
            <Card hoverable title="Login" bordered={false} style={{ width: 300 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap="middle" vertical>
                        <div>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => <Input {...field} placeholder='Email' />}
                            />
                        </div>
                        <label>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field }) => <Input {...field} placeholder='Password' type='password' />}
                            />
                        </label>
                        <div>
                            <button type='submit'>Login</button>
                        </div>
                    </Flex>
                </form>
            </Card>
        </div>
    )
}

export default Login