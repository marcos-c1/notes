import React from 'react'

const Disconnect = () => {
    return (
        <div className='container__disconnect'>
            <span>Are you sure you want to disconnect?</span>
            <div className='flex__row' style={{ alignSelf: "flex-end", paddingTop: "5em" }}>
                <button id="btnCancel">Cancel</button>
                <button id="btnYes">Yes</button>
            </div>
        </div >
    )
}

export default Disconnect