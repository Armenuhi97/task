import "./DargAndDropFiles.scss";
import { IFile } from "../../task-repost/task-form.model";

type Props = {
    files: IFile[] | undefined;
    onChange: (e: IFile[]) => void;
    invalid: boolean;
    isTouched: boolean;
}
export default function DragAndDropFiles({ files, onChange, invalid, isTouched }: Props) {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = (event.target as HTMLInputElement).files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFiles = Array.from(selectedFiles);
            const items = await Promise.all(newFiles.map((el: File) => {
                return formatFilesArray(el);
            }).filter((el) => el));

            onChange([...(files as IFile[]), ...(items as IFile[])]);
        }
    };

    const convertToBase64 = (file: File): Promise<IFile> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (!file) {
                console.log("no image");
            } else {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve({ image: fileReader.result as string, name: file.name });
                };
            }
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = event?.dataTransfer?.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const newFiles = Array.from(droppedFiles);
            const items = await Promise.all(newFiles.map((el: File) => {
                return formatFilesArray(el);
            }).filter((el) => el));
            onChange([...(files as IFile[]), ...(items as IFile[])]);
        }
    };
    const formatFilesArray = (file: File): IFile | Promise<IFile> | void => {
        if (file.type.indexOf('image') > -1) {
            return convertToBase64(file as File)
        } else {
            const isAllowFormat = checkFileRegExp('pdf', file);
            if (!isAllowFormat) {
                return;
            }
            return { image: '/images/pdf.png', name: file.name };
        }
    }
    const handleRemoveFile = (index: number) => {
        onChange((files as IFile[]).filter((_: IFile, i: number) => i !== index));
    };
    function checkFileRegExp(fileType: string, file: File) {
        return new RegExp(`.+\.${fileType}$`).test(file.type);
    }

    return (
        <section className='select-file'>
            {files && files.length > 0 && (
                <div className="uploaded-file-text">
                    <p> Showing {files.length} out of {files.length} files</p>
                </div>
            )}
            <div
                className={`${invalid && isTouched ? 'error' : ''} document-uploader upload-box ${files && files.length > 0 && "active"}`}
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
            >
                <>
                    <div className={`${files && files.length ? 'd-none' : ''}`}>
                        <label htmlFor="browse" >
                            <div> <img src="/icons/folder.svg" alt="" /></div>
                            <p className='upload-text'>Drag & drop a file to upload</p>
                        </label>
                    </div>
                    <input
                        type="file"
                        hidden
                        id="browse"
                        onChange={handleFileChange}
                        accept=".pdf,image/*"
                        multiple
                    />
                </>

                {files && files.length > 0 && (
                    <div className="file-list">
                        <div className="file-list__container">
                            {files.map((file: IFile, index: number) => (
                                <div className="file-item" key={index}>
                                    <div className="file-info">
                                        <img src={file.image} alt="" />
                                        <p className="file-name">{file.name}</p>
                                    </div>
                                    <div className="file-actions">
                                        <img onClick={() => handleRemoveFile(index)} src="/icons/Minus.svg" alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};