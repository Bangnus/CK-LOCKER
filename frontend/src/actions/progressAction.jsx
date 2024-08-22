
export const progressActionType = {
    UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
};

export const uploadProgress = (progress) => ({
   type: progressActionType.UPLOAD_PROGRESS,
   payload: progress,
});