import React from "react";
import TableStyles from "./_table.module.scss";

export interface TableProps {
  children: React.ReactNode;
  tableHeader: Array<string>;
  tableClass?: string;
  tableHeaderClass?: string;
  theadIcon?: React.ReactElement;
}

export default function Table(props: TableProps) {
  const{theadIcon = false} = props;

  return (
    <div className={TableStyles.table_container}>
      <table className={props.tableClass}>
        <thead>
          <tr className={props.tableHeaderClass}>
            {props.tableHeader.map((header: string, index: number) => {
              return (
                <th key={index}>
                  {header} {theadIcon && theadIcon}
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