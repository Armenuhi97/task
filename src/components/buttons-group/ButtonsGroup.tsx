import PrimaryButton from '../primary-button/PrimaryButton';
import SecondaryButton from '../secondary-button/SecondaryButton';
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
            <SecondaryButton isDisabled={step === 0} title='Back' handleClick={() => handleBack()}/>
            {/* <button disabled={step === 0} onClick={() => handleBack()} className="back-btn btn" type="button">Back</button> */}
            <div className="right-buttons ml-20">
                {isShowAddBtn && <SecondaryButton title='Add' handleClick={() => handleAdd()}/>
                
                // <button onClick={() => handleAdd()} className="back-btn btn" type="button">Add</button>
                }
                <PrimaryButton className="ml-20" title='Next' handleClick={() => handleNext()} />
            </div>
        </div>
    )
}