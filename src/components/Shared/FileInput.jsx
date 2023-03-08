import React, { useState, useRef } from 'react';
import {FiUploadCloud} from "react-icons/fi";
import {BiLock} from "react-icons/bi";
import {useRecoilState} from "recoil";
import {filesPreviewState, filesState, uploadFilesProgressState} from "../../states/upload";
import StorageService from "../../services/StorageService";
import { useParams } from 'react-router-dom';


export default ({ className, name, label, accept, errors = [], onChange,...props }) => {
  const fileInput = useRef();
  const [files, setFiles] = useRecoilState(filesState);
  const [filesPreview, setFilesPreview] = useRecoilState(filesPreviewState);
  const [uploadFilesProgress, setUploadFilesProgress] = useRecoilState(uploadFilesProgressState);
  let {id} = useParams();


  const previewMainImages = (files) => {
    const readAndPreview = (file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let imgObj = {};
        imgObj.src = reader.result
        imgObj.alt = file.name
        setFilesPreview([...filesPreview,...[imgObj]])
      }
      reader.readAsDataURL(file);
    }

    if (files) {
      files.forEach((f, i) => {
        setUploadFilesProgress([...uploadFilesProgress,0])
        StorageService.uploadFile("projects/"+id,f,f.name,i).then(()=>{

        });
        readAndPreview(f)
      });
    }
  }
  const uploadFiles = ()=>{

  }

  function handleFileChange(e) {
    setFiles(Array.prototype.slice.call(e.target.files))
    previewMainImages(Array.prototype.slice.call(e.target.files))
    onChange(filesPreview);
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-lg text-primary-dark dark:text-primary-light mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      <div
          className={`form-input ${errors.length ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`+'' +
              'appearance-none rounded-none relative block' +
              'relative h-40 rounded-lg border-dashed border-2 border-gray-200 w-full px-3 py-2 border border-gray-300\n' +
              'flex justify-center items-center hover:cursor-pointer placeholder-gray-500 text-gray-900 rounded-b-md'}>
        <div className="absolute">
          <div className="flex flex-col items-center ">

                <>
                  <FiUploadCloud className="text-4xl text-gray-200"/>
                  <span className="block text-gray-400 font-normal">Attach you files here</span>
                  <span className="block text-gray-400 font-normal">or</span>
                  <span className="block text-blue-400 font-normal">Browse files</span>
                </>

          </div>
        </div>
        <input
            id={name}
            ref={fileInput}
            accept={accept}
            type="file"
            {...props}
            className='h-full w-full cursor-pointer opacity-0'
            onChange={handleFileChange} />
      </div>
      <div className="flex justify-between items-center text-gray-400">
        <span>Accepted file type: [.jpg, .jpeg, .png ]</span>
        <span className="flex items-center "><BiLock className="fa fa-lock mr-1"/> secure</span>
      </div>
      {errors.length > 0 && <div className="form-error">{errors}</div>}
    </div>
  );
};
