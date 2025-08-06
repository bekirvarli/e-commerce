import { Button, Form, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { Popconfirm, Table, message } from "antd";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm(); 
  const categoryId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`,
      {
        method: "PUT",
        headers :{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok)
      {
        messageApi.success("Kategori başarıyla güncellendi.")
      }
      else {
        messageApi.error("Kategori güncellenirken bir hata oluştu.")

      }
      
    } catch (error) {
      console.log("Kategori güncelleme hatası",error)
    }finally{
      setLoading(false);
    }
    
    
  };

 

  useEffect(() => {
     const fetchSingleCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`,
        // {
        //   method:"PUT",
        //   headers:{
        //     "Content-Type": "application/json",


        //   },
        //   body:JSON.stringify(formData),
        // }
      );
if(!response.ok)
{
  throw new Error("Verileri getirme hatası");
}
      const data = await response.json();
      if(data)
      {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        })
      }
      
    } catch (error) {
      console.error("API Hatası:", error);
      messageApi.error("Sunucu hatası oluştu!");
    } finally {
      setLoading(false);
    }
  }
    fetchSingleCategory()
    
  }, [apiUrl,messageApi,categoryId,form])
  

  return (
    <Spin spinning ={loading}>

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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </>

    </Spin>
    
  );
};

export default UpdateCategoryPage;
