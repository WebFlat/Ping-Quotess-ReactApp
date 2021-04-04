

const Button = (props) => {
    return (
        <button id={props.id} className={props.class} onClick={props.click}>{props.name}</button>
    )
}


export default Button;
