import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Popconfirm, Table, message } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import "./CreateProductPage.css"

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();

  

useEffect(() => {

     const fetchCategories = async () => {
    
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
  
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          messageApi.error("Kullanıcılar alınamadı!");
        }
      } catch (error) {
        console.error("API Hatası:", error);
        messageApi.error("Sunucu hatası oluştu!");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

}, [apiUrl,messageApi]);
const onFinish = async (values) => {
  const imgLinks = values.img
    .split("\n")
    .map(link => link.trim())
    .filter(link => link !== "");

  const colors = values.colors
    .split("\n")
    .map(color => color.trim())
    .filter(color => color !== "");

  const sizes = values.sizes
    .split("\n")
    .map(size => size.trim())
    .filter(size => size !== "");

  setLoading(true);
  try {
    const response = await fetch(`${apiUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        price: {
          current: values.current,
          discount: values.discount,
        },
        colors,
        sizes,
        img: imgLinks,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Sunucudan dönen hata :",data);
      messageApi.success("Ürün başarıyla oluşturuldu.");
      form.resetFields();
    } else {
      messageApi.error("Ürün oluşturulurken bir hata oluştu.");
    }
  } catch (error) {
    console.log("Ürün oluşturma hatası", error);
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
            label="Ürün İsmi"
            name="name"
            rules={[{ required: true, message: "Lütfen ürün adını girin!" }]}
          >
            <Input />
          </Form.Item>

           <Form.Item
            label="Ürün Kategorisi"
            name="category"
            rules={[
              {
                required: true,
                message: "Lütfen 1 kategori seçin.",
              },
            ]}
          >
            <Select>
                {categories.map((category) =>(

                    <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>

                ))}
              
            </Select>
          </Form.Item>

          <Form.Item
            label="Fiyat"
            name="current"
            rules={[{ required: true, message: "Lütfen ürün fiyatı girin!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="İndirim Oranı"
            name="discount"
            rules={[
              { required: true, message: "Lütfen ürün indirim oranı girin!" },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
  label="Ürün Açıklaması"
  name="description"
  rules={[{ required: true, message: "Lütfen ürün açıklaması girin!" }]}
>
  <ReactQuill
  theme="snow"
  style={{
    backgroundColor: "white",
    minHeight: "200px",        // editör yüksekliği
    marginBottom: "24px"       // altındaki alanla boşluk bırak
  }}
  onChange={(value) => form.setFieldValue("description", value)}
/>
</Form.Item>

          <Form.Item
            label="Ürün Görselleri (Linkler)"
            name="img"
            rules={[
              {
                required: true,
                message: "Lütfen en az 4 ürün görsel linki girin!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Her bir görsel linkini yeni bir satıra yazın."
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            label="Ürün Renkleri (RGB Kodları)"
            name="colors"
            rules={[
              {
                required: true,
                message: "Lütfen en az 1 ürün rengi girin!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Her bir RGB kodunu linkini yeni bir satıra yazın."
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            label="Ürün Bedenleri"
            name="sizes"
            rules={[
              {
                required: true,
                message: "Lütfen en az 1 ürün bedeni girin!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
              autoSize={{ minRows: 4 }}
            />
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



export default CreateProductPage;
