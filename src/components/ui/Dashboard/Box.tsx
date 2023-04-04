type BoxProps = {
  icon?: React.ReactElement;
  title: string;
  value?: number | string;
  hClass?: string;
  pClass?: string;
  boxStyle?: string;
};

const Box = (props: BoxProps) => {
  const { boxStyle, icon, title, value, hClass, pClass } = props;

  return (
    <div className={`dashboard__box ${boxStyle}`}>
      {icon && <div className="dashboard__icon-container">{icon}</div>}
      <h2 className={`dashboard__content--heading ${hClass}`}> {value}</h2>
      <h4 className={`${pClass}`}>{title}</h4>
    </div>
  );
};

export default Box;
