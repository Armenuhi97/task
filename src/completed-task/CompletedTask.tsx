import { memo } from 'react';
import './CompletedTask.scss';
export default memo(function CompletedTask() {    
    return (
        <img className="completed-image" src="/images/completed.png" alt="" />
    )
})