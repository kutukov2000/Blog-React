import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { ICategoryEdit } from './types';
import { apiClient } from '../../utils/api/apiClient';

const EditCategoryPage = () => {
    const { id } = useParams();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`api/categories/${id}`);
                console.log(response.data);
                form.setFieldsValue({ name: response.data?.name, description: response.data?.description })
            } catch (error) {
                console.error('Error fetching category:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const onFinish = async (values: ICategoryEdit) => {
        setLoading(true);
        const data = { ...values, id };

        try {
            await apiClient.put('api/categories', data)
        } catch (error) {
            console.log('Error edit category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Edit Category</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ remember: true }}
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

export default EditCategoryPage;
