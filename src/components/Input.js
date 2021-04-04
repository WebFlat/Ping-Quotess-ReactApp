


const Input = (props) => {
    return (
        <input type="text" className={props.class} id={props.id} value={props.val} placeholder={props.placeholder} readOnly={props ? true : false} />
    )
}


export default Input;
