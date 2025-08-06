import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const UserPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Ant Design message hook'u
  const [messageApi, contextHolder] = message.useMessage();

  // ✅ Tabloda gösterilecek sütunlar
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=> deleteUser(record.email)}        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // ✅ API'den kullanıcıları çek
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);

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

  const deleteUser = async (userEmail) => {

    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}
        `,
    {
        method:"DELETE",
    });

      if (response.ok) {
        fetchUsers();
        messageApi.success("Kullanıcı başarıyla silindi.")
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
    fetchUsers();
  }, [fetchUsers]);

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

export default UserPage;
