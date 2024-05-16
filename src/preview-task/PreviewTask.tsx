import TaskFormContent from "../components/task-form-content/TaskFormContent";
import { TaskForm } from "../task-repost/task-form.model";
import './PreviewTask.scss';

export default function PreviewTask({ formValue }: { formValue: TaskForm }) {
    console.log(formValue.tasks);
    const transformDate = (date: Date): string => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return `${y}-${m <= 9 ? '0' + m : m}-${(d <= 9 ? '0' + d : d)}`;
    }
    return (
        <div>
            {formValue.tasks?.map((task, index) => {
                return (
                    <div className="preview-task">
                        <TaskFormContent key={index} isShowRemoveButton={false} >
                            <div className="preview-task-content">
                                <h1 className="preview-task-title">{task?.title}</h1>
                                <div className="section">
                                    <span>Date :</span>
                                    <p>{task!.date}</p>
                                </div>
                                <div className="section">
                                    <span>Status :</span>
                                    <p>{task?.status ? 'Marked as a question' : 'None'}</p>
                                </div>
                                <div className="section">
                                    <span>Description :</span>
                                    <p>{task?.description}</p>
                                </div>
                                {
                                    task?.files?.map((file) => {
                                        return <div className="task-file">
                                            <img src={file.image} alt="" />
                                            <p>{file.name}</p>
                                        </div>
                                    })

                                }
                            </div>
                        </TaskFormContent>
                    </div>
                )
            })}
        </div>
    )



}