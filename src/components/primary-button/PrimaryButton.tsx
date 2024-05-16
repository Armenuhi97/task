import './PrimaryButton.scss';
type Props = {
    title: string
    handleClick: (() => void);
    className: string;
    type?: 'button' | 'reset' | 'submit';
};

export default function PrimaryButton({ title, handleClick, className, type = 'button' }: Props) {
    return (
        <button onClick={() => {
            handleClick();
        }} className={`${className} primary-btn btn`} type={type}>{title}</button>
    )
}