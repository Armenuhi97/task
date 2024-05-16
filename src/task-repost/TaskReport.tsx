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
import PreviewTask from "../preview-task/PreviewTask";
import CompletedTask from "../completed-task/CompletedTask";
import PrimaryButton from "../components/primary-button/PrimaryButton";
import { Confirm } from "../confirm/Confirm";
import SecondaryButton from "../components/secondary-button/SecondaryButton";

export default function TaskReport() {
    const [step, setStep] = useState<number>(0);
    // const [isFinish, setIsFinish] = useState<boolean>(false);

    const taskDefaultValue = useCallback(() => {
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
    }, [])
    const { control, reset, handleSubmit, getValues, setValue, watch, formState: { errors }, register } = useForm<TaskForm>({
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
        const subscription = watch((formValue: any) => {
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
        console.log(step);
        console.log(Steps.length);

        if (step === Steps.length) {
            // const formValue = getValues();
            // onSubmit(formValue);
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
                        <div key={field.id} className="form-control">
                            <TaskFormContent isShowRemoveButton={true} removeControl={() => removeControl(index)}>
                                <TaskControl {...{ control, index, field }} />
                            </TaskFormContent>
                        </div>
                    )
                })
            );
            case 2: return <PreviewTask formValue={getValues()} />
            case 3: return <CompletedTask />
            case 4: return <Confirm handleConfirm={handleConfirm} handleReject={handleConfirm} />

        }
    }, [step, fields]);

    const handleConfirm = () => {
        localStorage.removeItem('step');
        localStorage.removeItem('task');
        reset();
        setStep(0);
    }

    return (
        <div>
            <Stepper currentStep={step} steps={Steps}></Stepper>
            <h1 className="title">Task Report</h1>
            <p className="sub-title">Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. Nunc dui elit nibh urna ullamcorper tincidunt.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="step-component">{stepComponent()}</div>
                <div className="buttons">
                    {step === 3 && <PrimaryButton className="finish-btn" title='Finish' handleClick={() => handleNext()} />}
                    {step <= 2 && <ButtonsGroup isShowAddBtn={step === 1} step={step} handleAdd={handleAdd} handleBack={handleBack} handleNext={handleNext}></ButtonsGroup>}

                </div>
            </form>
        </div>

    )
}
