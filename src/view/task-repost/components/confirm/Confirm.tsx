import Button from '../../../../components/button/Button';
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
                <Button buttonType='secondary' title='No' handleClick={() =>  handleReject()} />
                <Button buttonType='primary' className="ml-20" title='Yes' handleClick={() =>handleConfirm()} />
            </div>
        </div>

    )
}