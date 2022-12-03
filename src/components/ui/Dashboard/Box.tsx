type BoxProps = {
icon: React.ReactElement,
title: string,
value?: number | string
}

const Box = (props:BoxProps) => {
    const {icon, title,value} = props;

    return (
        <div className="dashboard__box">
            <div className="dashboard__icon-container">
                {icon}
            </div>
            <h2 className="dashboard__content--heading">{value}</h2>
            <h4>{title}</h4>
        </div>
    )
}

export default Box