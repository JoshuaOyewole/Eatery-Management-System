import React from "react";
import TableStyles from "./_table.module.scss";

export interface TableProps {
  th: any;
  extraClass: any;
  children: React.ReactNode;
  tableHeader: Array<string>;
  tableClass?: string;
  tableHeaderClass?: string;
  theadIcon?: React.ReactElement;
}

export default function Table(props: TableProps) {
  //const{theadIcon = false} = props;


  return (
    <div className={`${TableStyles.table_container}`} style={props.extraClass && props.extraClass}>
      <table className={props.tableClass}>
        <thead>
          <tr className={props.tableHeaderClass}>
            {props.tableHeader.map((header: string, index: number) => {
              return (
                <th key={index}style={props.th && props.th} >
                  {header} {props.theadIcon && props.theadIcon}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}