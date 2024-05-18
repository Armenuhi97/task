import { Control, Controller } from 'react-hook-form';
import FloatingLabelFields from '../../../../components/floating-label-field/FloatingLabelField';
import './TaskControl.scss';
import { IFile, TaskForm } from '../../task-form.model';
import { Switch } from '../../../../components/switch/Switch';
import DragAndDropFiles from '../../../../components/drag-and-drop-files/DargAndDropFiles';

type Props = {
    index: number;
    control: Control<TaskForm>;
    isClickOnSubmit: boolean;
}
export default function TaskControl({ control, index, isClickOnSubmit }: Props) {
    const removeExtraSpace = (s: string) => s.trim();

    return (
        <div className="task-content">
            <div className='left-content'>
                <Controller
                    control={control}
                    name={`tasks.${index}.date`}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { ...field }, fieldState: { invalid, isTouched } }: any) => {
                        return <FloatingLabelFields<string> isShowLabel={field.value} label='Date' value={field.value}>
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
                        validate: (value) => {
                            return !!value.trim()
                        }
                    }}
                    render={({ field: { ...field }, fieldState: { invalid, isTouched } }) => {
                        return <div>
                            <FloatingLabelFields<string> label='Title' value={field.value}>
                                <input className={invalid && isTouched ? "error" : ''}
                                    type="text" {...field}
                                    onBlur={() => {
                                        field.onBlur();
                                        field.onChange(removeExtraSpace(field.value));
                                    }}
                                />
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
                        validate: (value) => {
                            return !!value.trim()
                        }
                    }}
                    render={({ field: { ...field }, fieldState: { invalid, isTouched } }) => {
                        return <FloatingLabelFields<string> label='Description' value={field.value}>
                            <textarea className={invalid && isTouched ? "error" : ''} rows={5} {...field}
                                onBlur={() => {
                                    field.onBlur();
                                    field.onChange(removeExtraSpace(field.value));
                                }}
                            ></textarea>
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
                    render={({ field: { onChange, value }, fieldState: { invalid } }) => {
                        return <div>
                            <DragAndDropFiles invalid={invalid} index={index} isTouched={isClickOnSubmit} onChange={(e: IFile[]) => onChange(e)} files={value} />
                        </div>
                    }
                    }
                />
                <img className='upload-image' src="/images/upload-photo.png" alt="" />
            </div>

        </div>
    )
}