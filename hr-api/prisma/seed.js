const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient()

const dataPosition = [
    {
        name: 'Manager',
        salary: 25000000
    },
    {
        name: 'Product Manager',
        salary: 17500000
    },
    {
        name: 'Programmer',
        salary: 15000000
    },
    {
        name: 'HR',
        salary: 15000000
    },
]

const dataShift = [
    {
        start: '2024-04-22T09:00:00.000Z',
        end: '2024-04-22T18:00:00.000Z',
        
    },
    {
        start: '2024-04-22T13:00:00.000Z',
        end: '2024-04-22T22:00:00.000Z',
        
    }
]

const dataEmployee =[
    {
        email: 'iqbael@gmail.com',
        fullname: 'iqbael',
        password: '123456',
        positionId: 1,
        shiftId: 1,
        leaveBalance: 12,
        address: 'bedtoeng'
    },
    {
        email: 'ditoe@gmail.com',
        fullname: 'ditoe',
        password: '123456',
        positionId: 3,
        shiftId: 2,
        leaveBalance: 12,
        address: 'cisauek'
    },
    {
        email: 'bogie@gmail.com',
        fullname: 'bogie',
        password: '123456',
        positionId: 4,
        shiftId: 1,
        leaveBalance: 12,
        address: 'bintaroe'
    }

]

async function main(){
    for(let item of dataPosition){
        await prisma.positions.create({
            data: item
        })
    }
    for(let item of dataShift){
        await prisma.shifts.create({
            data: item
        })
    }
    for(let item of dataEmployee){
        await prisma.employees.create({
            data:item
        })
    }
}

main().catch(error =>{
    console.log(error);
    process.exit(1)
}).finally(async()=>{
    await prisma.$disconnect();
})