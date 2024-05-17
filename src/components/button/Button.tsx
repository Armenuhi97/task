import './Button.scss';
type Props = {
    title: string
    handleClick: (() => void);
    className?: string;
    type?: 'button' | 'reset' | 'submit';
    buttonType: 'secondary' | 'primary';
    isDisabled?: boolean;
};

export default function Button({ isDisabled = false, buttonType, title, handleClick, className, type = 'button' }: Props) {
    return (
        <button onClick={() => {
            handleClick();
        }} className={`${className} ${buttonType}-btn btn`} disabled={isDisabled} type={type}>{title}</button>
    )
}