import { useEffect, useState } from "react";
import { getShow } from "../../../api/tvmaze.api";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";
import "../shows.css";
import ShowMainInfo from "./SubComponents/ShowMainInfo";
import ShowTabs from "./SubComponents/ShowTabs";

const ShowPage = ({
  match: {
    params: { id },
  },
}) => {
  const [show, setShow] = useState();

  useGetAsyncData(() => getShow(id), setShow);

  const resetShow = async () => {
    setShow(await getShow(id));
  };

  useEffect(() => {
    resetShow();
  }, [id]);

  return (
    <>
      {show && <ShowMainInfo show={show} />}
      {show && <ShowTabs show={show} />}
    </>
  );
};

export default ShowPage;
