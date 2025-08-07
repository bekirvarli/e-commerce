import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Popconfirm, Table, message } from "antd";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        messageApi.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        messageApi.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon oluşturma hatası", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
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
            label="Kupon Kodu"
            name="code"
            rules={[{ required: true, message: "Lütfen ürün kodunu girin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="İndirim Oranı"
            name="discountPercent"
            rules={[
              {
                required: true,
                message: "Lütfen indirim oranını girin!",
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

export default CreateCouponPage;
