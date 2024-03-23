import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { ICategoryCreate } from './types';
import { apiClient } from '../../utils/api/apiClient';

const CategoryCreatePage = () => {
    // const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (data: ICategoryCreate) => {
        setLoading(true);

        try {
            await apiClient.post('api/categories', data)
        } catch (error) {
            console.log('Error category creating:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Edit Category</h1>
            <Form
                // form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter category name!' }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter category description!' }]}
                >
                    <Input placeholder="Enter category description" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryCreatePage;
