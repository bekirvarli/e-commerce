import { Button, Form, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { Popconfirm, Table, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  const couponId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        messageApi.success("Kupon başarıyla güncellendi.");
        setTimeout(() => {
          navigate("/admin/coupons"); // burayı kendi kupon listeleme sayfanın yoluna göre ayarla
        }, 1000); // 1 saniye bekletip yönlendiriyoruz
      } else {
        messageApi.error("Kupon güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCoupons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);
        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.error("API Hatası:", error);
        messageApi.error("Sunucu hatası oluştu!");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCoupons();
  }, [apiUrl, messageApi, couponId, form]);

  return (
    <Spin spinning={loading}>
      <>
        {contextHolder}

        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Kupon Kodu"
            name="code"
            rules={[{ required: true, message: "Lütfen kupon kodunu girin!" }]}
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
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </>
    </Spin>
  );
};

export default UpdateCouponPage;
