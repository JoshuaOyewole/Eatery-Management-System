import TableStyles from "./_table.module.scss";

type tableHeadProps = {
  children: React.ReactNode;
  tableHeadClass?: string;
};

export default function TableHead(props: tableHeadProps) {
  return (
      <tr
        className={`${TableStyles["table-head"]} ${
          props.tableHeadClass ? props.tableHeadClass : ""
        }`}
      >
        {props.children}
      </tr>
  );
}
