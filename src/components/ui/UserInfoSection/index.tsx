import TableStyles from "../Table/_table.module.scss";
import TableRow from "../Table/tablebody";

type orderDetailsProps = {
  tdatas: Array<string>;
  secondTableHeader?: Array<string>;
  secondTableDatas?: Array<string>;
};
const orderDetails = (props: orderDetailsProps) => {
  /* Dividing the Table Row into 2 to fit the design specification */
  const tdataRowOne =
    props.tdatas?.length >= 8
      ? props.tdatas?.slice(0, 5)
      : props.tdatas?.slice(0, 5);

  return (
    <TableRow tableRowClass={`${TableStyles.tableHeaderRow}`}>
      {tdataRowOne?.map((td, index) => {
        return <td key={index}>{td}</td>;
      })}
    </TableRow>
  );
};

export default orderDetails;
