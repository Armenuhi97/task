import './Stepper.scss';

interface IStepProps {
    currentStep: number;
    steps: string[];
}
export default function Stepper({ currentStep, steps }: IStepProps) {
    return (
        <div className='stepper'>
            {
                steps.map((step: string, index: number) => {
                    return (
                        <div className={`step ${currentStep >= index ? 'active-step' : ''}`} key={index}>
                            <div className="step-number">
                                {index + 1}
                            </div>
                            <div className='text'>{step}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}