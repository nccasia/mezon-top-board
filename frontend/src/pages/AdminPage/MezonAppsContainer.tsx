import { useRef } from "react";
import MezonApps from './MezonApps';
import EditModal from "./EditAppModal";
import { useMezonAppControllerSearchMezonAppQuery } from "@app/services/api/mezonApp/mezonApp";
import CreateAppModal from "./CreateAppModal";

const MezonAppsContainer = () => {
    const editModalRef = useRef<{ openModal: (app: any) => void }>(null);
    const { refetch } = useMezonAppControllerSearchMezonAppQuery({
      pageSize: 10,
      pageNumber: 1,
      sortField: "createdAt",
      sortOrder: "DESC",
    });

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <CreateAppModal onCreateSuccess={refetch} />
        </div>
        <MezonApps onEdit={(app: any) => editModalRef.current?.openModal(app)} />
        <EditModal ref={editModalRef} onUpdateSuccess={refetch}/>
      </>
    );
  };
  
export default MezonAppsContainer