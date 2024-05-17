import PrimaryButton from '../../../../components/primary-button/PrimaryButton';
import SecondaryButton from '../../../../components/secondary-button/SecondaryButton';
import './Confirm.scss';
type Props = {
    handleConfirm: () => void;
    handleReject: () => void;
}
export function Confirm({ handleConfirm, handleReject }: Props) {
    return (
        <div className='confirm'>
            <img src="images/question.png" alt="" />
            <h1 className='confirm-text'>Are you sure you want to
                create a new task?</h1>
            <div className="confirm-buttons">
                <SecondaryButton title='No' handleClick={() => handleConfirm()} />
                <PrimaryButton className="ml-20" title='Yes' handleClick={() => handleReject()} />
            </div>
        </div>

    )
}