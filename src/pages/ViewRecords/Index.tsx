import Styles from "./_viewRecord.module.scss"
import Chart from "../../components/ui/Chart/Chart"

type Props = {}

const Index = (props: Props) => {
  return (
    <div className={Styles.recordsContainer}>
        <h2>View Records</h2>
        <Chart 
            options = {{
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            }}
            series = {[
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]}
        />
    </div>
  )
}

export default Index