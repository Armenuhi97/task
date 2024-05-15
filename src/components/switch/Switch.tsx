import { ControllerRenderProps } from "react-hook-form";
import { TaskForm } from "../../task-repost/task-form.model";
import './Switch.scss';
type Prop = {
    // field: ControllerRenderProps<TaskForm, `tasks.${number}.status`>;
    label: string;
    value:string | undefined;
    onChange:()=>void
}
export function Switch({ value, label, onChange }: Prop) {    
    return (
        <label className="switch">
            <input type="checkbox"  checked={!!value} onChange={onChange} />
            <span className="slider round"></span>
            <div className="text">{label}</div>
        </label>
    )
}