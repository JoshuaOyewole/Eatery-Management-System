import { Link } from "react-router-dom";

type BoxProps = {
  icon?: React.ReactElement;
  value?: number | string;
  hClass?: string;
  boxStyle?: string;
  link: string;
  iconStyle?: string;
};

const Box = (props: BoxProps) => {
  const { boxStyle, link, icon, value, hClass, iconStyle } = props;

  return (
    <Link to={link} className={`dashboard__box ${boxStyle}`}>
      {icon && (
        <div
          className={iconStyle && iconStyle}
        >
          {icon}
        </div>
      )}
      <h2 className={hClass}> {value}</h2>
    </Link>
  );
};

export default Box;
