'use client';

import { Formik, Form, Field } from 'formik';
import { useAuthRegister } from '~/hooks/auth/useAuthRegister';
import { useGetPositionAndShift } from '~/hooks/auth/useGetPositionAndShift';

export default function LoginPage() {
  const { mutationAuth } = useAuthRegister();
  const { dataPosition, dataShift } = useGetPositionAndShift();
  if (dataPosition === undefined || dataShift === undefined)
    return <div>Loading...</div>;

  return (
    <>
      <div className='flex flex-col items-center px-5 py-10 gap-3'>
        <Formik
          initialValues={{
            email: '',
            fullname: '',
            password: '',
            positionId: '',
            shiftId: '',
            address: '',
          }}
          onSubmit={(values) => {
            mutationAuth({
              email: values.email,
              fullname: values.fullname,
              password: values.password,
              positionId: parseInt(values.positionId),
              shiftId: parseInt(values.shiftId),
              address: values.address,
            });
          }}
        >
          <Form>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Email Account</span>
                </div>
                <Field
                  type='text'
                  name='email'
                  placeholder='Type Email'
                  className='input input-bordered w-full'
                />
              </label>
            </div>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Full Name</span>
                </div>
                <Field
                  type='text'
                  name='fullname'
                  placeholder='Type Password'
                  className='input input-bordered w-full'
                />
              </label>
            </div>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Password Account</span>
                </div>
                <Field
                  type='password'
                  name='password'
                  placeholder='Type Password'
                  className='input input-bordered w-full'
                />
              </label>
            </div>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Employee Position</span>
                </div>
                <Field
                  component='select'
                  id='positionId'
                  name='positionId'
                  className='select select-bordered w-full'
                >
                  <option>Choose Role</option>
                  {dataPosition?.map((position, index) => {
                    return (
                      <option value={position.id} key={index}>
                        {position.name}
                      </option>
                    );
                  })}
                </Field>
              </label>
            </div>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Employee Shift</span>
                </div>
                <Field
                  component='select'
                  id='shiftId'
                  name='shiftId'
                  className='select select-bordered w-full'
                >
                  <option>Choose Shift</option>
                  {dataShift?.map((shift, index) => {
                    return (
                      <option key={index} value={shift.id}>
                        {shift.start}-{shift.end}
                      </option>
                    );
                  })}
                </Field>
              </label>
            </div>
            <div className='w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Address</span>
                </div>
                <Field
                  type='text'
                  name='address'
                  placeholder='Type Address'
                  className='input input-bordered w-full'
                />
              </label>
            </div>
            <button
              type='submit'
              className='btn bg-indigo-500 text-white w-full'
            >
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
