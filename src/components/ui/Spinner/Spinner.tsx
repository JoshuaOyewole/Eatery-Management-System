import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
//import Styles from "./_spinner.module.scss"


export function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><ReactLoading type={"bars"} color="#333" /></div>
  )
}

export function SpinnerButton({ title = "Processing" }) {
  return (
    <> <FontAwesomeIcon icon={faSpinner} spin size="lg" style={{ marginRight: "0.8rem" }} />{title}.</>
  )
}

