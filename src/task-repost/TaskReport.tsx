import Stepper from "../components/stepper/Stepper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Steps } from "./utils";
import './TaskReport.scss';
import { FullCalendar } from "../select-day/FullCalendar";
import { useFieldArray, useForm } from "react-hook-form";
import { ITask, TaskForm } from "./task-form.model";
import TaskControl from "../task-control/TaskControl";
import TaskFormContent from "../components/task-form-content/TaskFormContent";
import PreviewTask from "../preview-task/PreviewTask";
import CompletedTask from "../completed-task/CompletedTask";
import PrimaryButton from "../components/primary-button/PrimaryButton";
import { Confirm } from "../confirm/Confirm";
import SecondaryButton from "../components/secondary-button/SecondaryButton";

export default function TaskReport() {
    const [step, setStep] = useState<number>(0);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [isClickOnSubmit, setIsClickOnSubmit] = useState<boolean>(false);


    const taskDefaultValue = useCallback((): ITask => {
        const date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();

        return {
            date: `${y}-${m <= 9 ? '0' + m : m}-${(d <= 9 ? '0' + d : d)}`,
            title: '',
            description: '',
            status: false,
            files: []
        }
    }, [])
    const { control, reset, handleSubmit, getValues, setValue, watch, formState: { errors, isValid, }, register } = useForm<TaskForm>({
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
        const subscription = watch((formValue:any) => {
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
        console.log(data, 'submit');
    };

    const handleBack = useCallback(() => {
        if (step === 0) {
            return;
        }
        setStep(step - 1);
        saveStep(step - 1);
    }, [step]);

    const handleNext = useCallback(() => {        
        if (!isValid && step === 1) {
            setIsClickOnSubmit(true);
            return;
        }

        if (step === Steps.length - 1) {
            return;
        }
        setStep(step + 1);
        saveStep(step + 1);
    }, [step, isValid]);

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
                                <TaskControl isClickOnSubmit={isClickOnSubmit} {...{ control, index, field, errors }} />
                            </TaskFormContent>
                        </div>
                    )
                })
            );
            case 2: return <PreviewTask formValue={getValues()} />
            case 3: return <CompletedTask />
        }
    }, [step, fields, isClickOnSubmit]);

    const handleConfirm = () => {
        localStorage.removeItem('step');
        localStorage.removeItem('task');
        setIsFinish(false);
        reset();
        setStep(0);
    }

    return (
        <div>
            <Stepper currentStep={step} steps={Steps}></Stepper>
            <h1 className="title">Task Report</h1>
            <p className="sub-title">Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. Nunc dui elit nibh urna ullamcorper tincidunt.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="step-component">{isFinish ? <Confirm handleConfirm={handleConfirm} handleReject={handleConfirm} /> : stepComponent()}</div>
                <div className="buttons">
                    {step <= 2 &&
                        <div className="buttons-group">
                            <SecondaryButton isDisabled={step === 0} title='Back' handleClick={() => handleBack()} />
                            <div className="right-buttons ml-20">
                                {step === 1 && <SecondaryButton title='Add' handleClick={() => handleAdd()} />}
                                <PrimaryButton type={step === 1 ? 'submit' : 'button'} className="ml-20" title='Next'
                                    handleClick={() => handleNext()}
                                />
                            </div>
                        </div>
                    }
                    {step === 3 && <PrimaryButton className="finish-btn" title='Finish' handleClick={() => setIsFinish(true)} />}
                </div>
            </form>
        </div>

    )
}
