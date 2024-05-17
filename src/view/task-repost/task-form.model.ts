export interface TaskForm {
    day: string | Date | null;
    tasks: ITask[] | null;
}
export type ITask = {
    date: string;
    title: string;
    description: string;
    status: boolean;
    files: IFile[];
}
export interface IFile {
    name: string;
    image: string;
}