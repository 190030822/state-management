import { useState } from "react"

export const ResponseType = {
    ERROR : "error",
    SUCCESS : "success"
}

const initialResponseState = {[ResponseType.ERROR] : "", [ResponseType.SUCCESS] : ""}


const useResponseState = () => {
    const [responseState, setResponseState] = useState(initialResponseState);

    const settingResponseState = (message, messageType) => {
        if (messageType === ResponseType.SUCCESS) {
            setResponseState({
                ...responseState,
                [ResponseType.SUCCESS] : message,
            })
        } else {
            setResponseState({
                ...responseState,
                [ResponseType.ERROR] : message,
            })
        }
        setTimeout(() => {
            setResponseState(initialResponseState);
        }, 5000)
    }
    return [responseState, settingResponseState];
}

export default useResponseState;
