import './FloatingLabelField.scss';
type Props = {
    children: string | JSX.Element | JSX.Element[];
    label: string;
    value: any;
}
export default function FloatingLabelFields({ children, label, value }: Props) {
    return (
        <div className="input-container">
            {children}
            <label className={value && 'filled'} >
                {label}
            </label>
        </div>
    )
}