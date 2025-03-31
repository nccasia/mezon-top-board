import { useState } from "react"
import { Spin } from "antd"
import { LoadingOutlined, EditOutlined } from "@ant-design/icons"

export const useRenderAvatar = (imgUrl: string, isAllowUpdate = false): ({ renderedAvatar: React.JSX.Element, setIsUpdating: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [isUpdating, setIsUpdating] = useState(false)

    const renderOverlay = () => {
        if (!isAllowUpdate) return null

        return isUpdating ? (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-full">
                <Spin indicator={<LoadingOutlined className="text-white text-2xl" />} />
            </div>
        ) : (
            <div className="absolute inset-0 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <EditOutlined className="text-white text-lg" />
            </div>
        )
    }

    const renderedAvatar = (
        <div className={`relative w-full group ${isAllowUpdate ? "cursor-pointer" : "cursor-default"}`}>
            <img
                src={imgUrl}
                alt="avatar"
                className={`rounded-full w-full aspect-square object-cover ${isUpdating ? "opacity-50" : ""}`}
            />
            {renderOverlay()}
        </div>
    )

    return { renderedAvatar, setIsUpdating }
}
