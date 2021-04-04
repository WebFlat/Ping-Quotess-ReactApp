

const Message = (props) => {
    return (
        <div className={props.active ? "active app__message" : "app__message"} id="alert">

            {props.children}

        </div>

    )
}


export default Message;
