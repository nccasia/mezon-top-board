import { useAdminControllerGetAppsQuery } from "@app/services/api/admin/listAllApp"

const Dashboard = () => {
  const { data, error, isLoading } = useAdminControllerGetAppsQuery({
    pageSize: 10,
    pageNumber: 1,
    sortField: 'createdAt',
    sortOrder: 'DESC'
  })
  console.log("Data:", data);
  console.log("Error:", error);
  if (isLoading) return <p>Loading...</p>
  if (error) return (
      <p>
        Error loading data: Check console for more details
      </p>
    );

  return (
    <div>
      {data?.data.map((app: any) => (
        <div key={app.id}>{app.name}</div>
      ))}
    </div>
  )
}

export default Dashboard