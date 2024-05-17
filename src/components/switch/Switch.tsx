import './Switch.scss';
type Prop = {
    label: string;
    value:boolean;
    onChange:()=>void
}
export function Switch({ value, label, onChange }: Prop) {    
    return (
        <label className="switch">
            <input type="checkbox"  checked={!!value} onChange={onChange} />
            <span className="slider round"></span>
            <div className="switch-text">{label}</div>
        </label>
    )
}