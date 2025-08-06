import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Popconfirm, Table, message } from "antd";

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/`,
      {
        method: "POST",
        headers :{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok)
      {
        messageApi.success("Kategori başarıyla oluşturuldu.")
        form.resetFields();
      }
      else {
        messageApi.error("Kategori oluşturulurken bir hata oluştu.")

      }
      
    } catch (error) {
      console.log("Kategori oluşturma hatası",error)
    }finally{
      setLoading(false);
    }
    
    
  };


  return (
    <Spin spinning ={loading}>

      <>
      {contextHolder}

      <Form
      
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Kategori İsmi"
          name="name"
          rules={[{ required: true, message: "Lütfen kategori adını girin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </>

    </Spin>
    
  );
};

export default CreateCategoryPage;
