import styles from "./Button.module.scss";

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button