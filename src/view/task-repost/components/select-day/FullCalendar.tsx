import React from 'react'
import 'rsuite/dist/rsuite.min.css';
import { Calendar } from 'rsuite';
import { Control, Controller } from "react-hook-form";
import { TaskForm } from "../../task-form.model";
import './FullCalendar.scss';
type Props = {
    control: Control<TaskForm>
}
export function FullCalendar({ control }: Props) {
    return (
        <div>
            <Controller
                control={control}
                name='day'
                rules={{ required: true }}
                render={({ field }) => {
                    return (
                        <Calendar value={field.value ? new Date(field.value) : undefined}
                            onChange={(e) => field.onChange(e)} />
                    )
                }}
            />
        </div>
    )
}

