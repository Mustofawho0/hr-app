import { differenceInMinutes } from 'date-fns';
import { prisma } from '../connection';

export const createAttendanceClockin = async ({ uid }: { uid: any }) => {
  await prisma.attendance.create({
    data: {
      date: new Date(),
      clockin: new Date(),
      deduction: 0,
      employeeId: uid,
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
  const findAttendanceAndEmployee = await prisma.attendance.findUnique({
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

  const attendanceUpdate = await prisma.attendance.update({
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

    await prisma.attendance.update({
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
  await prisma.leaveRequest.create({
    data: {
      stardDate: new Date(startDate),
      endDate: new Date(endDate),
      employeeId: employeeid,
    },
  });
};

export const findPosition = async () => {
  return await prisma.position.findMany();
};
export const findShift = async () => {
  return await prisma.shift.findMany();
};

export const createProfileAndImagesProfile = async (data: any, images: any) => {
  const creaetEmployeeProfile = await prisma.employeeProfile.create({
    data: {
      birthDate: new Date(data.birthDate),
      address: data.address,
      employeeId: 'clvlxbwke0001tf9iotx5mhx9',
    },
  });

  const imageToCreate: any = [];
  images.forEach((item: any) => {
    imageToCreate.push({
      url: item.path,
      employeeProfileId: creaetEmployeeProfile.id,
    });
  });
  await prisma.employeeImagesProfile.createMany({
    data: [...imageToCreate],
  });
};
