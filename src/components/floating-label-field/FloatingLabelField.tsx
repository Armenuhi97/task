import './FloatingLabelField.scss';
type Props<T> = {
    children: string | JSX.Element | JSX.Element[];
    label: string;
    value: T;
    isShowLabel?: boolean
}
export default function FloatingLabelFields<T>({ isShowLabel = true, children, label, value }: Props<T>) {
    return (
        <div className="input-container">
            {children}
            {isShowLabel && <label className={value && 'filled'} >
                {label}
            </label>}
        </div>
    )
}