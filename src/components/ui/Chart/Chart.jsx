import Chart from "react-apexcharts";

export const Charts = (props) => {
    const {options, series, type, width = 600} = props;
    
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        type={type}
                        width={width}
                    />
                </div>
            </div>
        </div>
    )
}