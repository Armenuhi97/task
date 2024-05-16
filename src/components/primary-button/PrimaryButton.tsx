import './PrimaryButton.scss';
type Props = {
    title: string
    handleClick: () => void;
    className: string;
}
export default function PrimaryButton({ title, handleClick, className }: Props) {
    return (
        <button onClick={() => handleClick()} className={`${className} primary-btn btn`} type="button">{title}</button>
    )
}