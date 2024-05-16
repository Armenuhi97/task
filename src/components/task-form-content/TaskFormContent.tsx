import './TaskFormContent.scss';

type Props = {
    children: string | JSX.Element | JSX.Element[];
    removeControl?: () => void;
    isShowRemoveButton: boolean
}
export default function TaskFormContent({ children, removeControl, isShowRemoveButton = true }: Props) {
    return (
        <div className="task-form-content">
            {isShowRemoveButton && <button onClick={(e) => {
                e.preventDefault();
                removeControl!();
            }} className='delete-btn'>
                <img src="/icons/Minus.svg" alt="" />
            </button>}
            {children}
        </div>

    )
}