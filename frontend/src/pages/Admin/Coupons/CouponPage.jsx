import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Ant Design message hook'u
  const [messageApi, contextHolder] = message.useMessage();

  // ✅ Tabloda gösterilecek sütunlar
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <span>% {text}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //✅ API'den kullanıcıları çek
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);

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
  }, [apiUrl, messageApi]);

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/coupons/${couponId}
        `,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchCategories();
        messageApi.success("Kupon başarıyla silindi.");
      } else {
        messageApi.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Silme Hatası:", error);
      messageApi.error("Sunucu hatası oluştu!");
    } finally {
      setLoading(false);
    }
  };

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

export default CouponPage;
