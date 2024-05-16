import './SecondaryButton.scss';
type Props = {
    title: string
    handleClick: () => void;
    className?: string;
    isDisabled?: boolean;
}
export default function SecondaryButton({ isDisabled = false, title, handleClick, className }: Props) {
    return (
        <button disabled={isDisabled} onClick={() => handleClick()} className={`${className} secondary-btn btn`} type="button">{title}</button>
    )
}