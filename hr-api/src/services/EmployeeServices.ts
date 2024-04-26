import { differenceInMinutes } from 'date-fns';
import { prisma } from '../connection';

export const createAttendanceClockin = async ({
  employeeid,
}: {
  employeeid: any;
}) => {
  await prisma.attendances.create({
    data: {
      date: new Date(),
      clockin: new Date(),
      deduction: 0,
      employeeId: employeeid,
    },
  });
};

export const createAttendanceClockout = async ({
  attendanceId,
  employeeid,
}: {
  attendanceId: number;
  employeeid: any;
}) => {
  const findAttendanceAndEmployee = await prisma.attendances.findUnique({
    where: {
      id: attendanceId,
      employeeId: employeeid,
    },
    include: {
      employee: {
        include: {
          shift: true,
          position: true,
        },
      },
    },
  });

  if (!findAttendanceAndEmployee) return null;

  const attendanceUpdate = await prisma.attendances.update({
    data: {
      clockout: new Date(),
    },
    where: {
      id: attendanceId,
      employeeId: employeeid,
    },
  });

  const differentInMinutesClockin = differenceInMinutes(
    findAttendanceAndEmployee.clockin,
    findAttendanceAndEmployee.employee.shift.start
  );
  if (attendanceUpdate.clockout) {
    const differentInMinutesClockout = differenceInMinutes(
      attendanceUpdate.clockout,
      findAttendanceAndEmployee.employee.shift.end
    );
    const totalMinutes = Math.floor(
      (differentInMinutesClockin + Math.abs(differentInMinutesClockout)) / 30
    );
    const deduction =
      totalMinutes *
      (findAttendanceAndEmployee.employee.position.salary * 0.001);

    await prisma.attendances.update({
      data: {
        deduction,
      },
      where: {
        employeeId: employeeid,
        id: attendanceId,
      },
    });
  }
};

export const createLeaveEmployeeRequest = async ({
  startDate,
  endDate,
  employeeid,
}: {
  startDate: any;
  endDate: any;
  employeeid: any;
}) => {
  await prisma.leaveRequests.create({
    data: {
      stardDate: new Date(startDate),
      endDate: new Date(endDate),
      employeeId: employeeid,
    },
  });
};

export const findPosition = async () => {
  return await prisma.positions.findMany();
};
export const findShift = async () => {
  return await prisma.shifts.findMany();
};
