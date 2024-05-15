import Stepper from "../stepper/Stepper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Steps } from "./utils";
import './TaskReport.scss';
import { FullCalendar } from "../select-day/FullCalendar";
import { useForm } from "react-hook-form";
import { TaskForm } from "./task-form.model";
import ButtonsGroup from "../buttons-group/ButtonsGroup";

export default function TaskReport() {
    const [step, setStep] = useState(0);
    const [savedTask, setSavedTask] = useState<TaskForm>({
        day: null
    });
    const { control, handleSubmit, getValues, setValue, watch, formState: { errors }, register } = useForm<TaskForm>({
        defaultValues: useMemo(() => {
            const data = {
                ...savedTask,
                day: savedTask.day ? new Date(savedTask.day!) : null
            };
            return data;
        }, [savedTask])
        //  {
        //     day: '2024-05-03T20:00:00.0',
        // }
    });
    useEffect(() => {
        try {
            const storageTask = JSON.parse(localStorage.getItem('task')!);
            if (storageTask) {
                setSavedTask(storageTask.form);
                setStep(storageTask.step);
                // const data = {
                //     ...savedTask,
                //     day: 
                // };    
                console.log(storageTask.form);
                            
                setValue('day',savedTask.day ? new Date(storageTask.form.day!) : null)
                // setValue('day', new Date('2024-05-03T20:00:00.0'));

            }
        }
        catch { }
    }, []);

    useEffect(() => {
        const subscription = watch((formValue) => {
            saveTask(formValue);
        })
        return () => subscription.unsubscribe();
    }, [watch, step]);

    const saveTask = useCallback((formValue: TaskForm) => {
        localStorage.setItem('task', JSON.stringify({
            step,
            form: formValue
        }))
    }, [step]);

    const onSubmit = (data: TaskForm) => {
        console.log(data);
    };

    const handleBack = useCallback(() => {
        if (step === 0) {
            return;
        }
        setStep(step - 1);
        // saveTask
    }, [step]);

    const handleNext = useCallback(() => {
        if (step === Steps.length - 1) {
            const formValue = getValues();
            onSubmit(formValue);
            return;
        }
        setStep(step + 1);
        // saveTask
    }, [step]);

    return (
        <div>
            <Stepper currentStep={step} steps={Steps}></Stepper>
            <h1 className="title">Task Report</h1>
            <p className="sub-title">Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. Nunc dui elit nibh urna ullamcorper tincidunt.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && <FullCalendar control={control} />}
                <ButtonsGroup step={step} handleBack={handleBack} handleNext={handleNext}></ButtonsGroup>
            </form>
        </div>

    )
}
