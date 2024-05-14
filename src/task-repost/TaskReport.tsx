import Stepper from "../stepper/Stepper";
import { useState } from "react";
import { Steps } from "./utils";
import './TaskReport.scss';
import { SelectDay } from "../select-day/SelectDay";
import { useForm } from "react-hook-form";
import { TaskForm } from "./task-form.model";

export default function TaskReport() {
    const [step, setStep] = useState(0);
    const { control, handleSubmit, getValues, setValue, formState: { errors }, register } = useForm<TaskForm>({
        defaultValues: {
            day: '2024-05-03T20:00:00.0',
        }
    });
    return (
        <>
            <Stepper currentStep={step} steps={Steps} ></Stepper>
            <h1 className="title">Task Report</h1>
            <p className="sub-title">Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. Nunc dui elit nibh urna ullamcorper tincidunt.</p>
            <form>
                {
                    step === 0 && <SelectDay getValues={getValues} setValue={setValue} control={control} />
                }
            </form>
        </>

    )
}
