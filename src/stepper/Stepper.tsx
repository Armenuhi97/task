import './Stepper.scss';
export default function Stepper({ currentStep, steps }: { currentStep: number, steps: string[] }) {
    return (
        <div className='stepper'>
            {
                steps.map((step:string, index:number) => {                   
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