type BoxProps = {
  boxTitle?: string;
  hClass?: string;
  pClass?: string;
  cash?: number;
  POS?: number;
  transfer?: number;
};

const MultiLayoutBox = (props: BoxProps) => {
  const { boxTitle, hClass, pClass, transfer, POS, cash } = props;

  return (
    <div className="dashboard__box dashboard__box--v2">
      <div className="dashboard__heading">{boxTitle}</div>
      <div className="dashboard__flex">
        <div className="dashboard__left">
          <div className="dashboard_box">
            <h2 className={`dashboard__content--heading ${hClass}`}>
              {transfer}
            </h2>
            <h4 className={`${pClass}`}>Transfers</h4>
          </div>
          <div className="dashboard_box">
            <h2 className={`dashboard__content--heading ${hClass}`}>{POS}</h2>
            <h4 className={`${pClass}`}>POS Trans</h4>
          </div>
        </div>
        <div className="dashboard__right">
          <div className="dashboard_box">
            <h2 className={`dashboard__content--heading ${hClass}`}>{cash}</h2>
            <h4 className={`${pClass}`}>Cash Payments</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLayoutBox;
