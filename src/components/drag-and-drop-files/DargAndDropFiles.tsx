import React, { useEffect, useState } from "react";
import "./DargAndDropFiles.scss";
import { ChangeHandler } from "react-hook-form";
import { IFile } from "../../task-repost/task-form.model";

type Props = {
    files: IFile[] | undefined;
    onChange: (e: IFile[]) => void
}
export default function DragNdrop({ files, onChange }: Props) {
    const handleFileChange = async (event: any) => {
        const selectedFiles = (event.target as HTMLInputElement).files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFiles = Array.from(selectedFiles);
            const items = await Promise.all(newFiles.map((el: File) => {
                return formatFilesArray(el);
            }));
            onChange([...(files as IFile[]), ...items]);
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
    const handleDrop = async (event: any) => {
        event.preventDefault();
        const droppedFiles = event?.dataTransfer?.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const newFiles = Array.from(droppedFiles);
            const items = await Promise.all(newFiles.map((el: any) => {
                return formatFilesArray(el);
            }));
            onChange([...(files as IFile[]), ...items]);
        }
    };
    const formatFilesArray = (el: File) => {
        if (el.type.indexOf('image') > -1) {
            return convertToBase64(el as File)
        } else {
            return { image: '/images/pdf.png', name: el.name }
        }
    }
    const handleRemoveFile = (index: number) => {
        onChange((files as IFile[]).filter((_: IFile, i: number) => i !== index));
    };
    return (
        <section className='select-file'>
            {files && files.length > 0 && (
                <div className="uploaded-file-text">
                    <p> Showing {files.length} out of {files.length} files</p>
                </div>
            )}
            <div
                className={`document-uploader ${files && files.length > 0 ? "upload-box active" : "upload-box"
                    }`}
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
            >
                <>
                    <div className={`${files && files.length ? 'd-none' : ''}`}>
                        <div> <img src="/icons/folder.svg" alt="" /></div>
                        <p className='upload-text'>Drag & drop a file to upload</p>
                    </div>
                    <input
                        type="file"
                        hidden
                        id="browse"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.xlsx"
                        multiple
                    />
                    {/* <label htmlFor="browse" className="browse-btn">
                        Browse files
                    </label> */}
                </>

                {files && files.length > 0 && (
                    <div className="file-list">
                        <div className="file-list__container">
                            {files.map((file: any, index: number) => (
                                <div className="file-item" key={index}>
                                    <div className="file-info">
                                        <img src={file.image} alt="" />
                                        <p className="file-name">{file.name}</p>
                                        <p>{file.type}</p>
                                    </div>
                                    <div className="file-actions">
                                        <span onClick={() => handleRemoveFile(index)}>x</span>
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

// export default DragNdrop;