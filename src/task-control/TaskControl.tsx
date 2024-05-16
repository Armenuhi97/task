import { Control, Controller, FieldError, FieldErrors } from 'react-hook-form';
import FloatingLabelFields from '../components/floating-label-field/FloatingLabelField';
import './TaskControl.scss';
import { IFile, TaskForm } from '../task-repost/task-form.model';
import { Switch } from '../components/switch/Switch';
import DragNdrop from '../components/drag-and-drop-files/DargAndDropFiles';

type Props = {
    index: number;
    control: Control<TaskForm>;
    errors?: FieldErrors;
}
export default function TaskControl({ control, index, errors }: Props) {

    return (
        <div className="task-content">
            <div className='left-content'>
                <Controller
                    control={control}
                    name={`tasks.${index}.date`}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { ...field }, fieldState: { error, invalid, isTouched } }: any,) => {
                        return <FloatingLabelFields label='Date' value={field.value}>
                            <input className={invalid && isTouched ? "error" : ''} type="date" {...field} />
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
                    render={({ field: { ...field }, fieldState: { error, invalid, isTouched } }) => {

                        return <div>
                            <FloatingLabelFields label='Title' value={field.value}>
                                {/* <div> */}
                                <input className={invalid && isTouched ? "error" : ''}
                                    type="text" {...field} />
                                {/* {error && <p>Error!</p>} */}

                                {/* </div> */}

                            </FloatingLabelFields>
                        </div>
                    }
                    }

                />

                <Controller
                    control={control}
                    name={`tasks.${index}.description`}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { ...field }, fieldState: { error, invalid, isTouched } }) => {
                        return <FloatingLabelFields label='Description' value={field.value}>
                            <textarea className={invalid && isTouched ? "error" : ''} rows={5} {...field}></textarea>
                        </FloatingLabelFields>
                    }}
                />

                <Controller
                    control={control}
                    name={`tasks.${index}.status`}
                    render={({ field: { onChange, value } }) => {
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
                <Controller
                    control={control}
                    name={`tasks.${index}.files`}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value }, fieldState: { error, invalid, isTouched } }) => {
                        return <div>
                            <DragNdrop onChange={(e: IFile[]) => onChange(e)} files={value} />

                            <p>{invalid && isTouched? 'Required':''}</p>
                        </div>

                    }
                    }
                />
                {/* <DargAndDropFiles /> */}
                <img className='upload-image' src="/images/upload-photo.png" alt="" />
            </div>

        </div>
    )
}