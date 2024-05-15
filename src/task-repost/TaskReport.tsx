import Stepper from "../components/stepper/Stepper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Steps } from "./utils";
import './TaskReport.scss';
import { FullCalendar } from "../select-day/FullCalendar";
import { useFieldArray, useForm } from "react-hook-form";
import { TaskForm } from "./task-form.model";
import ButtonsGroup from "../components/buttons-group/ButtonsGroup";
import TaskControl from "../task-control/TaskControl";
import TaskFormContent from "../components/task-form-content/TaskFormContent";

export default function TaskReport() {
    const [step, setStep] = useState(0);
    // const [savedTask, setSavedTask] = useState<TaskForm>({
    //     day: null
    // });
    const taskDefaultValue = () => {
        const date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();

        return {
            date: `${y}-${m <= 9 ? '0' + m : m}-${(d <= 9 ? '0' + d : d)}`,
            title: '',
            description: '',
            status: '',
            files: []
        }
    }
    const { control, handleSubmit, getValues, setValue, watch, formState: { errors }, register } = useForm<TaskForm>({
        defaultValues: {
            day: null,
            tasks: [taskDefaultValue()]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tasks'
    });


    useEffect(() => {
        try {
            const task = localStorage.getItem('task');
            if (task) {
                const storageTask = JSON.parse(task);
                setValue('day', storageTask.day ? new Date(storageTask.day) : null);
                if (storageTask.tasks) {
                    setValue('tasks', storageTask.tasks);
                }

            }
            const savedStep = localStorage.getItem('step');
            if (savedStep) {
                setStep(+savedStep);
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
        localStorage.setItem('task', JSON.stringify(formValue));
    }, []);

    const saveStep = useCallback((currentStep: number) => {
        localStorage.setItem('step', JSON.stringify(currentStep));
    }, []);

    const onSubmit = (data: TaskForm) => {
        console.log(data);
    };

    const handleBack = useCallback(() => {
        if (step === 0) {
            return;
        }
        setStep(step - 1);
        saveStep(step - 1);
    }, [step]);

    const handleNext = useCallback(() => {
        if (step === Steps.length - 1) {
            const formValue = getValues();
            onSubmit(formValue);
            return;
        }
        setStep(step + 1);
        saveStep(step + 1);
    }, [step]);

    const handleAdd = () => {
        append(taskDefaultValue());
    }
    const removeControl = (index: number) => {
        remove(index);
    }
    const stepComponent = useCallback(() => {
        switch (step) {

            case 0: return <FullCalendar control={control} />;
            case 1: return (
                fields.map((field, index) => {
                    return (
                        <TaskFormContent removeControl={() => removeControl(index)} key={field.id}>
                            <TaskControl {...{ control, index, field }} />
                        </TaskFormContent>
                    )
                })
            );
        }
    }, [step]);

    return (
        <div>
            <Stepper currentStep={step} steps={Steps}></Stepper>
            <h1 className="title">Task Report</h1>
            <p className="sub-title">Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. Nunc dui elit nibh urna ullamcorper tincidunt.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="step-component">{stepComponent()}</div>
                <div className="buttons">
                    <ButtonsGroup isShowAddBtn={step === 1} step={step} handleAdd={handleAdd} handleBack={handleBack} handleNext={handleNext}></ButtonsGroup>
                </div>
            </form>
        </div>

    )
}
