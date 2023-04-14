import './components.css';
export default function Modal({
    onClose = () => { },
    title = "Modal Title",
    children =<div></div>
}) {


    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>{title}</h2>
                {children}
                <button className=" btn btn-danger close-button" onClick={()=>{onClose()}}> X </button>
            </div>
        </div>

    );
}