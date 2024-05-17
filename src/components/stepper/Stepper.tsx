import { memo, useCallback } from 'react';
import './Stepper.scss';

interface Props {
    currentStep: number;
    steps: string[];
}
export default memo(function Stepper({ currentStep, steps }: Props) {
    const checkIsFinish = useCallback((index: number): boolean => {
        return currentStep === steps.length - 1 && currentStep === index;
    }, [steps, currentStep]);
        
    return (
        <div className='stepper'>
            {
                steps.map((step: string, index: number) => {
                    return (
                        <div className={`step ${index < currentStep && 'current-step'} ${currentStep >= index && 'active-step'}`} key={index}>
                            <div className={`step-number ${checkIsFinish(index) && 'last-step'}`}>
                                {checkIsFinish(index) ? <img src="/icons/Check.svg" alt="" /> : <span> {index + 1}</span>}
                            </div>
                            <div className='text'>{step}</div>
                        </div>
                    )
                })
            }
        </div>
    )
})