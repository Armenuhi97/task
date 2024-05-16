import './TaskFormContent.scss';

type Props = {
    children: string | JSX.Element | JSX.Element[];
    removeControl: () => void;
}
export default function TaskFormContent({ children, removeControl }: Props) {
    return (
        <div className="task-form-content">
            <button onClick={(e) => {
                e.preventDefault();
                removeControl()
            }} className='delete-btn'>
                <img src="/icons/Minus.svg" alt="" />
            </button>
            {children}
        </div>

    )
}