import TaskFormContent from "../../../../components/task-form-content/TaskFormContent";
import { TaskForm } from "../../task-form.model";
import './PreviewTask.scss';

export default function PreviewTask({ formValue }: { formValue: TaskForm }) {
    return (
        <div>
            {formValue.tasks?.map((task, index) => {
                return (
                    <div key={index} className="preview-task">
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
                                    task?.files?.map((file, index) => {
                                        return <div key={index} className="task-file">
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