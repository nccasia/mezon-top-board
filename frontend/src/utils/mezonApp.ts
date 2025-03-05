import { AppStatus } from "@app/enums/AppStatus.enum";

export function mapStatusToColor(status: number) {
  switch (status) {
    case AppStatus.PENDING:
      return 'orange';
    case AppStatus.APPROVED:
      return 'green';
    case AppStatus.REJECTED:
      return 'red';
    case AppStatus.PUBLISHED:
      return 'blue';
    default:
      return 'gray';
  }
}

export function mapStatusToText(status: number) {
  switch (status) {
    case AppStatus.PENDING:
      return 'Pending';
    case AppStatus.APPROVED:
      return 'Approved';
    case AppStatus.REJECTED:
      return 'Rejected';
    case AppStatus.PUBLISHED:
      return 'Published';
    default:
      return 'Unknown';
  }
}