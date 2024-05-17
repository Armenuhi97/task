import './FloatingLabelField.scss';
type Props = {
    children: string | JSX.Element | JSX.Element[];
    label: string;
    value: any;
    isShowLabel?: boolean
}
export default function FloatingLabelFields({ isShowLabel = true, children, label, value }: Props) {
    return (
        <div className="input-container">
            {children}
            {isShowLabel && <label className={value && 'filled'} >
                {label}
            </label>}
        </div>
    )
}