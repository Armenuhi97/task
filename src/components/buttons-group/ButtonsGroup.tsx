import './ButtonsGroup.scss';

interface IButtonsProps {
    step: number;
    isShowAddBtn: boolean;
    handleBack: () => void;
    handleNext: () => void;
    handleAdd: () => void;
}
export default function ButtonsGroup({ step, handleBack, handleNext, handleAdd, isShowAddBtn }: IButtonsProps) {
    return (
        <div className="buttons-group">
            <button disabled={step === 0} onClick={() => handleBack()} className="back-btn btn" type="button">Back</button>
            <div className="right-buttons ml-20">
                {isShowAddBtn && <button onClick={() => handleAdd()} className="back-btn btn" type="button">Add</button>}
                <button onClick={() => handleNext()} className="ml-20 next-btn btn" type="button">Next</button>
            </div>
        </div>
    )
}