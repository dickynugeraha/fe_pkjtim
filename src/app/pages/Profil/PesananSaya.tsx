import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";
import Table from "rc-table";
import "rc-table/assets/index.css";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";

const PesananSaya = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "John",
      age: 28,
      address: "New York",
      details: "Some details about John",
    },
    {
      key: "2",
      name: "Jane",
      age: 22,
      address: "London",
      details: "Some details about Jane",
    },
  ]);

  const [editingKey, setEditingKey] = useState("");

  // Columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => editableCell(text, record, "name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record) => editableCell(text, record, "age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => editableCell(text, record, "address"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {editingKey === record.key ? (
            <span>
              <a onClick={() => save(record.key)}>Save</a>
              <a style={{ marginLeft: 8 }} onClick={() => cancel()}>
                Cancel
              </a>
            </span>
          ) : (
            <a onClick={() => edit(record.key)}>Edit</a>
          )}
        </span>
      ),
    },
  ];

  const editableCell = (text, record, column) => {
    return editingKey === record.key ? (
      <input
        value={record[column]}
        onChange={(e) => handleChange(e, record.key, column)}
      />
    ) : (
      text
    );
  };

  const handleChange = (e, key, column) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: e.target.value });
      setData(newData);
    }
  };

  const edit = (key) => {
    setEditingKey(key);
  };

  const save = (key) => {
    setEditingKey("");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const expandedRowRender = (record) => {
    return <p>{record.details}</p>;
  };

  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />
      <div className="card p-8">
        <Table
          columns={columns}
          data={data}
          expandedRowRender={expandedRowRender}
          rowKey="key"
        />
      </div>
    </Content>
  );
};

export default PesananSaya;
