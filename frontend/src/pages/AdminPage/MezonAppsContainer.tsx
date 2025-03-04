import { useRef, useState } from "react";
import MezonApps from './MezonApps';
import EditModal from "./EditAppModal";
import CreateAppModal from "./CreateAppModal";

const MezonAppsContainer = () => {
    const editModalRef = useRef<{ openModal: (app: any) => void }>(null);
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <CreateAppModal />
        </div>
        <MezonApps onEdit={(app: any) => editModalRef.current?.openModal(app)} />
        <EditModal ref={editModalRef} />
      </>
    );
  };
  
export default MezonAppsContainer