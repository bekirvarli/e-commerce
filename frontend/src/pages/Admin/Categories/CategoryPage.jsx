import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Ant Design message hook'u
  const [messageApi, contextHolder] = message.useMessage();

  // ✅ Tabloda gösterilecek sütunlar
  const columns = [
    {
      title: "Kategori Görseli",
      dataIndex: "img",
      key: "img",
      render: (ImgSrc) => (
        <img
          src={ImgSrc}
          alt="Image"
          style={{ width: 70 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_,record) => (
        <Space>

          <Button type="primary"  onClick={() => navigate(`/admin/categories/update/${record._id}`)}


        >
            Düzenle
          </Button>
        





            <Popconfirm
          title="Kategoriyi Sil"
          description="Kategoriyi silmek istediğinizden emin misiniz?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=> deleteCategory(record._id)}        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>

        </Space>
        
        
      ),
    },
  ];

  // ✅ API'den kullanıcıları çek
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        messageApi.error("Kullanıcılar alınamadı!");
      }
    } catch (error) {
      console.error("API Hatası:", error);
      messageApi.error("Sunucu hatası oluştu!");
    } finally {
      setLoading(false);
    }
  }, [apiUrl,messageApi]);

  const deleteCategory= async (categoryId) => {

    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}
        `,
    {
        method:"DELETE",
    });

      if (response.ok) {
        fetchCategories();
        messageApi.success("Kategori başarıyla silindi.")
      } else {
        messageApi.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Silme Hatası:", error);
      messageApi.error("Sunucu hatası oluştu!");
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      {contextHolder}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </>
  );
};

export default CategoryPage;
