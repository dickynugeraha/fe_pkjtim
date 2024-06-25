import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";
import { UsersListHeader } from "../../../_metronic/layout/components/table/header/UsersListHeader";
import { UsersTable } from "../../../_metronic/layout/components/table/UsersTable";
import { KTCard } from "../../../_metronic/helpers";

const PesananSaya = () => {
  // const [data, setData] = useState([
  //   {
  //     key: "1",
  //     name: "John",
  //     age: 28,
  //     address: "New York",
  //     details: "Some details about John",
  //   },
  //   {
  //     key: "2",
  //     name: "Jane",
  //     age: 22,
  //     address: "London",
  //     details: "Some details about Jane",
  //   },
  // ]);

  // const [editingKey, setEditingKey] = useState("");

  // // Columns definition
  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text, record) => editableCell(text, record, "name"),
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //     render: (text, record) => editableCell(text, record, "age"),
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address",
  //     render: (text, record) => editableCell(text, record, "address"),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <span>
  //         {editingKey === record.key ? (
  //           <span>
  //             <a onClick={() => save(record.key)}>Save</a>
  //             <a style={{ marginLeft: 8 }} onClick={() => cancel()}>
  //               Cancel
  //             </a>
  //           </span>
  //         ) : (
  //           <a onClick={() => edit(record.key)}>Edit</a>
  //         )}
  //       </span>
  //     ),
  //   },
  // ];

  // const editableCell = (text, record, column) => {
  //   return editingKey === record.key ? (
  //     <input
  //       value={record[column]}
  //       onChange={(e) => handleChange(e, record.key, column)}
  //     />
  //   ) : (
  //     text
  //   );
  // };

  // const handleChange = (e, key, column) => {
  //   const newData = [...data];
  //   const index = newData.findIndex((item) => item.key === key);
  //   if (index > -1) {
  //     const item = newData[index];
  //     newData.splice(index, 1, { ...item, [column]: e.target.value });
  //     setData(newData);
  //   }
  // };

  // const edit = (key) => {
  //   setEditingKey(key);
  // };

  // const save = (key) => {
  //   setEditingKey("");
  // };

  // const cancel = () => {
  //   setEditingKey("");
  // };

  // const expandedRowRender = (record) => {
  //   return <p>{record.details}</p>;
  // };

  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
    </Content>
  );
};

export default PesananSaya;
