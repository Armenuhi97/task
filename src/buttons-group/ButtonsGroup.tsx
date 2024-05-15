interface IButtonsProps {
    step: number;
    handleBack: () => void;
    handleNext: () => void;
}
export default function ButtonsGroup({ step, handleBack, handleNext }: IButtonsProps) {
    return (
        <div className="buttons-group">
            <button disabled={step === 0} onClick={() => handleBack()} className="back-btn btn" type="button">Back</button>
            <div className="right-buttons ml-20">
                {step === 1 && <button className="back-btn btn" type="button">Add</button>}
                <button onClick={() => handleNext()} className="ml-20 next-btn btn" type="button">Next</button>
            </div>
        </div>
    )
}