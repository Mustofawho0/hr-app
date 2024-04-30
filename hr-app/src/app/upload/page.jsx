export default function UploadPage() {
  return (
    <div className='pt-10'>
      <fieldset className='space-y-1 text-gray-800 w-full'>
        <label
          htmlFor='files'
          className='block text-lg font-medium text-center pb-2'
        >
          Attachments
        </label>
        <div className='flex justify-center'>
          <input
            type='file'
            name='files'
            id='files'
            className='px-8 w-full py-12 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100'
          />
        </div>
      </fieldset>
      <div className='flex justify-center pt-6'>
        <button
          type='button'
          className='items-center px-8 py-3 font-semibold rounded bg-indigo-400 text-gray-100 w-full'
        >
          Submit
        </button>
      </div>
    </div>
  );
}
