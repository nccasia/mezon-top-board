import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface AvatarProps {
    imgUrl: string;
    isAllowUpdate?: boolean;
    isUpdatingAvatar?: boolean;
}

const MTBAvatar: React.FC<AvatarProps> = ({ imgUrl, isAllowUpdate = false, isUpdatingAvatar = false }) => {
    return (
        <div className={`relative w-full group ${isAllowUpdate ? "cursor-pointer" : "cursor-default"}`}>
            <img
                src={imgUrl}
                alt="avatar"
                className={`rounded-full w-full aspect-square object-cover ${isUpdatingAvatar ? "opacity-50" : ""}`}
            />
            {isAllowUpdate && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-full">
                    {isUpdatingAvatar ? (
                        <Spin indicator={<LoadingOutlined className="text-white text-2xl" />} />
                    ) : (
                        <div className="absolute inset-0 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditOutlined className="text-white text-lg" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MTBAvatar;
