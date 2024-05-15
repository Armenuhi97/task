export type TaskForm = {
    day?: string | Date | null | undefined;
    tasks?: (ITask | undefined)[] | null | undefined;
}

type ITask = {
    date?: string | number | readonly (string | undefined)[] | undefined; title?: string | undefined;
    description?: string | undefined; status?: string | undefined; files?: (string | undefined)[] | undefined;
    // date?: string | number | readonly string[] | undefined;
    // title?: string | undefined;
    // description?: string | undefined;
    // status?:  undefined  | string | number | readonly string[];
    // files?: (string | undefined)[] | undefined;

} 