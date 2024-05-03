import { differenceInMinutes } from 'date-fns';
import { prisma } from '../connection';
import { rmSync } from 'fs';

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

export const createProfileAndImagesProfile = async (
  data: any,
  images: any,
  uid: any
) => {
  return await prisma.$transaction(async (tx) => {
    const createEmployeeProfile = await tx.employeeProfile.create({
      data: {
        birthDate: new Date(data.birthDate),
        address: data.address,
        employeeId: uid,
      },
    });

    const imageToCreate: any = [];
    images.forEach((item: any) => {
      imageToCreate.push({
        url: item.path,
        employeeProfileId: createEmployeeProfile.id,
      });
    });
    await tx.employeeImagesProfile.createMany({
      data: [...imageToCreate],
    });
  });
};

export const updateProfileAndImagesProfile = async (
  data: any,
  images: any,
  uid: any
) => {
  return await prisma.$transaction(async (tx) => {
    const findEmployeeProfile = await tx.employeeProfile.findUnique({
      where: {
        employeeId: uid,
      },
    });
    if (!findEmployeeProfile) throw new Error('Employee Profile Not Found');

    await tx.employeeProfile.update({
      where: {
        employeeId: uid,
      },
      data: {
        birthDate: new Date(data.birthDate),
        address: data.address,
      },
    });
    const findEmployeeImagesProfile = await tx.employeeImagesProfile.findMany({
      where: {
        employeeProfileId: findEmployeeProfile.id,
      },
    });

    await tx.employeeImagesProfile.deleteMany({
      where: {
        employeeProfileId: findEmployeeProfile.id,
      },
    });
    const imageToUpdate: any = [];
    images.forEach((item: any) => {
      imageToUpdate.push({
        url: item.path,
        employeeProfileId: findEmployeeProfile.id,
      });
    });
    await tx.employeeImagesProfile.createMany({
      data: [...imageToUpdate],
    });
  });

  // if (findEmployeeProfileImage) {
  //   images.forEach((item: any) => {
  //     updateToImage.push({
  //       url: item.path
  //     })
  //     rmSync(item.path)
  //   });
};
