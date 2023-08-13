import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/notes/userSlice';
import { DisconnectContext } from './contexts/Disconnect';
import Loading from './Loading';

const Disconnect = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [disconnect, setDisconnect] = useContext(DisconnectContext);

    async function disconnectUser() {
        await dispatch(logoutUser()).unwrap()
    }

    return (
        <div className='container__disconnect'>
            <span>Are you sure you want to disconnect?</span>
            <div className='flex__row' style={{ alignSelf: "flex-end", paddingTop: "5em" }}>
                <button id="btnCancel" onClick={() => setDisconnect(!disconnect)}>Cancel</button>
                <button id="btnYes" onClick={() => { setDisconnect(!disconnect); disconnectUser() }}>Yes</button>
                {user.loading && <Loading />}
                {!user.loading && !user.error && disconnect ? (
                    window.location.reload()

                ) : null}
            </div>
        </div >
    )
}

export default Disconnect