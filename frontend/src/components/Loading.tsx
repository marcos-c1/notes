const Loading = ({ display }) => {
    return (
        <div style={{ display: display }} className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading