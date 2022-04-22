import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import Navbar from "../../components/header/Navbar";
import { useHistory, useParams } from "react-router-dom";
import { getAllStoreTransactionService } from "./../../services/store";
import BookList from "../bookManagement/BookList";

export default (props) => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!params.id) {
      history.push("/store-management");
    }
  }, []);

  return (
    <Navbar>
      <BookList {...props} storeId={params.id} />
    </Navbar>
  );
};
