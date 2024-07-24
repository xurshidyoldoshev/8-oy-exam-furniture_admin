import React from 'react';
import styles from './style.module.css';
import { Card, Flex, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';

type FormValues = {
    name: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className={styles.root}>
            <Card hoverable title="Register" bordered={false} style={{ width: 300 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap="middle" vertical>
                        <Controller
                            name='name'
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <Input placeholder='Name' {...field} />
                            )}
                        />
                        {errors.name && <p>{(errors.name as FieldError).message}</p>}

                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: 'Email is required' }}
                            render={({ field }) => (
                                <Input placeholder='Email' {...field} />
                            )}
                        />
                        {errors.email && <p>{(errors.email as FieldError).message}</p>}

                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => (
                                <Input placeholder='Password' type='password' {...field} />
                            )}
                        />
                        {errors.password && <p>{(errors.password as FieldError).message}</p>}

                        <div>
                            <button type='submit'>Send</button>
                        </div>
                    </Flex>
                </form>
            </Card>
        </div>
    );
};

export default Register;
