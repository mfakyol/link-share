import classes from "./styles.module.scss";

interface ButtonStyleProps {
  selectedButtonStyle: string;
  buttonStyle: string;
}

function ButtonStyle({ selectedButtonStyle, buttonStyle }: ButtonStyleProps) {
 
  return <div className={`${classes.buttonStyle} ${classes[buttonStyle]} ${selectedButtonStyle === buttonStyle ? classes.selected : ""}`} data-button-style={buttonStyle}></div>;
}

export default ButtonStyle;
