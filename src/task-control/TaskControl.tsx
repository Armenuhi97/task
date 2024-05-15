import { Control, Controller, FieldArrayWithId } from 'react-hook-form';
import FloatingLabelFields from '../components/floating-label-field/FloatingLabelField';
import './TaskControl.scss';
import { TaskForm } from '../task-repost/task-form.model';
import { Switch } from '../components/switch/Switch';
type Props = {
    field: FieldArrayWithId;
    index: number;
    control: Control<TaskForm>
}
export default function TaskControl({ control, index, field }: Props) {
    return (
        <div className="task-content">
            <div className='left-content'>
                <Controller
                    control={control}
                    name={`tasks.${index}.date`}
                    rules={{
                        required: true,
                    }}
                    render={({ field }: any) => {
                        return <FloatingLabelFields label='Date' value={field.value}>
                            <input type="date" {...field} />
                        </FloatingLabelFields>
                    }
                    }
                />

                <Controller
                    control={control}
                    name={`tasks.${index}.title`}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => {
                        return <FloatingLabelFields label='Title' value={field.value}>
                            <input type="text" {...field} />
                        </FloatingLabelFields>
                    }
                    }
                />

                <Controller
                    control={control}
                    name={`tasks.${index}.description`}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => {
                        return <FloatingLabelFields label='Description' value={field.value}>
                            <textarea rows={5} {...field}></textarea>
                        </FloatingLabelFields>
                    }}
                />

                <Controller
                    control={control}
                    name={`tasks.${index}.status`}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } })=>{                        
                        return (
                            <div className='switch-content'>
                                <div className='status'>Status</div>
                                <Switch label={'Mark as a question'} onChange={onChange} value={value} />
                            </div>
                        )
                    }}
                />

            </div>
            <div className='right-content'>
                <input type="file" />
                <img src="/images/upload-photo.png" alt="" />
            </div>

        </div>
    )
}