import Styles from "./_spinner.module.scss"

export default function Spinner() {
  return (
    <div className={Styles.cover}>
      <div className={Styles.ring}>Loading
        <span className={Styles['loader__span']}></span>
      </div>
    </div>
  )
}