import { createActionSetCurrency } from "../redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Table, Layout } from "antd";
import "antd/dist/antd.css";

const { Content } = Layout;

export function Main() {
  const dispatch = useDispatch();

  const selectorStateCurrency = useSelector((state) => state.curr);

  const bankURL =
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

  async function fetchRates() {
    try {
      const response = await fetch(bankURL, {
        method: "GET",
      });
      const data = await response.json();

      console.log("data: ", data);

      //Throw actions in reducer
      dispatch(createActionSetCurrency(data));
    } catch (err) {
      console.log("Not Found: ", err);
    }
  }

  useEffect(() => {
    fetchRates();
  }, []);

  //***************************************************************** */

  const columns = [
    {
      title: "Title",
      dataIndex: "cc",
      align: "center",
      key: "cc",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      align: "center",
      key: "rate",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: "Txt:",
      dataIndex: "txt",
      align: "center",
      key: "txt",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.txt - b.txt,
    },
  ];

  return (
    <Layout>
      <Content>
        <Table columns={columns} dataSource={selectorStateCurrency} />
      </Content>
    </Layout>
  );
}
