import { APPOINTMENT_STATUS, COMPLAINT_STATUS } from '@/utils/constants';

export function getStatusTone(status) {
  const tones = {
    [APPOINTMENT_STATUS.PENDING]: 'warning',
    [APPOINTMENT_STATUS.ACCEPTED]: 'success',
    [APPOINTMENT_STATUS.REJECTED]: 'danger',
    [APPOINTMENT_STATUS.COMPLETED]: 'success',
    [APPOINTMENT_STATUS.CANCELLED]: 'muted',
    [COMPLAINT_STATUS.OPEN]: 'warning',
    [COMPLAINT_STATUS.IN_REVIEW]: 'info',
    [COMPLAINT_STATUS.RESOLVED]: 'success',
    [COMPLAINT_STATUS.REJECTED]: 'danger',
  };

  return tones[status] || 'muted';
}
