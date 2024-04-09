export default function FormField({
  type = "text",
  label = "Label",
  value,
  onChange,
  required,
}) {
  return (
    <div className='flex gap-3'>
      <label className='text-right w-36'>{label}:</label>

      <input
        name={label}
        type={type}
        value={value}
        onChange={onChange}
        className='w-full px-2 border rounded'
        required={required}
      />
    </div>
  )
}
