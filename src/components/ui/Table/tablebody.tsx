
import TableStyle from "./_table.module.scss"


type tableBodyProps = {
  children: React.ReactNode;
  tableRowClass?: string;
}

export default function TableRow(props: tableBodyProps) {

  return <tr className={`${TableStyle["table-row"]} ${props.tableRowClass ? props.tableRowClass : ""}`}>
    {props.children}
  </tr>;
}