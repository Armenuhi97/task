import './Message.scss';
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { MessageType } from '../../models/message.model';

type Props = {
    message: string;
    type: MessageType;
}
export default function Message({ message, type }: Props) {
    console.log(type);
    
    const toastrIconsList = {
        success: <FaCheckCircle />,
        failed: <IoCloseCircle />
    }
    return (
        <div className={`message-container message-${type}`}>
            {toastrIconsList[type]} <p className='message'>{message}</p>
        </div>
    )
}